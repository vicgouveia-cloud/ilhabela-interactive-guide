# Auditoria do fallback de acesso

Base: cc204ec4922c12be1cfc7e7a967eec6f2e83b374 (origin/main confirmado em 01/10/2026). A main local estava em 7b51ccce; a branch foi criada diretamente da base solicitada, sem mover main.

## Resultado

Não existe mais mapa legado de coordenadas em multimodal.js. O comentário inicial estava desatualizado. Ainda há dois caminhos de compatibilidade: geração de accessOptions a partir de gatewayId/finalSegment ou modes, e resolvePlannerAccess retornando spot.coords quando não encontra uma opção verificada.

Bonete e Castelhanos já possuem opções explícitas: preservadas integralmente. Suas alternativas por barco continuam com gateway nulo.

## Já estruturáveis com o catálogo existente

15 pontos usam gatewayId e finalSegment estruturados, mas suas accessOptions ainda são derivadas em multimodal.js: praia-do-juliao, cachoeira-da-laje, cachoeira-da-toca, cachoeira-do-veloso, cachoeira-do-paqueta, pico-do-baepi, praia-do-jabaquara, praia-da-feiticeira, praia-do-barreiros, praia-de-santa-tereza, praia-do-pinto, praia-da-ponta-azeda, praia-da-pacuiba, poco-do-furado, mirante-do-baepi. Não exigem novas coordenadas para explicitar essas opções. Não foram remigrados nesta mudança.

13 destinos rodoviários diretos dependem do fallback do resolvedor para spot.coords: praia-do-curral, praia-da-armacao, praia-do-veloso, praia-da-siriuba, praia-do-sino, centro-historico-vila, fazenda-engenho-dagua, mirante-do-piuva, praia-do-pereque, praia-grande, praia-do-portinho, mirante-do-morro-da-cruz, mirante-dos-barreiros. Também já têm metadados suficientes para opções diretas.

## Precisam de dados confiáveis

19 pontos não têm gateway nem opção explícita: praia-da-fome, praia-da-enchova, praia-de-indaiauba, cachoeira-do-gato, cachoeira-da-friagem, trilha-da-agua-branca, trilha-do-bonete, trilha-da-cabecuda-farol, pico-de-sao-sebastiao, mirante-do-coracao, ponto-baleias-sul-sepituba, ponto-baleias-canal, naufragio-aymore, santuario-ilha-das-cabras, naufragio-principe-de-asturias, saco-do-eustaquio, praia-do-poco, piscinas-naturais-do-sul, cachoeira-do-poco-fundo. modes gera opções sem gateway e sem aproximação permitida.

Destes, o fallback pedestre ainda retorna o pin em 13 casos: Fome, Enchova, Indaiaúba, Gato, Friagem, Água Branca, Trilha do Bonete, Cabeçuda/Farol, Coração, baleias sul/Sepituba, Poço, Piscinas Naturais do Sul e Poço Fundo. Baleias sul/Sepituba também retorna o pin para bicicleta por conter road. Isso não comprova um acesso/trilha: comportamento preservado para evitar ampliar esta mudança, pendência explícita de validação. Os outros seis permanecem sem acesso resolvido. Para experiências náuticas, o dado necessário é encontro/embarque confirmado pelo operador; para trilhas, início e percurso confiáveis.

## Três Tombos: quarentena especial

O gateway já existia na base, com coordenadas e trecho estimado de 400 m/10 min. Não foi criado nem corrigido um gateway. O registro recebeu verified:false; a hidratação respeita esse sinal, e o resolvedor retorna null em todos os modos antes de tentar o pin. Coordenadas e estimativas ficam apenas como registros herdados, sem aprovação para navegação. Exige fonte confiável para acesso, coordenadas e trecho final antes de qualquer reativação.

## Validação

node tests/audit-routing-fallback.cjs compara 50 atrações em seis modos com a base e confere integralmente routing dos outros 49 pontos. PASSOU.

node --check multimodal.js: PASSOU.

node tests/audit-routing-data.cjs: falha preexistente: pico-de-sao-sebastiao usa unknown; naufragio-aymore, santuario-ilha-das-cabras e naufragio-principe-de-asturias usam diving, ausentes da lista permitida pelo teste. Nenhum destes dados foi alterado.

Escopo deliberado: corrigir a falsa verificação de Três Tombos e documentar o inventário exato, sem alterar outros acessos validados. Nenhuma promoção para main.

Playwright focado: gateway routing, confirmation, separate Bonete alternatives and offline file — PASSOU (1 teste).

