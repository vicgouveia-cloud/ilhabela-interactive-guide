# 🏝️ Ilhabela Interactive Guide

> Guia Turístico Interativo e Moderno do Arquipélago de Ilhabela (São Paulo, Brasil) com mapa dinâmico em Leaflet.js, catálogo completo de praias, cachoeiras, picos, trilhas, reservas marinhas, módulo de contratação de guias credenciados e suporte a 5 idiomas (incluindo Hebraico RTL).

---

## ✨ Principais Recursos

- 🗺️ **Mapa Interativo (Leaflet.js):**
  - Camadas alternáveis: Mapa Turístico (*CartoDB Voyager*), Satélite HD (*Esri World Imagery*) e Topográfico (*OpenTopoMap*).
  - Navegação limitada ao arquipélago de Ilhabela, com botão de recentralização e escala métrica.
  - Marcadores compactos com ícones temáticos por categoria e halo exibido somente na interação.
  - Hover no desktop e toque no celular com prévia rápida em card translúcido (*Glassmorphism*).
- 📍 **Catálogo com 38 Atrações Detalhadas:**
  - **10 Praias:** Bonete, Castelhanos, Fome, Julião, Curral, Feiticeira, Jabaquara, Armação, Veloso, Siriúba, Enchova, Indaiaúba.
  - **7 Cachoeiras:** Paquetá (piscina de borda infinita natural), Gato (40m), Três Tombos, Laje (tobogã de 30m), Toca (tobogã de 50m e alambique), Veloso e Friagem.
  - **3 Grandes Trilhas:** Trilha Tradicional do Bonete (12km), Trilha da Água Branca (auto-guiada com 5 poços) e Trilha do Farol da Ponta da Cabeçuda.
  - **3 Picos & Mirantes:** Pico do Baepi (1.048m, vista 360°), Pico de São Sebastião (1.378m, ponto mais alto da ilha) e Mirante do Coração de Castelhanos.
  - **2 Santuários de Baleias & Golfinhos:** Ponta da Sepituba (migração de Jubartes) e Rota dos Botos e Golfinhos do Canal.
  - **3 Pontos de Mergulho & Naufrágios:** Santuário Ecológico da Ilha das Cabras (Estátua de Netuno submersa), Naufrágio Príncipe de Astúrias e Vapor Aymoré.
  - **Novos roteiros acessíveis e culturais:** Jabaquara, Feiticeira, Pedra do Sino, Perequê, Praia do Poço, Saco do Eustáquio, Piscinas Naturais do Sul, Centro Histórico, Fazenda Engenho D’Água e Mirante do Piúva.
  - **Categorias próprias de Cultura & História e Mirantes**, com marcadores circulares dedicados.
- 📋 **Ficha Técnica Individual:** Dificuldade (*Fácil, Moderado, Difícil, Extremo*), distância, duração, elevação, tipo de acesso, condições marítimas, quiosques, dicas ecológicas, dicas contra borrachudos e botão **Como Chegar** integrado ao Google Maps.
- 📷 **Fotografia Curada:** imagens reais conferidas por atração, galerias dos destinos principais e crédito com acesso à fonte original.
- 🧭 **Contratação de Guias Credenciados (CADASTUR):** Catálogo de especialistas locais com especialidades, idiomas, cálculo dinâmico de orçamento e agendamento instantâneo via WhatsApp.
- 🌐 **Suporte Multilíngue a 5 Idiomas:**
  - 🇧🇷 Português (PT)
  - 🇺🇸 English (EN)
  - 🇫🇷 Français (FR)
  - 🇪🇸 Español (ES)
  - 🇮🇱 עברית (HE) — com suporte a alinhamento e leitura da direita para a esquerda (*RTL*).
- 🎨 **Design Tropical Modernism & Glassmorphism:** Cores inspiradas no tema *Litoral Esmeralda* (Azul Profundo `#003345`, Verde Esmeralda `#3b6934`, Areia `#fbf9f4`).

---

## 🚀 Como Executar Localmente

Como o projeto é construído em HTML5, Tailwind CSS e Vanilla JavaScript sem dependências pesadas de build:

1. Clone o repositório:
   ```bash
   git clone https://github.com/vicgouveia-cloud/ilhabela-interactive-guide.git
   cd ilhabela-interactive-guide
   ```

2. Abra o arquivo `index.html` diretamente no seu navegador ou execute um servidor web local:
   ```bash
   # Com Python
   python -m http.server 3000

   # Com Node.js
   npx serve .
   ```

3. Acesse `http://localhost:3000` no seu navegador.

---

## 📁 Estrutura de Arquivos

```
ilhabela-interactive-guide/
├── index.html        # Estrutura principal da aplicação SPA
├── styles.css        # Estilização personalizada, Glassmorphism, pins animados e RTL
├── data.js           # Banco de dados com os 28 pontos turísticos e guias CADASTUR
├── translations.js   # Dicionário de tradução nos 5 idiomas (PT, EN, FR, ES, HE)
├── app.js            # Lógica do mapa Leaflet, filtros combinados, modais e WhatsApp
├── .gitignore        # Arquivos ignorados pelo controle de versão
└── README.md         # Documentação completa do projeto
```

---

## 🌿 Preservação Ambiental

Ilhabela abriga o maior trecho contínuo de Mata Atlântica insular preservada do Brasil. Ao visitar o arquipélago:
- Recolha todo o seu lixo e traga-o de volta.
- Não recolha conchas, corais ou artefatos de naufrágios.
- Respeite a cultura das comunidades tradicionais caiçaras.
- Contrate sempre guias locais credenciados no CADASTUR.

---

## 📄 Licença

Distribuído sob a licença MIT.
