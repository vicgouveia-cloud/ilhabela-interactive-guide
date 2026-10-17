const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { chromium } = require(path.join(__dirname, '..', 'node_modules', 'playwright'));

const ROOT = path.resolve(__dirname, '..');
// Place original source JPEGs in .tmp/img03-sources, or point IMG03_SOURCE_DIR to a folder containing the source files.
// The verified source URLs and SHA-256 hashes remain recorded in docs/IMG-03-provenance.md.
const SCRATCH = path.resolve(process.env.IMG03_SOURCE_DIR || path.join(ROOT, '.tmp', 'img03-sources'));

const items = [
  {
    id: 'poco-do-furado',
    src: path.join(SCRATCH, 'cand_poco_furado_sectur.jpg'),
    dest: 'assets/images/poco-do-furado_sectur.webp',
    sourcePage: 'https://www.ilhabela.com.br/cachoeiras/parque-das-cachoeiras/',
    sourceImg: 'https://www.ilhabela.com.br/wp-content/uploads/2023/10/poco-do-furado-parque-das-cachoeiras-ilhabela-sectur-1.jpg',
    credit: 'Prefeitura de Ilhabela · Sectur Ilhabela'
  },
  {
    id: 'mirante-do-morro-da-cruz',
    src: path.join(SCRATCH, 'cand_morro_da_cruz.jpg'),
    dest: 'assets/images/mirante-do-morro-da-cruz_ilhabelacombr.webp',
    sourcePage: 'https://www.ilhabela.com.br/dicas/10-mirantes-e-lugares-incriveis-para-fotos-em-ilhabela/',
    sourceImg: 'https://www.ilhabela.com.br/wp-content/uploads/2019/06/mirante-do-morro-da-cruz-ilhabela.jpg',
    credit: 'Acervo Ilhabela.com.br'
  },
  {
    id: 'mirante-dos-barreiros',
    src: path.join(SCRATCH, 'pref_06e0.jpg'),
    dest: 'assets/images/mirante-dos-barreiros_prefeitura.webp',
    sourcePage: 'https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15401/10-mirantes-de-ilhabela-para-apreciar-a-vista-do-arquipelago',
    sourceImg: 'https://www.ilhabela.sp.gov.br/fotos/06e0b0a2a8339400f21ecae72c54f131.jpg',
    credit: 'Prefeitura de Ilhabela · Sectur Ilhabela'
  }
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const evidence = [];

  for (const item of items) {
    const rawJpg = fs.readFileSync(item.src);
    if (rawJpg.length < 25000) throw new Error('Suspicious small JPEG: ' + item.id);
    const origSha256 = crypto.createHash('sha256').update(rawJpg).digest('hex');
    const base64Jpg = 'data:image/jpeg;base64,' + rawJpg.toString('base64');

    const conversion = await page.evaluate(async ({ src, maxWidth, maxHeight, quality }) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          let w = img.naturalWidth;
          let h = img.naturalHeight;
          const origW = w;
          const origH = h;
          if (w < 800 || h < 450) {
            reject(new Error(`Image too small: ${w}x${h}`));
            return;
          }
          if (w > maxWidth || h > maxHeight) {
            const ratio = Math.min(maxWidth / w, maxHeight / h);
            w = Math.round(w * ratio);
            h = Math.round(h * ratio);
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/webp', quality);
          resolve({ origW, origH, destW: w, destH: h, dataUrl });
        };
        img.onerror = (e) => reject(new Error('Failed to load image in Chromium: ' + e));
        img.src = src;
      });
    }, { src: base64Jpg, maxWidth: 1280, maxHeight: 960, quality: 0.85 });

    const b64Data = conversion.dataUrl.replace(/^data:image\/webp;base64,/, '');
    const webpBuffer = Buffer.from(b64Data, 'base64');

    if (webpBuffer.subarray(0, 4).toString('ascii') !== 'RIFF' || webpBuffer.subarray(8, 12).toString('ascii') !== 'WEBP') {
      throw new Error('Invalid WebP generated: ' + item.id);
    }

    const outPath = path.join(ROOT, item.dest);
    fs.writeFileSync(outPath, webpBuffer);
    const webpSha256 = crypto.createHash('sha256').update(webpBuffer).digest('hex');

    const record = {
      id: item.id,
      dest: item.dest,
      sourcePage: item.sourcePage,
      sourceImg: item.sourceImg,
      credit: item.credit,
      original_dimensions: [conversion.origW, conversion.origH],
      converted_dimensions: [conversion.destW, conversion.destH],
      original_bytes: rawJpg.length,
      original_sha256: origSha256,
      webp_bytes: webpBuffer.length,
      webp_sha256: webpSha256
    };
    evidence.push(record);
    console.log(`Converted ${item.id}: ${conversion.origW}x${conversion.origH} -> ${conversion.destW}x${conversion.destH}, ${webpBuffer.length} bytes -> ${item.dest}`);
  }

  await browser.close();

  const report = `# IMG-03 — Fontes e Transformações das Fotografias Finais

## Contexto e Autorização
Este documento registra a proveniência técnica e o tratamento das fotografias para as últimas 3 atrações que ainda possuíam placeholders no catálogo do Ilhabela Trip:
- **Poço do Furado** (\`poco-do-furado\`)
- **Mirante do Morro da Cruz** (\`mirante-do-morro-da-cruz\`)
- **Mirante dos Barreiros** (\`mirante-dos-barreiros\`)

O responsável pelo projeto Ilhabela Trip confirmou em 17/10/2026 a existência de autorização de uso para estas fotografias. Não há reivindicação de licença pública aberta (Creative Commons) nem cessão de direitos autorais para terceiros. O crédito público é registrado de acordo com a fonte oficial e nenhuma licença aberta fictícia é atribuída.

## Especificações Técnicas e Conversão
- **Formato:** WebP (qualidade 85).
- **Enquadramento:** Proporção nativa mantida integralmente (sem crop indevido, sem distorção, sem upscaling).
- **Otimização:** Processamento em alta fidelidade via pipeline Chromium/Canvas.

## Registro de Proveniência e Hashes
\`\`\`json
${JSON.stringify(evidence, null, 2)}
\`\`\`
`;

  const docPath = path.join(ROOT, 'docs', 'IMG-03-provenance.md');
  fs.writeFileSync(docPath, report, 'utf8');
  console.log(`Generated provenance report: docs/IMG-03-provenance.md`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
