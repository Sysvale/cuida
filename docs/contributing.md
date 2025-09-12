# Guia de contribuição

Primeiramente, obrigado pelo tempo e iniciativa em contribuir com o Cuida! ❤️

Todos os tipos de contribuição são encorajados e bem-vindos. Esse guia tem como objetivo apresentar as formas como
você pode colaborar, além de trazer algumas diretrizes e recomendações. Por favor, assegure-se de ler as seções do índice relacionadas à sua contribuição antes de abrir algum PR ou issue, isso vai tornar o processo de avaliação e discussão mais ágil e garantir que todos estarão na mesma página.

## Índice

1.  [Quando um componente vai para o Design System?](#quando-um-componente-vai-para-o-design-system)
2.  [Como contribuir?](#como-contribuir)
    1.  [Fluxos de contribuição](#fluxos-de-contribuição)
    2.  [Solicitando uma Feature](#solicitando-uma-feature)
    3.  [Reportando um bug](#reportando-um-bug)
    4.  [Ajudando com a documentação](#ajudando-com-a-documentação)
3.  [Git strategy](#git-strategy)
4.  [Convenções de código](#convenções-de-código)
5.  [Automações](#automações)
6.  [Processo de release](#processo-de-release)

<br>
  
## Quando um componente vai para o Design System?

Caso você esteja com dúvida se o componente que você está desenvolvendo deve ou não ir para o Cuida, aqui vão algumas perguntas que recomendamos que você e seu time façam antes de submeter pull requests ou feature requests:

### 1. O componente que estou propondo é aplicável apenas no projeto no qual trabalho ou em algum outro?

O Design System é um produto que serve a outros produtos e hospeda um conjunto de componentes, tokens e diretrizes aplicáveis a esses produtos e não a apenas um deles. Caso o componente que você está desenvolvendo ou deseja solicitar desenvolvimento seja muito específico, recomendamos o seguinte: preferivelmente, verifique se ele não pode ser substituído por algum dos componentes já implementados no Cuida, se não for esse o caso, o escopo dele deve ser local, devendo ser implementado no contexto do seu projeto.

De acordo com o segundo princípio de design systems, de Nathan Curtis:

> Inclua o que é compartilhado, omita o que não é. (_Include what’s shared, omit what’s not._)

Caso o componente em questão tenha uma aplicabilidade geral e você não o encontre no nosso DS, pode ser que ele seja uma ótima adição ao Cuida 😃

<br>

### 2. O componente que estou propondo está em consistência com a linguagem de design e princípios do Cuida?

Toda contribuição ao Cuida deve ser normalizada aos padrões do design system, isto é, deve ser implementada a partir dos tokens do Cuida, suas diretrizes e convenções. Caso você proponha um componente que não siga esses guidelines, ele tem poucas chances de ser aceito. Se ainda assim você julga ser uma contribuição relevante, recomendamos levar essa discussão a uma reunião de planejamento do design system ou entrar em contato com outros designers e desenvolvedores mais experientes no projeto, eles vão te ajudar a normalizar o componente ou até recomendar que você sugira um novo token ou modificação de alguma das guidelines do DS.

<br>

### 3. O componente que estou propondo já possui recomendações de uso e uma API bem definida?

Um dos pré-requisitos para que um componente seja aceito no design system é que ele possua uma documentação com recomendações de uso e orientações sobre como interagir com sua API. Se você estiver com dificuldades para articular ideias sobre como o componente deve ser utilizado ou como deve ser possível interagir com ele, há chances de que ele ainda não esteja maduro o suficiente para ser adicionado ao DS e utilizado em outros projetos. Nesse cenário, recomendamos trabalhar um pouco mais no componente e pesquisar sobre elementos semelhantes em outros design systems e como eles são utilizados.

<br>
<br>

## Como contribuir?

### Fluxos de contribuição

No nosso processo de trabalho, existem 3 fluxos de contribuição e cada um deles compartilha muitas etapas com os outros. A escolha de qual dos fluxos seguir depende muito do tipo de time no qual você trabalha. Para mais detalhes, consultar imagem abaixo.

-   Request flow: fluxo de contribuição indicado para times que não possuem Designer ou Dev front-end;

-   Design flow: fluxo indicado para times que possuem designer e se percebeu a oportunidade / necessidade de desenvolver um novo componente durante o desenvolvimento dos mockups ou na planning;

-   Dev flow: fluxo de contribuição indicado para times que não possuem designer ou em momentos nos quais se percebeu a oportunidade / necessidade de desenvolver um componente apenas durante o desenvolvimento, após feitos mockups e planning;

![FluxosDeContribuicao](https://user-images.githubusercontent.com/20057968/179429846-29c4bf65-65a4-4f17-8094-c8ea0f07096f.png)

## Solicitando uma feature

A solicitação de features no Cuida pode envolver a criação / melhoria de componentes e de tokens, melhorias de CI/CD ou aprimoramento da nossa documentação com foco nos testes de UI. Para solicitar componentes, temos algumas recomendações que estão listadas abaixo. Caso deseje solicitar features relacionadas às outras categorias mencionadas, basta criar uma issue. 😊

#### Antes de solicitar um componente

Caso deseje solicitar um componente, recomendamos fortemente a leitura do tópico [Quando um componente vai para o Design System?](#quando-um-componente-vai-para-o-design-system) para aumentar as chances da sua solicitação ser atendida. Além disso, pedimos o seguinte:

-   Procure na [documentação](https://sysvale.github.io/cuida/?path=/docs/funda%C3%A7%C3%A3o-principios--page) se o componente que você precisa já não foi implementado;
-   Cheque na [lista de issues](https://github.com/Sysvale/cuida/issues) se não há solicitações semelhantes à sua;
-   Verifique na [lista de pull requests abertos](https://github.com/Sysvale/cuida/pulls) se não há implementações em andamento que atendem ao que você precisa;

#### Como faço um component request?

Tendo checado os passos do tópico anterior, para realizar um component request utilize o [template de feature request](https://github.com/Sysvale/cuida/issues/new?assignees=&labels=type%3A+Melhoria&template=FEATURE_REQUEST.md&title=). Nele precisamos que você:

-   Discorra sobre a necessidade do componente;
-   Informe em que cenário o componente pode ser utilizado;
-   Indique se existem recursos no Cuida que são semelhantes, mas que não resolvem o problema;
-   Apresente exemplos de componentes semelhantes presentes em outros Design Systems (prints e gifs podem ser muito úteis aqui);

## Reportando um bug

#### Antes de submeter um bug report

Antes de abrir uma issue reportando um bug é importante assegurar-se de que o erro que está acontecendo com você pode ser reproduzido por outras pessoas e que você tem em mãos informações suficientes para que elas possam te ajudar. Para tanto, pedimos que você cheque o seguinte:

-   Certifique-se de estar usando a última versão do Cuida;
-   Verifique se o problema que está acontecendo não é um erro no seu ambiente de desenvolvimento;
-   Procure na [lista de issues](https://github.com/Sysvale/cuida/issues) se já não há um bug report semelhante ou igual ao seu;

#### Como faço um bug report?

Tendo checado os passos do tópico anterior, para reportar um bug utilize o [template de bug report](https://github.com/Sysvale/cuida/issues/new?assignees=&labels=type%3ABug&template=Bug.md&title=). Nesse momento precisamos que você informe:

-   Resumo do problema (prints e gifs podem ser muito úteis);
-   Os passos para reproduzir o problema;
-   Comportamento atual e o comportamento esperado;
-   Versão do Cuida;
-   Versão das principais dependências relacionadas ao problema;
-   Navegador utilizado;
-   Versão do navegador;
-   OS utilizado;
-   Versão do OS;

## Ajudando com a documentação

Contribuições em documentação no Cuida podem ser classificadas em duas categorias:

-   Documentação de componentes;
-   Documentação do projeto;

Contribuições de documentação de componentes podem ocorrer nos arquivos `.stories.mdx` sob a forma de "Dos e Dont's", cenários de uso, descrição dos componentes, etc e nos arquivos `.vue` com informações sobre métodos, slots e props.

Contribuições referentes ao projeto podem ser feitas em arquivos como o `README.md`, `CONTRIBUTING.md`, e nos nossos templates de feature request, bug e pull request, etc.

Para ambos os tipos de contribuição, basta abrir um PR com suas sugestões de melhoria. PRs da categoria "Documentação de componentes" serão automaticamente classificados com label pelo workflow `Labeler 🏷️`. Já PRs da categoria "Documentação do projeto" não são classificados automaticamente e por isso pedimos que marque com a tag `📃 Documentação` seu pull request.

## Git strategy

### Commits

Os commits seguem as especificações sugeridas pelo [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary). Recomendamos a leitura da documentação deles antes de contribuições. Caso você utilize o vs-code, [essa extensão](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) pode te ajudar a seguir os padrões de commit.

### Branches

#### Branch base

Nosso branch base é a `main` e ele sempre representa o último código enviado para produção. Qualquer novo branch deve ser criado a partir dele e merjado para ele, a menos que haja uma versão específica em planejamento, contendo várias contribuições. Nesse cenário deve-se criar um branch de versão (Ex.: `release/v3.0.0`) a partir da `main` e as features dessa versão devem ser direcionadas ao branch de versão.

#### Branches temporários

Utilizamos três tipos de branch temporários. Eles ajudam a categorizar o tipo de modificação que está sendo submetida ao branch base e seguem a seguinte convenção de nomenclatura:

-   **Feature**: `feature/nome-da-feature`
-   **Bug fix**: `fix/nome-da-correção`
-   **Build**: `build/nome-da-modificação-no-build`

Os branchs temporários, têm nomes em kebab-case, têm um tempo limite de existência e, uma vez merjados ou fechados, devem ser excluídos.

#### Exemplo de fluxo de trabalho

-   Atualize sua versão local da `main`;
-   A partir da main, crie um branch seguindo as convenções de nomenclatura mencionadas acima;
-   Crie um pull request e o marque como _work in progress_ (WIP) até ter finalizado o desenvolvimento;
-   Uma vez pronto para review, solicite que algum dev avalie seu código. Apenas um aprove é necessário, mas aproves nunca são de mais, sobretudo em implementações mais complexas 😉;
-   Uma vez aprovado o PR, merge o branch na `main`, caso quem o aprovou não o tenha feito ainda;
-   Delete seu branch;
-   Crie uma nota de release;

<br>
<br>

## Convenções de código

Convenções são utilizadas em projetos para torná-los mais fáceis de manter. Padronizar escrita de código e a estrutura de diretórios melhora legibilidade, manutenibilidade, deixa mais simples o code review e facilita a introdução de novos desenvolvedores no projeto.

**_Importante destacar que todos os nomes de diretórios, arquivos, variáveis, classes, métodos, propriedades, IDs, etc. devem estar em inglês._**

### Estilo de código

Utilizamos o [Prettier](https://prettier.io/) como _code formater_ para garantir que todo o projeto siga o mesmo padrão de estilo de código. As definições de estilo do projeto podem ser encontradas no `package.json`, na chave `"prettier"`.

#### Javascript

No projeto seguimos o [guia de estilo de código do AirBnb](https://github.com/airbnb/javascript). Essas recomendações estão asseguradas na configuração do linter.

#### SCSS

Para organizar e nomear nossas classes scss, utilizamos as convenções do padrão [BEM (Block Element Modifier)](http://getbem.com/introduction/).

### Nomenclatura de arquivos

-   **Arquivos .vue:** nomeados em pascal case (Ex.: `App.vue`, `ProgressBar.vue`);
-   **Arquivos .mdx:** nomeados em pascal case (Ex.: `ProgressBar.stories.mdx`);
-   **Arquivos .md:** nomeados em upper case (Ex.: `CONTRIBUTING.md`, `README.md`);
-   **Arquivos .js, .html, .scss, etc:** nomeados em kebab case (Ex.: `index.js`, `manager-head.html`, `app.scss`);

### Comentários e Codetags

#### Documentação

Utilizamos algumas convenções de comentários como anotações para a documentação gerada pelo Storybook:

-   Documentações de props são criadas com comentários multilinha acima da definição da propriedade:

<br/>

![image](https://user-images.githubusercontent.com/20057968/186918768-92eba1f2-f7a3-467b-a134-4c44b1cf613b.png)

<br/>

Resultado na documentação:

<br/>

![image](https://user-images.githubusercontent.com/20057968/186919366-433a9317-6973-4111-98d4-c70572ae5043.png)

<br/>

-   Documentações de eventos são criadas com comentários multilinha acima do `this.$emit()` ou comentários html acima do `$emit()`:

<br/>

![image](https://user-images.githubusercontent.com/20057968/186919657-8e6e3e07-dda5-4d24-9f66-ec31669bee90.png)

<br/>

ou

<br/>

![image](https://user-images.githubusercontent.com/20057968/186920370-23087017-cabf-44a0-bea8-4522269e9d45.png)

<br/>

Resultado na documentação:

<br/>

![image](https://user-images.githubusercontent.com/20057968/186919775-6a430785-5a41-4ceb-90d4-45dea519d876.png)

<br/>

-   Documentações de slots são criadas com comentários html acima da definição do slot:

<br/>

![image](https://user-images.githubusercontent.com/20057968/186920514-207ffb04-8e4f-4bf3-8ee6-04abcf2ea8d2.png)

<br/>

Resultado na documentação:

<br/>

![image](https://user-images.githubusercontent.com/20057968/186920629-25968fe2-4484-4939-8743-59633e0fc91c.png)

<br/>

#### Codetags

Para padronizar a escrita de comentários no projeto e permitir o uso de extensões como [TODO Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) e [TODO highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) que mapeiam os comentários no projeto, utilizamos a seguinte convenção:

-   `NOTE`: utilizado para descrever como um trecho específico de códiog funciona. Recomendado para situações nas quais o código não é autoevidente.
-   `FIXME`: utilizado para indicar que determinado trecho de código funciona, mas que poderia ser melhorado.
-   `TODO`: utilizado para indicar que código adicional precisa ser escrito ou melhorias podem ser feitas.

Exemplo de uso:

![image](https://user-images.githubusercontent.com/20057968/186924215-ea16bf62-c791-43d0-af66-5fab45cfa19d.png)

### Estrutura de diretórios

#### Overview dos principais arquivos e diretórios do projeto

<!-- <img src="https://user-images.githubusercontent.com/20057968/179384640-83cc301f-0e2c-4777-97ad-901a18bea7ea.png" width="185"> -->

```
.github
├── ISSUE_TEMPLATE
├── workflows
└── labeler.yml
.storybook
build
dist
docs
node_modules
public
src
├── assets
│	├── images
│	├── sass
│		├── variables
│		├── app.scss
│		└── variables.scss
│ 	├── components
│		├── (...).vue
│		├── index.js
│		└── (...).vue
│ 	├── docs-components
│ 	├── stories
│ 	├── utils
│ 	└── entry.js
└── tests
...
```

-   **.github:** armazena templates do github, como o de issue e o de pull request, além de workflows do Github actions.
-   **.storybook:** diretório que armazena arquivos de configuração do storybook e o arquivo `preview.js`, entrypoint da aplicação, no qual os componentes `.vue` registrados e as dependências do projeto são importadas e configuradas. O arquivo `manager-head.html` contido nessa pasta é utilizado para sobrescrever as classes de estilo dos menus de navegação do storybook, enquanto o arquivo `preview-head.html` guarda as classes responsáveis por sobrescrever o estilo do iframe de preview dos componentes.
-   **build:** o diretório build guarda o `rollup.config.js`. Esse arquivo é um module bundler responsável pela criação dos arquivos necessários para publicação do pacote node e é chamado com o comando `npm run build`.
-   **dist:** repositório que armazena os arquivos compilados pelo `rollup.config.js` para distribuição.
-   **src:** armazena diversos subdiretórios com os arquivos dos componentes do Design System, além de tokens, arquivos de documentação e testes.
    -   **sass:** nesse subdiretório estão definidos os tokens do Cuida em arquivos `.scss`. Esses arquivos são importados no arquivo `app.scss` contido nessa pasta.
    -   **components:** aqui ficam contidos os arquivos `.vue` que definem os componentes. Novos componentes devem ser exportados no arquivo `index.js`, presente nesse subdiretório para que possam ser efetivamente utilizados na aplicação. Além disso, cada novo arquivo `.vue` adicionado nesse diretório deve ter um arquivo `.stories.mdx` correspondente no diretório **stories** para que seja criada e exibida sua documentação no Storybook.
    -   **docs-components:** armazena os componentes vue criados para auxílio da documentação no Storybook e que não devem ser exportados como componentes do Design System. Novos componentes devem ser exportados no arquivo `index.js`, presente nesse subdiretório, para que possam ser efetivamente utilizados na aplicação.
    -   **stories:** nesse subdiretório estão contido os arquivos `.stories.mdx` responsáveis por criar a documentação dos componentes e por exibi-los no storybook. Possui dois subdiretórios, a pasta **components** guarda os `.mdx` com a documentação dos componentes e a pasta **tokens** guarda os `.mdx` com a documentação dos tokens.
    -   **entry.js**: arquivo utilizado no `rollup.config.js` como input do processo de building. Nesse arquivo são importadas e configuradas algumas das dependências do projeto que vão ser exportadas dentro do pacote do Cuida. Nesse arquivo também é adicionado o prefixo **_cds-_** necessário para utilizar os componentes do Cuida em outras aplicações, ou seja, se no contexto do Cuida você usa o componente **badge** utilizando `<badge>`, numa aplicação externa que usa o Cuida para chamar esse componente você vai utilizar a sintaxe `<cds-badge>`.
-   **tests:** diretório que armazena os testes de snapshot e testes unitários dos componentes do Cuida.

<br>
<br>

## Automações

No projeto utilizamos alguns workflows do Github Actions no nosso fluxo de CI/CD.

**Worklows:**

-   **Labeler 🏷️:** workflow utilizado para automatizar a criação de labels nos pull requests. A depender as modificações propostas nos PRs, podem ser adicionadas as labels `🧱 Componente` , `🐛 Bug`, `📃 Documentação`, `🛠️ Build` e `🧩 Token`.
-   **Tester ⚗️:** workflow que executa a suite de testes do projeto.
-   **Prettier 🪄:** workflow que utiliza o [Prettier](https://prettier.io/) para estilizar os arquivos automaticamente de acordo com as convenções de estilo de código do projeto. A cada push, caso haja erro de estilo, um commit é automaticamente criado com correções.
-   **Deployer 🚀:** quando um PR é merjado na main esse workflow é disparado. Ele instala as dependências, builda o projeto e aciona o deploy para a github page que hospeda a [documentação do Cuida](https://main--6168a1779cac8c003ab99c2d.chromatic.com/).
-   **Deployer V2 🚀:** quando um PR é merjado no branch v2.70-legacy esse workflow é disparado. Ele instala as dependências, builda o projeto e aciona o deploy para a github page que hospeda a [documentação do CuidaV2](https://sysvale.github.io/cuida/?path=/docs/funda%C3%A7%C3%A3o-princ%C3%ADpios--page).
-   **Publisher 📦:** workflow responsável por publicar o pacote NPM. É disparado quando um PR é merjado na main.
-   **Releaser ✔️:** workflow utilizado para criar tags automáticas do projeto a depender da versão da aplicação e na sequência criar as releases.

Além das automações com o Github Actions, temos a execução dos testes unitários e de snapshot a cada push no PR e o code review automatizado pelo [CodeFactor](https://www.codefactor.io/), que indica a cada push prováveis problemas de sintaxe e estilo.

## Processo de release

Quando um pull request é aprovado e merjado, automaticamente, através dos workflows mencionados no tópico anterior, é criada uma tag e release correspondentes ao número de versão presente no `package.json`. Apesar desse processo diminuir o trabalho de fazer todas essas etapas manualmente, ele não é suficiente. O workflow `Releaser ✔️` cria apenas um boilerplate da nota de release, e é preciso que após esse processo você manualmente adicione as mudanças que foram enviadas na release. Para isso, basta checar as descrições dos últimos PRs merjados e que compõem essa release e editar a última release note com essas informações.

## Como testar um recurso que ainda não foi publicado?

Muitas vezes não é possível simular o comportamento de um componente dentro do Storybook tal qual nos projetos em que eles serão usados. Para esse caso uma alternativa para testar um recurso ou componente que ainda esteja em desenvolvimento no Cuida é possível instalar o pacote a partir de um branch do github.

-   Primeiro você deve executar o `npm run build` para gerar a compilação do pacote;
-   Em seguida você deve enviar o diretório `/dist` para o branch em desenvolvimento, para tal você deve comentar o `/dist` no arquivo `.gitignore`, commitar as alterações e fazer o push;
-   Feito isso você pode instalar o pacote no seu projeto alterando a versão do Cuida no `package.json` para `"@sysvale/cuida": "https://github.com/Sysvale/cuida/tarball/<branch-name>",` e rodando o `npm i`, onde `<branch-name>` é o nome do branch em desenvolvimento no Cuida;

**Obs.:** Sempre que fizer uma alteração no branch você deve enviar uma versão atualizada da `/dist` para o github e rodar o `npm i` no projeto de interesse.
