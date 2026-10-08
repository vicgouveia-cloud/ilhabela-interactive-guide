# Ilhabela Trip — primeiro lote visual

Data: 08/10/2026. Branch: `visual/discovery-editorial-v1`.
Base auditada: `origin/main` em `413ecae`.

## Auditoria anterior à implementação

Não há bloqueio arquitetural para este lote. A aplicação é HTML/CSS/JavaScript sem framework de componentes. A home usa `index.html`, `styles.css` e `app.js`; o catálogo vem de `data.js` e `additional-spots.js`, com 50 atrações. `translations.js` oferece PT/EN/ES/FR/HE, inclusive direção RTL em hebraico.

- Home: foto verificada de Castelhanos como fundo integral, texto sobreposto e área de busca separada. Desktop e mobile compartilham o HTML.
- Descoberta: `handleSearch`, `filterCategory` e `getFilteredSpots` alimentam tanto os cards quanto os marcadores. Não há necessidade de criar outro estado de busca.
- Cards: `renderCustomSpotsList` aplica um único template. Antes: títulos truncados, categoria/dificuldade sobre a foto, selo de avaliação ou “Novo no guia”, distância e duração. Algumas durações existentes incluem trilha/barco; não são apropriadas para ampliar destaque neste lote.
- Alternância: `setViewMode` destaca a opção e rola até mapa ou cards. Ambos continuam no documento. Não substituímos esse comportamento por ocultação de seções.
- Mobile: mapa com clusters, chips com rolagem, camadas e navegação inferior existentes. Mantidos.
- Descoberta editorial `/o-que-fazer/`: página estática em português com cards e links próprios, gerada por `scripts/generate-discovery-hub.cjs`. Auditada, preservada neste lote para não ampliar a alteração de SEO/geradores ou apresentar uma migração parcial de idiomas.
- Planner/rotas: `planner.js`, `multimodal.js`, `offline-trip.js`. Serviços: diretório e taxonomia próprios. Todos fora do lote.

## Antes e depois

| Área | Antes | Depois |
|---|---|---|
| Desktop | Texto sobre a foto de fundo | Texto editorial e foto real lado a lado, com espaçamento e leitura próprios |
| Busca | Campo compacto | Campo destacado com nome acessível nos cinco idiomas |
| Categorias | Chips pequenos | Ícones com fundo visual, alvos de toque e seleção reconhecível; carrossel preservado |
| Cards | Foto com múltiplos selos, título cortado, distância/duração | Foto, categoria, título completo, resumo existente e ação de ficha completa |
| RTL | Tratamento existente | Hero espelhado por propriedades lógicas e seta dos cards espelhada |
| Mapa/cartões | Atalhos que rolam até a seção | Mesmo comportamento e mapa como opção inicial |

Não foram criadas avaliações, preços, disponibilidade, serviços, tempos ou atributos. A ficha completa mantém os dados técnicos originais. Nenhum dado do catálogo ou tradução foi alterado.

## Arquivos alterados

- `index.html`: classes locais de layout, nome acessível da busca e versões de CSS/JS para atualização de cache.
- `styles.css`: regras de descoberta e cards com escopo local; hero desktop a partir de 1024px.
- `app.js`: somente o template de cards da home; filtros, busca, mapa, modais e lógica de serviços permanecem iguais.
- `tests/visual-discovery.spec.cjs`: matriz de validação de cinco idiomas e dois tamanhos.
- `docs/visual-discovery-v1.md`: este relatório.

## Validação

`npx playwright test tests/visual-discovery.spec.cjs`: **10/10 aprovados**, sem falhas ou instabilidade.

Em PT/EN/ES/FR/HE, 390×900 e 1440×900:
- Idioma, RTL e persistência após recarregar.
- Traduções de texto, placeholders, nomes acessíveis e imagens.
- Títulos e resumos dos 50 cards iguais ao catálogo traduzido existente.
- Busca por Jabaquara: um card, um marcador e contador coerente.
- Categoria cachoeiras: quantidade de cards e marcadores coerente com o catálogo.
- Alternância mapa/cartões e abertura da ficha usando Enter.
- Ausência de overflow horizontal e de erros JavaScript de página.
- Capturas da home e cards em cada combinação; fotos da primeira linha carregadas antes das capturas.

`node --check app.js` e `git diff --check`: aprovados.

Auditorias SEO: atrações **50/50**, descoberta **50/50**, sitemap **58 URLs**: aprovadas. Metadados, canonical, páginas geradas, sitemap e robots não foram modificados.

## Limitações anteriores confirmadas

A suíte ampla `home-planner.spec.cjs` + `multimodal.spec.cjs` teve **20 aprovados e 9 falhas**, tanto na branch quanto na base original `413ecae`, servida separadamente. As mesmas falhas são:
1. CTA antigo da home inexistente, em 390px e 1440px (2 testes).
2. Texto esperado de estimativa aproximada 4x4.
3. Texto esperado de duração parcial.
4. Ordem otimizada esperada na agenda/mapa.
5. Exportação offline e seleção excessiva.
6. Prestadores marítimos por capacidade.
7. Prestadores esperados nas praias remotas.
8. Prestadores esperados para experiências náuticas.

`audit-i18n.cjs` referencia `localRecommendations`, removido anteriormente. `i18n.spec.cjs` ainda contém premissas antigas, como catálogo de 40 atrações, favoritos e booking antigo; não foi utilizado como evidência de aprovação. A nova matriz valida os componentes deste lote contra o catálogo atual.

`audit-routing-data.cjs` reprova modos `unknown` e `diving` existentes em quatro atrações. Nenhum arquivo dessa auditoria ou de dados/rotas foi alterado.

A suíte global não está verde. Corrigir essas pendências exige trabalho separado nas áreas excluídas pelo pedido. Os testes deste lote e as auditorias SEO executadas passaram.

## Evidências e entrega

Screenshots locais em `../visual-evidence/`: `before-390.png`, `before-1440.png`, `before-cards-390.png`, `before-cards-1440.png`, `after-{idioma}-{largura}.png` e `cards-{idioma}-{largura}.png`.

Relatórios JSON locais: `visual-tests.json` e `baseline-regression.json`. Nos testes, `VISUAL_EVIDENCE_DIR` permite escolher a pasta das capturas; sem a variável, elas usam a pasta de saída do Playwright.

Verificação feita em Chromium local, com as dependências públicas existentes de Leaflet/Tailwind/fontes. Não representa teste em dispositivo físico nem validação de produção.

Entrega somente em branch dedicada. Sem merge ou promoção para `main`.
