# SEO internacional, desempenho e revisão técnica — 24/10/2026

Base: PR #39, seo-i18n-completion-20261024, 5a9f0f085dc0c4c1c45787779f1f6cbbd9ddab1f; main e25aefcb455e1a867a16aefab246bd20289fd8fe.

## Resultado

- 290 URLs indexáveis: as mesmas 58 rotas em PT, EN, ES, FR e HE. Cinquenta atrações, home, descoberta, três categorias, serviços e roteiros de dois/três dias por idioma.
- Conteúdo estático traduzido, canonical próprio, seis alternativas recíprocas (cinco idiomas e x-default PT), sitemap completo e RTL hebraico. Nenhum fallback de conteúdo para PT.
- Atrações usam as traduções já aprovadas do catálogo. Os cinco textos detalhados de acesso do piloto EN foram preservados em international-reviewed-access.json. Serviços oferecem 129 registros traduzidos no HTML inicial e mantêm os filtros do app; os roteiros mantêm dez opções, dias e alternativas.
- Créditos, fontes e licenças das fotografias preservados. A imagem autoral do Pico mantém o crédito conciso aprovado, sem atribuir licença pública.
- 482 blocos JSON-LD verificados: atrações, breadcrumbs, listas, Website/CollectionPage. Coordenadas e descrições iguais ao catálogo; sem avaliações ou ratings inventados. 6.751 links internos verificados.

## Preservação

Não foram alterados data.js, additional-spots.js, translations.js nem o conteúdo de attraction-access-copy.json. A auditoria compara integralmente as 50 páginas PT com a base imutável do PR e permite somente os hreflangs completos, auditados separadamente. Auditorias editoriais, fotos, roteamento, golden e serviços continuam obrigatórias. P0 e a navegação existente não foram refeitos.

O comando de build antigo do piloto e o comando de sitemap delegam ao gerador completo. A geração PT conserva a formatação existente quando o DOM produzido é equivalente, evitando regravar conteúdo editorial.

## Desempenho

Tailwind 3.4.17 compilado no build; removido o compilador de CSS executado no navegador. Scripts clássicos minificados sem encapsular ou renomear os globais usados entre arquivos. Leaflet 1.9.4 e MarkerCluster 1.5.3 são servidos localmente com defer; licenças distribuídas com os arquivos. A camada de tiles é adicionada depois do enquadramento inicial, evitando pedidos descartados. Hero com prioridade alta; variantes responsivas existentes preservadas e caminhos de imagens das homes internacionais corrigidos.

Scripts principais: 854.385 para 697.122 bytes sem compressão (-18,4%). Comparação local, uma amostra por viewport, sem equivalência a métricas de campo:

| Viewport | FCP antes | FCP depois | DOMContentLoaded antes | Depois |
|---|---:|---:|---:|---:|
| 390 px | 1.064 ms | 368 ms | 1.206 ms | 477 ms |
| 1440 px | 936 ms | 468 ms | 997 ms | 462 ms |

O parser transitivo de CSS foi fixado em 7.1.6: npm audit sem vulnerabilidades; saída CSS idêntica byte a byte à versão anterior do parser.

## Validação

- npm run build: PASS. Segundo build: 316 arquivos de saída comparados, nenhuma diferença.
- npm test: 30 auditorias PASS e 509/509 cenários Playwright PASS, sem skips, com fixture que exige zero pageerrors. Duração da rodada completa: 21,4 minutos.
- Após os ajustes finais de metadados sociais e créditos: 30/30 auditorias repetidas e 25/25 cenários internacionais repetidos em desktop/mobile, incluindo conteúdo sem JavaScript, RTL, imagens, filtros de serviços e CTAs.
- Inspeção visual de capturas desktop/mobile; fotos e RTL conferidos. Capturas automáticas passaram a usar o diretório de resultados do teste em vez de um caminho pessoal externo.
- Build, dados estruturados, links, sitemap, serviços, Israel, Porto/Tempero, origem, rotas, storage, mapas, agenda, galeria, contato e idiomas cobertos.

## Empacotamento Vercel

O primeiro preview (1fe456f, dpl_G8oCxWeDABJtB4jsvcJc2EWUPNvU) concluiu o build, mas falhou por ausência da saída public exigida pela plataforma. A correção declara buildCommand/outputDirectory em vercel.json e exporta somente páginas, scripts/CSS públicos, robots, sitemap e assets para public/. Ferramentas, testes, dependências e arquivos privados de desenvolvimento não entram na saída estática.

- 31/31 auditorias após a correção, incluindo 462 arquivos públicos byte a byte idênticos ao build validado.
- 25/25 casos internacionais repetidos contra o servidor usando a pasta public/, em vez das fontes.
- npm test passa a gerar o build antes das auditorias e do navegador.

## Verificação de publicação

Após a integração, confirmar o SHA de main e o deployment Production concluído na integração Vercel/GitHub. Executar node scripts/verify-deployed-seo.cjs https://ilhabelatrip.com: verifica HTTP, indexabilidade e igualdade do HTML das 290 páginas e dos assets com o build validado. Repetir os cenários internacionais apontando PREVIEW_URL para o site público. Estado final, SHAs e evidências ficam no relatório de execução do projeto, sem gerar deploy adicional apenas para registrar o resultado.
