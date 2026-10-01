# Classificação dos acessos pendentes — 01/10/2026

Referência principal: AUDIT-ROUTING-FALLBACK.md. Base desta etapa: branch audit/remaining-routing-fallback, SHA 4609ce1541d9c57c2408c3b519339a82bb1dbaa5. Escopo: os 19 pontos sem gateway/opção explícita mais Três Tombos. Classificação apresentada ao usuário antes das alterações de código.

## Critério

Cada ponto pertence a exatamente um grupo. Grupo 1 significa evidência recuperada de validação anterior, sem nova pesquisa para recuperar esse dado. Não significa que um pin validado comprove um gateway. Grupo 2 significa acesso descrito por fonte pública oficial suficiente para orientar uma validação específica futura; não autoriza promover coordenada aproximada. Grupo 3 significa que a evidência recuperada nesta etapa não basta para cadastrar um gateway exato com segurança. Não se afirma que nunca exista outra fonte ou conversa: é a classificação conservadora com o material recuperado.

## Grupo 1 — já validado anteriormente (2)

| ID | Nome | Evidência e limite |
| --- | --- | --- |
| trilha-do-bonete | Trilha Tradicional do Bonete | Início na Ponta da Sepituba confirmado pelo usuário nesta continuação: -23.936275064037446, -45.42730164154816. Gateway sepituba-trailhead já registrado e usado pela Praia do Bonete. O catálogo da trilha já descreve o mesmo início. |
| cachoeira-do-poco-fundo | Cachoeira do Poço Fundo — Bonete | Pin -23.910209781923758, -45.343693232441986 e acesso pedestre desde a comunidade recuperados de Continuar Ilhabela Guide (6ab46aef-15ec-83e9-afc5-de37a7479dd7), lote declarado concluído e validado visualmente. Pin permanece igual. Sem gateway novo, embarque ou acesso veicular validado. |

## Grupo 2 — validável por fonte pública confiável (3)

