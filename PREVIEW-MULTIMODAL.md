# Preview multimodal e offline — 2026-09-24

Base: bec1708c714f8514d81d54531a1c2dd9a1c40b61.

Os campos legados modes, roadRoutable e specialAccess permanecem intactos.
routing.accessOptions separa modalidade, gateway, modos de aproximação e trecho final.
Julião e Feiticeira usam os gateways fornecidos pelo usuário em 24/09/2026
para carro/bicicleta; as coordenadas das praias continuam como destinos finais
e marcadores. O resumo e a confirmação avisam que a caminhada final não entra
no tempo calculado. A pé, permanece o roteamento original.

Bonete mantém alternativas independentes: trilha pela Ponta da Sepituba
(coordenada exata do gateway pendente) e barco (embarque a confirmar com o
operador). Nenhum desses pontos é inferido ou enviado à rota de carro.

“Baixar roteiro offline” gera um HTML autossuficiente: dados traduzidos,
coordenadas, avisos de acesso e uma foto local por atração selecionada.
É necessário baixar com rede e guardar o arquivo; ele abre sem rede.
Limites: 10 atrações, 14 MiB de imagens antes de incorporar e 20 MiB no arquivo.
Falha de foto ou excesso de limite cancela a exportação inteira.
O arquivo registra aquele momento e não atualiza automaticamente.
Não há service worker: reabrir o site sem rede, mapas/tiles, otimização,
Google Maps e navegação offline não são garantidos.

Validação focada: npx playwright test tests/multimodal.spec.cjs.
Os testes cobrem coordenadas, destino preservado, rota normal, Bonete,
confirmação, payload de otimização, link Google Maps, HTML sem rede com fotos,
limite de atrações e falha de imagem. A resposta do otimizador é simulada;
a disponibilidade e o trajeto calculado pelo serviço externo não são garantidos.

A auditoria histórica test:audit já falha na base bec1708 porque referencia
localRecommendations, ausente nos arquivos originais que ela carrega.
