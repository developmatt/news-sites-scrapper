import { SummarizedNewsEntity } from "@/src/repositories/summarized-news-repository/entities/summarized-news.entity"
import { SummarizedNewsInterface } from "../interfaces/summarized-news.interface"
import { NewsBlock } from "./news-block"

type NewsListProps = {
  posts: SummarizedNewsEntity[]
}

export const NewsList: React.FC<NewsListProps> = async ({ posts }: NewsListProps) => {
  // const data = await fetch(process.env.API_ADDRESS ?? '')
  // const posts: SummarizedNewsInterface[] = await data.json()

  const postes: SummarizedNewsInterface[] = [
    {
      createdAt: '2024-12-31T20:34:36.157Z',
      updatedAt: '2024-12-31T20:34:36.157Z',
      deletedAt: null,
      id: 'a6131e4a-e6eb-4687-9428-da8b7482a453',
      title: 'Mundo celebra a chegada de 2025 com fogos de artifício e festas',
      content: 'As comemorações do **Ano Novo 2025** começaram pelo mundo, com **Kiribati** sendo o primeiro país a celebrar, seguido pela **Nova Zelândia** e **Austrália**. Em **Sydney**, um grande evento no **Porto de Sydney** marcou a virada do ano com uma espetacular queima de fogos. No **Japão**, **Coreia do Sul** e **Coreia do Norte**, as celebrações começaram às **12h** do horário de Brasília. No **Brasil**, a tradicional festa de **Copacabana**, no **Rio de Janeiro**, contará com **12 minutos de fogos** e apresentações de **Caetano & Bethânia**, **Ivete** e **Anitta**.',
      tags: [ 'Ano Novo 2025', 'Fogos de Artifício', 'Sydney', 'Copacabana' ],
      categories: [ 'world', 'entertainment' ],
      mood: 'positive',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.157Z',
      updatedAt: '2024-12-31T20:34:36.157Z',
      deletedAt: null,
      id: '57e4d5da-3c2f-430a-827e-0bbdc5aa1bab',
      title: 'Porto Rico enfrenta apagão generalizado na véspera de Ano Novo',
      content: 'Cerca de **90% da população de Porto Rico** ficou sem energia elétrica nesta terça-feira (31), véspera de Ano Novo. O apagão, que começou por volta das **8h30** do horário local, afetou **1,3 milhão de clientes** de um total de **1,4 milhão**. A **Luma Energy**, empresa responsável pela rede de energia, está investigando as causas do colapso, que pode ter sido causado por uma **falha na linha de energia subterrânea**. O diretor da **Autoridade de Energia Elétrica de Porto Rico**, **Josue Colon**, estimou que o serviço pode ser restabelecido em **24 a 48 horas**, dependendo das condições.',
      tags: [ 'Porto Rico', 'Apagão', 'Luma Energy', 'Energia Elétrica' ],
      categories: [ 'world', 'environment' ],
      mood: 'negative',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.157Z',
      updatedAt: '2024-12-31T20:34:36.157Z',
      deletedAt: null,
      id: 'adbfdb64-bb3b-4a43-8fa0-a1b82b3ae9e7',
      title: 'Copeiro do Cervantes relembra quando ficou de fora de bolão premiado',
      content: 'Há **13 anos**, **Lúcio Flávio Osório**, copeiro do tradicional restaurante **Cervantes**, no **Rio de Janeiro**, ficou de fora de um **bolão premiado** da **Quina de São João**. Ele havia pago os **R$ 10** da aposta, mas pegou o dinheiro de volta para pagar a passagem de ônibus. Cada um dos **20 colegas** participantes embolsou **R$ 635 mil**. Lúcio, que ainda sonha com o prêmio, convive com brincadeiras e piadas sobre o ocorrido. "Todo ano começam os vídeos do Lúcio", diz ele, que continua jogando na esperança de um dia ser premiado.',
      tags: [
        'Cervantes',
        'Lúcio Flávio Osório',
        'Quina de São João',
        'Loteria'
      ],
      categories: [ 'lifestyle', 'entertainment' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.151Z',
      updatedAt: '2024-12-31T20:34:36.151Z',
      deletedAt: null,
      id: '0ede8904-ca34-41ff-941a-2e3d1b0d64a7',
      title: 'Feriados de janeiro garantem descanso extra para brasileiros',
      content: 'Em **janeiro de 2025**, os brasileiros poderão contar com **feriados nacionais e regionais** para descansar. O único feriado nacional é o **Dia da Confraternização Universal**, em **1º de janeiro**. Além disso, alguns estados terão feriados regionais, como o **Aniversário de Rondônia** (4 de janeiro) e o **Dia de São Sebastião** (20 de janeiro) no Rio de Janeiro. O ano de **2025** promete mais dias de folga em comparação com **2024**, que foi um ano bissexto com poucos feriados prolongados. Os trabalhadores do regime **CLT** têm direito a folgas remuneradas durante esses feriados.',
      tags: [ 'Feriados', 'Janeiro 2025', 'Descanso', 'CLT' ],
      categories: [ 'lifestyle', 'politics' ],
      mood: 'positive',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.157Z',
      updatedAt: '2024-12-31T20:34:36.157Z',
      deletedAt: null,
      id: 'fa3e4ca6-a02b-4731-99de-4a22ac5893f7',
      title: 'Apostas esportivas são regulamentadas no Brasil com novas regras',
      content: 'A **Secretaria de Prêmios e Apostas** do **Ministério da Fazenda** autorizou o funcionamento de **66 sites de apostas** no Brasil. As empresas pagaram **R$ 30 milhões** cada para obter a licença de operação, válida por **cinco anos**. As novas regras incluem a proibição de crédito para apostas, exigência de **identificação por CPF**, reconhecimento facial e controle dos fluxos financeiros. A lei também proíbe a participação de menores de 18 anos, pessoas com **ludopatia** e agentes públicos ligados à fiscalização do mercado. O objetivo é reduzir riscos como o **superendividamento** e garantir práticas de jogo responsável.',
      tags: [
        'Apostas Esportivas',
        'Ministério da Fazenda',
        'Regulamentação',
        'Jogo Responsável'
      ],
      categories: [ 'economy', 'technology' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.148Z',
      updatedAt: '2024-12-31T20:34:36.148Z',
      deletedAt: null,
      id: 'abf0b1d9-59a8-4214-8ab5-292b1b48fd35',
      title: 'PIX ganha novas funcionalidades em 2025',
      content: 'O **PIX**, uma das modalidades de transações financeiras mais utilizadas pelos brasileiros, terá novidades em **2025**. A partir de **fevereiro**, será lançado o **PIX por aproximação**, que permitirá pagamentos apenas aproximando o celular de uma maquininha, similar ao cartão de crédito. Em **junho**, será implementado o **PIX automático**, que facilitará o pagamento de contas mensais, como água e luz, de forma automática. Além disso, o **PIX parcelado** está ganhando espaço como uma alternativa ao cartão de crédito, oferecendo mais flexibilidade aos consumidores. Em **2023**, o uso do PIX cresceu **75%**, com **42 bilhões de transações** registradas.',
      tags: [
        'PIX',
        'Banco Central',
        'Transações Financeiras',
        'Novidades 2025'
      ],
      categories: [ 'economy', 'technology' ],
      mood: 'positive',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.148Z',
      updatedAt: '2024-12-31T20:34:36.148Z',
      deletedAt: null,
      id: '5e3935fe-b6a8-498f-bc44-e8257e6c5f12',
      title: 'Abono Natalino beneficia famílias do Bolsa Família na Paraíba',
      content: 'Nessa reta final de ano, **669 mil famílias** inscritas no **Bolsa Família** na **Paraíba** receberão o **Abono Natalino**, um benefício de **R$ 64**. O programa, que está no seu **12º ano**, é pioneiro no país e deve beneficiar cerca de **1,6 milhão de paraibanos**. Para receber o abono, os beneficiários precisam apresentar documentos como **identificação com foto**, **CPF** e o **Cartão do NIS**. O Bolsa Família é destinado a famílias em situação de vulnerabilidade socioeconômica, com renda familiar de até **R$ 218 por mês**. Além do abono, o programa oferece outros benefícios, como o **Auxílio-gás** e o **Benefício de Renda de Cidadania**, que podem chegar a **R$ 600 por família**.',
      tags: [
        'Bolsa Família',
        'Abono Natalino',
        'Paraíba',
        'Benefícios Sociais'
      ],
      categories: [ 'economy', 'politics' ],
      mood: 'positive',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.152Z',
      updatedAt: '2024-12-31T20:34:36.152Z',
      deletedAt: null,
      id: 'aeb81b56-2f6b-49d9-aa22-2b5f741f4cca',
      title: 'Isenção do Imposto de Renda para renda de até R$ 5 mil só em 2026',
      content: 'O governo **Lula** anunciou a **isenção do Imposto de Renda** para contribuintes que recebem até **R$ 5 mil**, mas a medida só entrará em vigor em **2026**. A proposta, que deve beneficiar **28 milhões de brasileiros**, ainda precisa ser aprovada pelo **Congresso Nacional**. A isenção faz parte das promessas de campanha do presidente e visa aliviar a carga tributária das famílias. No entanto, a **Unafisco** estima que o governo pode perder **R$ 235 bilhões** de arrecadação por ano com a medida.',
      tags: [ 'Imposto de Renda', 'Isenção', 'Governo Lula', 'Economia' ],
      categories: [ 'economy', 'politics' ],
      mood: 'positive',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.157Z',
      updatedAt: '2024-12-31T20:34:36.157Z',
      deletedAt: null,
      id: 'c1ced8f6-3645-48e8-96e1-3af3cb8e9e5a',
      title: 'Salário mínimo sobe para R$ 1.518 em 2025',
      content: 'O **salário mínimo** será reajustado para **R$ 1.518** em **2025**, um aumento de **R$ 106** em relação ao valor atual. O reajuste foi baseado no **INPC** e seguiu a regra de não ultrapassar **2,5%** acima da inflação. O novo valor impactará **benefícios do INSS**, **pensões**, **seguro-desemprego** e **abono salarial**. O presidente **Lula** destacou que o aumento real do salário mínimo é uma forma de **distribuição de renda** e um compromisso do governo. O novo piso começa a valer em **janeiro de 2025**, mas os salários serão impactados a partir de **fevereiro**.',
      tags: [ 'Salário Mínimo', 'INPC', 'Lula', 'Distribuição de Renda' ],
      categories: [ 'economy', 'politics' ],
      mood: 'positive',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.152Z',
      updatedAt: '2024-12-31T20:34:36.152Z',
      deletedAt: null,
      id: 'c31f4734-781b-4160-94b1-8b3400d8b625',
      title: 'Trabalhadores temporários têm direito a benefícios do INSS',
      content: 'Os **trabalhadores temporários** têm os mesmos **direitos previdenciários** que os funcionários efetivados, incluindo benefícios como **auxílio-doença** e **salário-maternidade**. Apesar dos contratos serem de curta duração, geralmente de até **três meses**, as empresas contratantes são responsáveis pelo recolhimento das **contribuições ao INSS**. Após o término do contrato, o trabalhador mantém a **proteção previdenciária** por pelo menos **12 meses**, mesmo sem novas contribuições. A especialista **Danielle Santana** comenta sobre as oportunidades de trabalho temporário no final de **2024** e início de **2025**.',
      tags: [
        'Trabalhadores Temporários',
        'INSS',
        'Benefícios',
        'Direitos Trabalhistas'
      ],
      categories: [ 'economy', 'justice_and_law' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.153Z',
      updatedAt: '2024-12-31T20:34:36.153Z',
      deletedAt: null,
      id: '6fd0e9a5-be5b-4842-8518-a713542827aa',
      title: 'Oposição articula derrubada de vetos de Lula sobre orçamento',
      content: 'A **oposição** está articulando a derrubada dos **vetos** do presidente **Lula** à **Lei de Diretrizes Orçamentárias (LDO)**, que previa a divulgação de **relatórios trimestrais** sobre o andamento das medidas fiscais. Lula vetou **35 pontos** do texto aprovado pelo Congresso, argumentando que a mudança poderia **onerar a administração pública**. A oposição critica a falta de **transparência** e defende a divulgação de informações detalhadas sobre o orçamento. O senador **Ciro Nogueira** questionou o veto, destacando que os dados já são enviados ao **Tribunal de Contas da União (TCU)**.',
      tags: [ 'Oposição', 'Lula', 'Orçamento', 'Transparência' ],
      categories: [ 'politics', 'economy' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.156Z',
      updatedAt: '2024-12-31T20:34:36.156Z',
      deletedAt: null,
      id: '15fb1a23-f5bb-4c54-b048-9747aef767ab',
      title: 'Prefeito de BH participará virtualmente da posse devido a tratamento de câncer',
      content: 'O **prefeito reeleito de Belo Horizonte**, **Fuad Noman (PSD)**, participará da **posse** nesta quarta-feira (1°) por **videoconferência**. A decisão foi tomada após a descoberta de um **câncer**, e segue a recomendação médica de evitar locais com muita circulação de pessoas, o que poderia deixá-lo mais exposto a vírus e bactérias. Fuad, que já era prefeito e foi reeleito com **53,7% dos votos**, enfrenta dificuldades na fala, alimentação e problemas motores, além de estar em tratamento para o **linfoma não Hodgkin**. O discurso de posse será lido pelo **vice-prefeito eleito**, **Álvaro Damião (União Brasil)**.',
      tags: [ 'Fuad Noman', 'Belo Horizonte', 'Posse', 'Câncer' ],
      categories: [ 'politics', 'health' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.154Z',
      updatedAt: '2024-12-31T20:34:36.154Z',
      deletedAt: null,
      id: '95576e3a-b51d-4771-9cd1-e440c95777da',
      title: 'Dino libera R$ 370 milhões em emendas para saúde',
      content: 'O ministro **Flávio Dino**, do **Supremo Tribunal Federal (STF)**, liberou **R$ 370 milhões** em **emendas de comissão** para que o governo cumpra o **piso constitucional de gastos** com a **saúde**. A decisão atende parcialmente ao pedido da **Advocacia-Geral da União (AGU)**, que considerou os valores **"imprescindíveis"** para garantir o mínimo exigido pela Constituição. Dino determinou que as **comissões de saúde** da **Câmara** e do **Senado** devem ratificar as emendas até **31 de março de 2025**, caso contrário, os valores serão **anulados**. O ministro também ressaltou que os **ofícios dos líderes** partidários são **nulos** e não podem ser usados para liberar emendas.',
      tags: [ 'Flávio Dino', 'Emendas', 'Saúde', 'STF' ],
      categories: [ 'politics', 'health' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.156Z',
      updatedAt: '2024-12-31T20:34:36.156Z',
      deletedAt: null,
      id: 'db17200e-e4e5-4c13-94b6-8993757d17a0',
      title: 'Senado recomenda que Ministério da Saúde defina prioridades para emendas',
      content: 'O **Senado** recomendou que o **Ministério da Saúde** defina as **prioridades** para a liberação de **emendas parlamentares**. A decisão foi uma resposta à autorização do ministro **Flávio Dino**, do **STF**, que liberou o pagamento de **R$ 370 milhões** em emendas para garantir o **piso constitucional da saúde**. O Senado destacou que o governo deve estabelecer as prioridades de empenho e execução, observando os limites impostos pela decisão judicial. A **AGU** havia solicitado a liberação de emendas de comissão, mas Dino suspendeu o pagamento de ofícios assinados por líderes partidários, considerando-os nulos.',
      tags: [ 'Senado', 'Ministério da Saúde', 'Emendas Parlamentares', 'STF' ],
      categories: [ 'politics', 'health' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.150Z',
      updatedAt: '2024-12-31T20:34:36.150Z',
      deletedAt: null,
      id: '6111f5cc-d211-4663-a903-59c2689c6654',
      title: 'AGU pede liberação de emendas para cumprir piso da saúde',
      content: 'A **Advocacia-Geral da União (AGU)** enviou um ofício ao **Supremo Tribunal Federal (STF)** solicitando a liberação de **R$ 370 milhões** em **emendas de comissão** destinadas à **saúde**. O objetivo é garantir o cumprimento do **piso constitucional de gastos** com a área. Segundo a AGU, esses valores são **"imprescindíveis"** para alcançar o mínimo exigido pela Constituição. O ministro **Flávio Dino** pediu que a AGU comprove a necessidade dos recursos com dados concretos. A decisão final sobre a liberação das emendas ainda está pendente.',
      tags: [ 'AGU', 'Emendas', 'Saúde', 'STF' ],
      categories: [ 'politics', 'health' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.151Z',
      updatedAt: '2024-12-31T20:34:36.151Z',
      deletedAt: null,
      id: '5e8397fa-eb00-446b-9327-d185f3a285ba',
      title: 'Lula apresenta melhora progressiva após cirurgias',
      content: 'O presidente **Luiz Inácio Lula da Silva** passou por uma nova **tomografia** nesta terça-feira (31), que mostrou uma **"melhora progressiva"** em sua saúde. Lula foi submetido a duas cirurgias em **dezembro** para tratar uma **hemorragia intracraniana**, causada por uma queda em outubro. O presidente segue sob acompanhamento médico e deve manter **repouso relativo** por cerca de **15 dias**. A equipe médica liderada pelo cardiologista **Roberto Kalil** afirmou que o estado de saúde de Lula é **"ótimo"** e que ele pode retomar suas atividades normais em breve.',
      tags: [ 'Lula', 'Saúde', 'Cirurgia', 'Tomografia' ],
      categories: [ 'politics', 'health' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.151Z',
      updatedAt: '2024-12-31T20:34:36.151Z',
      deletedAt: null,
      id: 'cb857d73-4676-4728-b96f-9cd424305325',
      title: 'Dino libera emendas para saúde com aval das comissões',
      content: 'O ministro **Flávio Dino**, do **Supremo Tribunal Federal (STF)**, autorizou a liberação de **R$ 370 milhões** em **emendas de comissão** para a **saúde**, desde que os recursos sejam **ratificados** pelas **comissões parlamentares** de saúde até **31 de março de 2025**. A decisão visa garantir o cumprimento do **piso constitucional de gastos** com a área. Dino destacou que os valores só poderão ser utilizados para despesas com saúde e que, caso não sejam ratificados, as emendas serão **anuladas**. A medida atende parcialmente ao pedido da **Advocacia-Geral da União (AGU)**.',
      tags: [ 'Flávio Dino', 'Emendas', 'Saúde', 'STF' ],
      categories: [ 'politics', 'health' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.140Z',
      updatedAt: '2024-12-31T20:34:36.140Z',
      deletedAt: null,
      id: 'cf9d91bd-16c8-488b-93c6-f633376b2d22',
      title: 'Quenianos dominam a 99ª edição da São Silvestre',
      content: 'Os atletas **quenianos** dominaram a **99ª edição da São Silvestre**, realizada em São Paulo. No masculino, **Wilson Too** venceu a prova com o tempo de **44m21s**, enquanto, no feminino, **Agnes Keino** cruzou a linha de chegada em **51m25s**. O Brasil teve destaque com **Núbia de Oliveira**, que ficou em **terceiro lugar** no feminino, e **Johnatas Cruz**, que terminou em **quarto lugar** no masculino. A competição segue sendo dominada por atletas africanos, com o Brasil sem vitórias desde **2010** no masculino e **2006** no feminino.',
      tags: [ 'São Silvestre', 'Atletismo', 'Quênia', 'Brasil' ],
      categories: [ 'sports' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.123Z',
      updatedAt: '2024-12-31T20:34:36.123Z',
      deletedAt: null,
      id: '62594e65-ec27-4891-b655-d797a6c94961',
      title: 'Paulinho revela que disputa do Super Mundial pesou na decisão de ir ao Palmeiras',
      content: 'O atacante **Paulinho**, novo reforço do **Palmeiras**, revelou que a chance de disputar o **Super Mundial de Clubes** foi um dos principais motivos para aceitar a proposta do clube paulista. O jogador, que chegou ao Verdão em uma negociação de **27 milhões de euros**, destacou o **projeto ambicioso** do Palmeiras e a chance de competir em grandes torneios como a **Libertadores** e o **Brasileiro**. Paulinho também agradeceu o reconhecimento do clube, que tentou contratá-lo em outras ocasiões. O atacante espera contribuir com gols e ajudar o Palmeiras a conquistar títulos em 2025.',
      tags: [ 'Palmeiras', 'Paulinho', 'Futebol', 'Super Mundial' ],
      categories: [ 'sports' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.123Z',
      updatedAt: '2024-12-31T20:34:36.123Z',
      deletedAt: null,
      id: 'ba6757b8-4316-4b3d-a9ac-dd04be918c3d',
      title: 'Dudu será apresentado como reforço do Cruzeiro nesta sexta-feira',
      content: 'O atacante **Dudu** será **apresentado** como novo jogador do **Cruzeiro** nesta **sexta-feira (3)**, às 13h, na Toca da Raposa II. O jogador de 32 anos assinou contrato com o clube até o fim de 2027, após rescindir com o **Palmeiras**. Dudu, que foi formado no Cruzeiro, retorna ao clube após 13 anos e espera recuperar o bom futebol que o consagrou como um dos maiores ídolos do Palmeiras. O atacante enfrentou uma **grave lesão no joelho** que o afastou dos gramados por quase um ano, mas está motivado para ajudar o Cruzeiro nas competições de 2025.',
      tags: [ 'Cruzeiro', 'Dudu', 'Futebol', 'Transferências' ],
      categories: [ 'sports' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.123Z',
      updatedAt: '2024-12-31T20:34:36.123Z',
      deletedAt: null,
      id: '21a80cc4-fd00-477c-80dd-8b565a185028',
      title: 'Retrô-PE fatura título da Série D e mira Série C em 2025',
      content: 'O **Retrô-PE** conquistou o **título da Série D** ao vencer o **Anápolis** e garantiu o acesso à **Série C** em 2025. O clube, que foi criado em 2016, é comandado pelo empresário **Laércio Guerra**, conhecido por seu estilo polêmico e ambicioso. O Retrô investiu mais de **R$ 70 milhões** em sua estrutura e busca se consolidar no cenário nacional. Laércio, que se inspira em cartolas como **Eurico Miranda**, sonha em levar o clube à **Série A** até 2028. O Retrô também planeja aumentar seus investimentos para a próxima temporada, com o objetivo de subir à **Série B**.',
      tags: [ 'Retrô-PE', 'Série D', 'Futebol', 'Laércio Guerra' ],
      categories: [ 'sports' ],
      mood: 'positive',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.122Z',
      updatedAt: '2024-12-31T20:34:36.122Z',
      deletedAt: null,
      id: '0466e2f2-a601-422f-819b-5a3356cec19f',
      title: 'Atlético-MG planeja reforçar o elenco com até seis contratações',
      content: 'O **Atlético-MG** está se preparando para a próxima temporada com a chegada de **até seis reforços**. O investidor **Rubens Menin** revelou que o clube já acertou com os volantes **Gabriel Menino** e **Patrick**, ambos ex-Palmeiras, e está em busca de mais jogadores para **oxigenar o elenco**. O Atlético também anunciou a contratação do técnico **Cuca**, que retorna ao clube pela quarta vez. Menin destacou que o orçamento para 2025 será **R$ 20 milhões maior** que o de 2024, com o objetivo de manter a competitividade do time. O clube espera que as novas contratações tragam **equilíbrio** e ajudem o Atlético a brigar por títulos na próxima temporada.',
      tags: [ 'Atlético-MG', 'Rubens Menin', 'Futebol', 'Transferências' ],
      categories: [ 'sports' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.123Z',
      updatedAt: '2024-12-31T20:34:36.123Z',
      deletedAt: null,
      id: '1bf74298-10f3-403e-94f6-f8c02f0e249a',
      title: 'Pedro Caixinha já comanda o planejamento do Santos para 2025',
      content: 'O técnico **Pedro Caixinha** já está à frente do **planejamento** do **Santos** para a próxima temporada. O português, que ainda está em Portugal, participa ativamente das decisões sobre o elenco, incluindo a escolha de reforços e a liberação de jogadores. Caixinha já vetou a renovação com **Otero**, que acertou com o **Nacional** do Uruguai, e a contratação do lateral **Matheus Alexandre**, do Cuiabá. O técnico busca montar um elenco competitivo para o Santos, que terá a reapresentação marcada para o dia **3 de janeiro**. O clube também negocia a chegada de jogadores como **Tiquinho Soares** e **Thiago Maia**.',
      tags: [ 'Santos', 'Pedro Caixinha', 'Futebol', 'Transferências' ],
      categories: [ 'sports' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.123Z',
      updatedAt: '2024-12-31T20:34:36.123Z',
      deletedAt: null,
      id: 'f0c50e5b-77be-4a93-b52c-845ffd136468',
      title: 'Cruzeiro planeja mudanças na defesa para 2025',
      content: 'O **Cruzeiro** está planejando **mudanças importantes** no setor defensivo para a próxima temporada. O clube avalia a contratação do experiente zagueiro **David Luiz**, que está sem clube após não renovar com o Flamengo. Além disso, o Cruzeiro mira um **zagueiro argentino**, cujo nome ainda não foi revelado, e pode liberar **Zé Ivaldo**, que está fora dos planos para 2025. O clube também exerceu a opção de compra do argentino **Lucas Villalba**, que estava emprestado pelo Argentinos Juniors. Com essas movimentações, o Cruzeiro busca reforçar a defesa para as competições de 2025, incluindo a **Copa Sul-Americana** e o **Campeonato Brasileiro**.',
      tags: [ 'Cruzeiro', 'David Luiz', 'Futebol', 'Transferências' ],
      categories: [ 'sports' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.140Z',
      updatedAt: '2024-12-31T20:34:36.140Z',
      deletedAt: null,
      id: '0c5e28f0-f2ce-4eb7-9592-7d74a008ef4d',
      title: 'Coritiba mira contratação de Rodrigo Caio para 2025',
      content: 'O **Coritiba** está interessado na contratação do zagueiro **Rodrigo Caio**, que encerrou a temporada 2024 no **Grêmio**. O jogador, que tem passagens por **São Paulo** e **Flamengo**, está sem contrato e avalia propostas para 2025. O Coxa também negocia com outros zagueiros, como **Maicon** e **Rodrigo Moledo**, e já anunciou as contratações de **Rafinha**, **Geovane** e **Dellatorre**. O clube busca reforçar a defesa para a próxima temporada e montar um elenco competitivo para o **Campeonato Brasileiro**.',
      tags: [ 'Coritiba', 'Rodrigo Caio', 'Futebol', 'Transferências' ],
      categories: [ 'sports' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.123Z',
      updatedAt: '2024-12-31T20:34:36.123Z',
      deletedAt: null,
      id: '578f30fd-4197-4d5e-bb89-bfe420605e36',
      title: 'Paulinho se torna a contratação mais cara da história do Palmeiras',
      content: 'O **Palmeiras** oficializou a contratação do atacante **Paulinho**, ex-Atlético-MG, em uma negociação que se tornou a **mais cara da história do clube**. O valor total da operação foi de **27 milhões de euros** (cerca de R$ 172 milhões), incluindo o pagamento de **18 milhões de euros** ao Atlético e **900 mil euros** para o mecanismo de solidariedade, que será dividido entre Vasco e Bayer Leverkusen. Além disso, o Palmeiras incluiu na negociação os jogadores **Patrick** e **Gabriel Menino**, que passam a integrar o elenco do Atlético. A contratação de Paulinho supera a de **Borja**, que até então era a mais cara do Verdão, com **12 milhões de euros** em 2017. Paulinho chega ao Palmeiras com a missão de reforçar o ataque e ajudar o clube nas competições de 2025.',
      tags: [ 'Palmeiras', 'Paulinho', 'Futebol', 'Transferências' ],
      categories: [ 'sports' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.123Z',
      updatedAt: '2024-12-31T20:34:36.123Z',
      deletedAt: null,
      id: '1be74ab4-3395-438d-9c9e-f7b40f1d6eb1',
      title: 'Atlético-MG anuncia a contratação de Gabriel Menino',
      content: 'O **Atlético-MG** oficializou a contratação do meia **Gabriel Menino**, ex-Palmeiras, em uma negociação que envolveu a venda do atacante **Paulinho** ao Verdão. O jogador assinou contrato com o Galo até o fim de 2028, com opção de extensão por mais um ano. Gabriel Menino, de 24 anos, foi revelado pelo Palmeiras e se destacou nas categorias de base do clube. O meia disputou **243 partidas** com a camisa do Verdão e marcou **18 gols**. Ele chega ao Atlético com a missão de reforçar o meio-campo e ajudar o clube nas competições de 2025.',
      tags: [ 'Atlético-MG', 'Gabriel Menino', 'Futebol', 'Transferências' ],
      categories: [ 'sports' ],
      mood: 'neutral',
      score: 0
    },
    {
      createdAt: '2024-12-31T20:34:36.158Z',
      updatedAt: '2024-12-31T20:34:36.158Z',
      deletedAt: null,
      id: '7f634527-22a4-495a-b391-3a5d53127714',
      title: 'Adolescente é identificado como autor de disparo que matou turista no Rio',
      content: 'Um **adolescente de 16 anos** foi identificado como o autor dos **disparos** que mataram a **turista Diely Silva** no **Rio de Janeiro**. A vítima estava em um **carro de aplicativo** que entrou por engano na **comunidade do Fontela**, em **Vargem Pequena**. O suspeito, que atua como segurança de uma **facção criminosa**, efetuou os tiros ao perceber a aproximação do veículo. Diely foi atingida no pescoço e não resistiu aos ferimentos. O motorista, que também foi baleado, sobreviveu. A polícia investiga a participação de outros envolvidos no caso.',
      tags: [
        'Diely Silva',
        'Rio de Janeiro',
        'Facção Criminosa',
        'Segurança'
      ],
      categories: [ 'security', 'justice_and_law' ],
      mood: 'negative',
      score: 0
    }
  ]

  console.log(postes)

  if(!posts) return <div>Carregando...</div>

  return (
      <div className="flex flex-wrap flex-column gap-10">
        {
          posts
          .slice(0, 15)
          .map((post: SummarizedNewsEntity, index: number) => <NewsBlock key={index} news={post} />)
        }
      </div>

  )
}