# Ilhabela Trip — refinamento a partir dos screenshots reais

08/10/2026. Branch `visual/discovery-editorial-v1`. Commit pai: `59b3d3c51008968db84dc986c18db882b71e7510`.

## Estado confirmado antes de editar

Checkout limpo, HEAD e branch remota exatamente no commit de referência. `main` remota em `413ecae3b6edf611bef4db20f26852a2f1f166cb`. Não havia trabalho posterior na branch solicitada. A configuração de fetch local só acompanha main; por isso a branch foi conferida diretamente com `git ls-remote`, além de `git fetch origin` (FETCH_HEAD). Nenhum reset, rebase ou sobrescrita. Entrega em commit local na mesma branch; sem push, merge ou deploy.

Os quatro screenshots de iPhone e os dois de desktop foram recuperados da conversa Ilhabelatrip. Os de iPhone mostram hero alto, cards em duas colunas estreitas e colisão do botão de reset com os controles laterais do mapa. Os arquivos da pasta sources não foram modificados.

## Alterações restritas

- Hero mobile: espaçamento e tipografia compactados, preservando toda a descrição, foto real e gradiente existentes. Busca visível antes de 600px nos cinco idiomas em viewport 390 × 900.
- Cards abaixo de 768px: uma coluna, foto 2:1 e corpo com espaçamento compacto; títulos e resumos completos. Desktop continua com quatro colunas em 1440px.
- Mapa/Cartões: rolagem até o começo da seção escolhida, descontando a altura real do cabeçalho e, em desktop, da barra sticky de descoberta. Eliminada a segunda rolagem atrasada do mobile. Busca, categorias e demais filtros não são alterados. Respeita preferência por movimento reduzido. Ambas as seções continuam no documento, conforme a arquitetura existente.
- Reset da visão da ilha: movido para o início lógico do mapa, separado dos controles Leaflet de localização, camadas e zoom à direita. Botão continua funcional e com nome acessível traduzido. Nenhuma alteração em Leaflet, clusters, marcadores ou geolocalização.
- Selo do hero: substituído por “PARQUE ESTADUAL DE ILHABELA • MATA ATLÂNTICA”, traduzido em PT/EN/ES/FR/HE, com RTL preservado.
- Cache das três folhas/scripts modificados atualizado no HTML.

Arquivos funcionais: `index.html`, `styles.css`, `app.js`, `translations.js`. Planner, serviços, rotas, Valhalla, Google Maps, SEO e catálogo não foram modificados.

## Alegação ambiental e fonte

O [Guia de Áreas Protegidas do Estado de São Paulo](https://guiadeareasprotegidas.sp.gov.br/ap/parque-estadual-ilhabela/) informa que o parque engloba 85% do município. A [Prefeitura de Ilhabela](https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15357/conheca-as-acoes-e-areas-de-preservacao-do-meio-ambiente-em-ilhabela/) também descreve o percentual como área abrangida pelo parque. Isso não fundamenta a formulação exata “85% Mata Atlântica preservada” como medida atual de cobertura/conservação. Por isso o selo foi substituído por texto não numérico em todos os idiomas.

## Controle circular escuro: identificado, pendência externa

O ícone nos screenshots corresponde à Vercel Toolbar do preview (menu e logotipo Vercel). É uma ferramenta de revisão, comentários, acesso ao deployment e inspeção, não uma função turística do guia. A busca no código não encontrou componente equivalente; o HTML carrega apenas Vercel Analytics, não o widget da Toolbar.

A [documentação oficial da Vercel](https://vercel.com/docs/vercel-toolbar#reposition-toolbar) informa que arrastar a Toolbar muda sua posição somente para aquele usuário, persistindo entre deployments; não muda a posição para outros colaboradores. O menu também permite ocultação na sessão com acesso pelo teclado, mas isso não foi aplicado ao usuário.

**A obstrução causada pela Toolbar no iPhone não foi corrigida nem validada nesta entrega.** É necessário reposicioná-la na própria sessão de revisão. Não foi adicionado CSS contra DOM privado/Shadow DOM da plataforma, nem removida funcionalidade ou alterada configuração global do projeto. O controle não existe no servidor local e não há garantia de posição via CSS público documentado. Este é um limite da sessão de preview, não um bloqueio arquitetural do guia; não houve deploy para verificá-lo. Os controles que pertencem ao guia foram separados e testados.

## Validação

Chromium local, não Safari em iPhone físico. Dependências públicas existentes de mapas, fontes e Tailwind. Sem deploy de produção.

`playwright test tests/visual-discovery.spec.cjs tests/mobile-journey.spec.cjs tests/brand-migration.spec.cjs`: **24 aprovados, nenhuma falha (1,4 min)**.

A matriz visual valida 390px e 1440px nos cinco idiomas: traduções e RTL; cards contra o catálogo traduzido; busca Jabaquara preservada ao alternar visões; categoria cachoeiras preservada; contador e marcadores; posição final da rolagem medida com tolerância de 3px, sem rolagem corretiva manual nas capturas; teclado Enter na alternância e na ficha; uma coluna mobile; ausência de overflow e erros JavaScript; ausência de colisão do reset com os controles Leaflet. Capturas da home, cards e mapa nos dez casos. A matriz visual foi repetida após aguardar também img.decode() antes das capturas: 10/10 aprovados; evita screenshots com fotos carregadas mas ainda não pintadas.

A suíte de jornada existente valida mapa → seleção → viagem, persistência, modais acima da navegação inferior, cinco idiomas e RTL, fluxo Google Maps, clusters/fallback e troca de tamanho. A suíte de marca valida idiomas e navegação das páginas existentes. Não foram alteradas suas implementações ou expectativas.

Auditorias: atrações 50/50; descoberta 50/50; sitemap 58 URLs. Sintaxe JavaScript e diff sem problemas.

**Falha pré-existente reproduzida:** `audit-i18n.cjs` usa `localRecommendations` inexistente. O mesmo ReferenceError ocorreu nesta branch e no checkout base `413ecae`, usando as mesmas dependências via NODE_PATH. A validação de idiomas deste lote usa a matriz de navegador atual. Não se declara a suíte global aprovada: as nove falhas antigas de home-planner/multimodal e a auditoria de routing descritas em `visual-discovery-v1.md` não foram executadas novamente neste refinamento. Nenhuma nova falha nas suítes executadas.

## Capturas incluídas no commit

| Evidência | Captura |
|---|---|
| Antes: home 390px | [Abrir](refinement-evidence/before-390.png) |
| Depois: home 390px | [Abrir](refinement-evidence/after-pt-390.png) |
| Antes: cards 390px | [Abrir](refinement-evidence/before-cards-390.png) |
| Depois: cards 390px | [Abrir](refinement-evidence/cards-pt-390.png) |
| Mapa após alternância 390px | [Abrir](refinement-evidence/map-pt-390.png) |
| Home 1440px | [Abrir](refinement-evidence/after-pt-1440.png) |
| Cards 1440px | [Abrir](refinement-evidence/cards-pt-1440.png) |
| Cards RTL 390px | [Abrir](refinement-evidence/cards-he-390.png) |

As capturas antes são as evidências do lote anterior, na mesma base visual; as depois foram geradas nesta execução. Os screenshots reais enviados serviram de referência e não foram republicados no repositório. A matriz completa fica em `../refinement-evidence/`; log de execução em `../refinement-tests.log`.
