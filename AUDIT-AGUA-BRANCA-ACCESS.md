# Trilha da Água Branca — acesso confirmado

Base: main em 45a8618a5ff1f37e90c772fa72b2ddee4472b360. Branch: fix/agua-branca-validated-access.

Confirmação do usuário nesta etapa: carro comum até a entrada/guarita do Parque Estadual, estacionamento ali e continuação a pé pela trilha. Gateway já existente: castelhanos-park-entrance, coordenadas -23.839249751545807, -45.36002116037754.

Somente trilha-da-agua-branca recebeu routing explícito em additional-spots.js. A aproximação segue o padrão de acessos rodoviários existentes: auto, 4x4, bicycle e pedestrian terminam no gateway; finalMode é trail e vehicleRequirement é null. Não exige 4x4 para chegar à guarita, não envia carro à trilha e não pressupõe acesso até Castelhanos. Distância/duração do trecho final permanecem nulas. Pin editorial, textos, imagens e estimativas da atração não foram alterados.

Não há alteração em planner.js, multimodal.js, data.js ou no gateway compartilhado. Gato, Friagem, Bonete, Castelhanos e demais pontos permanecem iguais à base. Três Tombos permanece bloqueado. Nenhum tratamento novo de unknown/diving.

Validação focada: audit-routing-fallback.cjs compara integralmente os outros 49 cadastros e os resultados do resolvedor em seis modos com a base; verifica o gateway da Água Branca, continuação por trilha e preservação do conteúdo fora de routing. Teste de navegador confirma que carro comum abre Google Maps até a guarita e mostra aviso do trecho final a pé; teste existente do Bonete verifica Maps e otimizador como regressão. Serviços de roteamento externos não têm o percurso real certificado pelos testes.

Sem promoção para main e sem publicação desta branch neste lote.

Resultados: regressão de 50 pontos em seis modos PASSOU; dois testes de navegador PASSARAM; sintaxe e git diff --check PASSARAM.
