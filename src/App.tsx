/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  BookOpen,
  TrendingUp,
  Award,
  Search,
  Filter,
  RefreshCw,
  CheckCircle,
  HelpCircle,
  UserCheck,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Globe,
  Landmark,
  FileText,
  Table as TableIcon,
  Eye,
  EyeOff,
  Layers,
  Clock,
  Scale,
  Activity
} from 'lucide-react';

interface EconomicYearData {
  year: string;
  leader: string;
  currencyAndInflation: string;
  externalFinancing: string;
  debtAndBalance: string;
  fmiRelation: string;
  politicsSummary: string;
  mandateGroup: string;
  category: 'Politica' | 'Economia' | 'Sociedade';
  inflationNumeric: number;
  externalDebtNumeric: number;
  gdpGrowth: number;
}

const preciseEconomicDataWithGDP: EconomicYearData[] = [
  {
    year: "1945",
    leader: "Getúlio Vargas / José Linhares / Eurico Gaspar Dutra",
    currencyAndInflation: "Cruzeiro (Cr$); problema cambial histórico desde o final da Segunda Guerra Mundial",
    externalFinancing: "Empréstimos, linhas de crédito internacionais de pós-guerra e reorganização das dívidas",
    debtAndBalance: "Serviço da dívida externa mantido sob controle; acordos de consolidação; renegociação e amortização gradual; divisas acumuladas durante a guerra; balança desfavorável e aumento da dívida externa para gerar divisas em dólar",
    fmiRelation: "Brasil ingressa nas discussões de Bretton Woods e torna-se membro fundador do FMI",
    politicsSummary: "Fim do Estado Novo e deposição de Getúlio Vargas (outubro); Queremismo; anistia geral; liberação de comunistas como Luís Carlos Prestes; Código Eleitoral; fundação de partidos (UDN, PCB, PSD, PTB); eleições presidenciais e parlamentares em dezembro vencidas por Eurico Gaspar Dutra (16% do eleitorado cadastrado, mais de 50% analfabetos); consolidação do pensamento industrializante.",
    mandateGroup: "Transição e Governo Dutra (1945–1951)",
    category: "Politica",
    inflationNumeric: 15.0,
    externalDebtNumeric: 1.8,
    gdpGrowth: 4.2
  },
  {
    year: "1946",
    leader: "José Linhares / Eurico Gaspar Dutra",
    currencyAndInflation: "Cruzeiro (Cr$); câmbio fixo e valorizado em Cr$ 18,50 por dólar (Bretton Woods)",
    externalFinancing: "Abertura ao capital estrangeiro e consumo das reservas cambiais do pós-guerra; uso intensivo de divisas acumuladas",
    debtAndBalance: "Pagamento de importações e compromissos da dívida externa em dia; evasão e perda rápida das divisas acumuladas na guerra devido à abertura econômica",
    fmiRelation: "Ratificação e cooperação regular com o FMI; adesão formal do Brasil ao Fundo Monetário Internacional",
    politicsSummary: "Início da Quarta República; posse de Dutra e eleição indireta de Nereu Ramos; promulgação da Constituição de 1946 (18 de setembro); restauração do equilíbrio de poderes e direitos civis; manutenção da proibição do voto ao analfabeto e exigência de indenização em dinheiro para desapropriação de terras; pauta econômica liberal; grande onda de greves e regulamentação do direito de greve; atuação da bancada do PCB na Constituinte.",
    mandateGroup: "Transição e Governo Dutra (1945–1951)",
    category: "Economia",
    inflationNumeric: 13.2,
    externalDebtNumeric: 1.9,
    gdpGrowth: 7.5
  },
  {
    year: "1947",
    leader: "Eurico Gaspar Dutra",
    currencyAndInflation: "Cruzeiro (Cr$); crescimento da inflação desequilibrando contas públicas; escassez de dólares; taxa de câmbio fixada em Cr$ 18,50 por dólar (Bretton Woods)",
    externalFinancing: "Controle rígido de divisas estrangeiras",
    debtAndBalance: "Dilapidação das reservas de moedas estrangeiras devido ao incentivo às importações; serviço da dívida mantido mediante restrição de importações; instituição de licenças de importação (CEXIM)",
    fmiRelation: "Cooperação e consultas de rotina com o FMI; acompanhamento regular das normas de paridade",
    politicsSummary: "Cassação do registro do PCB pelo TSE e forte repressão ao movimento comunista e a sindicatos; intervenção federal no Ministério do Trabalho; rompimento de relações diplomáticas com a URSS; início formal da Guerra Fria e alinhamento aos EUA; Conferência do Rio e assinatura do TIAR; adoção da Instrução 25 da SUMOC; criação da Comissão Nacional do Folclore.",
    mandateGroup: "Transição e Governo Dutra (1945–1951)",
    category: "Politica",
    inflationNumeric: 12.5,
    externalDebtNumeric: 2.0,
    gdpGrowth: 5.1
  },
  {
    year: "1948",
    leader: "Eurico Gaspar Dutra",
    currencyAndInflation: "Cruzeiro (Cr$); inflação de 3,4% (IPC-RJ)",
    externalFinancing: "Busca por crédito internacional para infraestrutura; início da formulação do Plano SALTE com previsão de recursos externos",
    debtAndBalance: "Pagamentos da dívida externa mantidos em dia sob regime restritivo",
    fmiRelation: "Relacionamento formal e regular com o FMI; consultas e relatórios técnicos do FMI sobre o câmbio brasileiro",
    politicsSummary: "Adoção de política liberal com redução de investimentos públicos e arrocho salarial; lançamento do Plano SALTE (Saúde, Alimentação, Transporte e Energia); trabalhos da Missão Abbink; cassação dos mandatos dos parlamentares comunistas; virada à esquerda e Manifesto de Janeiro do PCB; adoção do Realismo Socialista; contingenciamento e licenças prévias de importação.",
    mandateGroup: "Transição e Governo Dutra (1945–1951)",
    category: "Economia",
    inflationNumeric: 3.4,
    externalDebtNumeric: 2.1,
    gdpGrowth: 4.8
  },
  {
    year: "1949",
    leader: "Eurico Gaspar Dutra",
    currencyAndInflation: "Cruzeiro (Cr$)",
    externalFinancing: "Negociações de financiamento para transportes e energia; cooperação financeira e técnica com os EUA via Missão Abbink",
    debtAndBalance: "Manutenção dos pagamentos do serviço da dívida externa; pagamentos regulares sob acompanhamento cambial",
    fmiRelation: "Cooperação institucional sem contestações; discussão de ajustes cambiais e controle de reservas com o FMI",
    politicsSummary: "Continuação da política econômica intervencionista de transição e execução parcial do Plano SALTE; incentivo à substituição de importações; recomendações da Missão Abbink; greve dos ferroviários da Santos-Jundiaí; criação da Escola Superior de Guerra (ESG); recuperação dos preços internacionais do café.",
    mandateGroup: "Transição e Governo Dutra (1945–1951)",
    category: "Sociedade",
    inflationNumeric: 6.8,
    externalDebtNumeric: 2.2,
    gdpGrowth: 6.2
  },
  {
    year: "1950",
    leader: "Eurico Gaspar Dutra",
    currencyAndInflation: "Cruzeiro (Cr$); inflação moderada de 9,4% (IPC-RJ)",
    externalFinancing: "Créditos pontuais de agências internacionais e do Eximbank; negociações bilaterais com organismos de fomento americanos",
    debtAndBalance: "Cumprimento regular das obrigações externas",
    fmiRelation: "Relações regulares mantidas sem declaração de não pagamento",
    politicsSummary: "Lançamento e execução do Plano SALTE; realização de eleições presidenciais diretas (8,255 milhões de eleitores); vitória de Getúlio Vargas (PTB) com apoio do ademarismo (PSP); jingle 'O Alfabeto Tem 25 Letras'; oposição da UDN e Carlos Lacerda; inauguração da TV Tupi São Paulo; Manifesto de Agosto do PCB; disputas no Clube Militar entre Chapa Amarela e Chapa Azul.",
    mandateGroup: "Transição e Governo Dutra (1945–1951)",
    category: "Politica",
    inflationNumeric: 9.4,
    externalDebtNumeric: 2.25,
    gdpGrowth: 7.0
  },
  {
    year: "1951",
    leader: "Eurico Gaspar Dutra / Getúlio Vargas",
    currencyAndInflation: "Cruzeiro (Cr$); pressões inflacionárias crescentes em cerca de 12%",
    externalFinancing: "Criação da Comissão Mista Brasil-Estados Unidos (CMBEU) e cooperação para financiamento de infraestrutura; dificuldades de captação financeira com o governo americano, que exigia empréstimos com juros privados",
    debtAndBalance: "Pagamento normal de serviços da dívida e gestão de divisas",
    fmiRelation: "Cooperação sem conflitos diretos com o FMI; tratativas de cooperação financeira e diretrizes monetárias",
    politicsSummary: "Fim do mandato de Dutra; posse de Getúlio Vargas e Café Filho; início do projeto nacional-desenvolvimentista de industrialização de base (energia, siderurgia, petróleo); escassez de poupança interna; tentativa de governo de coalizão; criação da Assessoria Econômica da Presidência e política de Horácio Lafer; fundação da Cruzada Democrática no Exército; TV Tupi Rio de Janeiro; 1ª Bienal de Arte de São Paulo.",
    mandateGroup: "Governo Getúlio Vargas (1951–1954)",
    category: "Economia",
    inflationNumeric: 12.0,
    externalDebtNumeric: 2.4,
    gdpGrowth: 4.5
  },
  {
    year: "1952",
    leader: "Getúlio Vargas",
    currencyAndInflation: "Cruzeiro (Cr$)",
    externalFinancing: "Atuação da Comissão Mista Brasil-Estados Unidos (CMBEU); aprovação de projetos de infraestrutura com apoio do Eximbank e BIRD",
    debtAndBalance: "Déficit no balanço de pagamentos e acúmulo de atrasados comerciais; déficit na balança comercial de US$ 286 milhões; pagamento contínuo do serviço da dívida",
    fmiRelation: "Consultas para sanar desequilíbrios cambiais e comerciais; manutenção das obrigações e diálogos institucionais com o FMI",
    politicsSummary: "Criação do Banco Nacional de Desenvolvimento Econômico (BNDE), do Instituto Brasileiro do Café (IBC) e do Conselho Nacional de Pesquisas (CNPq); flexibilização monetária e expansionismo do crédito pelo Banco do Brasil; vitória da Chapa Azul no Clube Militar; nomeação de João Goulart para a presidência do PTB; aprofundamento dos debates sobre desenvolvimento e nacionalismo.",
    mandateGroup: "Governo Getúlio Vargas (1951–1954)",
    category: "Economia",
    inflationNumeric: 14.5,
    externalDebtNumeric: 2.6,
    gdpGrowth: 7.8
  },
  {
    year: "1953",
    leader: "Getúlio Vargas",
    currencyAndInflation: "Cruzeiro (Cr$); aumento acentuado da inflação (cerca de 20%); reforma cambial com taxas múltiplas (Instrução 70 da SUMOC e Lei do Mercado Livre/Lei 1.807)",
    externalFinancing: "Refinanciamento de dívidas comerciais de curto prazo com bancos dos EUA; empréstimos de socorro financeiro para cobrir atrasados; suspensão de financiamentos da CMBEU pelo governo Eisenhower e encerramento unilateral",
    debtAndBalance: "Reorganização e consolidação dos débitos comerciais externos; pequeno superávit no balanço de pagamentos",
    fmiRelation: "Adoção da Instrução 70 da SUMOC aprovada sob diálogo com o FMI; avaliação do FMI sobre os leilões de câmbio múltiplos",
    politicsSummary: "Sancionada a Lei Federal 2.004/1953 estabelecendo o monopólio estatal do petróleo e criando a Petrobras ('O petróleo é nosso'); Greve dos 300 Mil operários em SP; nomeação de João Goulart para o Ministério do Trabalho e aumento de 100% no salário mínimo; 'Memorial dos Coronéis'; denúncia do 'Pacto ABC'; morte de Stalin e debates no PCB.",
    mandateGroup: "Governo Getúlio Vargas (1951–1954)",
    category: "Politica",
    inflationNumeric: 20.2,
    externalDebtNumeric: 2.8,
    gdpGrowth: 3.9
  },
  {
    year: "1954",
    leader: "Getúlio Vargas / João Café Filho",
    currencyAndInflation: "Cruzeiro (Cr$); alta inflação, pressão inflacionária e crise monetária; analfabetismo em 46%",
    externalFinancing: "Créditos emergenciais concedidos pelos EUA e bancos privados internacionais; captação de recursos sob intensa crise política",
    debtAndBalance: "Crise nas contas externas e serviço da dívida sob pressão; manutenção de compromissos financeiros",
    fmiRelation: "Tentativas de negociação para apoio ao balanço de pagamentos; monitoramento das contas externas pelo FMI",
    politicsSummary: "Manifesto dos Coronéis; exoneração do ministro João Goulart; reajuste de 100% no salário mínimo mantido; Atentado da Rua Tonelero contra Carlos Lacerda; crise da 'República do Galeão'; rejeição de impeachment no Congresso; suicídio de Getúlio Vargas em 24 de agosto e forte comoção popular; posse de Café Filho; IV Congresso do PCB; hesitação na industrialização sob pressão da UDN.",
    mandateGroup: "Crise Sucessória e Governos Interinos (1954–1955)",
    category: "Politica",
    inflationNumeric: 22.1,
    externalDebtNumeric: 2.9,
    gdpGrowth: 4.8
  },
  {
    year: "1955",
    leader: "João Café Filho / Carlos Luz / Nereu Ramos",
    currencyAndInflation: "Cruzeiro (Cr$); adoção da Instrução 113 da SUMOC para facilitação e atração de capital estrangeiro (importação de máquinas sem cobertura cambial)",
    externalFinancing: "Atração de investimentos estrangeiros diretos e capital produtivo sem cobertura de câmbio",
    debtAndBalance: "Manutenção das obrigações da dívida; cumprimento de compromissos e reajustes na política de importação",
    fmiRelation: "Relações mantidas sem acordos formais de grande porte; consultas técnicas ordinárias com o FMI",
    politicsSummary: "Eleições presidenciais vencidas por Juscelino Kubitschek e João Goulart; cédula oficial de votação e voto feminino; crise política de sucessão; afastamento de Café Filho; tentativas de golpe da UDN impedidas pelo 'contragolpe preventivo' / 'Novembrada' (11 de Novembro) liderado pelo Marechal Lott; presidências interinas de Carlos Luz e Nereu Ramos; fundação do ISEB e SAPPP (Liga Camponesa de Galileia); movimento camponês por terras.",
    mandateGroup: "Crise Sucessória e Governos Interinos (1954–1955)",
    category: "Politica",
    inflationNumeric: 18.5,
    externalDebtNumeric: 3.0,
    gdpGrowth: 8.2
  },
  {
    year: "1956",
    leader: "Juscelino Kubitschek",
    currencyAndInflation: "Cruzeiro (Cr$); aceleração da taxa de inflação",
    externalFinancing: "Entrada massiva de capital estrangeiro, investimentos de empresas multinacionais e empréstimos do Eximbank para setores automobilístico e de infraestrutura",
    debtAndBalance: "Aumento dos compromissos futuros da dívida externa e pagamento regular das parcelas",
    fmiRelation: "Negociações iniciais para suporte aos investimentos estatais e ao Plano de Metas",
    politicsSummary: "Início da gestão de Juscelino Kubitschek e lançamento do Plano de Metas ('50 anos em 5', 31 metas); expansão da indústria automobilística e criação do GEIA; início das obras de Brasília; debelação da revolta militar de Jacareacanga; crise no PCB após Relatório Kruschev; fundação da Frente Parlamentar Nacionalista (FPN); Poesia Concreta.",
    mandateGroup: "Governo Juscelino Kubitschek (1956–1960)",
    category: "Economia",
    inflationNumeric: 20.4,
    externalDebtNumeric: 3.1,
    gdpGrowth: 8.1
  },
  {
    year: "1957",
    leader: "Juscelino Kubitschek",
    currencyAndInflation: "Cruzeiro (Cr$); promulgação da Nova Tarifa Alfandegária",
    externalFinancing: "Financiamento intensivo e aumento na captação de créditos privados e oficiais no exterior; investimentos multinacionais diretos na indústria automobilística",
    debtAndBalance: "Serviço da dívida em expansão proporcional aos créditos obtidos; crescimento dos compromissos futuros de juros e amortização",
    fmiRelation: "Discussões, debates e discordâncias sobre metas monetárias e termos de austeridade fiscal exigidos pelo FMI",
    politicsSummary: "Execução do Plano de Metas, aceleração industrial por substituição de importações e avanço das obras de Brasília; instalação da fábrica da Volkswagen em São Bernardo do Campo; início de Furnas e Três Marias; Greve dos 400 Mil operários em São Paulo liderada pela Aliança Intersindical.",
    mandateGroup: "Governo Juscelino Kubitschek (1956–1960)",
    category: "Sociedade",
    inflationNumeric: 22.8,
    externalDebtNumeric: 3.15,
    gdpGrowth: 7.2
  },
  {
    year: "1958",
    leader: "Juscelino Kubitschek",
    currencyAndInflation: "Cruzeiro (Cr$); inflação em elevação expressiva, ultrapassando 20% ao ano (24,4% IGP)",
    externalFinancing: "Busca por auxílio financeiro internacional e emergencial de bancos internacionais e do governo dos EUA para cobrir déficits do balanço de pagamentos",
    debtAndBalance: "Dificuldades crescentes de liquidez externa, balanço de pagamentos e acúmulo de compromissos fiscais",
    fmiRelation: "Elaboração do Plano de Estabilização Monetária (PEM) por Lucas Lopes e Roberto Campos para atender exigências do FMI",
    politicsSummary: "Eleições parlamentares com fortalecimento do PSD e PTB; lançamento da Operação Pan-Americana (OPA); aprovação da Declaração de Março do PCB ('nova política' frentista); tentativa fracassada de implementação do PEM; criação da RFFSA; emergência de movimentos de arte engajada.",
    mandateGroup: "Governo Juscelino Kubitschek (1956–1960)",
    category: "Economia",
    inflationNumeric: 24.4,
    externalDebtNumeric: 3.16,
    gdpGrowth: 7.1
  },
  {
    year: "1959",
    leader: "Juscelino Kubitschek",
    currencyAndInflation: "Cruzeiro (Cr$); inflação em forte alta de 39,4% (IGP); escassez e dificuldades de divisas agravadas pela queda do preço do café no mercado internacional",
    externalFinancing: "Suspensão temporária de novas linhas de crédito pelo FMI e credores associados devido à recusa do plano de ajuste; dependência de empréstimos externos",
    debtAndBalance: "Dívida externa de US$ 3,16 bilhões a US$ 3,18 bilhões; atrasos e renegociações diretas de prazos com credores privados e bancos norte-americanos",
    fmiRelation: "Rompimento formal do presidente JK com o FMI, recusando publicamente as exigências de austeridade e o plano de estabilização impostos pelo Fundo",
    politicsSummary: "Rompimento de JK com o FMI e adoção de postura nacionalista-desenvolvimentista; Revolta de Aragarças; desapropriação do Engenho Galileia em Pernambuco; criação da Superintendência do Desenvolvimento do Nordeste (SUDENE); aprovação do 13º salário na Câmara; efervescência cultural com o lançamento da Bossa Nova; avanço das teses do ISEB e abertura política do PCB; 56 sindicatos rurais registrados.",
    mandateGroup: "Governo Juscelino Kubitschek (1956–1960)",
    category: "Sociedade",
    inflationNumeric: 39.4,
    externalDebtNumeric: 3.18,
    gdpGrowth: 9.8
  },
  {
    year: "1960",
    leader: "Juscelino Kubitschek",
    currencyAndInflation: "Cruzeiro (Cr$); inflação elevada de 30,5% (IGP)",
    externalFinancing: "Retomada gradual de investimentos estrangeiros e empréstimos diretos; busca por fontes alternativas de financiamento na Europa e uso de endividamento interno",
    debtAndBalance: "Dívida externa atinge US$ 3,738 bilhões; pressão continuada sobre reservas cambiais e pagamentos do serviço da dívida",
    fmiRelation: "Relações diplomático-financeiras congeladas com o FMI, mantendo o afastamento das exigências de ajuste recessivo",
    politicsSummary: "Inauguração de Brasília em 21 de abril como nova capital federal; encerramento do governo JK com alto crescimento industrial, contradições estruturais e alta inflação; eleições presidenciais diretas (12,586 milhões de eleitores) com vitória de Jânio Quadros para presidente e João Goulart para vice; jingles eleitorais; V Congresso do PCB; Resolução 1.514 da ONU sobre descolonização.",
    mandateGroup: "Governo Juscelino Kubitschek (1956–1960)",
    category: "Politica",
    inflationNumeric: 30.5,
    externalDebtNumeric: 3.738,
    gdpGrowth: 6.7
  },
  {
    year: "1961",
    leader: "Juscelino Kubitschek / Jânio Quadros / Ranieri Mazzilli / João Goulart",
    currencyAndInflation: "Cruzeiro (Cr$); desvalorização cambial pela Instrução 204 da SUMOC (de Cr$ 90 para Cr$ 200 por dólar); inflação em alta superando 30% (33,29% a 47,8%)",
    externalFinancing: "Liberação de US$ 726 milhões em créditos e renegociação de dívidas na Europa (Clube de Paris) e EUA",
    debtAndBalance: "Dívida externa acumulada em US$ 3,291 bilhões; reestruturação e adiamento do perfil de pagamentos externos",
    fmiRelation: "Reaproximação e reabertura de negociações formais com o FMI; adoção de programa econômico alinhado às diretrizes do Fundo pelo ministro Clemente Mariani",
    politicsSummary: "Posse de Jânio Quadros em janeiro; Política Externa Independente (PEI); condecoração de Che Guevara; renúncia de Jânio Quadros em 25 de agosto; veto dos ministros militares à posse de Jango; Campanha da Legalidade liderada por Leonel Brizola; Emenda Constitucional do Parlamentarismo e posse de Jango; reatamento com a URSS; fundação da ADP; efervescência social no campo e radicalização estudantil.",
    mandateGroup: "Crise Institucional: Jânio e Jango (1961–1964)",
    category: "Politica",
    inflationNumeric: 47.8,
    externalDebtNumeric: 3.291,
    gdpGrowth: 8.6
  },
  {
    year: "1962",
    leader: "João Goulart",
    currencyAndInflation: "Cruzeiro (Cr$); aceleração da inflação para a casa dos 49,4% a 50% ao ano, acompanhada por desaceleração/estagnação do crescimento; analfabetismo em 36%",
    externalFinancing: "Restrição severa de novos financiamentos e investimentos estrangeiros devido à instabilidade e aprovação da Lei de Remessa de Lucros",
    debtAndBalance: "Serviço da dívida e remessas de lucros somam US$ 596 milhões; pressão de vencimentos da dívida em curto prazo",
    fmiRelation: "Dificuldades em cumprir as metas de estabilização e novos atritos com o FMI frente à inflação ascendente",
    politicsSummary: "Eleições parlamentares gerais (18 milhões de eleitores); expressivo crescimento do PTB e polarização; aprovação da Lei de Remessa de Lucros e do 13º Salário (Lei 4.090); posição na Conferência de Punta del Este contra a expulsão de Cuba; criação do Comando Geral dos Trabalhadores (CGT); Plano Trienal de Celso Furtado e San Tiago Dantas; encampação da ITT por Brizola no RS; IPES, IBAD, CPC da UNE e Ação Popular (AP).",
    mandateGroup: "Crise Institucional: Jânio e Jango (1961–1964)",
    category: "Economia",
    inflationNumeric: 49.4,
    externalDebtNumeric: 3.40,
    gdpGrowth: 6.6
  },
  {
    year: "1963",
    leader: "João Goulart",
    currencyAndInflation: "Cruzeiro (Cr$); inflação em disparada atingindo entre 70% e 80% ao ano",
    externalFinancing: "Bloqueio e congelamento de novos créditos pelo FMI, governo dos EUA e Aliança para o Progresso (Acordo de Washington paralisado)",
    debtAndBalance: "FMI recusa refinanciamento da dívida de US$ 3 bilhões; forte escassez de divisas para o serviço da dívida",
    fmiRelation: "Fracasso do Plano Trienal leva ao rompimento do apoio do FMI e da comunidade financeira internacional por descumprimento de metas inflacionárias",
    politicsSummary: "Plebiscito Nacional em janeiro com vitória maciça do retorno ao Presidencialismo; abandono/falha do Plano Trienal; Estatuto do Trabalhador Rural; Greve dos 700 Mil em SP; Revolta dos Sargentos em Brasília (setembro); estado de sítio retirado; Frente de Mobilização Popular (FMP) e Grupos de Onze de Brizola; criação da Cecla; propostas das Reformas de Base (agrária com indenização em títulos e voto aos analfabetos); aproximações com o bloco soviético.",
    mandateGroup: "Crise Institucional: Jânio e Jango (1961–1964)",
    category: "Politica",
    inflationNumeric: 79.5,
    externalDebtNumeric: 3.50,
    gdpGrowth: 0.6
  },
  {
    year: "1964",
    leader: "João Goulart / Ranieri Mazzilli / Humberto Castelo Branco",
    currencyAndInflation: "Cruzeiro (Cr$); inflação em pico histórico entre 87% e 100% ao ano acompanhada por desaceleração econômica",
    externalFinancing: "Retomada imediata dos fluxos de crédito, auxílio financeiro e apoio dos EUA/FMI após o golpe; Operação Brother Sam (suporte logístico militar norte-americano)",
    debtAndBalance: "Renegociação emergencial da dívida de cerca de US$ 3 bilhões com vencimentos em curto prazo no âmbito do Clube de Paris",
    fmiRelation: "Reconciliação plena e assinatura de novos acordos de stand-by com o FMI sob o novo regime militar",
    politicsSummary: "Comício das Reformas de Base na Central do Brasil (13 de março); decretos da SUPRA e encampação de refinarias privadas; Marcha da Família com Deus pela Liberdade; Revolta dos Marinheiros; discurso de Jango no Automóvel Clube (30 de março); Golpe Civil-Militar (31 de março a 1º de abril) e deposição de João Goulart; posse interina de Ranieri Mazzilli e eleição indireta do Marechal Humberto Castelo Branco; AI-1, cassações e perseguições políticas; fim da Quarta República; início da ditadura militar; publicação do PAEG; fechamento do MCP e CPC da UNE.",
    mandateGroup: "Crise Institucional: Jânio e Jango (1961–1964)",
    category: "Politica",
    inflationNumeric: 91.4,
    externalDebtNumeric: 3.80,
    gdpGrowth: 3.4
  }
];

