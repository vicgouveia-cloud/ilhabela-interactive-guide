# Lote 4.1B — gerador de atrações

Base local preservada: bf877d6f0fa4ee393211c620ebd9439cce379dbe (Lote 4.1).
Após fetch em 10/10/2026, origin/main: 88a6b5c5451fc3444f84c2737fe4c7aa601c5386. Checkout inicialmente limpo, uma alteração à frente, sem divergência. A branch fix/attraction-consistency-4-1 não existe no remoto.

## Origem das divergências

O commit 7c12b2d77f3fa5a7e607794e86d70be2c800337b deixou de carregar translations.js e multimodal.js no gerador. O accessCopy anterior ainda dependia de option.gateway.verified, preenchido pelo enriquecimento de multimodal.js; data.js e additional-spots.js sozinhos não reproduzem essa apresentação. O HTML também conserva redação editorial própria. Resultado no estado bf877d6: 36 textos diferentes, documentados individualmente no artefato externo DIVERGENCIAS.md (inclui publicado versus gerador anterior).

O template mantinha Explorar em /#explore-section em vez de /o-que-fazer/. O aviso de embarque do Coração estava no HTML reconciliado, mas não era derivado pelos dados brutos do gerador. Uma regra CSS .note não usada nas páginas era acrescentada; foi retirada para reproduzir o estilo atual.

## Procedência e limites de autoridade

scripts/attraction-access-copy.json guarda os 50 textos literalmente extraídos das páginas aprovadas no commit bf877d6, com referência individual à página/commit, estado not-revalidated e indicadores de pendência textual. É um registro editorial para build, não um novo registro de gateways. Nenhum booleano de verificação operacional é inferido ou alterado.

- Informações verificadas operacionalmente: permanecem nos registros/resolvedores já existentes. Sepituba e entrada do Parque em Castelhanos conservam seus valores publicados. Documentos de acessos anteriores continuam referências; esta migração não certifica coordenadas ou percursos novamente.
- Informações herdadas: toda redação transferida tem procedência no HTML aprovado e não recebe promoção para verified. Onde não existe fonte específica, continua pendente a recuperação documental.
- Pendências explícitas: os avisos de embarque, ausência de acesso terrestre validado e demais cautelas são preservados integralmente. Cabeçuda continua sem acesso público validado; o Coração conserva o aviso de embarque pendente. As flags do registro indicam texto publicado, não uma auditoria de campo completa.

## Implementação

Gerador passa a usar esse registro editorial para Como chegar. Um acesso ausente provoca erro antes de qualquer escrita: todas as páginas são renderizadas/validadas previamente. Não se carrega a aplicação de navegador no build, nem se alteram mapas, planner, Google Maps, Valhalla, coordenadas ou gateways.

ATTRACTION_OUTPUT_DIR permite geração real em diretório temporário; sem essa variável o destino local permanece lugares/. SITE_URL mantém seu comportamento anterior. O link Explorar e o estilo reproduzem as páginas existentes.

Novo teste audit-attraction-generator.cjs compara os DOMs completos das 50 páginas (incluindo atributos, texto, imagens, scripts, estilos, canonicals, OG, JSON-LD, CTAs e contatos), ignorando apenas whitespace de formatação entre elementos e normalização CRLF/LF. Executa duas gerações reais consecutivas no mesmo diretório temporário e compara bytes. Confirma também que as 50 fontes não foram gravadas e que a ausência de registro impede escrita. Os testes novos e do Lote 4.1 entram nos comandos test e test:seo.

## Resultado

- 50/50 páginas equivalentes ao HTML aprovado, incluindo Cabeçuda e Coração.
- Outras 48 páginas sem alteração de conteúdo, navegação, metadata ou estilos.
- Duas execuções consecutivas: 50/50 arquivos byte a byte idênticos.
- Teste específico do Lote 4.1: aprovado.
- Audit attraction pages: 50/50 aprovado.
- Discovery hub: 50/50 aprovado.
- Sitemap: 50 atrações, 58 URLs aprovado.
- Nenhum arquivo lugares/ foi alterado. Apenas a saída temporária foi gravada.
- test:seo continua falhando na comparação de analytics de category hubs, já documentada antes deste lote, sensível ao CRLF do checkout. Falhas anteriores de itinerary hubs e routing data permanecem fora do escopo; esses arquivos e dados não foram alterados.

## Riscos e manutenção

O texto editorial não acompanha automaticamente mudanças futuras no catálogo/resolvedor. Alterações de acesso exigem revisão explícita do registro; o teste de paridade impede divergência silenciosa em relação às páginas aprovadas. A reprodução do catálogo na ficha versus mídia estática continua um lote separado; fotos e créditos foram preservados, não revalidados. Nenhuma estratégia de idiomas/indexação foi modificada.

O teste permite diferenças apenas de formatação do HTML; uma futura geração pode mudar quebras de linha e espaçamento entre tags, sem mudança semântica. Os dois resultados gerados entre si são byte-identicamente estáveis.

Sem push, merge, rebase, promoção ou deploy. Revisão necessária antes de publicação.