| ID | Nome | Evidência pública e próximo dado necessário |
| --- | --- | --- |
| trilha-da-agua-branca | Trilha da Água Branca | [Prefeitura](https://www.ilhabela.sp.gov.br/portal/noticias/0/3/7101/jovens-participam-de-trilha-em-comemoracao-pelo-aniversario-do-parque-estadual): início na guarita de Castelhanos. Gateway existente pode ser associado em lote separado, com revisão do contrato da trilha. Não confundir Parque Estadual com Parque Municipal das Cachoeiras. |
| cachoeira-do-gato | Cachoeira do Gato | [Guia estadual](https://guiadeareasprotegidas.sp.gov.br/trilha/trilha-do-gato/): início na Ponta do Gato, Canto do Ribeirão em Castelhanos; chegada à região por barco ou estrada em 4x4. Falta localizar precisamente a transição para trilha; não usar automaticamente pin da praia ou guarita distante. |
| cachoeira-da-friagem | Cachoeira da Friagem | [Guia estadual](https://guiadeareasprotegidas.sp.gov.br/trilha/trilha-da-friagem/): final da Alameda dos Pássaros, condomínio na Siriúba. Falta confirmar coordenada do acesso permitido e transição do trecho urbanizado para trilha. |

## Grupo 3 — depende de confirmação do usuário (14 + 1 especial)

| ID | Nome | Dado ainda necessário |
| --- | --- | --- |
| praia-da-fome | Praia da Fome | Embarque confirmado por operador e/ou início e percurso de trilha confiáveis. |
| praia-da-enchova | Praia da Enchova | Embarque e/ou transição para trilha; não presumir acesso veicular. |
| praia-de-indaiauba | Praia de Indaiaúba | Embarque e/ou início permitido de trilha. |
| trilha-da-cabecuda-farol | Trilha da Cabeçuda / Farol | Identificação inequívoca do início e permissões de acesso. |
| pico-de-sao-sebastiao | Pico de São Sebastião | Percurso e início autorizados; manter unknown neste bloco. |
| mirante-do-coracao | Mirante do Coração | Transição exata em Castelhanos e restrições de chegada; descrição geral do mirante não verifica gateway. |
| ponto-baleias-sul-sepituba | Ponto de Observação de Baleias — Sul / Sepituba | Encontro/embarque da operação escolhida; a coincidência com Sepituba não comprova uso do trailhead. |
| ponto-baleias-canal | Ponto de Observação de Baleias — Canal | Encontro/embarque confirmado pelo operador. |
| naufragio-aymore | Naufrágio Aymoré | Encontro/embarque da operação de mergulho; pin submerso não é gateway. |
| santuario-ilha-das-cabras | Santuário Submarino da Ilha das Cabras | Acesso/encontro da experiência efetivamente oferecida; pin do santuário não define operação. |
| naufragio-principe-de-asturias | Naufrágio Príncipe de Astúrias | Encontro/embarque da operação de mergulho. |
| saco-do-eustaquio | Saco do Eustáquio | Embarque confirmado pelo operador. |
| praia-do-poco | Praia do Poço | Embarque e/ou início e percurso confiáveis da trilha. |
| piscinas-naturais-do-sul | Piscinas Naturais do Sul | Entrada exata permitida e percurso pelo costão. Descrição turística/endereço aproximado em propriedade particular não bastam. |
| cachoeira-dos-tres-tombos | Cachoeira dos Três Tombos — especial | Gateway exato confiável e trecho final. Registro herdado permanece verified:false e navegação bloqueada em todos os modos. Sem reutilização ou correção presumida da coordenada antiga. |

## Histórico utilizado para evitar retrabalho

Continuar projeto Guia Ilhabela (6abc33a0-3150-83e9-b7c2-e530b8bfc9b6) confirma que modos/alternativas, maritimeAccess e experience já foram estruturados, mantendo embarkation/meetingPoint nulos quando não validados. Isso preserva trabalho concluído, mas não fornece um embarque exato. Continuar Ilhabela Guide recupera a validação de Poço Fundo; Baepi e Poço do Furado já estão fora desta lista e não foram reabertos. Os demais acessos informados pelo usuário já estão no catálogo e ficam intactos.

## Menor lote implementado

Somente trilha-do-bonete. Opção explícita road-trail: aproximação auto/4x4/bicycle/pedestrian → sepituba-trailhead → continuação trail. roadRoutable continua false; nenhum carro é enviado ao pin da trilha. A aproximação pedestre também termina no início confirmado, em vez do pin editorial. Pin, imagens, textos e estimativas existentes permanecem iguais. Não foi cadastrado um novo gateway nem copiada uma nova coordenada para dados de produção. Distância/duração do trecho final permanecem nulas para não derivar estimativas novas.

Poço Fundo tem pin já validado, porém não recebeu gateway presumido. Nenhum ponto dos Grupos 2 ou 3 foi implementado. Planner, Maps e resolvedor não foram alterados.

## Pendências após este lote

Continuam os 18 IDs acima, exceto trilha-do-bonete, mais cachoeira-dos-tres-tombos: cachoeira-do-poco-fundo; trilha-da-agua-branca; cachoeira-do-gato; cachoeira-da-friagem; praia-da-fome; praia-da-enchova; praia-de-indaiauba; trilha-da-cabecuda-farol; pico-de-sao-sebastiao; mirante-do-coracao; ponto-baleias-sul-sepituba; ponto-baleias-canal; naufragio-aymore; santuario-ilha-das-cabras; naufragio-principe-de-asturias; saco-do-eustaquio; praia-do-poco; piscinas-naturais-do-sul; cachoeira-dos-tres-tombos.

## Validação

Regressão compara o catálogo completo e resultados do resolvedor dos outros 49 pontos com 4609ce1 em seis modos. Para a Trilha do Bonete, exige o início confirmado nos quatro modos de aproximação, continuação trail, ausência de rota nos modos boat/trail e preservação de todo o conteúdo fora de routing. Três Tombos continua sem acesso resolvido e sem verificação do gateway. Teste de navegador confere Maps nos quatro modos e payload do otimizador com Curral + Trilha do Bonete; o serviço externo é simulado, não certifica o caminho real calculado. O teste anterior de gateways/alternativas e exportação offline é repetido como regressão focada.

Nenhuma alteração em main. Nenhum ajuste nos quatro casos preexistentes de unknown/diving.

Resultados: regressão de 50 pontos × 6 modos PASSOU; os dois testes focados de navegador PASSARAM; verificações de sintaxe e git diff --check PASSARAM.
