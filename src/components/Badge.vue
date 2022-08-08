<template>
	<div
		class="badge__container"
		:class="predefinedStyle"
	>
		<div class="badge__content">
			<!-- @slot Slot padrão utilizado para exibir o conteúdo dentro da badge -->
			<slot/>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * A variante da Badge. São 9 variantes: 'turquoise', 'green', 'blue',
		 * 'violet', 'pink', 'red', 'orange', 'amber' e 'gray'.
		 */
		variant: {
			type: String,
			default: 'gray',
		},
	},

	data() {
		return {
			predefinedColors: [
				'turquoise',
				'green',
				'blue',
				'indigo',
				'violet',
				'pink',
				'red',
				'orange',
				'amber',
				'gray',
			],
		};
	},

	computed: {
		predefinedStyle() {
			if (this.predefinedColors.indexOf(this.variant) > -1) {
				return `badge--${this.variant}`;
			}
			return 'badge--gray';
		},
	},
};
</script>
<style>
.badge__container {
	 border-radius: 50px !important;
	 width: fit-content;
	 padding: 0px 8px;
}
 .badge__content {
	 font-weight: 500 !important;
	 font-size: 14px;
}
 .badge--turquoise {
	 color: #13526D;
	 background-color: #F0FAFF;
	 border: 1px solid #3CACDD;
}
 .badge--green {
	 color: #145C45;
	 background-color: #def7eb;
	 border: 1px solid #2AC092;
}
 .badge--blue {
	 color: #144385;
	 background-color: #ecf1fe;
	 border: 1px solid #377EE1;
}
 .badge--indigo {
	 color: #353D64;
	 background-color: #E5EAFF;
	 border: 1px solid #6174D1;
}
 .badge--violet {
	 color: #642B96;
	 background-color: #F8F0FF;
	 border: 1px solid #A169D3;
}
 .badge--pink {
	 color: #701A48;
	 background-color: #FFEFF9;
	 border: 1px solid #DD5A9C;
}
 .badge--red {
	 color: #A42333;
	 background-color: #ffe6e9;
	 border: 1px solid #F95367;
}
 .badge--orange {
	 color: #AB3C21;
	 background-color: #FFF3F0;
	 border: 1px solid #FF8567;
}
 .badge--amber {
	 color: #A56A12;
	 background-color: #fff1dc;
	 border: 1px solid #FFB952;
}
 .badge--gray {
	 color: #36424E;
	 background-color: #EFF5FB;
	 border: 1px solid #9AA8B6;
}
</style>
