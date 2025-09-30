# HasSlot() <Badge type="danger">Deprecated</Badge>

Método utilizado para checar se um slot específico está sendo usado no componente.

<hr>
<br>

⚠️ **Esse Util está deprecated. Utilize o composable do Vue `useSlots()`**
<br>
⚠️ *Método disponível apenas para desenvolvimento interno no Cuida*

<br>

#### Argumentos

**(Objeto):**
- Objeto de slots obtido com o `this.$slots`
- Obrigatória: *Sim*
- Valores válidos: objeto de slots do componente;

**(String):**
- Nome do slot que se deseja checar o uso
- Obrigatória: *Sim*
- Valores válidos: qualquer string contendo o nome de um dos slots do componente;

<br>

#### Retorno

**(Boolean):** Indica se um slot específico está em uso.

<br>

#### Exemplo

```js
  hasSlot(this.$slots, 'image');
```
