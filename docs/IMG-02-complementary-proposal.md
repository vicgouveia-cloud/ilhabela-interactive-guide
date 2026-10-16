# IMG-02 — decisão sobre foto complementar

16/10/2026. Base origin/main d0275a773f1c64b2618fae7a0a8cfcb17a1502ca.

## Decisão: parar a integração e propor arquitetura

Não incorporar a foto de coral à biblioteca atual. O pedido determina parar se não existir galeria complementar com semântica própria. Nenhum asset, código, HTML, SEO ou configuração de produção foi alterado neste lote.

## Verificação direta da fonte

- [Página Commons](https://commons.wikimedia.org/wiki/File:Parque_Estadual_de_Ilhabela_-_Jo%C3%A3o_Paulo_Marques_DAndretta_(22).jpg), revisão 976216497, consultada em 16/10/2026.
- Descrição e legenda identificam coral-sol na Ponta Azeda em Ilhabela; data 24/01/2022, origem «Own work».
- Autoria exibida: **João D'Andretta**, usuário Jpdandretta. O nome longo João Paulo Marques DAndretta consta no título do arquivo; preservar o crédito efetivamente fornecido pela página.
- Licença declarada: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Permite reprodução comercial e adaptações com atribuição, link, indicação das alterações e ShareAlike; não implica endosso.
- Original indicado: JPEG 2726 × 1704, 2,91 MB, upload de 09/08/2022. [URL original](https://upload.wikimedia.org/wikipedia/commons/b/b7/Parque_Estadual_de_Ilhabela_-_Jo%C3%A3o_Paulo_Marques_DAndretta_%2822%29.jpg). A tentativa de abrir o binário pela ferramenta web expirou. **Original ainda não inspecionado nem validado por hash**; não gerar derivados antes dessa verificação.
- Só seria verdadeiro apresentar como fotografia documental complementar de vida marinha na região da Ponta Azeda. Não retrata a faixa de areia e não resolve o placeholder principal.

## Evidência da incompatibilidade atual

- `attraction-photos.js:224–237`: a entrada verificada atribui `images[0]` a `spot.image`; não há coleção complementar independente.
- `app.js:843`: imagem do modal começa com alt do título da atração, salvo a exceção do Pico.
- `app.js:1028–1093`: `setModalImage` troca fonte, crédito e legenda individual, mas não atualiza o alt. Há infraestrutura parcial para atribuição por imagem, insuficiente para esta semântica.
- `scripts/generate-attraction-pages.cjs:50–75`: legenda e imagem única no hero; nenhuma galeria complementar estática.
- Inserir coral como primeiro item promoveria a foto a card/hero/SEO; anexá-la improvisadamente à lista manteria alt enganoso e divergência entre modal e página estática.

## Proposta técnica para homologação, sem implementação

1. Criar coleção opcional `complementaryPhotos`, separada de `image` e `images`, com assunto, alt e caption PT/EN/ES/FR/HE e atribuição por arquivo. Manter o placeholder da praia em todas as superfícies principais.
2. Renderizar uma figura de «Vida marinha na região» depois do conteúdo da ficha, no modal e na página estática. Usar alt próprio, caption visível, crédito, links de fonte/licença e descrição dos derivados. Não incluir no hero, cards, mapa, OG ou imagem principal do schema.
3. Preservar original e manifesto de proveniência com hash, dimensões, revisão da fonte e autoria. Após inspecionar o original, gerar WebP 320/640/960/1600 sem upscale, registrar conversão/redimensionamento e disponibilizar os derivados sob CC BY-SA 4.0.
4. Legenda proposta PT: «Coral-sol subaquático na região da Ponta Azeda, Ilhabela. Foto complementar de vida marinha.» EN: «Underwater sun coral in the Ponta Azeda area, Ilhabela. Supplementary marine-life photograph.» ES: «Coral sol submarino en la zona de Ponta Azeda, Ilhabela. Fotografía complementaria de vida marina.» FR: «Corail-soleil sous-marin dans la région de Ponta Azeda, à Ilhabela. Photographie complémentaire de la vie marine.» HE: «אלמוג שמש מתחת למים באזור פונטה אזדה, איליאבלה. צילום משלים של החיים בים.»
5. Alt próprio deve descrever o coral submerso, sem chamar a imagem de praia. Validar mudança de idioma, RTL e isolamento bidi do crédito latino; fallback não pode trocar o coral por foto de outra atração.
6. Antes de integrar: verificar cards, modal, página estática, imagem carregada/fallback, mobile/desktop e DPR1/2, cinco idiomas, RTL, 50 atrações, seis placeholders, Pico, sitemap/canonical/hreflang e OG/schema. Comparar falhas com a mesma base; não mascarar testes legados.

## Repositório e revisão documental

PR #8 está merged e é ancestral da base. PRs #11 (contato) e #12 (header mobile) também já estão merged. PR #9 continua aberto, documental de custos; PR #10 continua aberto, documental de imagens, head b58cebfd5b7b56608943fcdba80d11b55963c22b. Nenhum desses PRs foi alterado. Listadas as refs remotas; branches históricas de fotos não são novas autorizações e não foram integradas.

Revisão do #10: inventário coerente com seis pendências; coral corretamente recusado como principal. Os seis pedidos podem ser consolidados em quatro titulares, conforme documento separado. “Foto sob seção” identifica uma posição editorial, não um nome de arquivo comprovado: exigir o original ou URL exata na resposta do titular, sem inventar nomes.

Checagem incremental limitada: três buscas Commons com variantes dos seis locais em 16/10/2026 não revelaram nova candidata documental inequívoca com licença aberta. Não é prova de inexistência; não foram repetidas as pesquisas extensas anteriores. Homônimos e simples créditos não habilitam uso.

Permanecem: `praia-do-barreiros`, `praia-de-santa-tereza`, `praia-da-ponta-azeda`, `poco-do-furado`, `mirante-do-morro-da-cruz`, `mirante-dos-barreiros`.

Sem envio a terceiros, merge ou deploy Production. Esta proposta requer homologação antes de criar o recurso complementar.

## Validação deste lote documental

PASS: audit-attraction-images (50 páginas, 28 registros, seis placeholders) e audit-sitemap (66 URLs). O teste audit-img01b-licensed-photos falha na linha 66 pela lista fixa histórica, reproduzido com HEAD exatamente na base d0275a7 antes de qualquer commit. audit-seo-i18n não executou: dependência parse5 ausente no checkout. Não houve validação visual mobile/desktop porque a integração foi interrompida no gate de arquitetura; isso permanece critério obrigatório da futura implementação. Diff de produto vazio; somente os dois documentos novos.
