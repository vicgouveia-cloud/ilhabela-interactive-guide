# Correção técnica de regressões — 18/10/2026

Base confirmada: `6c48fd8aef9d0ed8fb85ea40175e3cc497aa5c2f`. Checkout técnico criado limpo nessa revisão. Relatório `SERV-PORTO-TEMPERO.md` lido integralmente antes das alterações. Produção inicial: projeto Vercel existente `ilhabela-guide` (`prj_vHdA1kFW1UkEWT2ZqejmLlD8cman`), deployment `dpl_FnCmtAivuTxnCqVRq9odandU2SQ3`, READY no mesmo SHA.

## Diagnóstico e correção

- **Minha viagem:** reproduzido o timeout desktop na linha 31 do teste original. O link desktop navegava para `/?view=trip`; ao fechar o planner, o parâmetro permanecia e a recarga reabria a sobreposição. O link agora abre a mesma interface em memória usada no mobile. Há um único inicializador do deep link. Fechar remove somente `view=trip`, preservando os demais parâmetros e o fragmento. Abrir foca um controle visível; fechar devolve o foco ao acionador. A navegação inferior móvel existente continua sendo a saída móvel.
- **Serviços:** os cinco casos globais passam a exigir Portinho Passeios primeiro; La Gloria House continua primeiro em hospedagem. Mantida a comparação integral da ordem recommended → featured → ordem de origem. Maps é exigido uma vez e por último em cards com localização; é proibido nos sem local físico. URL, ordem, dimensões, alvos de toque e ausência de Rudá continuam validados.
- **RTL:** reproduzida isoladamente a tentativa de clicar na seta invisível a 390 px. O CSS aprovado oculta setas abaixo de 768 px. O teste verifica a rolagem nativa móvel por gesto horizontal e clique normal nas setas desktop, em PT e HE, mantendo testes de idioma, overflow e menus.
- **Auditorias:** analytics de categoria normalizado apenas para CRLF/LF, mantendo execução e verificação dos eventos. Fotografias históricas preservam as asserções específicas de fonte, licença, legenda, binário e páginas; a preservação geral passa a usar o catálogo aprovado com 34 entradas e zero placeholders. Rotas reconhecem unknown apenas no destino pendente existente e diving apenas nos três destinos aprovados; Bonete pedestrian deve retornar null. Os 250 ecoTips continuam comparados à base histórica original; catálogo traduzido e páginas usam a base aprovada.
- **Execução futura:** `npm test` executa todas as 25 auditorias, sem parar na primeira falha, e só inicia Playwright quando todas passam. Nenhuma auditoria foi excluída e nenhum teste foi ignorado.

## Evidência e limites

Antes das correções: 25 auditorias executadas, 19 passaram e as seis legadas falharam. Planner original: 1 passou (390), 1 falhou (1440). RTL original: 1 falhou por seta oculta. Duas execuções diagnósticas simultâneas compartilharam o diretório padrão de artefatos e produziram erros adicionais de gravação; as causas de UI constam nos registros de clique. As execuções posteriores usam diretórios separados.

Após os primeiros ajustes: 37/37 casos de prioridade/ações passaram; 2/2 do fluxo original do planner passaram; 1/1 de layout/rolagem RTL passou; 25/25 auditorias passaram.

A primeira execução completa foi interrompida para incluir o ajuste final de foco e os 15 novos cenários na descoberta. Não é contabilizada como suíte aprovada. Uma matriz intermediária teve 13 aprovados e 2 erros de conexão local durante a troca do servidor de teste; seus resultados não substituem a execução completa final.

Validação completa final e resultado da publicação: pendentes, registrar apenas após conclusão. Check Vercel é resultado de build/deploy e não representa a execução dos testes locais.

Nenhum catálogo, imagem, licença, ficha de restaurante, roteiro, coordenada ou biblioteca Leaflet foi alterado nesta correção. PRs históricos de imagens preservados.

## Achados adicionais da varredura completa

