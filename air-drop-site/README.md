# Air Drop — site completo para editar e publicar

Site em português, responsivo, com conteúdo no HTML e interações em JavaScript. Inclui início, cinco páginas de serviços, garantia, privacidade, termos e página 404. A versão pronta está em `dist/`.

**Não há mensalidade de plataforma exigida pelo código.** A hospedagem, o domínio e os serviços externos escolhidos são de sua responsabilidade. Não há banco de dados nem painel administrativo: o orçamento é montado no navegador e encaminhado para o WhatsApp.

## Comece por aqui

1. Extraia o ZIP para uma pasta do seu computador.
2. Edite **`src/site.config.mjs`** em um editor de texto, como o VS Code. Os campos têm comentários em português.
3. Com Node.js 20 ou superior instalado, abra o terminal nessa pasta e execute:

```bash
npm run build
npm run dev
```

Abra **http://localhost:3000** no navegador. Encerre com `Ctrl+C`. Não é necessário executar `npm install`: o projeto não usa dependências externas.

Sempre que alterar `src/`, rode `npm run build` e atualize a página. Alterações nos arquivos CSS/JS de `dist/assets/` podem ser vistas ao atualizar a página. Abrir o HTML por duplo clique não é a forma de visualizar: o site utiliza rotas absolutas e módulos JavaScript.

## O que preencher

| Campo em `src/site.config.mjs` | Conteúdo |
| --- | --- |
| `url` | Domínio final em HTTPS, sem caminho nem barra final |
| `contact.whatsapp` | Número real com `55`, DDD e número, somente dígitos |
| `contact.email` / `privacyEmail` | Contatos reais de atendimento e privacidade |
| `business.legalName` / `cnpj` | Identificação real da operação; CNPJ se aplicável |
| `business.city` / `state` / `hours` | Cidade, estado e horários reais |
| `business.publicAddress` | Endereço comercial aplicável, sem inventar uma loja |
| `business.hasWalkInStore` | Mantenha `false` se não recebe clientes em loja |
| `delivery.areas` | Lista real de bairros/cidades cobertos |
| `delivery.fee` / `conditions` | Deslocamento e condições de realização no local |
| `warranty.duration` / `coverage` / `conditions` | Prazo, cobertura e condições efetivamente oferecidos |
| `quality` | Características das peças e compromissos que você efetivamente cumpre |
| `logo` | Caminho do seu arquivo local, explicado abaixo |
| `publishReady` | Passe para `true` após revisar e completar os dados |

Exemplo do formato da lista de regiões, apenas para demonstrar a sintaxe:

```js
areas: ['Nome de um bairro atendido', 'Nome de outro bairro atendido'],
```

**Os dados não fornecidos ficaram vazios de propósito.** O site não usa telefone fictício, avaliação inventada, promessa de peça original ou prazo de garantia presumido. Sem número configurado, o formulário informa a indisponibilidade e não simula um envio. O mapa e a medição vêm desativados.

As políticas de atendimento e privacidade são textos iniciais para esta implementação. Complete a identificação, as práticas de conservação dos dados, a operação de hospedagem e as condições comerciais para corresponderem ao seu negócio. Não publique compromissos que você não cumpre.

## Aplicar o seu logo

O anexo do logo não estava disponível neste pedido. A versão inicial usa apenas uma assinatura tipográfica provisória, sem tentar recriar o camaleão.

1. Salve seu logo como `dist/assets/img/logo.png` ou `logo.svg`, de preferência com fundo transparente.
2. Configure `logo: '/assets/img/logo.png'`.
3. Execute `npm run build`.

Use nomes de arquivo sem espaços. A cor principal pode ser trocada em `dist/assets/css/styles.css`, na variável `--accent`. A imagem de reparo é ilustrativa e está identificada assim na página. Você pode substituí-la por uma foto própria mantendo o arquivo `reparo-em-casa.webp`, ou alterar a referência no template.

## Google Maps preparado

O projeto integra a **Maps Embed API**, com carregamento após o visitante clicar em “Ver região no mapa”. É um mapa interativo, sem solicitar geolocalização do visitante. No modo `view`, mostra a região sem simular um ponto comercial ou desenhar um limite de cobertura.

1. Ative a Maps Embed API no seu projeto Google Cloud e crie a chave conforme a documentação oficial.
2. Restrinja a chave à Maps Embed API e aos domínios autorizados, como `https://seudominio.com.br/*` e, se usado, `https://www.seudominio.com.br/*`.
3. Configure:

```js
maps: {
  enabled: true,
  apiKey: 'COLE_SUA_CHAVE_RESTRITA',
  mode: 'view',
  center: 'LATITUDE,LONGITUDE', // Substitua por números da sua região real.
  zoom: 12,
  query: '',
  linkUrl: '',
  title: 'Região de atendimento da Air Drop'
},
```

