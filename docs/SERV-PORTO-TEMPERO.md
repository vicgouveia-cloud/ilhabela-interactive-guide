# Porto do Engenho e Tempero da Ilha

**Promoção à main autorizada explicitamente pelo usuário após a apresentação dos resultados abaixo, em 18/10/2026. As falhas conhecidas permanecem registradas; a suíte não foi declarada integralmente aprovada.**

Verificado em 18/10/2026, a partir da main `1a7613e4c0273deca5094a6e5842d9461be50c51`.

Ambos são `food`, `recommended:true`, com traduções completas PT/EN/ES/FR/HE. Total: **129 serviços, 68 food**. Os 127 registros anteriores, incluindo Fast Go Drive e as duas unidades Israel Quero Pizza, permanecem idênticos e na mesma ordem relativa. Nenhuma alteração de renderer, taxonomia, filtros ou módulos externos ao catálogo.

## Porto do Engenho

- Associação Comercial: https://www.acilhabela.com.br/gastronomia-acei confirma nome, Av. Pedro Paula de Moraes, 1146 e Instagram https://www.instagram.com/portodoengenhoilhabela/.
- Prefeitura: https://www.ilhabela.sp.gov.br/portal/secretarias-paginas/49/sobre-o-aquabus/ identifica o restaurante como ponto do Aquabus.
- Festival promovido pela associação turística: https://www.ilhabelatur.com.br/festival-do-camarao identifica o estabelecimento, endereço em Engenho D'Água e prato de camarão.
- Perfil de cozinha brasileira, frutos do mar e almoço também corroborado pelo cadastro https://www.tripadvisor.com.br/Restaurant_Review-g609135-d6006403-Reviews-Porto_Do_Engenho_Bar_de_Praia_E_Restaurante-Ilhabela_State_of_Sao_Paulo.html.
- Sem horário fixo ou jantar presumido. Não foi possível confirmar qual telefone é atual: ACEI informa (12) 97401-4041, IlhabelaTur (12) 99638-0905. Nenhum dos dois foi apresentado como WhatsApp; o card aponta para o Instagram oficial.

## Tempero da Ilha

Dados extraídos diretamente de https://linktr.ee/temperoda.ilha, do perfil e seus links publicados:

- Endereço: R. Luiz Ameixeiro, 65, Perequê, Ilhabela.
- Buffet 11h30–16h30; pizza e burger 18h–23h. Sem inventar dias de funcionamento ou modalidade de cobrança do buffet.
- WhatsApp: https://wa.me/5512991065523.
- Instagram: https://www.instagram.com/temperoda.ilha/.
- Localização: https://maps.app.goo.gl/N5FiTVJ2sgV8GWjWA. O card preserva o gerador Maps existente por endereço.
- Cardápio: https://drive.google.com/drive/folders/1NjodkxQjzW_D-g3M--Ec2-U5e0bmKgzg?usp=sharing. Acesso pelo Linktree no botão de site existente.
- `buffet` já existe na taxonomia. Sem nova enumeração. Pizza e burger são especialidades verificadas; não atribuir outras cozinhas sem fonte.

## Imagens e fundamento do uso

Uso estritamente identificador e editorial dos logotipos públicos das próprias marcas, expressamente autorizado pelo proprietário do guia neste pedido. Não se declara licença Creative Commons nem autorização adicional recebida dos titulares; a evidência é a publicação da identidade no canal oficial, dentro do uso editorial solicitado. Nenhuma fotografia de terceiro, favicon, imagem gerada ou fotografia de prato foi utilizada. Nenhum crédito visual foi acrescentado à marca.

- Porto: logotipo contendo o nome e símbolo, recuperado do `og:image` do Instagram oficial acima. O avatar público tem 100×100 px; foi preservado sem recriação de detalhe. Não é logotipo de outro restaurante homônimo. A URL temporária da CDN foi registrada no arquivo de proveniência.
- Tempero: logotipo verde com nome e inscrição “Restaurante por KG”, avatar 2000×2000 px do próprio Linktree: https://ugc.production.linktr.ee/5be20a3f-33f9-4202-8d60-92b2d782e8fa_Logo.png. O texto da marca permanece intacto; o cadastro não infere preço ou condições a partir da inscrição.
- Arquivos locais WebP, com margem para o recorte do card e os selos existentes. Hashes de originais e versões servidas em `tests/fixtures/porto-tempero-images.json`; fonte por canal e URL em `docs/porto-tempero-image-provenance.json`.

