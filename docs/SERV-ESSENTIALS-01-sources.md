# Documentação de Fontes e Arquitetura — SVC-ESSENTIALS-01
## Mobilidade Independente + Reorganização dos Serviços Práticos + Fast Go Drive

**Data:** 17 de outubro de 2026  
**Branch:** `feat/services-mobility-standalone-essentials`  
**Base:** `origin/main` após PR #22 (`565d20ebf05926328e87bc416c650737311bb0cf`)

---

### 1. Resumo da Entrega e Inventário Canônico

O diretório de serviços do **Ilhabela Trip** passa de 124 para **125 serviços únicos**, distribuídos da seguinte forma:

| Categoria | Registros Anteriores | Registros Atuais | Modificações Realizadas |
| :--- | :---: | :---: | :--- |
| **Mobilidade e transportes** (`mobility`) | 0 *(embutido)* | **14** | Promovida a categoria autônoma de primeiro nível; 13 registros migrados de `essentials` + inclusão de **Fast Go Drive**. |
| **Serviços práticos** (`essentials`) | 32 *(com mobilidade)* | **19** | Remoção de mobilidade; reorganização em 7 grupos funcionais autênticos. |
| **Comer e beber** (`food`) | 64 | **64** | Integralmente preservado (incluindo os 4 estabelecimentos homologados no PR #22). |
| **Passeios e agências** (`tour`) | 12 | **12** | Integralmente preservado. |
| **Hospedagem** (`stay`) | 10 | **10** | Integralmente preservado. |
| **Mergulho** (`diving`) | 5 | **5** | Integralmente preservado. |
| **Experiências e lazer** (`experience`) | 1 | **1** | Integralmente preservado (Aula de Yoga — Hostel da Vila). |
| **Total Geral** | **124** | **125** | **Zero duplicações de IDs, zero registros órfãos ou não traduzidos.** |

---

### 2. Mobilidade e Transportes como Categoria de Primeiro Nível

1. **Promoção estrutural:**
   - Categoria canônica: `category: 'mobility'`.
   - Rotulagem em 5 idiomas (`translations.js` / chave `servicesMobility`):
     - PT: *Mobilidade e transportes*
     - EN: *Mobility & transport*
     - FR: *Mobilité et transports*
     - ES: *Movilidad y transportes*
     - HE: *תחבורה והתניידות*
   - Ícone vetorial padrão do card: `directions_car` (quando o estabelecimento não possui fotografia licenciada própria).

2. **Hierarquia de interface simplificada (sem dropdown intermediário):**
   - Ao selecionar **Mobilidade e transportes** no primeiro dropdown (`#services-category-select`), é apresentado diretamente o seletor **Modalidade de transporte** (`#services-mobility-filter`), sem dropdowns intermediários nem botões rápidos redundantes.
   - Preservadas as 8 modalidades e a opção global:
     1. `all`: *Todos os transportes* (14 serviços)
     2. `taxi`: *Táxis* (2 serviços: Balsa e Vila)
     3. `bus`: *Ônibus* (1 serviço: Ônibus Municipal Expresso Fênix)
     4. `ferry`: *Balsa* (1 serviço: Travessia de Balsa São Sebastião–Ilhabela)
     5. `aquabus`: *Aquabus* (1 serviço: Aquabus Ilhabela)
     6. `car-rental`: *Aluguel de carros e motos* (3 serviços: Jessé Locadora, Localiza, NOVA)
     7. `bike-rental`: *Aluguel de bicicletas* (3 serviços: Caiçara Beach, Webtur, Easy Aluguel de Bike)
     8. `transfer`: *Transfers* (1 serviço: Transfer Executivo Aeroportos e Litoral)
     9. `app-transport`: *Transporte por aplicativo* (2 serviços: Fast Go Drive e Transporte por Aplicativo — Orientações)

---

### 3. Cadastro do Fast Go Drive

- **Identificação:** `id: 'fast-go-drive'`, `name: 'Fast Go Drive'`
- **Categoria:** `category: 'mobility'`
- **Modalidade:** `practicalType: 'app-transport'`, `activities: ['app-transport']`
- **Classificação editorial:** `recommended: true` (apresenta o badge editorial "Recomendado" / "Recommended" / "מומלץ")
- **Ativo visual e direitos da marca:**
  - Imagem do card: `assets/images/fast-go-drive_oficial.webp` (~7.8 KB).
  - Fonte de obtenção: Logotipo institucional oficial publicado no portal institucional `https://fastgodrive.com.br/` (arquivo original: `wp-content/uploads/2022/09/cropped-DAD36BF4-A549-43BF-B50B-B42524099E12.png`).
  - Tratamento técnico: Enquadramento centralizado em tela `960x320` com fundo `#050505` (cor do logotipo original) e escala proporcional (`targetHeight = 220px`). Esse tratamento preserva a legibilidade da marca e dos textos "Fast Go Drive" e "Ilhabela" sem distorção nem cortes no contêiner `h-28` (`object-cover`) do card, mantendo o contraste e a visibilidade dos badges ("Transporte por aplicativo" e "Recomendado").
  - Situação de direitos: Uso editorial e institucional para identificação da empresa cadastrada no guia, com atribuição `Fast Go Drive`.
- **Contatos e canais verificados:**
  - WhatsApp: `(12) 98187-9636` (`12981879636`) — ação direta com mensagem de abertura pré-formatada.
  - Telefone comercial: `(12) 98187-9636` (`phone: '12981879636'`) com formatação bidirecional `dir="ltr"`.
  - Instagram oficial: `@fastgodrive_` (`https://www.instagram.com/fastgodrive_/`).
  - Site oficial: `https://fastgodrive.com.br/`.
  - Aplicativo Passageiro (iOS): `https://apps.apple.com/br/app/fast-go-drive-passageiro/id6443738440` (App Store ID 6443738440).
  - Aplicativo Passageiro (Android): `https://play.google.com/store/apps/details?id=br.pass.appfastgodriver` (Google Play Store).
- **Localização e Georreferenciamento:**
  - Descrição de abrangência: `Circulação municipal em toda a ilha e região`.
  - Sem ponto fixo presencial / endereço físico exclusivo para balcão de atendimento na ilha.
  - **Omissão intencional do botão de mapa (`Google Maps`):** incluído na lista de exclusão `hasPhysicalLocation` para evitar buscas automáticas ou roteamentos para estabelecimentos incorretos.
  - Ausência de `nearSpotId` proxy link para não gerar distâncias falsas nos filtros de proximidade.

---

### 4. Reorganização dos Serviços Práticos (`essentials`)

Com a extração da mobilidade, os **19 serviços práticos** restantes foram organizados em 7 grupos funcionais autênticos, eliminando grupos vazios e classificações artificiais:

1. **Saúde e emergência (`health`):** 4 registros
   - Hospital Municipal Governador Mário Covas Jr. (`hospital-municipal-mario-covas`)
   - Farma Ponte — Vila (`farma-ponte-vila`)
   - Farma Ponte — Barra Velha (`farma-ponte-barra-velha`)
   - Drogaria São Paulo — Perequê (`drogaria-sao-paulo-pereque`)
2. **Coworking (`coworking`):** 3 registros
   - Vila Hub (`vila-hub-coworking`)
   - Blue Cowork Ilhabela (`blue-cowork-ilhabela`)
   - Reserva Ilhabela — Coworking (`reserva-ilhabela-coworking`)
3. **Lavanderias (`laundry`):** 3 registros
   - Bubble Box Lavanderia Self Service (`bubble-box-pereque`)
   - Lavanderia Lavaki Ilhabela 24h (`lavaki-barra-velha`)
   - Lavanderia Lavô Ilhabela Sul (`lavo-ilhabela-sul`)
4. **Apoio náutico e marinas (`nautical`):** 2 registros
   - Marina Porto Ilhabela (`marina-porto-ilhabela`)
   - Centro Náutico Ilhabela (`centro-nautico-ilhabela`)
5. **Supermercados e conveniência (`supermarket`):** 4 registros
   - Supermercado do Frade — Perequê (`supermercado-do-frade-pereque`)
   - Supermercados Minimaxx (`supermercados-minimaxx`)
   - Supermercado Colina — Barra Velha (`supermercado-colina-barra-velha`)
   - Adega da Mica (`adega-da-mica-curral`)
6. **Informações turísticas (`tourist-info`):** 2 registros
   - Centro de Informações Turísticas — Barra Velha (`cit-barra-velha`)
   - Centro de Informações Turísticas — Vila (`cit-vila`)
7. **Aluguel de equipamentos (`equipment`):** 1 registro
   - BL3 Armação — Aluguel de Equipamentos (`bl3-armacao-rental`)

---

### 5. Matriz de Testes Executados

1. **Auditorias unitárias em Node.js:**
   - `tests/audit-essentials-mobility-standalone.cjs` — **Aprovado** (125 serviços, 14 mobilidade, 19 práticos, Fast Go Drive e integridade das 5 línguas).
   - `tests/audit-mobility-discovery.cjs` — **Aprovado**.
   - `tests/audit-cowork-food-discovery.cjs` — **Aprovado**.
   - `tests/audit-hostel-vila-services.cjs` — **Aprovado**.
   - `tests/audit-food-batch1.cjs` — **Aprovado**.
2. **Testes de ponta a ponta (Playwright E2E):**
   - `tests/services-mobility-discovery.spec.cjs` — **15 testes aprovados** (320px, 390px, 1440px em PT, EN, ES, FR, HE).
   - `tests/services-cowork-food-discovery.spec.cjs` — **15 testes aprovados**.
   - `tests/services-food-expansion-batch1.spec.cjs` — **15 testes aprovados**.
   - `tests/services-global-actions.spec.cjs` — **15 testes aprovados**.
   - `tests/services-recommendation-badges.spec.cjs` — **15 testes aprovados**.
   - `tests/services-hostel-vila.spec.cjs` — **5 testes aprovados**.
   - `tests/services-recanto-gaya.spec.cjs` — **15 testes aprovados**.
3. **Evidências visuais geradas:**
   - `svc_essentials_01_mobility_desktop_pt.png` (1440px)
   - `svc_essentials_01_mobility_mobile_pt.png` (390px)
   - `svc_essentials_01_mobility_desktop_he.png` (1440px RTL)
   - `svc_essentials_01_essentials_desktop_pt.png` (1440px)
   - `svc_essentials_01_essentials_mobile_pt.png` (390px)
