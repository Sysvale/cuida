# VariantResolver()

Mixin sass utilizado para auxiliar na construção de variantes em componentes do Design System.

<hr />
<br />

O VariantResolver implementa um loop por entre as cores da paleta do Cuida e expõe algumas variáveis em cada uma
das interações, evitando que seja preciso criar classes para cada variante em um componente. Usando o recurso do sass
chamado de [Content Blocks](https://sass-lang.com/documentation/at-rules/mixin#content-blocks), é possível injetar código
em cada uma das interações pela paleta, usando as variáveis de cor enviadas como argumento do Mixin.

<br />

As variáveis disponíveis são:
``$color-name``, ``$base-color``, ``$disabled``, ``$muted``, ``$background`` e ``$hover``.

<br />

- A variável ``$color-name`` traz o nome das cores: 'turquoise', 'green', 'blue',	'indigo',	'violet',
'pink', 'red', 'orange', 'amber', 'dark', 'gray' e	'white'.

- A ``$base-color`` retorna os tokens com shade `400`, como $gp-400, $bn-400, etc;
- A ``$disabled`` retorna os tokens com shade `300`, como $gp-300, $bn-300, etc;
- A ``$muted`` retorna os tokens com shade `200`, como $gp-200, $bn-200, etc;
- A ``$background`` retorna os tokens com shade `50`, como $gp-50, $bn-50, etc;
- E a ``$hover`` retorna os tokens com shade `500`, como $gp-500, $bn-500, etc;

<br />

#### Exemplo

```scss
.avatar {
  &__container {
    display: flex;
    align-items: center;

    @include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
      background-color: $base-color;

      @if ($color-name == 'white' or $color-name == 'gray') {
        color: $n-700;
      } @else {
        color: $n-0;
      }
    }
  }
}
```

<br>

O código acima sem o seria o mesmo mesmo que:

```scss
.avatar {
  &__container {
    display: flex;
    align-items: center;

    &--turquoise {
      background-color: $ts-400;
      ...
    }

    &--green {
      background-color: $gp-400;
      ...
    }

    &--blue {
      background-color: $bn-400;
      ...
    }

    ...
  }
}
```