## Validação

Auditoria dedicada exige ambos recomendados, imagens WebP locais com hash, contatos corretos, taxonomia existente, cinco traduções e preservação integral dos 127 registros anteriores. Regressões Playwright cobrem imagens carregadas, selos, prioridade, contatos, filtros, RTL e largura em cinco idiomas e três tamanhos de tela. Resultados reais da execução são registrados ao concluir a validação.

### Auditorias históricas fora da suíte padrão

A varredura de todos os arquivos `audit-*.cjs` passou em 19 e falhou em seis auditorias históricas. As seis falhas foram reproduzidas também no checkout intacto da main de origem, sem esta alteração:

- `audit-category-hubs.cjs`: comparação de analytics de praias com hub.
- `audit-img01c-poco-fundo.cjs` e `audit-img01e-mirante-baepi.cjs`: esperam 28 fotos, enquanto a main aprovada tem 34.
- `audit-routing-data.cjs`: modos `unknown` e `diving` não aceitos pela auditoria histórica.
- `audit-routing-fallback.cjs`: contrato histórico Bonete/pedestrian diverge da main atual.
- `audit-golden-tips.cjs`: comparação integral com base anterior às traduções de especificações aprovadas em #25.

Esses testes e módulos não foram alterados nem suas regras relaxadas. A suíte padrão `npm test` usa as auditorias atuais de imagens e i18n, que passaram. O teste novo exige igualdade integral dos 127 serviços anteriores com a main de origem.

Os 15 cenários Playwright dedicados aos dois restaurantes passaram localmente. Os links oficiais de localização e cardápio do Tempero responderam HTTP 200; o WhatsApp foi extraído como URL publicada, sem alegar teste de envio de mensagem.

### Bloqueios de publicação

- A suíte padrão `npm test` passou pelas nove auditorias atuais, mas a execução Playwright foi interrompida após duas falhas: `home-planner.spec.cjs:31` em 1440px (cabeçalho do planner intercepta o clique em Minha viagem) e `i18n.spec.cjs:148` (seta de categorias RTL não visível). Não foi concluída nem declarada aprovada.
- O timeout de Minha viagem foi reproduzido no checkout intacto `1a7613e` servido separadamente na porta 4184, com o mesmo erro e a mesma linha 31. A falha da seta RTL foi observada na suíte completa; não foi repetida isoladamente.
- Na suíte completa de serviços, cinco cenários de `services-featured.spec.cjs` esperam La Gloria House como primeiro resultado global, mas a ordenação atual retorna Portinho Passeios. O caso PT foi reproduzido na main intacta, na mesma linha 8.
- Quinze cenários de `services-global-actions.spec.cjs` exigem Maps como última ação de todos os primeiros cards, incluindo Israel Quero Pizza Delivery, que corretamente tem apenas WhatsApp. O caso PT/320 foi reproduzido na main intacta, na mesma linha 26 (`map` esperado, `chat` recebido).
- Os testes históricos não foram alterados para obter aprovação. Corrigir esses contratos e o fluxo fora do catálogo demanda trabalho separado. Após conhecer os resultados, o usuário autorizou a publicação; os testes não foram alterados para ocultar as falhas.

Verificação histórica de produção anterior à autorização final: `main` permaneceu em `1a7613e4c0273deca5094a6e5842d9461be50c51`; deploy existente `dpl_8BYhuymtUwFfibezkQ6qKCcdcKEf`, projeto `ilhabela-guide` / `prj_vHdA1kFW1UkEWT2ZqejmLlD8cman`, Vercel **READY** com esse mesmo SHA; https://ilhabelatrip.com/servicos/ respondeu HTTP 200. Naquela verificação, os 129/68 registros deste rascunho ainda não estavam em produção. O resultado da promoção autorizada posteriormente deve ser conferido pelo SHA na main e no deploy Vercel correspondente.

Resultado final da suíte de serviços: **142 cenários executados; 122 passaram e 20 falharam** (5 de expectativa de primeiro resultado e 15 da regra universal de Maps descritas acima). Os 15 novos cenários passaram nesta execução e também na execução dedicada inicial. Não houve testes ignorados para contornar os bloqueios.
