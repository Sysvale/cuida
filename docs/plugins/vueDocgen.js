import { parse } from 'vue-docgen-api'
import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'

export default function vueDocgenPlugin() {
	return {
		name: 'vite-plugin-vue-docgen-generator',
		async buildStart() {
			const files = await glob('src/components/**/*.vue')
			const docs = {}

			console.log('chamou');

			for (const file of files) {
				try {
					const componentInfo = await parse(file, {
						alias: {},
						modules: [],
						jsx: false,
						validExtends: (fullFilePath) => !/[\\/]node_modules[\\/]/.test(fullFilePath),
					})

					const componentName = path.basename(file, '.vue')

					const enhancedInfo = await enhanceComponentInfo(file, componentInfo)

					docs[componentName] = enhancedInfo
				} catch (e) {
					console.warn(`Erro ao parsear ${file}: ${e.message}`)
				}
			}

			fs.mkdirSync('docs/.docgen', { recursive: true })
			fs.writeFileSync('docs/.docgen/components.json', JSON.stringify(docs, null, 2))
		}
	}
}

async function enhanceComponentInfo(filePath, componentInfo) {
	const content = fs.readFileSync(filePath, 'utf-8')

	const hasScriptSetup = /<script\s+setup/.test(content)
	const hasDefineModel = /defineModel\s*\(/.test(content)

	if (hasScriptSetup && hasDefineModel) {
		return await enhanceWithDefineModelEvents(filePath, componentInfo)
	}

	return componentInfo
}

async function enhanceWithDefineModelEvents(filePath, componentInfo) {
	const content = fs.readFileSync(filePath, 'utf-8')

	const defineModelRegex = /\/\*\*\s*([\s\S]*?)\*\/\s*const\s+\w+\s*=\s*defineModel\s*\(\s*['"`]([^'"`]+)['"`]/g

	let match
	const additionalEvents = []

	while ((match = defineModelRegex.exec(content)) !== null) {
		const [, comment, modelName] = match

		const eventInfo = parseJSDocComment(comment, modelName)
		if (eventInfo) {
			additionalEvents.push(eventInfo)
		}
	}

	if (additionalEvents.length > 0) {
		componentInfo.events = componentInfo.events || []
		componentInfo.events.push(...additionalEvents)
	}

	return componentInfo
}

function parseJSDocComment(comment, modelName) {
	const lines = comment.split('\n').map(line => line.trim().replace(/^\*\s?/, ''))

	let description = ''
	let eventName = `update:${modelName}`
	let type = 'unknown'

	for (const line of lines) {
		if (line.startsWith('@event ')) {
			eventName = line.replace('@event ', '').trim()
		} else if (line.startsWith('@type ')) {
			type = line.replace('@type ', '').trim().replace(/[{}]/g, '')
		} else if (line && !line.startsWith('@')) {
			description += (description ? ' ' : '') + line
		}
	}

	return {
		name: eventName,
		description: description || `Evento de atualização do v-model para ${modelName}`,
		type: {
			name: type
		},
		properties: []
	}
}