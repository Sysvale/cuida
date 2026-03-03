# Servidor MCP para o Design System Cuida

Este diretório contém um servidor [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) projetado para fornecer um contexto rico sobre o Design System Cuida para assistentes de IA.

Ele expõe informações sobre componentes, seus metadados, código-fonte, documentação e tokens de design.

## Pré-requisitos

Antes de iniciar o servidor MCP, é crucial que os metadados dos componentes do Vue sejam gerados. Este processo é feito pelo `vue-docgen-api`.

Na raiz do projeto (`/`), execute o seguinte comando:

```bash
npm run generate:docs
```

Este comando irá criar (ou atualizar) o arquivo `docs/.docgen/components-metadata.json`, que é a fonte de dados primária para este servidor.

## Instalação

Navegue até este diretório (`/mcp`) e instale as dependências:

```bash
npm install
```

## Comandos

#### Build

Para transpilar o código TypeScript do servidor, execute:

```bash
npm run build
```

Os arquivos compilados serão salvos no diretório `mcp/build/`.

#### Start

Para iniciar o servidor (após o build), execute:

```bash
npm start
```

O servidor irá iniciar e se comunicar via `stdio`.
