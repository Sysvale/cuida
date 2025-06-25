export default (device) => {
	switch (device) {
		case 'smartphone':
			// se a largura da tela for menor que 500px e menor que a altura da tela
			return window.outerWidth < 500 && window.outerWidth < window.outerHeight;
		case 'tablet':
			// se a largura da tela estiver entre 500px e 900px, e for menor que a altura da tela
			return window.outerWidth >= 500 && window.outerWidth < 900 && window.outerWidth < window.outerHeight;
		case 'hd-screen':
			// se a largura da tela estiver entre 900px e 1600px, e maior que a altura da tela
			return window.outerWidth >= 900 && window.outerWidth < 1600 && window.outerWidth > window.outerHeight ;
		case 'fhd-screen':
			// se a largura da tela estiver entre 1600 e 2000, e maior que a altura da tela
			return window.outerWidth >= 1600 && window.outerWidth < 2000 && window.outerWidth > window.outerHeight;
		case 'uhd-screen':
			// se a largura da tela for maior que 2000, e maior que a altura da tela
			return window.outerWidth >= 2000 && window.outerWidth > window.outerHeight;
		default:
			throw new Error(`Valor inválido: '${device}'. Os valores aceitos são: 'smartphone', 'tablet', 'hd-screen', 'fhd-screen', 'uhd-screen'.`);
	}
};
