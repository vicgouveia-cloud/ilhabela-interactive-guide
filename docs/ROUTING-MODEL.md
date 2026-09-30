# Modelo de acesso e roteamento das atrações

## Objetivo

Criar uma fonte estruturada de acesso que possa ser consumida pelo catálogo, páginas das atrações, mapa, Route Planner, Minha Viagem e modo offline.

Este modelo **não substitui** `specs.access`. O texto existente continua sendo a apresentação humana do acesso. O novo objeto deve representar apenas fatos estruturados já confirmados.

## Estrutura proposta

Cada atração poderá receber um objeto `routing`:

```js
routing: {
  modes: ["road", "trail", "boat", "4x4"],
  primaryMode: "road",
  alternatives: [
    {
      mode: "boat",
      gatewayId: "..."
    }
  ],
  gatewayId: "...",
  finalSegment: {
    mode: "walk",
    distanceMeters: null,
    durationMinutes: null
  }
}
```

### Modos

- `road`: acesso terrestre por estrada/rua que pode ser tratado como destino rodoviário.
- `4x4`: trecho que exige veículo 4x4.
- `trail`: acesso que exige caminhada/trilha como trecho relevante.
- `boat`: acesso por embarcação.
- `walk`: somente para o trecho final após um gateway rodoviário ou outro ponto de transição.

Uma atração pode ter mais de um modo. Exemplo conceitual: Bonete pode ter uma alternativa por trilha e outra por barco.

## Gateways

`gatewayId` deve apontar para um ponto de transição previamente confirmado no catálogo de acessos.

O gateway é especialmente importante quando o carro comum não chega à atração. O planejador deve poder orientar:

1. rota até o gateway;
2. modalidade necessária a partir dele;
3. trecho final até a atração.

## Regras de qualidade

1. Não inferir modalidade a partir de texto livre automaticamente.
2. Não transformar `attributes.is4x4` em uma rota 4x4 sem confirmação do significado operacional.
3. Não tratar uma descrição contendo a palavra "barco" como prova de que existe um embarque navegável/confirmado.
4. Não inventar distância ou duração estruturada quando o catálogo não as fornece de forma confiável.
5. Uma atração pode ter múltiplas alternativas.
6. O modo estruturado deve representar o acesso real, não a modalidade de um fornecedor específico.
7. Serviços/operadores permanecem uma camada separada do acesso geográfico.

## Migração

A migração deve ser incremental.

Primeiro entram apenas atrações/gateways cuja modalidade já foi explicitamente validada no projeto. Depois, cada novo conjunto de atrações pode ser migrado e auditado.

Enquanto uma atração não tiver `routing` estruturado, o sistema deve continuar usando seu comportamento atual e não deve assumir uma modalidade.

## Primeiro conjunto já validado no projeto

Os seguintes casos já possuem informação operacional suficiente para serem candidatos à primeira migração:

- Praia do Bonete — trilha ou barco; trilha inicia em Sepituba.
- Baía de Castelhanos — carro comum até a entrada/guardhouse; continuação exige 4x4; também existe alternativa por barco, sem gateway de embarque estruturado confirmado.
- Praia do Julião — acesso rodoviário com pequeno trecho a pé.
- Praia da Feiticeira — acesso rodoviário com pequeno trecho a pé.
- Praia da Figueira — acesso rodoviário com pequeno trecho a pé.

Esses casos devem ser implementados somente depois de revisar os IDs exatos dos pontos no catálogo e manter os gateways como entidades reutilizáveis.

## Critério para o Route Planner

O Route Planner nunca deve receber uma atração como simplesmente "não acessível".

Quando houver gateway confirmado:

**destino final → gateway → modalidade/trecho final**

Quando não houver gateway ou modalidade estruturada:

**usar o comportamento atual e não inventar instruções.**
