# SERV-FOOD-01 — Expansão Gastronômica (Lote 1)

## 1. Objetivo
Ampliar o diretório de **Comer e Beber** (`category: 'food'`) com quatro estabelecimentos tradicionais e consolidados em diferentes regiões geográficas de Ilhabela (Norte, Sul e Extremo Norte), preservando integralmente a arquitetura, os 5 atalhos por botão, os 4 filtros de refinamento e os padrões de interface já homologados.

---

## 2. Estabelecimentos Integrados no Lote 1

### 1. Pescadora — Cozinha do Mar (`pescadora-cozinha-do-mar`)
- **Região:** Santa Tereza / Saco do Indaiá (Norte).
- **Endereço Físico:** Av. Força Expedicionária Brasileira, 495 – Praia de Santa Tereza, Ilhabela - SP, CEP 11630-000.
- **Atração de Referência:** `praia-de-santa-tereza` (em frente à praia).
- **Proposta Gastronômica:** Restaurante especializado em peixes frescos e frutos do mar com cardápio autoral assinado pela chef Renata Vanzetto.
- **Forma de Atendimento:** Atendimento presencial habitualmente por ordem de chegada; consulte disponibilidade e horários sazonais antes da visita.
- **Canais Oficiais:**
  - *Telefone:* (12) 3896-2650 (Restaurante) / (12) 3896-1595 (Escritório).
  - *Instagram Oficial:* [@pescadoracozinhadomar](https://www.instagram.com/pescadoracozinhadomar/).
- **Classificação:** `serviceType: ['restaurant']`, `serviceFormats: ['aLaCarte']`, `serviceSpecialties: ['seafood', 'brazilian']`, `serviceOccasions: ['lunch', 'dinner']`.
- **Ações:** Instagram, Telefone, Google Maps.

### 2. Restaurante Nova Iorqui (`restaurante-nova-iorqui`)
- **Região:** Borrifos (Extremo Sul).
- **Endereço Físico:** Av. Governador Mário Covas Júnior, 18322 – Borrifos / Porto dos Frades, Ilhabela - SP.
- **Atração de Referência:** Nenhuma atração isolada imediata; preserva seu endereço real na via costeira sul sem vincular proxy artificial.
- **Proposta Gastronômica:** Tradicional restaurante e bar costeiro em funcionamento desde 1999, famoso pelos pratos de frutos do mar e vista panorâmica para o mar aberto e canal.
- **Horário de Atendimento:** Diariamente, das 12h às 18h (almoço e fim de tarde na costeira; não opera com atendimento noturno regular).
- **Canais Oficiais:**
  - *Telefone:* (12) 3894-1833.
  - *WhatsApp:* (12) 98178-4866.
  - *Instagram Oficial:* [@novaiorquiilhabela](https://www.instagram.com/novaiorquiilhabela/).
  - *Site Oficial:* [novaiorqui.com.br](https://www.novaiorqui.com.br/).
- **Classificação:** `serviceType: ['restaurant', 'bar']`, `serviceFormats: ['aLaCarte', 'snacks']`, `serviceSpecialties: ['seafood', 'brazilian']`, `serviceOccasions: ['lunch', 'afternoon']`.
- **Ações:** Website, Instagram, WhatsApp, Telefone, Google Maps.

### 3. Espaço Tangará (`espaco-tangara`)
- **Região:** Praia do Jabaquara (Extremo Norte).
- **Endereço Físico:** Av. Eng. Martinho Storace, 12717 – Praia do Jabaquara, Ilhabela - SP.
- **Atração de Referência:** `praia-do-jabaquara` (pé na areia na própria praia).
- **Proposta Gastronômica:** Complexo à beira-mar com restaurante de culinária mediterrânea e caiçara, bar de praia com serviço de areia e lounge integrado à natureza.
- **Horário:** Diariamente, das 10h às 17h.
- **Canais Oficiais:**
  - *Telefone / WhatsApp:* (12) 99642-8825.
  - *Instagram Oficial:* [@tangarailhabela](https://www.instagram.com/tangarailhabela/).
  - *Site Oficial:* [tangarailhabela.com.br](https://tangarailhabela.com.br/).
- **Classificação:** `serviceType: ['restaurant', 'bar']`, `serviceFormats: ['aLaCarte', 'snacks']`, `serviceSpecialties: ['seafood', 'brazilian']`, `serviceOccasions: ['lunch', 'afternoon']`.
- **Ações:** Website, Instagram, WhatsApp, Telefone, Google Maps.

### 4. Prainha do Julião Bar & Restaurante (`prainha-do-juliao`)
- **Região:** Praia do Julião (Sul).
- **Endereço Físico:** Av. Riachuelo, 5370 – Praia do Julião, Ilhabela - SP.
- **Atração de Referência:** `praia-do-juliao` (pé na areia na própria praia).
- **Proposta Gastronômica:** Estrutura completa de praia com salão panorâmico, quiosque, bar e lounge. Especializado em peixes artesanais, frutos do mar da ilha, porções e coquetelaria.
- **Canais Oficiais:**
  - *Telefone:* (12) 3894-1867.
  - *WhatsApp:* (12) 99181-0008.
  - *Instagram Oficial:* [@prainhadojuliao](https://www.instagram.com/prainhadojuliao/).
  - *Site Oficial:* [prainhadojuliao.com.br](https://prainhadojuliao.com.br/).
- **Classificação:** `serviceType: ['restaurant', 'bar', 'kiosk']`, `serviceFormats: ['aLaCarte', 'snacks']`, `serviceSpecialties: ['seafood', 'brazilian']`, `serviceOccasions: ['lunch', 'afternoon']`.
- **Ações:** Website, Instagram, WhatsApp, Telefone, Google Maps.

---

## 3. Diretrizes de Apresentação e Imagens
- **Regime de Imagens:** Nenhum dos estabelecimentos conta com fotografia com cessão de direitos autorais homologada para uso editorial próprio. Portanto, o campo `image` foi omitido em todos os registros, empregando o fallback visual com ícone representativo (`restaurant`), sem sobreposição de créditos.
- **Selo "Recomendado":** Nenhum estabelecimento do Lote 1 recebeu selo automático de recomendação (`recommended: false` ou omitido), preservando a neutralidade e o critério canônico do guia.
- **Botões de Ação:** Todos os botões seguem o padrão estrito de dimensões (`h-11`, largura simétrica em `grid-cols-2`, sem `col-span-2`), com ordenação canônica (Rank 0 a 5).
- **Google Maps:** Todos os quatro estabelecimentos possuem endereço comercial físico inequívoco cadastrado, permitindo a exibição segura do botão de rotas direcionado ao endereço real.

---

## 4. Candidatos Pendentes e Justificativas de Diferimento

| Estabelecimento | Região | Motivo do Diferimento |
| :--- | :--- | :--- |
| **Restaurante Dona Izabel** | Bonete | Comunidade isolada off-grid: sem sinal de celular, acesso exclusivo por trilha de 12 km ou mar, pagamento exclusivamente em dinheiro em espécie. Requer lote específico com aviso explícito de conectividade/pagamento. |
| **Quiosque do Alemão** | Castelhanos | Praia oceânica com acesso exclusivo 4x4 ou mar, instabilidade de sinal e pagamento restrito. Diferido para o lote de comunidades tradicionais / off-grid. |
| **Makai Ilhabela** | Vila (Píer) | Localizado sobre concessão no píer público de eventos marítimos; operação com dinâmica sazonal a ser reconfirmada antes da publicação. |
| **Cervejarias e Bares (Lote 2)** | Diversas | Papagaio, Pedra do Sino, Bar SP, Cervejaria Caiçara, Dona Bica, Ben's Bar e Sorveteria Rocha serão organizados no lote subsequente de gastronomia e vida noturna. |
