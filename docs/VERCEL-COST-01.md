# VERCEL-COST-01 — diagnóstico e decisões para homologação

16/10/2026, America/Sao_Paulo. Base: `96751f40d069d93b09901299898f0b914f63dd68` (PR #8).

## Resultado financeiro

O custo individual do Ilhabela Trip continua **indeterminado**. US$26,61 é valor preliminar da equipe, não despesa reconciliada deste projeto. Não há economia em dólares comprovada nesta entrega. Nenhuma configuração remota foi alterada.

O relatório anterior e suas evidências locais foram consultados. A soma diária de BilledCost divergente não foi reaproveitada como fatura. Não repeti as 30 consultas agregadas: amostras truncadas não permitem atribuir custos por ProjectId. A evidência original está em `audit-vercel-2026-10-16/` no workspace, fora deste PR; os números históricos abaixo não são nova coleta de 30 dias.

## Base e produção

Antes de editar: fetch de origin/main, inspeção de status, ramos remotos e worktrees. As árvores anteriores foram preservadas; esta branch parte limpa do PR #8. O status GitHub Vercel desse SHA aponta sucesso para [o deployment](https://vercel.com/vicgouveia-clouds-projects/ilhabela-guide/CVAD8CAbrQtTYBZxR1ZdxedbSHRr).

`VERCEL-COST-01-evidence.json` registra respostas HTTP e hashes comparados aos blobs Git (não aos finais de linha CRLF locais): home, quatro scripts, Pico e seis páginas pendentes. São verificações pontuais, não repetição da homologação PERF-01. Todas responderam 200 e corresponderam à base publicada.

## Gatilhos comprovados e lacunas

- Snapshot histórico: 763 registros vercel[bot], 424 Preview e 339 Production, 597 SHAs distintos. A diferença de 166 registros em relação aos SHAs **não prova builds redundantes faturados**: SHA pode ter ambientes distintos. O campo ref desse snapshot frequentemente é SHA, portanto não serve para estimar número de branches. github-pages foi excluído.
- Os quatro workflows versionados em main têm filtros restritos: três IMG-01B à branch `feat/img-01b-missing-attraction-photos` e ao próprio arquivo workflow; Mobile journey à branch `fix/mobile-map-choose-trip`, com cancel-in-progress. Dois workflows IMG-01B podem gravar commits na branch antiga. Não são um deploy Vercel por CI; nenhum dos quatro chama Vercel CLI nem hook de deploy.
- A API GitHub lista também workflows históricos ativos e `pages-build-deployment`. A palavra active não comprova execução para todo push. Não desabilitar indiscriminadamente workflows ou Pages.
- Sem vercel.json, .vercelignore, api/ ou functions/ versionados em main. package.json não tem `build`, install/postinstall/prepare; `build:seo` chama seis geradores. HTMLs SEO estão versionados. Isso não comprova o Build/Install Command remoto, framework preset, output, funções implantadas ou máquina.
- A integração Git Vercel é evidenciada pelos statuses, mas sua branch de produção, Deploy Hooks e automações remotas não puderam ser inspecionadas. Não afirmar que há dois pipelines Vercel duplicados.

Nova leitura de projeto com equipe explícita: nome do repositório retornou 404; corrigido para o ID histórico `prj_vHdA1kFW1UkEWT2ZqejmLlD8cman`, também 404. Equipe listada: `team_8jbvYCFvRDJ4atoursfmreaH`, slug `vicgouveia-clouds-projects`. Request ID da consulta pelo ID: `gru1:sfo1::hwk5l-1792176223325-3aa3f9b6d792`. O 404 não prova exclusão do projeto. Não se repetiram chamadas de logs/deployments já documentadas como 403/404; CLI não está no PATH e a credencial local já havia retornado invalidToken na auditoria anterior.

## Cache, output e storage

As respostas amostradas usam `public, max-age=0, must-revalidate`; houve HIT na CDN e MISS inicial em páginas pouco acessadas. Isso não significa cache desligado: o navegador revalida, e a CDN pode servir HIT. Não usar immutable em nomes reutilizados de imagens/scripts sem estratégia de versionamento. Não há métricas para afirmar qual parcela do Origin Transfer vem do site ou calcular ganho de TTL.

A árvore local tem aproximadamente 46 MB de arquivos versionados; isso **não é** armazenamento faturado nem tamanho efetivamente implantado. O antigo `pico-de-sao-sebastiao_verified.jpg` de 6,74 MB segue no repositório; o Pico atual já usa o original autoral e WebPs PERF-01. Não reverter nem repetir PERF-01, nem excluir o arquivo antigo sem rastrear referências e output. Functions Storage da equipe não comprova Functions neste projeto.

## Ações priorizadas (propostas, não ativadas)

| Prioridade | Ação concreta | Evidência / ganho esperado | Condição e validação |
|---|---|---|---|
| P0 | Obter export integral e reconciliar ProjectId, serviço e dia | Impede otimizar rubrica de outro projeto | Export e fatura abaixo; ganho monetário ainda desconhecido |
| P1 | Consolidar correções locais e validar antes de um push por lote revisável | Alta frequência histórica; reduz oportunidades de builds intermediários | Manter preview por PR e produção após homologação; não suprimir validações |
| P1 | Após ler settings/logs, propor Ignored Build Step apenas para alterações exclusivamente documentais/testes sem efeito no output | Pode evitar CPU de pushes sem produto; não quantificado | PR específico e confirmação antes de ativar. Comparar ao último commit implantado; se base ausente/erro, construir. Nunca ignorar imagens, traduções, geradores, sitemap ou páginas. Testar primeiro preview, produção, merge, shallow clone e arquivo renomeado |
| P2 | Confirmar preset Other e comandos mínimos de site estático; remover instalação/build supérfluo somente se log provar | Não há script build; HTML pronto | Verificar que nenhum gerador necessário deixa de rodar. Preservar 50 atrações, rotas, idiomas, SEO e sitemap |
| P2 | Rever retenção após medir GB por projeto e inventariar aliases/rollback necessários | Storage pode crescer com frequência | Aprovação específica: expiração pode apagar histórico. Não copiar automaticamente um default de conta nova |
| P3 | Medir output e tráfego antes de excluir auxiliares ou mudar cache | Menor pacote pode reduzir storage/transfer | PR separado, rastreamento de referências, prévia e testes; benefício não demonstrado ainda |

A documentação de [builds](https://vercel.com/docs/builds) explica publicação por Git e fila por branch; isso é comportamento da plataforma, não prova das configurações desta conta. O [Ignored Build Step](https://vercel.com/kb/guide/how-do-i-use-the-ignored-build-step-field-on-vercel) usa exit 0 para ignorar e 1 para construir; não é equivalente a eliminar todos os limites de deployment.

Em 09/10/2026, a Vercel anunciou [retenção de 30 dias para novas equipes Pro](https://vercel.com/changelog/new-pro-teams-now-default-to-30-day-deployment-retention), com Deployment/Functions Storage a US$0,10/GB-mês. Isso não estabelece a política desta equipe antiga. A documentação antiga de retenção e o changelog recente divergem sobre recuperação; tratar expiração como potencialmente irreversível e confirmar a política exibida antes de qualquer mudança.

## Evidência necessária do responsável

Abrir a equipe `vicgouveia-clouds-projects` no dashboard autenticado e o projeto **ilhabela-guide**. Não enviar tokens, variáveis de ambiente ou números de cartão.

1. **Usage**: selecionar somente ilhabela-guide, janela 16/09/2026 00:00 a 16/10/2026 00:00 São Paulo; capturar filtro, período/fuso, serviços, unidades, Effective e Billed Cost disponíveis. Fazer também visão da equipe para reconciliar. Se UI só oferecer ciclo, manter período exibido e informar a diferença, sem rateio proporcional.
2. **Settings → Billing** da equipe: fatura correspondente e linhas de créditos/descontos/assentos, ocultando dados pessoais. Os itens preliminares somam US$26,30; a diferença de ~US$0,31 em relação a US$26,61 continua sem explicação comprovada.
3. **Project Settings → Build and Deployment**: preset, Root, Install/Build Command, Output, Ignored Build Step, máquina, concorrência e cache; **Settings → Git**: repo, production branch e Deploy Hooks (ocultar URLs secretas dos hooks).
4. **Deployments**: lista com origem Git/CLI/hook, branch, SHA, ambiente e horários nos dias 30/09 e 14/10; build log de um preview e uma produção com comando, duração e cache. Isso permite distinguir pushes, rebuilds, promoções e falhas.
5. **Project Settings → Security → Deployment Retention Policy** e eventual política herdada da equipe: capturas de períodos por estado, uso GB e aliases/rollback que devem permanecer.

Para atribuição financeira, preferir o [export oficial FOCUS JSONL integral](https://vercel.com/changelog/access-billing-usage-cost-data-api), obtido por sessão autenticada do responsável em GET `/v1/billing/charges`, com `teamId=team_8jbvYCFvRDJ4atoursfmreaH`, `from=2026-09-16T03:00:00Z`, `to=2026-10-16T03:00:00Z`. Salvar corpo bruto, não resumo/amostra do conector. Se a API normalizar os limites para dias Pacific, preservar ChargePeriodStart/End reais e registrar divergência. Para conciliação exata pode ser necessário export do ciclo da fatura e diário no mesmo fuso do fornecedor.

Campos necessários: ChargePeriodStart/End, BillingPeriod, BillingCurrency, BilledCost, EffectiveCost, ServiceName, ConsumedQuantity/Unit e Tags.ProjectId/ProjectName. Somar por ID; manter linhas sem projeto separadas, não ratear Pro automaticamente. Confrontar um período combinado com a soma dos mesmos registros diários. [CLI usage](https://vercel.com/docs/cli/usage) oferece resumo JSON útil como conferência, mas não substitui JSONL com tags. Não houve nova instalação ou login nesta entrega.

## Validação e limite desta entrega

Alterações exclusivamente documentais; sem ativação de ignoreCommand, billing, plano, proteção, limite, trigger ou retenção. Evidência HTTP em JSON e revisão do diff são os checks relevantes; suites de aplicação não são necessárias para estes documentos. IMG-02 permanece em outro PR. Merge/publicação dependem de homologação; não habilitar auto-merge.
