# PaleteResolver()

Mixin sass utilizado para criar classes com as cores da paleta do Design Dystem.

<hr />
<br />

O PaleteResolver, de modo semelhante ao VariantResolver implementa um loop por entre os tokens de cor do Cuida,
mas enquanto o VariantResolver percorre a paleta retornando shades específicos, o PaleteResolver percorre as cores
da paleta retornando todos os tokens shades disponíveis, disponibilizando uma única variável chamada `$color`.

<br />

#### Exemplo

```scss
.color-picker {
	&__swatch {
		@include paleteResolver using ($color) {
			background-color: $color;
			transition: $interaction;
		}
	}
}
```

<br>

O código acima sem o seria o mesmo mesmo que:

```scss
.color-picker {
	&__swatch {
		&--bn-400 {
			background-color: $bn-400;
			transition: $interaction;
		}
 
		...
 
		&--bn-500 {
			background-color: $bn-500;
			transition: $interaction;
		}
 
		...
 
		&--bn-600 {
			background-color: $bn-600;
			transition: $interaction;
		}
 
		...
 
		&--in-50 {
			background-color: $in-50;
			transition: $interaction;
		}
 
		...
 
		&--in-100 {
			background-color: $in-100;
			transition: $interaction;
		}
 
		...
	}
}
```