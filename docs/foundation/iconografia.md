# Iconografia

A iconografia que utilizamos no Cuida simplifica a interação do usuário com o sistema, pois possibilita que elementos sejam mais
 facilmente identificados. Além disso, permite que os usuários compreendam com mais facilidade os componentes do layout, 
 reduzindo a curva de aprendizado sobre a interface.

<hr />
<br />

## Recomendações

-  Para melhor representar ícones do sistema, recomendamos que sejam utilizados ícones com tamanho entre 20 x 20 e 24 x 24 pixels.

- Para melhor compreensão por parte do usuário, utilize ícones já comumente adotados para a função desejada.
Por exemplo, um sino para notificações, uma engrenagem para configurações, etc.

- Para tornar o conteúdo mais claro, utilize ícones em conjunto com texto, sempre que possível.

<br />

## Ícones

O Cuida implementa um wrapper em forma de componente dos ícones do <a href="https://github.com/Sysvale/cuida-icons">CuidaIcons</a>. Qualquer manutenção ou melhoria
deve ser feita no projeto respectivo e no design kit no Figma e, caso necessário, atualizada aqui.

```html
<CdsIcon
	name="box-outline"
	height="40"
	width="40"
	color="#36424E"
/>
```

<br />

<Iconography />

<script setup>
import Iconography from '@/docs-components/Iconography.vue';
</script>
