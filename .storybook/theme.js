import { create } from '@storybook/theming/create';
import cuidaTempLogo from '../src/assets/images/CuidaTempLogo.png';

export default create({
		base: 'light',
		colorPrimary: '#074fa6',
		colorSecondary: '#2EB88D',
	
		// UI
		appBg: '#FFFFFF',
		appContentBg: '#FFFFFF',
		appBorderColor: 'silver',
		appBorderRadius: 4,
	
		// Tipografia
		fontBase: '"Inter", sans-serif',
		fontCode: 'monospace',
	
		// Cores de texto
		textColor: '#212529',
		textInverseColor: '#ffffffe6',
	
		// Cor da Toolbar
		barSelectedColor: '#074fa6',
	
		// Cor dos forms
		inputBg: '#FFFFFF',
		inputTextColor: '#142032',
		inputBorderRadius: 4,
	
		brandTitle: 'Cuida',
		brandUrl: 'https://sysvale.com',
		brandImage: cuidaTempLogo,
	});