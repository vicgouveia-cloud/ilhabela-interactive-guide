# SERV-MOBILITY-01 — Grupo de Mobilidade e Transportes em Serviços Práticos

## 1. Objetivo
Estruturar o grupo de **Mobilidade e Transportes** dentro da categoria existente `essentials` (*Serviços práticos*), sem poluir as abas principais de navegação mobile e preservando a integridade dos 115 serviços consolidados.

## 2. Diferenciação de Natureza dos Serviços
- **Serviços Funcionais de Deslocamento:** Agrupados exclusivamente em `essentials` (de um ponto A a um ponto B).
- **Passeios Turísticos e Ecoturismo:** Permanecem estritamente em `tour` (escunas, lanchas, flexboats, passeios 4x4 e trilhas guiadas).
- **Serviços Comerciais:** Locadoras com ponto físico (carros, motos, bikes) e traslados executivos privativos.
- **Utilidade Pública e Regulados:** Travessia de Balsa estadual, Ônibus municipal, Aquabus, Pontos oficiais de táxi e Informativo de transporte por aplicativo.

## 3. Fontes Oficiais e Operadores Auditados
1. **Travessia de Balsa São Sebastião–Ilhabela (`travessia-balsa-ilhabela`):**
   - *Operador:* Secretaria de Meio Ambiente, Infraestrutura e Logística do Estado de SP (SEMIL) / Departamento Hidroviário (DH).
   - *Canais Oficiais:* [semil.sp.gov.br/dh/](https://semil.sp.gov.br/dh/) | Telefone: 0800 77 33 711.
   - *Informações Úteis:* Fila em tempo real, travessia de pedestres gratuita, veículos tarifados e agendamento "Hora Marcada".

2. **Ônibus Municipal — Expresso Fênix (`onibus-municipal-expresso-fenix`):**
   - *Concessionária:* Expresso Fênix Viação Ltda.
   - *Canais Oficiais:* [Portal da Prefeitura de Ilhabela](https://www.ilhabela.sp.gov.br/portal/servicos/1004/horario-onibus-municipal) | App *CittaMobi* (horários em tempo real) | Bilhetagem eletrônica *Fênix Fácil*.
   - *Ressalva Tarifária:* Não expor valores fixos de tarifas na interface, evitando desatualização.

3. **Aquabus Ilhabela (`aquabus-ilhabela`):**
   - *Operação:* Prefeitura Municipal de Ilhabela / Sistema Aquaviário Urbano.
   - *Canais Oficiais:* [Prefeitura de Ilhabela — Horários Aquabus](https://www.ilhabela.sp.gov.br/portal/servicos/1122/horario-do-aquabus).
   - *Pontos Atendidos:* Píeres da Praia Grande, Balsa, Perequê, Engenho D'Água, Vila e Ponta Azeda (sujeito às condições meteorológicas e de mar).

4. **Pontos Oficiais de Táxi:**
   - *Ponto da Balsa (Barra Velha):* Terminal de desembarque da balsa. Telefone público de referência: (12) 3895-8222.
   - *Ponto da Vila (Centro Histórico):* Praça Coronel Julião, s/n. Telefone público de referência: (12) 3896-5000.
   - *Regulamentação:* Veículos homologados pela Prefeitura de Ilhabela, operando por taxímetro regulamentado.

5. **Transporte por Aplicativo — Orientações (`transporte-por-aplicativo-info`):**
   - *Natureza:* Ficha informativa de **Utilidade Pública**.
   - *Fato Operacional:* A frota de motoristas cadastrados na Uber e 99 em Ilhabela é extremamente reduzida. Turistas frequentemente enfrentam cancelamentos e ausência de carros para retornos de praias do sul, norte ou após o pôr do sol.
   - *Orientação ao Turista:* Não depender exclusivamente de aplicativos; priorizar táxis oficiais ou ônibus municipais.

6. **Locadoras de Veículos (Carros e Motos):**
   - *Jessé Locadora de Carros e Motos (`jesse-locadora-veiculos`):* Av. Princesa Isabel, 2756, Barra Velha. WhatsApp: (12) 99736-8387. Site: [jesselocadora.com.br](https://jesselocadora.com.br/).
   - *NOVA Aluguel de Carros (`nova-aluguel-de-carros`):* Av. Princesa Isabel, 2808, Barra Velha. Tel/WhatsApp: (12) 3307-7077. Site: [novaaluguel.com.br](https://www.novaaluguel.com.br/).
   - *Localiza São Sebastião (`localiza-sao-sebastiao`):* Av. Guarda Mor Lobo Viana, 1052, Porto Grande, São Sebastião (apoio à chegada antes da travessia).

7. **Locadoras de Bicicletas:**
   - *Caiçara Beach (`caicara-beach-bike`):* Perequê (orla da ciclovia).
   - *Webtur (`webtur-ilhabela`):* Vila.
   - *Easy Aluguel de Bike (`easy-aluguel-de-bike`):* Saco da Capela. Tel: (12) 99746-7700.

8. **Transfers Executivos Funcionais:**
   - *Transfer Executivo GRU (`transfer-executivo-gru-ilhabela`):* Translados rodoviários privativos e executivos entre aeroportos de São Paulo (GRU/CGH) e Ilhabela. WhatsApp: (11) 91694-7035. Site: [transferexecutivo.com.br](https://www.transferexecutivo.com.br/).

## 4. Regime de Imagens e Padronização de Ações
- Zero fotografias arbitrárias de internet ou redes sociais. Apresentação limpa com ícones SVG sem sobreposição de créditos.
- Ações padronizadas em `grid-cols-2` simétrico com ordenação canônica (Rank 0 a 5).
- Suporte total aos 5 idiomas (PT, EN, ES, FR, HE) e direcionalidade RTL.
