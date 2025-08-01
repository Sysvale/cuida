<template>
	<Layout>
		<template #home-hero-info>
			<CdsFlexbox justify="space-between">
				<div class="text-container">
					<CdsText as="h1">Cuida Design System</CdsText>
			
					<CdsText as="p">
						O Cuida é o design system open source da Sysvale, pensado para
						ajudar times de produto a trabalhar de modo consistente e
						performático na construção de aplicações do Cidade Saudável.
					</CdsText>
				</div>

				<div class="img-container">
					<CdsImage
						src="public/cuida-heart.svg"
					/>
				</div>
			</CdsFlexbox>

		</template>
	</Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
import CdsText from '@/components/Text.vue';
import CdsImage from '@/components/Image.vue';
import CdsFlexbox from '@/components/Flexbox.vue';

const { Layout } = DefaultTheme
</script>

<style scoped>
.text-container {
	width: 60%
}

.img-container {
	width: 20%
}
</style>
