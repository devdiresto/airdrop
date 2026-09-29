/**
 * EDITE AQUI OS DADOS DO SITE e execute: npm run build
 * Campos vazios não inventam informações da empresa.
 * Este arquivo gera HTML estático, acessível também sem JavaScript.
 * Todos os valores enviados ao navegador são PÚBLICOS. Não coloque segredos.
 */
export const site = {
  brand: 'Air Drop',
  tagline: 'Reparo de iPhone a domicílio',
  // URL final com HTTPS, sem barra no fim. Ex.: https://seudominio.com.br
  url: '',
  // Deixe false enquanto editar. Só marque true após revisar os dados reais.
  publishReady: false,
  // Copie seu logo para dist/assets/img/logo.png e informe /assets/img/logo.png.
  // Enquanto vazio, usa apenas uma identidade tipográfica provisória.
  logo: '',
  logoAlt: 'Air Drop — assistência delivery',
  contact: {
    whatsapp: '5551994309788', // País + DDD + número, só dígitos: 55 + DDD + 9 dígitos.
    phone: '', // Telefone alternativo, opcional, também com país e DDD.
    email: '',
    privacyEmail: '', // Se vazio, usa contact.email.
    instagramUrl: '', // URL completa do perfil oficial; opcional.
    defaultMessage: 'Olá, Air Drop! Gostaria de um orçamento para reparo de iPhone a domicílio.'
  },
  business: {
    legalName: '',
    cnpj: '',
    city: 'Porto Alegre',
    state: 'RS',
    // Identificação comercial real. Não transforme seu endereço residencial em loja fictícia.
    publicAddress: '',
    hasWalkInStore: false,
    hours: '', // Ex.: Segunda a sexta, das 9h às 18h. Preencha com seu horário real.
    about: 'A Air Drop é uma assistência independente especializada em reparos de iPhone. Nosso atendimento vai até o cliente, com agendamento e avaliação do aparelho. Você recebe as informações sobre o serviço antes de autorizar o reparo.',
    independence: 'Assistência independente. A Air Drop não é autorizada nem afiliada à Apple. iPhone e Apple são marcas de seus respectivos titulares.'
  },
  delivery: {
    areas: ['Porto Alegre', 'Região Metropolitana de Porto Alegre'], // Lista REAL de bairros ou cidades atendidos, em texto.
    description: 'Atendimento em Porto Alegre e em toda a Região Metropolitana, na sua casa ou no trabalho, conforme disponibilidade. Informe seu bairro e sua cidade para confirmar a cobertura.',
    fee: 'Consulte a disponibilidade e o valor de deslocamento antes de agendar.',
    conditions: 'A realização no local depende do modelo, da avaliação técnica, da disponibilidade da peça e das condições do ambiente. Quando o reparo exigir outra estrutura, as alternativas são combinadas antes da contratação.'
  },
  quality: {
    title: 'A peça certa faz diferença.',
    description: 'Trabalhamos com peças de qualidade e compatíveis com o seu modelo. A opção de peça, suas características e as condições do serviço são informadas no orçamento.',
    // Ajuste os compromissos abaixo para refletirem os processos reais da Air Drop.
    commitments: ['Compatibilidade com o modelo', 'Características da peça no orçamento', 'Conferência do serviço na entrega']
  },
  warranty: {
    // Não foi inventado um prazo. Preencha a política real antes de publicar.
    duration: '', // Ex.: o prazo que a SUA empresa efetivamente oferece.
    summary: 'O serviço conta com garantia. Você recebe o prazo, a cobertura e as condições aplicáveis antes da contratação, registrados na ordem de serviço.',
    coverage: '',
    conditions: '',
    request: 'Entre em contato com a Air Drop pelo canal de atendimento, informe o serviço realizado e descreva o que aconteceu. Guarde a ordem de serviço para facilitar a identificação do atendimento.'
  },
  maps: {
    enabled: false,
    apiKey: '', // Chave PÚBLICA da Maps Embed API, restrita aos seus domínios.
    mode: 'view', // view: região sem pino de loja. place: endereço/Place ID real.
    center: '', // Latitude,longitude da sua área real de atendimento.
    zoom: 12,
    query: '', // Só para mode='place'. Use endereço real ou place_id:SEU_PLACE_ID.
    linkUrl: '', // Link público opcional do seu perfil real no Google Maps.
    title: 'Região de atendimento da Air Drop'
  },
  tracking: {
    // Opcional. Só carrega Google tag após consentimento do visitante.
    googleAdsId: '', // AW-123456789
    whatsappConversionLabel: '' // Label da conversão de clique no WhatsApp.
  },
  privacy: {
    updatedAt: '2026-09-16',
    retention: 'Os dados enviados nos canais de atendimento são mantidos pelo período necessário ao orçamento, à execução do serviço e às obrigações aplicáveis. Solicite mais informações pelo contato de privacidade.'
  },
  models: ['iPhone SE', 'iPhone X / XR / XS', 'iPhone 11 / 11 Pro / 11 Pro Max', 'iPhone 12 / 12 mini / 12 Pro / 12 Pro Max', 'iPhone 13 / 13 mini / 13 Pro / 13 Pro Max', 'iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max', 'iPhone 15 / 15 Plus / 15 Pro / 15 Pro Max', 'iPhone 16 / 16 Plus / 16 Pro / 16 Pro Max', 'Outro modelo / não sei informar']
};

