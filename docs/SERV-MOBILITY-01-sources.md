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
   - *Canais Oficiais:* [semil.sp.gov.br/travessias/](https://semil.sp.gov.br/travessias/) | Telefone: 0800 77 33 711.
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
   - *Ponto da Balsa (Barra Velha):* Terminal de desembarque da balsa, Av. Princesa Isabel, s/n.
   - *Ponto da Vila (Centro Histórico):* Praça Coronel Julião, s/n.
   - *Regulamentação e Suporte:* Veículos homologados pela Prefeitura de Ilhabela, operando por taxímetro regulamentado. Embarque presencial direto nos pontos. O telefone 0800 770 5221 é divulgado pela Prefeitura como contato de Ponto de Táxi na listagem de Telefones Úteis do município ([ilhabela.sp.gov.br/portal/telefones/5/0/0](https://www.ilhabela.sp.gov.br/portal/telefones/5/0/0)). Não é atribuído como linha fixa individual dos pontos nem como atendimento administrativo da Prefeitura.
   - *Localização e Google Maps:* Por se tratarem de pontos de parada na via pública sem perfil comercial pontual inequívoco no Google Maps (onde uma busca genérica de texto poderia encaminhar o visitante a outros estabelecimentos comerciais vizinhos), o botão do Google Maps foi omitido em ambos os pontos, garantindo a exibição clara do endereço oficial e do canal telefônico municipal.

5. **Transporte por Aplicativo — Orientações (`transporte-por-aplicativo-info`):**
   - *Natureza:* Ficha informativa de **Utilidade Pública**.
   - *Fonte Oficial:* [Prefeitura de Ilhabela — Operadoras cadastradas](https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15717/) (publicada em setembro de 2025).
   - *Regulamentação Municipal:* O serviço é regulamentado pela Prefeitura de Ilhabela. Na publicação oficial de setembro de 2025, constavam como operadoras autorizadas no município: Fast Go Drive, Leva Eu, Woptin, Legal Car Ilha, Tô de Carona, Ilhapass e BoraBora.
   - *Contexto de Woptin e Exemplos:* O card informativo apresenta exemplos com base na relação de setembro de 2025 (como Fast Go Drive e Leva Eu), sem afirmar situação regulatória permanente, uma vez que credenciamentos municipais passam por revisões administrativas periódicas. A ausência de menção direta a Woptin na descrição resumida do card é uma decisão editorial de concisão textual, e não indica ausência de credenciamento na fonte oficial de referência. Já o aplicativo Caiçara Driver não constava da relação municipal de setembro de 2025.
   - *Orientação ao Usuário:* Recomenda-se consultar a disponibilidade de viagens com antecedência tanto para a ida quanto para a volta, inclusive ao utilizar aplicativos convencionais como Uber e 99.

6. **Locadoras de Veículos (Carros e Motos):**
   - *Jessé Locadora de Carros e Motos (`jesse-locadora-veiculos`):* Av. Princesa Isabel, 2756, Barra Velha. WhatsApp: (12) 99736-8387. Site: [jesselocadora.com.br](https://jesselocadora.com.br/). Endereço comercial físico próprio em Barra Velha, com botão Google Maps preservado e sem proximidade artificial a Perequê.
   - *NOVA Aluguel de Carros (`nova-aluguel-de-carros`):* Av. Princesa Isabel, 2808, Barra Velha. Tel/WhatsApp: (12) 3307-7077. Site: [novaaluguel.com.br](https://www.novaaluguel.com.br/). Endereço comercial físico próprio em Barra Velha, com botão Google Maps preservado e sem proximidade artificial a Perequê.
   - *Localiza São Sebastião (`localiza-sao-sebastiao`):* Av. Guarda Mor Lobo Viana, 1052, Porto Grande, São Sebastião (apoio à chegada antes da travessia).

7. **Locadoras de Bicicletas:**
   - *Caiçara Beach (`caicara-beach-bike`):* Perequê (orla da ciclovia).
   - *Webtur (`webtur-ilhabela`):* Vila.
   - *Easy Aluguel de Bike (`easy-aluguel-de-bike`):* Saco da Capela. Tel: (12) 99746-7700.

8. **Transfers Executivos Funcionais:**
   - *Transfer Executivo GRU (`transfer-executivo-gru-ilhabela`):* Translados rodoviários privativos e executivos entre aeroportos de São Paulo (GRU/CGH) e Ilhabela. WhatsApp: (11) 91694-7035. Site: [transferexecutivo.com.br](https://www.transferexecutivo.com.br/). Sem guichê físico pontual em Ilhabela (botão Google Maps omitido).

## 4. Regime de Imagens, Botões de Ação e Localização
- Zero fotografias arbitrárias de internet ou redes sociais. Apresentação limpa com ícones SVG sem sobreposição de créditos.
- Ações padronizadas em `grid-cols-2` simétrico com ordenação canônica (Rank 0 a 5).
- Botão Google Maps mantido exclusivamente para serviços comerciais com ponto de atendimento físico comprovado (locadoras e travessia da balsa). Omitido onde não há destino pontual inequívoco (`ponto-de-taxi-balsa`, `ponto-de-taxi-vila`) ou guichê físico (`transporte-por-aplicativo-info`, `transfer-executivo-gru-ilhabela`, `onibus-municipal-expresso-fenix`, `aquabus-ilhabela`), evitando desvios ou direcionamento a estabelecimentos vizinhos.
- Remoção do artifício `nearSpotId: 'praia-do-pereque'` em serviços situados em Barra Velha ou linhas de transporte municipal, preservando a integridade dos dados sem inventar coordenadas. Os serviços não apresentam distâncias falsas e permanecem integrados ao diretório.
- Suporte total aos 5 idiomas (PT, EN, ES, FR, HE) e direcionalidade RTL.
