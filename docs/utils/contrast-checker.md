# ContrastChecker()

Os ContrastChecker() é um método utilizado para testar o contraste entre duas cores.

<hr>
<br>

⚠️ *Método disponível apenas para desenvolvimento interno no Cuida*

<br>

#### Argumentos

**(String):**
- Hexadecimal da **primeira** cor de teste
- Obrigatória: *Sim*
- Valores válidos: qualquer string no formato hexadecimal. ex.: '#000000';

**(String):**
- Hexadecimal da **segunda** cor de teste
- Obrigatória: *Sim*
- Valores válidos: qualquer string no formato hexadecimal. ex.: '#000000';

**(String):**
- Parâmetro usado como referência na avaliação do contraste entre as cores. O parâmetro recomendado para textos de até 18px é 'VERYGOOD' ou 'SUPER'.
- Obrigatória: *Não*
- Valores válidos: 'POOR', 'GOOD', 'VERYGOOD', 'SUPER';
- Valor padrão: 'GOOD';

<br>

#### Retorno

**(Boolean):** Indica se o teste de contraste entre as duas cores informadas foi aprovado.

<br>

#### Exemplo

```js
  ContrastChecker('#2AC092', '#FFFFFF', 'POOR');
```