interface MandateSummary {
  mandateName: string;
  president: string;
  period: string;
  avgInflation: number;
  finalDebt: number;
  avgGdp: number;
  tensionLevel: 'Baixa (Verde)' | 'Média (Amarelo)' | 'Alta (Laranja)' | 'Crítica (Vermelho)';
  tensionPercent: number; // 0 to 100 for progress bar
  colorClass: string;
  summaryText: string;
  years: EconomicYearData[];
}

const mandateSummaries: MandateSummary[] = [
  {
    mandateName: "Transição e Governo Eurico Gaspar Dutra",
    president: "Eurico Gaspar Dutra",
    period: "1945 - 1951",
    avgInflation: 10.1,
    finalDebt: 2.25,
    avgGdp: 5.8,
    tensionLevel: "Baixa (Verde)",
    tensionPercent: 25,
    colorClass: "bg-emerald-500",
    summaryText: "Fim do Estado Novo, promulgação da Constituição de 1946, alinhamento aos EUA na Guerra Fria, cassação do PCB e lançamento do Plano SALTE.",
    years: preciseEconomicDataWithGDP.filter(d => d.mandateGroup === "Transição e Governo Dutra (1945–1951)")
  },
  {
    mandateName: "Governo Getúlio Vargas",
    president: "Getúlio Vargas",
    period: "1951 - 1954",
    avgInflation: 16.7,
    finalDebt: 2.9,
    avgGdp: 5.3,
    tensionLevel: "Média (Amarelo)",
    tensionPercent: 55,
    colorClass: "bg-amber-500",
    summaryText: "Nacional-desenvolvimentismo de base. Criação da Petrobras (1953) e do BNDE. Crise política decorrente da oposição e suicídio de Vargas em agosto de 1954.",
    years: preciseEconomicDataWithGDP.filter(d => d.mandateGroup === "Governo Getúlio Vargas (1951–1954)")
  },
  {
    mandateName: "Crise Sucessória e Governos Interinos",
    president: "Café Filho / Carlos Luz / Nereu Ramos",
    period: "1954 - 1955",
    summaryText: "Instabilidade pós-suicídio de Vargas. Adoção da Instrução 113 da SUMOC (entrada de multinacionais). Contragolpe preventivo do Marechal Lott para garantir a posse de JK.",
    avgInflation: 20.3,
    finalDebt: 3.0,
    avgGdp: 6.5,
    tensionLevel: "Alta (Laranja)",
    tensionPercent: 75,
    colorClass: "bg-orange-500",
    years: preciseEconomicDataWithGDP.filter(d => d.mandateGroup === "Crise Sucessória e Governos Interinos (1954–1955)")
  },
  {
    mandateName: "Governo Juscelino Kubitschek",
    president: "Juscelino Kubitschek",
    period: "1956 - 1960",
    summaryText: "Plano de Metas ('50 anos em 5'), expansão industrial, inauguração de Brasília (1960), criação da SUDENE e rompimento formal com o FMI em 1959.",
    avgInflation: 27.5,
    finalDebt: 3.738,
    avgGdp: 7.9,
    tensionLevel: "Média (Amarelo)",
    tensionPercent: 50,
    colorClass: "bg-amber-500",
    years: preciseEconomicDataWithGDP.filter(d => d.mandateGroup === "Governo Juscelino Kubitschek (1956–1960)")
  },
  {
    mandateName: "Crise Institucional: Jânio e Jango",
    president: "Jânio Quadros / João Goulart",
    period: "1961 - 1964",
    summaryText: "Renúncia de Jânio, Campanha da Legalidade, parlamentarismo, propostas das Reformas de Base e Golpe Civil-Militar em 31 de março de 1964.",
    avgInflation: 67.0,
    finalDebt: 3.80,
    avgGdp: 4.8,
    tensionLevel: "Crítica (Vermelho)",
    tensionPercent: 98,
    colorClass: "bg-rose-600",
    years: preciseEconomicDataWithGDP.filter(d => d.mandateGroup === "Crise Institucional: Jânio e Jango (1961–1964)")
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Analisando a matriz e o documento histórico, qual presidente registrou a menor inflação anual do período (3,4% em 1948) sob o regime restritivo do Plano SALTE?",
    options: [
      "Getúlio Vargas (1953)",
      "Eurico Gaspar Dutra (1948)",
      "Juscelino Kubitschek (1959)",
      "João Goulart (1963)"
    ],
    answer: 1,
    explanation: "Em 1948, no governo de Eurico Gaspar Dutra, a adoção de política liberal de contenção e o Plano SALTE reduziram a inflação para 3,4% (IPC-RJ)."
  },
  {
    id: 2,
    question: "O que motivou o rompimento formal do presidente Juscelino Kubitschek com o FMI em 1959?",
    options: [
      "A exigência de planos de estabilização com severas políticas de austeridade fiscal que comprometiam o 'Plano de Metas'.",
      "A proibição absoluta de entrada de capitais de empresas multinacionais no setor automobilístico brasileiro.",
      "A decisão do governo brasileiro de adotar o socialismo soviético e romper laços comerciais com o Ocidente.",
      "A queda repentina e definitiva do preço internacional do petróleo no mercado de Nova York."
    ],
    answer: 0,
    explanation: "JK recusou as exigências recessivas do Fundo Monetário Internacional em 1959 para preservar os investimentos estatais e o ritmo do Plano de Metas."
  },
  {
    id: 3,
    question: "Qual foi o impacto da Instrução 113 da SUMOC (1955) adotada no governo interino de Café Filho?",
    options: [
      "Restringiu a circulação de moedas estrangeiras no mercado interno brasileiro.",
      "Permitiu a importação de máquinas e equipamentos estrangeiros sem cobertura cambial, facilitando a vinda de multinacionais e o capital produtivo.",
      "Estabeleceu o controle estatal rígido sobre o câmbio e proibiu empréstimos internacionais.",
      "Criou o monopólio exclusivo das empresas estatais na fabricação de automóveis."
    ],
    answer: 1,
    explanation: "A Instrução 113 da SUMOC facilitou a atração de investimentos estrangeiros diretos e a importação de maquinário sem cobertura cambial."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'timeline' | 'chart' | 'table-view' | 'quiz' | 'scenario' | 'bncc'>('matrix');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [mandateFilter, setMandateFilter] = useState<string>('all');

  // Accordion state for timeline
  const [expandedMandates, setExpandedMandates] = useState<Record<string, boolean>>({});
  
  // Comparison state for timeline
  const [compareGovA, setCompareGovA] = useState<string>("Governo Getúlio Vargas");
  const [compareGovB, setCompareGovB] = useState<string>("Governo Juscelino Kubitschek");

  const toggleMandateAccordion = (mandateName: string) => {
    setExpandedMandates(prev => ({ ...prev, [mandateName]: !prev[mandateName] }));
  };

  // Interactive column toggles for the Economic & Political Matrix
  interface ColumnVisibility {
    leader: boolean;
    currencyAndInflation: boolean;
    externalFinancing: boolean;
    debtAndBalance: boolean;
    gdpGrowth: boolean;
    fmiRelation: boolean;
    politicsSummary: boolean;
  }

  const [showColumns, setShowColumns] = useState<ColumnVisibility>({
    leader: true,
    currencyAndInflation: true,
    externalFinancing: true,
    debtAndBalance: true,
    gdpGrowth: true,
    fmiRelation: true,
    politicsSummary: true
  });

  const toggleColumn = (col: keyof ColumnVisibility) => {
    setShowColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const filteredMatrixData = useMemo(() => {
    return preciseEconomicDataWithGDP.filter(item => {
      const matchesMandate = mandateFilter === 'all' || item.mandateGroup === mandateFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesSearch = searchTerm === '' ||
        item.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.currencyAndInflation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.externalFinancing.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.debtAndBalance.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fmiRelation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.politicsSummary.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesMandate && matchesCategory && matchesSearch;
    });
  }, [mandateFilter, categoryFilter, searchTerm]);

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const correctCount = useMemo(() => {
    let count = 0;
    quizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.answer) count++;
    });
    return count;
  }, [userAnswers]);

  // Scenario simulator state
  const [scenarioStep, setScenarioStep] = useState<number>(0);
  const [scenarioScore, setScenarioScore] = useState<number>(0);
  const [scenarioFeedback, setScenarioFeedback] = useState<string | null>(null);

  const scenarioData = [
    {
      id: 1,
      title: "Cenário 1: O Dilema Cambial de Dutra (1947)",
      context: "As reservas de dólares acumuladas na Segunda Guerra estão se esgotando devido à importação massiva. A inflação pressiona as contas públicas.",
      options: [
        { text: "Manter a política de portas abertas às importações e gastar o restante das reservas cambiais.", correct: false, feedback: "Incorreto! Isso provocou rápida dilapidação das reservas e crise externa." },
        { text: "Instituir controle rígido de divisas e licenças prévias de importação (CEXIM).", correct: true, feedback: "Correto! Dutra instituiu o controle cambial e licenças para estancar a evasão de divisas." },
        { text: "Romper relações com os Estados Unidos e adotar o fechamento econômico total.", correct: false, feedback: "Incorreto! O governo de Dutra manteve alinhamento geopolítico com os EUA." }
      ]
    },
    {
      id: 2,
      title: "Cenário 2: A Campanha do Petróleo e a Pressão dos Coronéis (1953)",
      context: "Getúlio Vargas cria a Petrobras para monopolizar o petróleo, gerando reações da oposição e o 'Memorial dos Coronéis'.",
      options: [
        { text: "Recuar do monopólio estatal e entregar o setor às petroleiras internacionais.", correct: false, feedback: "Incorreto! Getúlio resistiu e sancionou a Lei 2.004 ('O petróleo é nosso')." },
        { text: "Manter o projeto da Petrobras e nomear João Goulart para o Ministério do Trabalho.", correct: true, feedback: "Correto! Vargas apostou na aliança popular-trabalhista para contrabalançar a oposição." },
        { text: "Fechar o Congresso Nacional e decretar estado de sítio militar.", correct: false, feedback: "Incorreto! Vargas operou dentro da legalidade institucional." }
      ]
    },
    {
      id: 3,
      title: "Cenário 3: O Impasse com o FMI e o Plano de Metas de JK (1959)",
      context: "O FMI exige austeridade fiscal rigorosa para refinanciar a dívida. A inflação bate 39,4%.",
      options: [
        { text: "Aceitar as exigências do FMI, congelar salários e paralisar as obras de Brasília.", correct: false, feedback: "Incorreto! Isso travaria o 'Plano de Metas' e o crescimento industrial." },
        { text: "Romper publicamente com o FMI, rejeitar a austeridade e manter o ritmo desenvolvimentista.", correct: true, feedback: "Correto! JK rompeu com o FMI em 1959, priorizando a expansão e Brasília." },
        { text: "Decretar moratória total e confiscar poupanças estrangeiras.", correct: false, feedback: "Incorreto! JK manteve a atração de capitais estrangeiros privados." }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Cabeçalho */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-inner text-white">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">República Liberal-Democrática (1945–1964)</h1>
              <p className="text-slate-400 text-xs mt-0.5">Painel Didático Interativo • Ensino Médio & ENEM</p>
            </div>
          </div>

          {/* Navegação por Abas Principais */}
          <nav className="flex flex-wrap bg-slate-800 p-1.5 rounded-xl border border-slate-700 gap-1">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'matrix' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>Matriz Histórica Oficial</span>
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'timeline' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Linha do Tempo por Mandato</span>
            </button>
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'chart' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Gráficos ENEM</span>
            </button>
            <button
              onClick={() => setActiveTab('table-view')}
              className={`px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'table-view' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Tabela do Gráfico</span>
            </button>
            <button
              onClick={() => setActiveTab('scenario')}
              className={`px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'scenario' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Simulador</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'quiz' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Quiz</span>
            </button>
            <button
              onClick={() => setActiveTab('bncc')}
              className={`px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'bncc' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>BNCC</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 space-y-6">

        {/* 1. ABA PRINCIPAL: MATRIZ HISTÓRICA OFICIAL */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2">
                <span className="bg-blue-500/30 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30">
                  Documentação Histórica + Indicadores Macroeconômicos
                </span>
                <h2 className="text-xl md:text-2xl font-bold">Matriz de Indicadores Econômicos, PIB e Políticos (1945–1964)</h2>
                <p className="text-slate-300 text-sm max-w-2xl">
                  Manipule as colunas e filtros abaixo para cruzar dados de inflação, dívida externa, PIB e conjuntura política.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm text-center min-w-[180px]">
                <p className="text-xs text-slate-300 uppercase font-medium">Períodos</p>
                <p className="text-3xl font-extrabold text-blue-200">{filteredMatrixData.length} Anos</p>
              </div>
            </div>

            {/* Controles de Coluna */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Personalizar Colunas Visíveis</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Clique para exibir ou ocultar colunas da matriz.</p>
                </div>
                <button
                  onClick={() => setShowColumns({ leader: true, currencyAndInflation: true, externalFinancing: true, debtAndBalance: true, gdpGrowth: true, fmiRelation: true, politicsSummary: true })}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
                >
                  Exibir Todas
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => toggleColumn('leader')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${
                    showColumns.leader ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                  }`}
                >
                  {showColumns.leader ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>Governante</span>
                </button>
                <button
                  onClick={() => toggleColumn('currencyAndInflation')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${
                    showColumns.currencyAndInflation ? 'bg-rose-50 text-rose-700 border-rose-300' : 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                  }`}
                >
                  {showColumns.currencyAndInflation ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>Moeda, Inflação & Câmbio</span>
                </button>
                <button
                  onClick={() => toggleColumn('externalFinancing')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${
                    showColumns.externalFinancing ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                  }`}
                >
                  {showColumns.externalFinancing ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>Financiamento Externo</span>
                </button>
                <button
                  onClick={() => toggleColumn('debtAndBalance')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${
                    showColumns.debtAndBalance ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                  }`}
                >
                  {showColumns.debtAndBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>Dívida Externa & Balanço</span>
                </button>
                <button
                  onClick={() => toggleColumn('gdpGrowth')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${
                    showColumns.gdpGrowth ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                  }`}
                >
                  {showColumns.gdpGrowth ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>Crescimento do PIB (%)</span>
                </button>
                <button
                  onClick={() => toggleColumn('fmiRelation')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${
                    showColumns.fmiRelation ? 'bg-purple-50 text-purple-700 border-purple-300' : 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                  }`}
                >
                  {showColumns.fmiRelation ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>Relação com FMI</span>
                </button>
                <button
                  onClick={() => toggleColumn('politicsSummary')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${
                    showColumns.politicsSummary ? 'bg-sky-50 text-sky-700 border-sky-300' : 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                  }`}
                >
                  {showColumns.politicsSummary ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>Política & Sociedade</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Buscar termo na matriz..."
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <select
                    value={mandateFilter}
                    onChange={e => setMandateFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Todos os Governos / Mandatos</option>
                    <option value="Transição e Governo Dutra (1945–1951)">Transição e Governo Dutra (1945–1951)</option>
                    <option value="Governo Getúlio Vargas (1951–1954)">Governo Getúlio Vargas (1951–1954)</option>
                    <option value="Crise Sucessória e Governos Interinos (1954–1955)">Crise Sucessória e Governos Interinos (1954–1955)</option>
                    <option value="Governo Juscelino Kubitschek (1956–1960)">Governo Juscelino Kubitschek (1956–1960)</option>
                    <option value="Crise Institucional: Jânio e Jango (1961–1964)">Crise Institucional: Jânio e Jango (1961–1964)</option>
                  </select>
                </div>
                <div>
                  <select
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Todas as Categorias</option>
                    <option value="Politica">Política & Institucional</option>
                    <option value="Economia">Economia & Moeda</option>
                    <option value="Sociedade">Sociedade & Cultura</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tabela */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white font-semibold uppercase tracking-wider text-[11px]">
                      <th className="p-3.5">Ano</th>
                      {showColumns.leader && <th className="p-3.5">Governante / Executivo</th>}
                      {showColumns.currencyAndInflation && <th className="p-3.5">Moeda, Inflação & Câmbio</th>}
                      {showColumns.externalFinancing && <th className="p-3.5">Financiamento Externo</th>}
                      {showColumns.debtAndBalance && <th className="p-3.5">Dívida Externa & Balanço</th>}
                      {showColumns.gdpGrowth && <th className="p-3.5">Crescimento PIB (%)</th>}
                      {showColumns.fmiRelation && <th className="p-3.5">Relação com FMI</th>}
                      {showColumns.politicsSummary && <th className="p-3.5">Política & Sociedade</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {filteredMatrixData.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50/80 transition">
                        <td className="p-3.5 font-bold text-blue-600 whitespace-nowrap">{row.year}</td>
                        {showColumns.leader && (
                          <td className="p-3.5 font-medium text-slate-900">{row.leader}</td>
                        )}
                        {showColumns.currencyAndInflation && (
                          <td className="p-3.5 text-slate-600 min-w-[200px]">{row.currencyAndInflation}</td>
                        )}
                        {showColumns.externalFinancing && (
                          <td className="p-3.5 text-slate-600 min-w-[200px]">{row.externalFinancing}</td>
                        )}
                        {showColumns.debtAndBalance && (
                          <td className="p-3.5 text-slate-600 min-w-[220px]">{row.debtAndBalance}</td>
                        )}
                        {showColumns.gdpGrowth && (
                          <td className="p-3.5 whitespace-nowrap">
                            <span className={`font-semibold px-2 py-0.5 rounded text-xs ${row.gdpGrowth > 6 ? 'bg-blue-100 text-blue-800' : row.gdpGrowth < 2 ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-800'}`}>
                              +{row.gdpGrowth}%
                            </span>
                          </td>
                        )}
                        {showColumns.fmiRelation && (
                          <td className="p-3.5 text-slate-600 min-w-[180px]">{row.fmiRelation}</td>
                        )}
                        {showColumns.politicsSummary && (
                          <td className="p-3.5 text-slate-600 min-w-[260px]">{row.politicsSummary}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. ABA LINHA DO TEMPO POR MANDATO (COM ACORDEONS, BADGES, TENSÃO E COMPARAÇÃO) */}
        {activeTab === 'timeline' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* Cabeçalho explicativo */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>Linha do Tempo Vertical por Mandato (1945–1964)</span>
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Clique nos nós para expandir a conjuntura. Observe os níveis de tensão política/inflacionária e utilize a ferramenta de comparação abaixo.
                </p>
              </div>
            </div>

            {/* Ferramenta de Comparação Lado a Lado */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-md space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-700 pb-3">
                <Scale className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold">Modo Comparação Lado a Lado de Governos</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Selecione o Governo A:</label>
                  <select
                    value={compareGovA}
                    onChange={e => setCompareGovA(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {mandateSummaries.map(m => (
                      <option key={m.mandateName} value={m.mandateName}>{m.mandateName} ({m.period})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Selecione o Governo B:</label>
                  <select
                    value={compareGovB}
                    onChange={e => setCompareGovB(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {mandateSummaries.map(m => (
                      <option key={m.mandateName} value={m.mandateName}>{m.mandateName} ({m.period})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Display de Comparação */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
                {(() => {
                  const govA = mandateSummaries.find(m => m.mandateName === compareGovA) || mandateSummaries[0];
                  const govB = mandateSummaries.find(m => m.mandateName === compareGovB) || mandateSummaries[1];
                  return (
                    <>
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                        <span className="text-xs bg-blue-600/30 text-blue-300 px-2.5 py-0.5 rounded font-semibold">{govA.period}</span>
                        <h4 className="font-bold text-base text-white">{govA.mandateName}</h4>
                        <p className="text-xs text-slate-300"><strong>Presidente:</strong> {govA.president}</p>
                        <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                          <div className="bg-slate-900/60 p-2 rounded">
                            <p className="text-slate-400">Inflação Média</p>
                            <p className="font-bold text-rose-400">~{govA.avgInflation}%</p>
                          </div>
                          <div className="bg-slate-900/60 p-2 rounded">
                            <p className="text-slate-400">Dívida Final</p>
                            <p className="font-bold text-amber-400">${govA.finalDebt} bi</p>
                          </div>
                          <div className="bg-slate-900/60 p-2 rounded">
                            <p className="text-slate-400">PIB Médio</p>
                            <p className="font-bold text-emerald-400">+{govA.avgGdp}%</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 pt-1"><strong>Resumo:</strong> {govA.summaryText}</p>
                      </div>

                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                        <span className="text-xs bg-indigo-600/30 text-indigo-300 px-2.5 py-0.5 rounded font-semibold">{govB.period}</span>
                        <h4 className="font-bold text-base text-white">{govB.mandateName}</h4>
                        <p className="text-xs text-slate-300"><strong>Presidente:</strong> {govB.president}</p>
                        <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                          <div className="bg-slate-900/60 p-2 rounded">
                            <p className="text-slate-400">Inflação Média</p>
                            <p className="font-bold text-rose-400">~{govB.avgInflation}%</p>
                          </div>
                          <div className="bg-slate-900/60 p-2 rounded">
                            <p className="text-slate-400">Dívida Final</p>
                            <p className="font-bold text-amber-400">${govB.finalDebt} bi</p>
                          </div>
                          <div className="bg-slate-900/60 p-2 rounded">
                            <p className="text-slate-400">PIB Médio</p>
                            <p className="font-bold text-emerald-400">+{govB.avgGdp}%</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 pt-1"><strong>Resumo:</strong> {govB.summaryText}</p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Linha do Tempo Vertical com Nós Clicáveis (Accordions) */}
            <div className="relative border-l-2 border-blue-200 ml-4 md:ml-6 space-y-6 pl-6 md:pl-8">
              {mandateSummaries.map((mandate, idx) => {
                const isExpanded = !!expandedMandates[mandate.mandateName];

                return (
                  <div key={idx} className="relative bg-white border border-slate-200 rounded-2xl shadow-sm transition hover:shadow-md">
                    {/* Nó na linha */}
                    <span className="absolute -left-[35px] md:-left-[43px] top-6 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow"></span>

                    {/* Cabeçalho Clicável do Accordion */}
                    <div
                      onClick={() => toggleMandateAccordion(mandate.mandateName)}
                      className="p-5 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-md">
                            {mandate.period}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 uppercase">
                            Executivo: {mandate.president}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{mandate.mandateName}</h3>
                      </div>

                      {/* Dados Macroeconômicos Principais no Cabeçalho */}
                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 uppercase font-semibold">Tensão Política / Inflação</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-slate-700">{mandate.tensionLevel}</span>
                            <div className="w-24 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                              <div className={`${mandate.colorClass} h-full rounded-full`} style={{ width: `${mandate.tensionPercent}%` }}></div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                        </div>
                      </div>
                    </div>

                    {/* Detalhes Expandidos da Conjuntura (Acordo / Accordion) */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 animate-fadeIn">
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">
                          {mandate.summaryText}
                        </p>

                        <div className="space-y-3 pt-2">
                          <p className="text-xs font-bold text-slate-500 uppercase">Marcos Históricos Categorizados por Dimensão:</p>
                          {mandate.years.map((yearData, yIdx) => (
                            <div key={yIdx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-extrabold text-blue-600 text-sm">Ano {yearData.year}</span>
                                <div className="flex gap-1.5 flex-wrap">
                                  <span className="bg-purple-100 text-purple-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-purple-200">
                                    🏛️ Política
                                  </span>
                                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                                    📈 Economia (+{yearData.gdpGrowth}% PIB)
                                  </span>
                                  <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-200">
                                    🌍 Relações Internacionais
                                  </span>
                                  <span className="bg-sky-100 text-sky-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-sky-200">
                                    👥 Sociedade/Cultura
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                                <p><strong>Moeda/Câmbio:</strong> {yearData.currencyAndInflation}</p>
                                <p><strong>Dívida Externa:</strong> ${yearData.externalDebtNumeric} bi ({yearData.debtAndBalance.substring(0, 80)}...) </p>
                                <p className="md:col-span-2"><strong>Panorama Político:</strong> {yearData.politicsSummary}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. ABA GRÁFICOS ENEM */}
        {activeTab === 'chart' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Gráfico Composto ENEM: Crescimento PIB (%) vs Inflação (%) vs Dívida Externa (US$ bi)</span>
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Gráfico híbrido combinando Área (PIB), Barras (Inflação) e Linha (Dívida Externa).
                </p>
              </div>
              <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-200">
                Modelo ENEM de Múltiplas Variáveis
              </span>
            </div>

            <div className="w-full h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={preciseEconomicDataWithGDP} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#e11d48" fontSize={12} unit="%" />
                  <YAxis yAxisId="right" orientation="right" stroke="#2563eb" fontSize={12} unit="bi" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', border: 'none' }}
                    formatter={(value: any, name: any) => {
                      if (name === 'Inflação Anual (%)') return [`${value}%`, name];
                      if (name === 'Dívida Externa (US$ bi)') return [`$${value} bilhões`, name];
                      if (name === 'Crescimento do PIB (%)') return [`+${value}%`, name];
                      return [value, name];
                    }}
                    labelStyle={{ fontWeight: 'bold', color: '#93c5fd' }}
                  />
                  <Legend />
                  <Area yAxisId="right" type="monotone" dataKey="gdpGrowth" name="Crescimento do PIB (%)" fill="#93c5fd" stroke="#3b82f6" fillOpacity={0.3} />
                  <Bar yAxisId="left" dataKey="inflationNumeric" name="Inflação Anual (%)" fill="#f43f5e" barSize={14} radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="externalDebtNumeric" name="Dívida Externa (US$ bi)" stroke="#1e293b" strokeWidth={3} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 4. ABA TABELA DO GRÁFICO */}
        {activeTab === 'table-view' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-800">Tradução Gráfico-Tabela (Competência ENEM)</h2>
              <p className="text-slate-500 text-sm mt-1">
                Tabela com PIB, Inflação e Dívida Externa para treinar a conversão de dados gráficos em tabulares.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white font-semibold uppercase tracking-wider text-[11px]">
                      <th className="p-3.5">Ano</th>
                      <th className="p-3.5">Crescimento do PIB (%)</th>
                      <th className="p-3.5">Inflação Anual (%)</th>
                      <th className="p-3.5">Dívida Externa (US$ Bilhões)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {preciseEconomicDataWithGDP.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50 transition">
                        <td className="p-3.5 font-bold text-blue-600">{row.year}</td>
                        <td className="p-3.5">
                          <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">+{row.gdpGrowth}%</span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">{row.inflationNumeric}%</span>
                        </td>
                        <td className="p-3.5 font-semibold text-slate-800">${row.externalDebtNumeric} bi</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. ABA SIMULADOR */}
        {activeTab === 'scenario' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-3xl mx-auto space-y-6">
            <div className="border-b pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Simulador de Decisões Governamentais</h2>
                <p className="text-slate-500 text-sm">Tome decisões baseadas nos dilemas da documentação histórica.</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                Desafio {scenarioStep + 1} de {scenarioData.length}
              </span>
            </div>

            {scenarioStep < scenarioData.length ? (
              <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                  <h3 className="font-bold text-slate-900 text-base">{scenarioData[scenarioStep].title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{scenarioData[scenarioStep].context}</p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase text-slate-500">Escolha a ação de governo:</p>
                  {scenarioData[scenarioStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setScenarioFeedback(opt.feedback);
                        if (opt.correct) setScenarioScore(prev => prev + 1);
                      }}
                      className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition text-sm text-slate-800 font-medium flex justify-between items-center group"
                    >
                      <span>{opt.text}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                    </button>
                  ))}
                </div>

                {scenarioFeedback && (
                  <div className={`p-4 rounded-xl text-sm font-medium ${scenarioFeedback.includes('Correto') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                    <p>{scenarioFeedback}</p>
                    <button
                      onClick={() => {
                        setScenarioFeedback(null);
                        setScenarioStep(prev => prev + 1);
                      }}
                      className="mt-3 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition"
                    >
                      Próximo Desafio →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  {scenarioScore}/{scenarioData.length}
                </div>
                <h3 className="text-xl font-bold text-slate-900">Simulação Concluída!</h3>
                <button
                  onClick={() => { setScenarioStep(0); setScenarioScore(0); setScenarioFeedback(null); }}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition shadow"
                >
                  Reiniciar Simulador
                </button>
              </div>
            )}
          </div>
        )}

        {/* 6. ABA QUIZ ENEM */}
        {activeTab === 'quiz' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-3xl mx-auto space-y-6">
            <div className="border-b pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Questões Estilo ENEM</h2>
                <p className="text-slate-500 text-sm">Treine com base na documentação historiográfica e nos dados.</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                Acertos: {correctCount}/{quizQuestions.length}
              </span>
            </div>

            <div className="space-y-6">
              {quizQuestions.map((q, index) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCorrect = userAnswers[q.id] === q.answer;

                return (
                  <div key={q.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <p className="font-semibold text-slate-900 text-sm">
                      Questão {index + 1}: {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, optIndex) => {
                        const selected = userAnswers[q.id] === optIndex;
                        let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-100";
                        if (isAnswered) {
                          if (optIndex === q.answer) {
                            btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 font-medium";
                          } else if (selected) {
                            btnStyle = "bg-rose-50 border-rose-300 text-rose-900";
                          }
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => setUserAnswers(prev => ({ ...prev, [q.id]: optIndex }))}
                            className={`w-full text-left p-3 rounded-lg border text-sm transition flex items-start gap-3 ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className={`p-3 rounded-lg text-xs font-medium ${isCorrect ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                        <p><strong>{isCorrect ? '✓ Correta!' : '✗ Incorreta.'}</strong> {q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 7. ABA BNCC */}
        {activeTab === 'bncc' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-3xl mx-auto space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-800">Alinhamento Pedagógico (BNCC & ENEM)</h2>
              <p className="text-slate-500 text-sm">Base documental e estatística para o Ensino Médio.</p>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-blue-600 font-bold">
                  <GraduationCap className="w-5 h-5" />
                  <span>Competência Geral 8 & 9 (Pensamento Crítico e Letramento Histórico)</span>
                </div>
                <p className="text-xs text-slate-600">
                  Análise integrada de indicadores de PIB, inflação, dívida externa e fontes documentais da Quarta República brasileira.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Rodapé */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          República Liberal-Democrática (1945–1964) • Painel Educacional Oficial para o Ensino Médio & ENEM
        </div>
      </footer>
    </div>
  );
}
