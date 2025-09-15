# useToast

Composable utilizado para gerenciar o disparo e exibição de Toasts.

<hr />

- Para que o composable funcione como esperado, é necessário que o componente ToastContainer esteja presente no componente raiz do projeto.
- O useToast expõe os métodos `fire()` e `dismiss()`, além da lista global de toasts ativos por meio da propriedade reativa `toastState`.
- O componente ToastContainer escuta alterações na propriedade `toastState` e renderiza os toasts ativos.
- Já o componente Toast utiliza o método `dismiss()` quando ocorre um clique no botão de fechar o componente.
- O Toast fecha automaticamente após o tempo definido no `dismissAfter` ou antes disso, caso o usuário clique no botão de fechar o componente.

<br />

## Fire()
Método responsável por disparar um toast.
#### Argumentos

```js
fire(title,
description = null,
variant = 'info',
dismissible = true,
dismissAfter = 4000,
autoDismissible = true,
light = false),
```


#### Title **(String):**
- Título do toast
- Obrigatório: *Sim*
- Valores válidos: qualquer string;

#### Description **(String):**
- Texto opcional apresentado abaixo do título do toast;
- Obrigatório: *Não*;
- Valor padrão: null;
- Valores válidos: qualquer string ou null;

#### Variant **(String):**
- Variante do toast. São 4 variantes implementadas: 'success', 'info', 'warning', 'danger'.
- Obrigatória: *Não*
- Valor padrão: 'info';
- Valores válidos: ['success', 'info', 'warning', 'danger'];

#### Dismissible **(Boolean):**
- Indica se o toast poderá ser fechado pelo usuário (exibe ícone X).
- Obrigatória: *Não*
- Valor padrão: true;
- Valores válidos: true, false;

#### DismissAfter **(Number):**
- Define o tempo em milisegundos que o toast deverá ficar visível.
- Obrigatória: *Não*
- Valor padrão: 4000;
- Valores válidos: valores numéricos entre 4000 e 12000;

#### AutoDismissible **(Boolean):**
- Indica se o toast deverá fechar automaticamente.
- Obrigatória: *Não*
- Valor padrão: true;
- Valores válidos: true, false;

#### Light **(Boolean):**
- Indica se o toast deverá ser do tipo light (tema).
- Obrigatória: *Não*
- Valor padrão: false;
- Valores válidos: true, false;

<br />

## Dismiss()
Método responsável por remover um toast a partir do id.
#### Argumentos

```js
dismiss(id),
```

#### Id **(Number):**
- Id do toast que será removido.
- Obrigatório: *Sim*
- Valores válidos: qualquer número inteiro;

<br />

#### Exemplo de uso
```js
import { useToast } from '../../utils/composables/useToast.js';
useToast().fire({
		title: 'Processando dados',
		description: 'Estamos processando os dados da planilha. Essa ação pode levar alguns minutos.',
		dismissible: true,
		dismissAfter: 6000,
		autoDismissible: true,
		variant: 'success',
		light: false,
})
```