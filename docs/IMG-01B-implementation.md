# IMG-01B — Primeira implementação das atrações sem fotos

**Base confirmada:** `main` em `eb8fd9cde593348e2e8199c2b1cd4279dd71acbf` (2026-10-14).  
**Branch isolada:** `feat/img-01b-missing-attraction-photos`.  
**Publicação:** nenhuma; somente prévia até autorização do responsável.

## Duas fotos selecionadas com licença e identificação

| ID | Fotografia incorporada | Autor / fonte | Licença | Modificações | Observação de identificação |
| --- | --- | --- | --- | --- | --- |
| `praia-do-pinto` | `assets/images/praia-do-pinto_commons.webp` | Kathryn elizabeth loba collins · [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Praia_do_pinto_ilhabela_1957388_4024779116035_1551329815_n.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Conversão de JPEG para WebP, sem alteração do enquadramento | Foto identificada como Praia do Pinto, Ilhabela, realizada a partir do mar em 2012. |
| `praia-da-pacuiba` | `assets/images/praia-da-pacuiba-costao_commons.webp` | João D'Andretta · [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Parque_Estadual_de_Ilhabela_-_Jo%C3%A3o_Paulo_Marques_DAndretta_(10).jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Redimensionamento para até 1280×720 e conversão JPEG → WebP | Vista aérea do **costão rochoso** da região de Pacuíba, foto georreferenciada em -23.725257, -45.317138; **não mostra a faixa de areia**. |

O arquivo WebP derivado é disponibilizado sob a mesma licença CC BY-SA 4.0 indicada nas fontes. Autoria, origem, licença, proveniência e adaptação estão registradas em `attraction-photos.js` e aparecem também no detalhe e na página estática da atração. Quando necessário, a legenda identifica corretamente o **assunto da fotografia**, sem modificar a descrição turística do local.

## Oito atrações mantidas como placeholder

| ID | Situação |
| --- | --- |
| `praia-do-barreiros` | Fotografia candidata encontrada, mas sem permissão de reprodução comprovada. |
| `praia-de-santa-tereza` | Fotografia candidata encontrada, mas sem permissão de reprodução comprovada. |
| `praia-da-ponta-azeda` | Fotografia candidata encontrada, mas sem permissão de reprodução comprovada. |
| `poco-do-furado` | Fotografia identificada em fonte turística, mas sem direitos comprovados. |
| `mirante-do-baepi` | Foto da trilha/cume não identifica necessariamente o mirante inicial. |
| `mirante-do-morro-da-cruz` | Fotografias candidatas exigem checagem de local e autorização. |
| `mirante-dos-barreiros` | Fotografias candidatas exigem confirmação do enquadramento e licença. |
| `cachoeira-do-poco-fundo` | Fotografias com licença CC da região do Bonete, mas **sem comprovação** de que são exatamente Poço Fundo. |

Não substituir por foto genérica, de praia vizinha ou de outra cachoeira. As imagens aprovadas anteriormente não são substituídas. A fotografia inadequada do `naufragio-principe-de-asturias` permanece fora deste lote.

## Escopo técnico

- Biblioteca compartilhada `attraction-photos.js` como fonte dos dois novos registros.
- Renderização do modal: legenda do assunto em PT/EN/FR/ES/HE, fonte, crédito e licença.
- Páginas estáticas das duas atrações: hero, `og:image`, Twitter Card, schema `TouristAttraction`, origem e licença.
- Hubs `/o-que-fazer/` e `/praias/`: cards das atrações com o arquivo correto.
- Nenhuma alteração de tradução factual, coordenadas, acessos, rotas, IDs, dados ou fotografias já existentes.
- Arquivos gerados são limitados aos dois HTMLs de atrações e aos dois hubs necessários.
- Sem publicação nem merge na `main`; testar prévia antes de eventual promoção.

## Pendências de teste preexistentes

Na base `eb8fd9c`, o teste do roteiro de 2 dias, a auditoria de roteamento de alguns modos especiais e a auditoria oficial de i18n têm falhas documentadas no IMG-01A. **Não alterar o produto ou os testes dessas áreas para acomodar esta implementação.** Reportar separadamente das verificações específicas de imagens.
