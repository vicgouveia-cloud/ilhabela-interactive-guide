# SERV-COWORK-FOOD-01 — ampliação controlada do diretório

## Objetivo
Melhorar a descoberta de restaurantes, bares, quiosques e cafeterias usando os **60 estabelecimentos da categoria Comer e beber já cadastrados**, sem duplicar registros. Incluir três espaços de trabalho compartilhado em **Serviços práticos → Coworking**, com cadastros próprios e sem qualquer selo de Recomendado.

## Fonte oficial de cada novo serviço
- **Vila Hub:** https://hosteldavila.com.br/pt/ilhabela/coworking — estações de trabalho e salas de reunião no Hostel da Vila, Rua São Benedito, 202 (Centro Histórico). Associado internamente ao grupo, mas ficha independente. A versão inglesa apresenta preços de Day Use diferentes da versão em português; **não apresentar preços nem horários no guia** sem confirmação.
- **Blue Cowork Ilhabela:** https://coworkilhabela.com/ ; endereço e contato: https://coworkilhabela.com/contato/ — Praça Elvira Catarina Storace, 12 - CJ 03, Perequê. Site anuncia estação de trabalho, reunião, uso avulso e mensal. Instagram @coworkilhabela, WhatsApp (12) 99716-2601.
- **Reserva Ilhabela — Coworking:** https://reservailhabela.com.br/ — a seção Coworking descreve trabalho compartilhado, Wi-Fi e recepção de visitantes pela plataforma WOBA. Endereço: Rua José Lins do Rêgo, 29, Feiticeira, corroborado por https://portal.woba.com.br/portal/coworking/space/reserva-ilha-bela--ilhabela . Disponibilidade sujeita a confirmação com o estabelecimento.

## Imagens e direitos
**Sem fotografias novas neste lote.** Imagens publicadas nos sites dos estabelecimentos não significam autorização para reprodução em diretório independente. Evitar imagens ilustrativas de outros locais. Nenhuma licença aberta presumida.

## Arquitetura e resguardos
- Reaproveitar o campo `serviceType` e os filtros existentes em Comer e beber. Apenas acrescentar atalhos de tipo, vinculados ao seletor já existente e traduzidos nos cinco idiomas.
- Em Serviços práticos, acrescentar a opção de filtro `coworking` alimentada pela atividade já registrada nas fichas.
- Manter Portinho Passeios, La Gloria House, Floresta Bar e Recanto de Gaya com recomendações e visuais existentes; os coworkings **não são recomendados automaticamente**.
- Sem adicionar Passeios 4x4, Mergulho, novos restaurantes não verificados, imagens sem autorização ou produtos/serviços não anunciados oficialmente.
- Sem alteração em atrações, localização do mapa, roteiros, SEO global, botões e contato institucional.

## Validação
Auditoria do catálogo e Playwright com atalhos, seletor sincronizado, coworking, inexistência de duplicatas e idiomas PT/EN/ES/FR/HE nos viewports 320, 390 e 1440 pixels. PR isolado sem promoção automática para `main`.
