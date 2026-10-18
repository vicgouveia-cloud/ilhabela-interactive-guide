# SAFE-WATERFALL-01 — Correção factual em três cachoeiras

**Base:** `3c125fad186e8c0954663c4dd207c0ab70ac72e7`.
**Escopo:** somente Cachoeira do Gato, Cachoeira da Friagem e Cachoeira dos Três Tombos, em PT/EN/ES/FR/HE, com páginas estáticas desses IDs.

## Fontes oficiais e decisões editoriais

- **Gato:** Fundação Florestal (Guia de Áreas Protegidas), https://guiadeareasprotegidas.sp.gov.br/trilha/trilha-do-gato/ — percurso 4–5 km; 1h–1h30; moderada; saída Ponta do Gato no Canto do Ribeirão; chegada à baía por barco ou Estrada Parque Castelhanos 4x4. **A queda principal é apenas para contemplação, banho no Poço do Gordo.** Sem posicionar novo gateway de embarque, sem garantir local de passagem viária exato.
- **Friagem:** Fundação Florestal, https://guiadeareasprotegidas.sp.gov.br/trilha/trilha-da-friagem/ — 2–3 km; 1h30–2h; **difícil e com monitoria obrigatória**. Início no fim da Alameda dos Pássaros, depois do trecho urbanizado, pela área de condomínio em Siriúba. Sem cadastrar gateway ainda não verificado, sem garantir acesso irrestrito à área particular.
- **Três Tombos:** Prefeitura, https://www.ilhabela.sp.gov.br/portal/noticias/0/3/16294/cachoeiras-em-ilhabela-conheca-7-opcoes-de-facil-acesso — aproximadamente 720 m ida e volta, baixa dificuldade e **guia local recomendado**. Prefeitura 2024, https://www.ilhabela.sp.gov.br/portal/noticias/0/3/14243/ilhabela-inicia-programa-de-seguranca-em-atrativos-turisticos-e-reabre-terceiro-poco-da-cachoeira-dos-tres-tombos-nesta-terca-feira-3 — devido aos riscos geológicos, o **terceiro poço é apenas para contemplação**, com sinalização e distanciamento do paredão. Não afirmar que todos os poços são rasos ou seguros, nem que é permitido banho sob a terceira queda. Confirmar sempre sinalização local e condições atuais.

## Alterações e limites

- Exatamente 3 registros existentes (50 atrações preservadas) com descrição, destaques, dificuldade/tempo e orientações atualizadas nos cinco idiomas.
- Dois textos de acesso genéricos atualizados com proveniência oficial; rota até o ponto exato permanece pendente. O gateway e acesso já validados dos Três Tombos permanecem **idênticos**.
- 3 páginas estáticas com metadados, OG, Twitter e JSON-LD coerentes com catálogo. Os 47 outros HTMLs permanecem iguais.
- **Sem alteração em fotos, autoria, licença, coordenadas, `routing`, gateways, serviços ou planejador.** A base total de 129 serviços e 68 food (incluindo Porto e Tempero recomendados) é preservada.
- Dos 250 ecoTips históricos, 240 permanecem literalmente iguais; 10 foram substituídos para refletir aviso de segurança de Friagem e Três Tombos. Gato mantém o aviso ambiental existente.
- Revisão de contratos de auditoria mantém comparações completas contra histórico e libera exclusivamente as três exceções fixadas em `tests/fixtures/waterfall-safety-overrides.json`. A auditoria dedicada exige igualdade dos 47 outros atrativos, 129 serviços e rotas/geo/fotos originais.

Não confundir guia de atrativos com laudo atualizado de condições de banho. Não há verificação em campo ou autorização para criar novas coordenadas.