Se quiser exibir um ponto real, use `mode: 'place'` e preencha `query` com o endereço ou `place_id:...`. A chave usada em mapa no navegador é pública; as restrições de domínio e API são essenciais. Não coloque credenciais de servidor nesse arquivo.

Fontes: [incorporar mapa](https://developers.google.com/maps/documentation/embed/embedding-map), [criar e restringir a chave](https://developers.google.com/maps/documentation/embed/get-api-key).

## Medição opcional do Google Ads

Configure `tracking.googleAdsId` e `tracking.whatsappConversionLabel` com os identificadores da conversão criada na sua conta. A tag só é carregada após o visitante aceitar; recusar mantém a medição desativada. A preferência dura até 180 dias neste navegador.

O evento representa **clique para abrir o WhatsApp**. Não comprova conversa iniciada, mensagem enviada, orçamento respondido ou venda. Os campos do formulário não são enviados como parâmetros à tag. O site não implementa conversões avançadas. Quando o visitante recusa após ter aceitado, a página recarrega para encerrar a tag em memória; isso não elimina dados anteriormente recebidos por terceiros.

Teste a tag e a ação de conversão no domínio final. Navegadores, bloqueadores e redirecionamentos podem impedir a medição. [Documentação de consentimento do Google](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic).

## Publicar em uma VPS

### Opção A — Nginx ou painel de hospedagem

1. Preencha os dados e passe `publishReady` para `true`.
2. Execute `npm run check:publish`, `npm run build` e `npm run check`.
3. Envie **o conteúdo de `dist/`** para a pasta pública do seu domínio. Não envie o projeto inteiro para a raiz pública.
4. Configure o domínio/DNS e HTTPS no provedor. O exemplo `deploy/nginx.conf` usa `/var/www/airdrop` e deve receber o seu domínio. Ele é um modelo HTTP; instale o certificado e configure HTTPS antes de anunciar.
5. Preserve as subpastas de serviços e políticas, que contêm seus próprios `index.html`.

### Opção B — Docker Compose com Caddy

Com Docker e Docker Compose instalados na VPS, copie o projeto, copie `.env.example` para `.env` e preencha `DOMAIN` com o domínio real. Aponte o DNS para a VPS e libere as portas 80 e 443. Após gerar `dist/`, execute na pasta do projeto:

```bash
docker compose up -d
```

O Caddy serve somente `dist/` e solicita HTTPS quando o domínio está corretamente configurado. Para atualizar, gere novamente os arquivos e envie a nova `dist/`; os arquivos são montados diretamente. Não é preciso executar Node.js para servir o site em produção. O exemplo atende ao domínio informado; acrescente outros hostnames ao Caddyfile se precisar deles.

Referência: [Caddy com Docker Compose](https://caddyserver.com/docs/running#docker-compose).

## Estrutura

```text
src/site.config.mjs       Dados, serviços e perguntas frequentes
src/templates.mjs        HTML das páginas e componentes compartilhados
src/helpers.mjs          Escape, WhatsApp e configuração do mapa
src/icons.mjs            Ícones funcionais
src/validation.mjs       Verificação dos dados antes da publicação
scripts/build.mjs        Gera HTML, config pública, robots e sitemap
scripts/check.mjs        Verifica rotas, arquivos, sintaxe e fluxos básicos
scripts/readiness.mjs    Lista dados pendentes antes da publicação
scripts/serve.mjs        Visualização local
dist/                    Site pronto para enviar à hospedagem
dist/assets/css/         Estilos e pontos de adaptação para celular
dist/assets/js/          Menu, filtros, WhatsApp, mapa e consentimento
dist/assets/img/         Imagens e espaço para seu logo
deploy/                  Exemplos Nginx e Caddy
docs/                    Observações sobre Google Ads e imagem
```

O conteúdo principal já está no HTML, inclusive sem JavaScript. Existem títulos, descrições, metadados sociais de texto e dados estruturados sem avaliações falsas. `robots.txt` permite rastreamento. O sitemap é gerado quando o domínio é preenchido. Enquanto `publishReady` for `false`, as páginas trazem `noindex`; isso é um estado de edição, não uma técnica de aprovação no Ads.

Para conferir o código, execute `npm run check`. Antes de publicar, execute `npm run check:publish`. Essa última verificação vai apontar os campos pendentes da entrega inicial. Ela não confirma elegibilidade no Google Ads.

## Verificação final no seu domínio

Abra início, serviços, garantia e privacidade no celular e no computador. Teste o número real do WhatsApp, o orçamento com acentos, a chave real do Maps e a conversão, se ativada. Confirme que nenhum dado de exemplo foi publicado. As integrações externas dependem das credenciais e da configuração que você acrescentar.
