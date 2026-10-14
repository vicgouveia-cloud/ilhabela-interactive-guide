# IMG-01B — Fontes candidatas para fotografias realmente ausentes

**Situação:** pesquisa editorial iniciada em 2026-10-14. **Somente documentação:** esta branch não inclui fotos copiadas, alterações em catálogo, HTML ou deploy em produção.

**Base:** `main` em `eb8fd9cde593348e2e8199c2b1cd4279dd71acbf` após publicação do IMG-01A.

## Critérios

1. Usar somente imagem que mostre o lugar/assunto identificado, sem confusão de praias ou homônimos.
2. Identificar autor, fonte e licença/consentimento **antes** de baixar e publicar. Fonte pública não equivale a licença aberta.
3. Validar escolha visual e enquadramento com o responsável pelo projeto; priorizar foto da própria praia/queda d'água, não uma vista genérica ou apenas a região.
4. Reconciliar imagem principal, galeria, OG/Twitter, JSON-LD, hubs, páginas estáticas e crédito pelo módulo compartilhado do IMG-01A; não duplicar uma nova biblioteca.
5. Não substituir fotografias verificadas/aprovadas, nem alterar origens, roteamento, textos e SEO além das referências da nova foto.
6. A foto do naufrágio pode ser histórica do navio, **legendada como imagem histórica anterior ao naufrágio**, nunca como registro subaquático do sítio.

## Prioridade 1 — Sem fotografia real

| ID | Local | Fonte encontrada | Direitos / adequação | Ação |
| --- | --- | --- | --- | --- |
| `praia-do-barreiros` | Praia do Barreiros | https://arquipelagoilhabela.com.br/praia-do-barreiros/ | Galeria com fotos atribuídas a Fernanda Lupo e Márcio Bortolusso; nenhuma licença de reprodução foi identificada. | Solicitar licença/autorização ou localizar alternativa livre específica. |
| `praia-de-santa-tereza` | Praia de Santa Tereza | https://arquipelagoilhabela.com.br/praia-de-santa-teresa/ | Galeria com fotos atribuídas a Márcio Bortolusso e Fernanda Lupo; grafia Teresa/Tereza. Sem licença reutilizável confirmada. | Solicitar autorização ou foto CC específica da orla dos pescadores. |
| `praia-do-pinto` | Praia do Pinto | https://arquipelagoilhabela.com.br/praia-do-pinto/ | Galeria com fotos atribuídas a Márcio Bortolusso e Fernanda Lupo. Sem autorização identificada. | Solicitar autorização ou alternativa livre, não usar fotos de praias vizinhas. |
| `praia-da-ponta-azeda` | Praia da Ponta Azeda | https://arquipelagoilhabela.com.br/praia-da-ponta-azeda/ | Galeria atribuída a Fernanda Lupo / Márcio Bortolusso; exige autorização. Foto de coral-sol no Commons não representa adequadamente a praia como hero. | Solicitar uso de foto aberta da orla ou fotografar localmente. |
| `praia-da-pacuiba` | Praia da Pacuíba | https://commons.wikimedia.org/wiki/File:Parque_Estadual_de_Ilhabela_-_Jo%C3%A3o_Paulo_Marques_DAndretta_(10).jpg | **Candidata com licença CC BY-SA 4.0.** Fotografia aérea do **costão rochoso** da Pacuíba por João D'Andretta; coordenadas publicadas ~-23.725257, -45.317138. Pode não mostrar a faixa de areia. | Revisão visual antes de usar como foto principal; crédito, link da licença e indicação de adaptação obrigatórios. |
| `poco-do-furado` | Poço do Furado | https://visiteilhabela.com.br/lugar/parque-municipal-das-cachoeiras/ | Página com fotografia identificada como “Poço do Furado”, crédito Turismo Ilhabela; licença de reprodução não identificada. | Consultar titular/órgão e garantir que foto represente o poço, não outra queda do parque. |
| `cachoeira-do-poco-fundo` | Cachoeira do Poço Fundo | https://www.ilhabela.com.br/cachoeiras/cachoeira-do-poco-fundo | Fonte específica confirma localização junto ao Bonete e apresenta conteúdo audiovisual; licença para extrair foto não confirmada. | Buscar foto da cachoeira **do Bonete** com autorização; não confundir com Cachoeira do Poço de outra região ou Cachoeira do Porto. |

## Outras correções prioritárias

| ID | Local | Fonte encontrada | Direitos / adequação | Ação |
| --- | --- | --- | --- | --- |
| `mirante-do-morro-da-cruz` | Mirante do Morro da Cruz | https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15401/10-mirantes-de-ilhabela-para-apreciar-a-vista-do-arquipelago/ | Página da Prefeitura identifica o mirante certo. Pesquisas no Commons retornaram imagens do Morro da Cruz de **Florianópolis** e de outras cidades: **rejeitadas**. Autorização para fotos oficiais não confirmada. | Solicitar/obter foto do mirante **em Ilhabela**, checando local e direitos. |
| `naufragio-principe-de-asturias` | Naufrágio Príncipe de Astúrias | https://commons.wikimedia.org/wiki/File:Vapor_Pr%C3%ADncipe_de_Asturias_en_pruebas_de_mar.JPG | **Candidata em domínio público segundo Commons**: fotografia histórica de 1914 mostrando o navio durante provas de mar no Rio Clyde. Não mostra destroços submersos; porém é precisamente o navio correto, ao contrário do farol indevidamente reutilizado. | Conferir imagem e status de direitos no Brasil; se adotada, crédito/contexto “Imagem histórica do navio, 1914; não é fotografia do naufrágio”. |

## Outras referências úteis, sem direitos liberados

- Pacuíba — galeria local com autoria identificada (Fernanda Lupo / Márcio Bortolusso): https://arquipelagoilhabela.com.br/praia-da-pacuiba/
- Pacuíba — vista alternativa do costão rochoso sob CC BY-SA 4.0: https://commons.wikimedia.org/wiki/File:Parque_Estadual_de_Ilhabela_-_Jo%C3%A3o_Paulo_Marques_DAndretta_(7).jpg
- Príncipe de Astúrias — foto histórica alternativa em Commons (cartão-postal de 1914, autoria desconhecida, indicado domínio público; resolução 550×353): https://commons.wikimedia.org/wiki/File:Vapor_Principe_de_Asturias.jpg
- Mirante do Morro da Cruz — o nome é ambíguo. Não reutilizar fotos do mirante homônimo em Florianópolis.
- **Não usar automaticamente** fotos de Tripadvisor, bancos pagos, sites de guias ou páginas públicas. A identificação do lugar não concede direitos de reprodução.

## Próximos passos, sem publicação automática

1. Revisar visualmente as candidatas livres de **Pacuíba** e **Príncipe de Astúrias** com o responsável pelo projeto.
2. Obter fotografias com autorização/documentação para os outros locais (especialmente Barreiros, Santa Tereza, Pinto e Ponta Azeda).
3. Aplicar apenas fotografias aprovadas em uma branch de implementação IMG-01B, incorporando referência, crédito, fonte, licença e, quando necessário, adaptação.
4. Executar auditorias e testes, visualizar preview em mobile e desktop, conferir 5 idiomas/RTL e solicitar liberação separada de produção.

Esta pesquisa não constitui confirmação de licença em sites que apenas exibem fotografias.
