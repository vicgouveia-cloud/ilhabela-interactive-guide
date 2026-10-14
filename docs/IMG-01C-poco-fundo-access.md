# IMG-01C — Foto do acesso à Cachoeira do Poço Fundo

**Base de trabalho:** `main` em `993a602def90a6bb7084d75b179711309cc6dc9d`.  
**Branch:** `feat/img-01c-poco-fundo-access`.  
**Liberação:** prévia apenas. Sem promoção para `main`, sem substituição de fotografias aprovadas.

## Fotografia selecionada

- **Atração:** `cachoeira-do-poco-fundo` — Cachoeira do Poço Fundo, comunidade do Bonete.
- **O que está realmente na fotografia:** uma **placa de madeira com indicação “Cachoeira Poço Fundo”** junto da Trilha do Bonete. **A cachoeira não aparece na fotografia.** Essa característica é explicitamente descrita na legenda em PT/EN/FR/ES/HE.
- **Autor:** Jmdelboux, fotografia tirada em **25/04/2017**.
- **Arquivo original:** [Trilha do Poço Fundo.jpg — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Trilha_do_Po%C3%A7o_Fundo.jpg).
- **Licença:** [Creative Commons Attribution–ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/).
- **Georreferência EXIF:** **-23.912594, -45.342669**, registrada na própria página Commons.
- **Arquivo novo derivado:** `assets/images/cachoeira-do-poco-fundo-acesso_commons.webp`, redimensionado e convertido de JPEG para WebP; manter crédito, fonte, licença, proveniência e nota de adaptação.
- **Validação de identificação:** a placa, legível na foto, indica “Cachoeira Poço Fundo”; localização e trilha no Bonete são compatíveis. É o **acesso nomeado**, não prova fotográfica do poço ou das quedas d'água.
- **Limitação editorial:** a imagem representa o percurso de acesso, não a principal paisagem da atração. Pode futuramente ser substituída por foto autorizada da **própria cachoeira**, após conferência. Não alterar a descrição factual da atração por conta desta fotografia.

## Escopo da implementação

Atualizar **exclusivamente** a referência de `cachoeira-do-poco-fundo` em `attraction-photos.js`, a versão de cache em `index.html`, a página estática `/lugares/cachoeira-do-poco-fundo/`, os seus cartões nos hubs `/o-que-fazer/` e `/cachoeiras/`, e os testes referentes às imagens. O componente de modal e o gerador SEO já suportam crédito, licença e legendas localizadas do IMG-01B. Manter o mesmo pipeline, sem nova biblioteca e sem alteração de rotas, coordenadas ou traduções factuais.

## Sete atrações que continuam com placeholder

| ID | Motivo para não substituir nesta etapa |
| --- | --- |
| `praia-do-barreiros` | Galerias específicas identificadas, porém sem autorização/licença de reprodução verificada. |
| `praia-de-santa-tereza` | Galerias com fotógrafos identificados, mas ainda sem licença de incorporação. |
| `praia-da-ponta-azeda` | Fotografias da praia em galerias editoriais sem autorização; foto CC de coral-sol submerso **não serve** como hero da praia. |
| `poco-do-furado` | Fotografia de órgão turístico encontrada sem licença de reprodução validada. |
| `mirante-do-baepi` | Fotos da trilha e do cume não comprovam o ponto do mirante inicial (~15 min da guarita). |
| `mirante-do-morro-da-cruz` | Múltiplos homônimos — fotos licenciadas de Florianópolis são **inadequadas** para Ilhabela. |
| `mirante-dos-barreiros` | Imagens candidatas de mirante, mas sem licença/identificação exata confirmadas. |

Nenhuma imagem desses sete locais será incorporada ou copiada indevidamente. As 49 outras atrações, inclusive Pinto e Pacuíba do IMG-01B, são preservadas.

## Testes e pendências conhecidas da base

Executar testes das 50 páginas, hero, OG/Twitter, `TouristAttraction`, hubs, crédito/fonte, licença, consistência do runtime, integridade dos arquivos, preservação da base e browser mobile/desktop em PT/HE. As falhas globais antigas em `audit-i18n`, roteiro de dois dias e auditoria de roteamento foram reproduzidas no IMG-01A/IMG-01B e devem continuar reportadas como **preexistentes** se reaparecerem. Não corrigi-las dentro do lote.

## Pesquisa futura sem uso automático

- Poço Fundo: outras [duas fotos de Cachoeira Bonete, de Thynane Janaina Sobral de Laia](https://commons.wikimedia.org/wiki/File:Cachoeira_Bonete_-_Ilhabela-SP_02.jpg) têm licença CC BY-SA 4.0, mas não identificam explicitamente a queda como Poço Fundo; precisam confirmação local.
- Mirante do Baepi: [fotografia panorâmica de meio de trilha](https://commons.wikimedia.org/wiki/File:Landscape_of_S%C3%A3o_Sebasti%C3%A3o.jpg) não identifica a parada inicial de contemplação, além de metadados de direitos que precisam análise; não ativar.
- Para os sete demais, buscar consentimento escrito de autores, fotografia própria ou fonte aberta que identifique o local corretamente.
