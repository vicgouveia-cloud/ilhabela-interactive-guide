# Migração Ilhabela Trip — 03/10/2026

## Produção auditada

- Repositório: vicgouveia-cloud/ilhabela-interactive-guide; base main f23f9bb78c4a8c9823bd10531ea5ae38a4943afa.
- Projeto Vercel ilhabela-guide, prj_vHdA1kFW1UkEWT2ZqejmLlD8cman; equipe vicgouveia-clouds-projects.
- Deploy dpl_Cb8WYo7nbWGdiwufbYYMT4aPnqPe READY, originado do Git/main; domínio antigo ilhabela-guide.vercel.app continua conectado.
- Framework Other, raiz vazia, sem override de build/install/output, Node 24.x. Publicação estática dos arquivos versionados. build:seo é uma tarefa editorial separada, não o build automático de produção.
- Proteção padrão de deploy mantida. Nenhum ajuste de arquitetura, funções, variáveis, segurança ou plano.

## Alterações da branch migration/ilhabela-trip

- Marca pública na home, Serviços, hubs de categorias, descoberta, roteiros e 50 páginas de atrações.
- Marca fixa Ilhabela Trip nos cinco idiomas PT/EN/FR/ES/HE; subtítulos e textos funcionais continuam traduzidos, incluindo RTL.
- Títulos, OG/site_name, Twitter onde já existiam, rodapés e mensagens pré-preenchidas para WhatsApp. Nenhuma mensagem enviada.
- Canonicals, OG URLs, URLs/imagens absolutas do schema TouristAttraction, sitemap (58 URLs) e robots apontam a https://ilhabelatrip.com, preservando paths.
- Templates editoriais atualizados com a mesma marca/domínio; páginas publicadas preservadas, sem regeneração que sobrescreva navegação manual.
- Preservados nomes de prestadores, conteúdo das atrações, IDs, rotas, chaves de armazenamento, pacote, nome interno do projeto e X-Client-Id do roteador.

## DNS e transição

Na Cloudflare foram criados dois CNAME, TTL Auto, DNS only:

| Nome | Destino |
| --- | --- |
| @ | a84429515eaf7349.vercel-dns-017.com |
| www | a84429515eaf7349.vercel-dns-017.com |

Nameservers preservados: earl.ns.cloudflare.com e kara.ns.cloudflare.com. Ambos os novos hosts foram adicionados ao mesmo projeto Vercel e conectados à Production. Domínio raiz sem redirect para www. Domínio antigo continua servindo produção.

Não promover a branch até validar DNS público, HTTPS do domínio raiz, respostas 200 das rotas e o preview desta branch. A emissão do certificado raiz está sendo acompanhada; www já respondeu 200 via HTTPS durante a configuração.

## Testes e limitações

- Instalação limpa: 0 vulnerabilidades reportadas.
- Auditorias de 50 páginas de atrações, catálogo de descoberta e 58 URLs do sitemap: passaram.
- Smoke de navegação e dos cinco idiomas: passou localmente e na produção antiga; verificação desktop/mobile após mudança de domínio em andamento.
- build:seo falha por accessModes não definido no gerador de descoberta.
- test:audit falha por localRecommendations ausente no teste de idiomas.
- test:seo falha por expectativa de analytics em categorias; auditorias individuais de routing encontram unknown/diving e roteiro 2 dias tem expectativas antigas.
- Todas essas falhas foram reproduzidas no commit original em checkout separado. Não corrigidas nesta migração. A suíte antiga de navegador fixa 40 atrações, enquanto o catálogo atual tem 50; não serve como certificação completa do estado atual.
- Build logs pelo conector indisponíveis: ferramenta retornou not found. Estado READY confirmado pelo conector, GitHub e painel.

## Riscos e próximos passos antes de main

1. Canonical novo não pode ir para produção enquanto o HTTPS raiz não estiver saudável.
2. Favoritos, idioma e roteiro usam armazenamento por origem: dados salvos no domínio antigo não aparecem automaticamente no novo. O antigo permanece acessível durante a transição.
3. Revisar preview e somente então decidir promoção para main. A promoção não foi autorizada nesta etapa.
4. Após publicação e nova validação, preparar redirect por host do domínio antigo para o novo, 308, preservando caminho e query. Testar atrações, serviços, roteiros e links ?spot/&add=trip; não aplicar redirect global que afete preview.
5. Somente depois da validação, redirecionar www para raiz para consolidar o host. Não remover o domínio antigo.
6. Revalidar canonical/OG/schema/sitemap/robots em produção após publicar. Enviar novo sitemap e mudança de endereço no Search Console quando houver acesso e autorização.
7. Rollback: antes dos redirects, reverter o commit de marca/domínio ou usar Instant Rollback da Vercel. Manter ambos os domínios associados ao projeto durante o diagnóstico.
