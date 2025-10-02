<script setup>
import DefaultTheme from 'vitepress/theme-without-fonts'
import CdsText from '@/components/Text.vue'

const { Layout } = DefaultTheme
</script>

<template>
	<Layout>
		<template #home-hero-info>
			<CdsText as="h1">Cuida design system</CdsText>

			<CdsText as="h6">
				O Cuida é o design system open source da Sysvale, pensado para ajudar
				times de produto a trabalhar de modo consistente e performático na
				construção de aplicações do Cidade Saudável.
			</CdsText>
		</template>
	</Layout>
</template>