// Exibir um modelo no formulário não afirma disponibilidade de peças.
export const services = [
  {
    id: 'tela', slug: 'troca-de-tela', title: 'Troca de tela', eyebrow: 'Tela & imagem',
    category: 'imagem', icon: 'phone', featured: true,
    short: 'Tela quebrada, manchas na imagem ou falhas no toque? Consulte a troca para o seu modelo.',
    description: 'A troca de tela é avaliada para aparelhos com vidro danificado, falhas de imagem ou problemas de toque. Antes de realizar o serviço, confirmamos o modelo, as condições do aparelho e a opção de peça disponível.',
    symptoms: ['Vidro trincado ou quebrado', 'Manchas, linhas ou falhas na imagem', 'Toque sem resposta em parte da tela'],
    note: 'Falhas de imagem ou toque podem ter outras causas. A necessidade da troca é confirmada após avaliação.'
  },
  {
    id: 'bateria', slug: 'troca-de-bateria', title: 'Troca de bateria', eyebrow: 'Energia para sua rotina',
    category: 'energia', icon: 'battery', featured: true,
    short: 'Pouca autonomia ou desligamentos inesperados? Avaliamos a bateria do seu iPhone.',
    description: 'A bateria pode perder autonomia com o uso. Avaliamos os sintomas e a compatibilidade da peça antes de confirmar a substituição, com orçamento e condições informados previamente.',
    symptoms: ['Autonomia reduzida no dia a dia', 'Desligamentos inesperados', 'Indicação de manutenção da bateria'],
    note: 'Autonomia e desempenho também dependem do uso e das condições do aparelho. A troca não é indicada automaticamente apenas por um sintoma.'
  },
  {
    id: 'camera', slug: 'troca-de-camera', title: 'Troca de câmera', eyebrow: 'De volta ao foco',
    category: 'imagem', icon: 'camera', featured: false,
    short: 'Falhas de foco, tremores ou câmera sem imagem. Consulte a avaliação do módulo.',
    description: 'Avaliamos o conjunto de câmera quando há tremores, dificuldade de foco ou ausência de imagem. A indicação de troca depende da identificação da causa e da disponibilidade do componente.',
    symptoms: ['Imagem com tremores', 'Dificuldade persistente de foco', 'Câmera sem imagem'],
    note: 'A avaliação confirma qual componente precisa de reparo; nem toda falha exige a troca da câmera.'
  },
  {
    id: 'carga', slug: 'conector-de-carga', title: 'Conector de carga', eyebrow: 'Conexão em dia',
    category: 'energia', icon: 'plug', featured: false,
    short: 'Mau contato ou falha ao carregar? Identificamos a necessidade do reparo.',
    description: 'Problemas de carregamento podem estar associados ao cabo, à bateria ou ao conector. A avaliação ajuda a identificar a origem do defeito antes de aprovar qualquer substituição.',
    symptoms: ['Mau contato ao conectar o cabo', 'Carregamento com interrupções', 'Conexão não reconhecida'],
    note: 'A troca do conector depende de diagnóstico e das condições específicas do modelo.'
  },
  {
    id: 'traseira', slug: 'tampa-traseira', title: 'Tampa traseira', eyebrow: 'Cuidado por inteiro',
    category: 'estrutura', icon: 'layers', featured: false,
    short: 'Traseira danificada? Consulte a substituição, com foco em modelos a partir do iPhone 15.',
    description: 'Consulte a substituição da tampa traseira para modelos a partir do iPhone 15. A compatibilidade, a cor e a possibilidade de execução no local são confirmadas no orçamento.',
    symptoms: ['Tampa traseira trincada', 'Quebra na parte externa traseira', 'Necessidade de avaliação da estrutura'],
    note: 'A disponibilidade depende do modelo. Danos em outras partes do aparelho são avaliados separadamente.'
  }
];

export const faqs = [
  ['O reparo é feito na minha casa?', 'O atendimento é agendado na sua casa ou no trabalho, dentro da região atendida. A possibilidade de realizar o reparo no local é confirmada conforme o modelo, o problema, a peça e as condições do ambiente.'],
  ['Como recebo o orçamento?', 'Informe o modelo, o serviço desejado e o bairro pelo WhatsApp. A Air Drop confirma a disponibilidade e apresenta o orçamento. O valor pode depender da avaliação do aparelho; qualquer alteração precisa da sua autorização.'],
  ['Quanto tempo demora?', 'O prazo depende do serviço, do modelo e do diagnóstico. A estimativa é informada no atendimento, antes do agendamento.'],
  ['Quais peças são utilizadas?', 'As opções disponíveis, a compatibilidade e as características da peça são explicadas no orçamento. Não anunciamos peças como originais sem comprovação de origem.'],
  ['O serviço tem garantia?', 'Sim. O prazo, a cobertura e as condições do serviço são apresentados antes da contratação e registrados na ordem de serviço. Consulte a página de garantia ou fale com a Air Drop.'],
  ['Existe taxa de deslocamento?', 'A disponibilidade e eventual taxa de deslocamento são confirmadas conforme a região. Consulte o valor total antes de agendar.'],
  ['A Air Drop é uma autorizada Apple?', 'Não. A Air Drop é uma assistência independente especializada em reparos de iPhone, sem afiliação ou autorização da Apple.']
];
