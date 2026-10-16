# PERF-01A — fotografia autoral do Pico de São Sebastião

Base: 0dbf7a18fc472d19428e5ca5aa82fc127d628aab, branch perf/perf-01-02-local-20261016.

A foto da guarita de Castelhanos foi retirada dos usos ativos do Pico.
O usuário confirmou autoria, identificação do Pico de São Sebastião e
permissão de uso no Ilhabela Trip em 16/10/2026. Crédito exato em todos os
idiomas: **Acervo pessoal — Ilhabela Trip**. Não se afirma vista a partir do
cume. A alternativa Wikimedia foi descartada antes de commit.

O original recebido está preservado byte a byte. Procedência, SHA256 e
limites da autorização constam em
`assets/images/pico-de-sao-sebastiao-autoral.PROVENANCE.md`.
Nenhuma licença Creative Commons foi atribuída a esta fotografia.

## Imagens

| Arquivo | Dimensões | Bytes |
| --- | --- | ---: |
| Original JPEG | 1600 × 1200 | 217323 |
| WebP 320w | 320 × 240 | 11624 |
| WebP 640w | 640 × 480 | 44812 |
| WebP 960w | 960 × 720 | 94544 |
| WebP 1600w | 1600 × 1200 | 201134 |

Pillow, qualidade 85, Lanczos, sem ampliação ou recorte dos arquivos.
Object-position bottom mantém a montanha visível no recorte de apresentação.
Cards, mapa, modal, páginas PT/EN, hubs, templates, OG/Twitter/schema usam
a identidade nova. Alt e legenda: PT/EN/ES/FR/HE; crédito mantido literalmente.
O fallback de WebP do Pico usa o mesmo JPEG autorizado, preservando o crédito.
Os arquivos históricos da guarita permanecem inalterados e sem referências
ativas para o Pico. As 110 imagens anteriormente versionadas estão idênticas.
Catálogo, coordenadas, 50 atrações, traduções editoriais, planner, URLs,
canonicals/hreflang, sitemap e robots foram preservados. PERF-02 fora do escopo.

## Validação local

- 12 testes focados aprovados: cinco idiomas, desktop/mobile 390/1440,
  DPR1/2, 50 cards, alt, autoria, licença/procedência, responsive images,
  falha de WebP e galerias Castelhanos/Bonete.
- Matriz Chromium: imagens decodificadas, candidatos e bytes conferidos,
  50 atrações, cinco idiomas, RTL, modal, mapa e seleção/abertura no planner;
  sem pageerror. Capturas para revisão visual em quatro combinações de tela/DPR.
- build:seo aprovado em cópias isoladas; somente os fragmentos de imagem e
  atribuição foram transferidos para as páginas existentes. Drift editorial
  anterior dos geradores não foi incorporado.
- 8/16 auditorias aprovadas, incluindo generator, attraction-images/pages,
  discovery-hub, reconciled-attractions, mirante-baepi, sitemap e seo-i18n.
- Outras 8 falham também no SHA inicial: category-hubs (analytics),
  golden-tips (dados históricos), i18n (localRecommendations), img01b/img01c
  (inventários históricos de assets), itinerary-hubs (roteiro de 2 dias),
  routing-data (modos), routing-fallback (Bonete pedestrian).
- A auditoria IMG-01C recebeu a expectativa exata da troca autorizada do Pico;
  as demais comparações continuam, inclusive a falha histórica de inventário.
- home-planner falha em 390/1440 tanto na base como na proposta pela ausência
  de #home-continue-trip. Seleção e abertura atuais verificadas separadamente.
- A primeira execução do teste novo ainda continha seletores da alternativa
  Wikimedia; falhou, foi corrigida para a foto autoral e repetida: 12/12 passam.
- Original e quatro WebP decodificados; preservação e git diff --check aprovados.

Suíte geral não está verde. Preview e homologação humana são etapas distintas.
PR #8 deve permanecer em rascunho. Sem merge e sem publicação em produção.