A varredura diagnóstica de 467 cenários terminou com **439 aprovados e 28 falhas** (19,2 min). Ela ocorreu durante os ajustes e não é uma validação de release. As falhas adicionais envolveram idioma padrão não declarado, guia antigo inexistente (`guide-marina-silva`), favoritos substituídos pela seleção única de viagem (refactor aprovado `065a02b`), controles dentro de Organizar, contato removido do modal, aviso de localização agora inline, seleção de prestadores e fallback offline.

Os contratos agora usam o guia canônico `guide-trilhabela`, seleção persistida em `ilhabela_trip`, abertura real de Organizar, foco circular no primeiro/último controle visível e alerta inline de localização. O cenário offline exige aviso explícito e ausência de imagem/script quando a foto não está disponível, mantendo o limite de dez lugares e todos os dados do destino. Perfis de mergulho verificam exatamente os nove prestadores atuais e suas capacidades verificadas. Fixtures sintéticas de elegibilidade são isoladas do catálogo real em cada página de teste.

**Segunda falha real corrigida:** `renderPlannerRoutingPanel` só incluía o aviso de cobertura parcial dentro de estatísticas de permanência (`visit.covered`). Quando nenhuma atração tinha permanência conhecida, o aviso desaparecia. O rótulo de aproximação para 4x4 também dependia dessas estatísticas. Os avisos agora pertencem às estatísticas da rota, visíveis com os detalhes fechados, independentemente dos tempos de permanência; a duração de visita não é inventada. Acrescentados 15 cenários em PT/EN/ES/FR/HE e 320/390/1440 px. Os 15 passaram na execução dedicada.

O ambiente padrão Playwright é explicitamente PT-BR para as asserções literais legadas. Os testes específicos de detecção de idioma continuam sobrescrevendo as preferências do navegador, incluindo fallback alemão→inglês. Todos os cenários que mudam idioma continuam validando a seleção e RTL. Dois contratos de texto em inglês também foram reproduzidos contra a produção intacta.

Validação final iniciada sobre `17a8d61` sem alterações de fonte/testes durante a execução: **482 cenários em 45 arquivos**, precedidos pelas **25 auditorias**. Resultado ainda pendente.

A tentativa seguinte de 482 cenários foi interrompida ao detectar uma única falha de precisão geométrica (`26.99999237060547` contra `27` px), sem mudança visual de tamanho. A comparação passou a tolerar menos de 0,0005 px, mantendo as larguras aprovadas de 27 px no mobile e 36 px no desktop. A execução definitiva usa código e testes imutáveis de `bbfed029daddc2e4ff371c756bcf8c56c321e0d7`; o relatório será completado com o resultado real antes de qualquer promoção.

## Resultado final local

Execução integral `npm test -- --workers=4 --output=test-results-verified`, sobre `bbfed029daddc2e4ff371c756bcf8c56c321e0d7`:

- **25 auditorias executadas, 25 aprovadas, zero falhas**, incluindo as seis históricas.
- **482 cenários Playwright executados em 45 arquivos, 482 aprovados, zero falhas, zero ignorados, sem retries**. Duração Playwright: **14,7 min**.
- Incluídos lifecycle Leaflet, Storage com leitura/escrita negadas, serviços, reserva, navegação, foco, RTL e matrizes de 320/390/1440 px nos cinco idiomas.
- Os 30 novos cenários passaram: 15 de navegação/foco/deep link e 15 de avisos visíveis de estimativa.
- Os 129 serviços/68 food, as duas recomendações Porto/Tempero, logotipos oficiais, contatos, traduções, coordenadas, imagens/licenças, 250 ecoTips e módulos offline/rotas estão preservados.

Os arquivos de implementação e teste permaneceram sem alterações durante essa rodada. O commit posterior deste relatório altera somente documentação. A verificação do SHA da main, deploy READY e testes em produção será registrada no corpo do PR #30 após a promoção autorizada, para não exigir um novo deploy apenas para anotar o SHA do próprio deploy. O check Vercel permanece separado dos resultados locais acima.
