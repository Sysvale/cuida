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

			for (const file of files) {
				try {
					const componentInfo = await parse(file)
					const componentName = path.basename(file, '.vue')
					docs[componentName] = componentInfo
				} catch (e) {
					console.warn(`Erro ao parsear ${file}: ${e.message}`)
				}
			}

			fs.mkdirSync('docs/.docgen', { recursive: true })
			fs.writeFileSync('docs/.docgen/components.json', JSON.stringify(docs, null, 2))
		}
	}
}
