# 🏭 UP | Painel de Produção Estratégica

Um dashboard premium, dinâmico e responsivo desenvolvido sob medida para a **Uniformes Paraná**. O sistema foi projetado com o conceito de arquitetura "Card-Based UI" para engolir planilhas brutas exportadas pelo ERP da fábrica e transformá-las em inteligência visual e tomada de decisão instantânea no chão de fábrica.

---

## 💎 O Conceito Visual: "Ilhas de Informação"

Ao contrário dos sistemas corporativos tradicionais e engessados, o **UP Dashboard** utiliza uma interface baseada em cartões flutuantes que funcionam como "ilhas de informação no meio de um oceano".
* **O Oceano (#E8ECEF):** Um fundo cinza-azulado claro e fosco que descansa os olhos do usuário.
* **O Verde Sidebar (#3A4F49):** O verde musgo elegante da marca que dá peso ao menu.
* **O Amarelo Mostarda (#CFA03E):** A cor de ação e celebração para destacar metas batidas e botões.

---

## ✨ Funcionalidades Principais

* **Upload Dinâmico de Relatórios:** Motor de leitura integrado que converte arquivos `.csv` e `.xlsx` diretamente no navegador, sem necessidade de servidores intermediários.
* **Máquina do Tempo (Time Travel State):** Sistema de histórico de uploads com CRUD completo. Os usuários podem navegar por dias anteriores de produção com um clique, isolando os dados de forma segura na memória do navegador (`localStorage`).
* **Prevenção de Erros de UX:** Modais customizados para ações destrutivas (exclusão de histórico) e alertas visuais bloqueantes quando o usuário está visualizando dados temporais antigos.
* **Métricas em Tempo Real:** Cartões de KPI dinâmicos mostrando taxas de eficiência, custos e desperdícios, além de gráficos de rosca e barras interativos.
* **Responsividade Orgânica:** O painel se adapta de forma fluida, desde monitores ultrawide de 27" até as telas menores de 21" usadas na fábrica.

---

## 🛠️ Stack Tecnológica

* **Core:** React.js + Vite (Build tool ultrarrápido)
* **Gráficos:** Recharts (Visualização de dados limpa e moderna)
* **Ícones:** Lucide-React
* **Processamento de Dados:** SheetJS (`xlsx`)
* **Estilização:** CSS Customizado (Sem frameworks intrusivos)

---

## 📋 Layout Padrão da Planilha (O que o ERP precisa exportar)

O motor do sistema espera que o arquivo de dados tenha exatamente os seguintes cabeçalhos na primeira linha:

```csv
ID_Producao,Data,Funcionario,Setor,Produto,Quantidade_Produzida,Meta_Diaria,Pecas_Com_Defeito
```

---

## 🚀 Como Executar o Projeto Localmente

Para rodar este projeto na sua máquina local, siga os passos abaixo:

1. Clone este repositório:
```bash
git clone [https://github.com/SEU_NOME_DE_USUARIO/dashboard-uniformespr.git](https://github.com/SEU_NOME_DE_USUARIO/dashboard-uniformespr.git)
```

2. Acesse a pasta do projeto:
```bash
cd dashboard-uniformespr
```

3. Instale as dependências (motor e bibliotecas):
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. O aplicativo estará rodando no seu navegador no endereço: `http://localhost:5173/`

---

## 🔮 Roadmap de Próximas Atualizações
- [ ] **Módulo Desempenho:** Renderização de barras de progresso individuais por costureira com sistema de gamificação.
- [ ] **Módulo Qualidade:** Gráficos de análise isolando os principais motivos de perdas e não conformidades.
- [ ] **Módulo Relatórios:** Filtros avançados por período e setor, com motor de exportação direta para PDF.

---
**Desenvolvido com foco em escalabilidade e usabilidade por Leandro Palozi (Tech Lead - UP).**
