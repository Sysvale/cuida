import"./jsx-runtime.db376543.js";import{c as a,A as C,C as v,S as g,M as x,a as _}from"./Props.519c721e.js";import"./iframe.facb5a71.js";import"./blocks.70b2f959.js";import{o as t,a as n,b as i,t as c,d as l,g as y}from"./vue.esm-bundler.3f4907d5.js";import{_ as D}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.7a88f6c6.js";import"./es.map.constructor.dc039611.js";import"./es.number.to-fixed.98762696.js";const b={props:{title:{type:String,default:"",required:!1},description:{type:String,default:"",required:!1},showAction:{type:Boolean,default:!1,required:!1},action:{type:String,default:"Action",required:!1}}},A={class:"dashboard-card"},N={class:"dashboard-card__header"},q={key:0,class:"dashboard-card__title"},k={key:1,class:"dashboard-card__title"},E={key:0,class:"dashboard-card__description"},S={key:1,class:"dashboard-card__description"},T={key:0};function w(e,s,o,d,V,j){return t(),n("div",A,[i("div",null,[i("div",N,[o.title.length>0?(t(),n("p",q,c(o.title),1)):(t(),n("p",k,[l(e.$slots,"title-slot",{},void 0,!0)])),i("div",null,[l(e.$slots,"status-slot",{},void 0,!0)])]),o.description.length>0?(t(),n("p",E,c(o.description),1)):(t(),n("p",S,[l(e.$slots,"description-slot",{},void 0,!0)]))]),i("div",{class:"dashboard-card__action",onClick:s[0]||(s[0]=P=>e.$emit("action-button-click"))},[l(e.$slots,"action-slot",{},()=>[o.showAction?(t(),n("div",T,c(o.action),1)):y("",!0)],!0)])])}const p=D(b,[["render",w],["__scopeId","data-v-eed9a28a"]]);b.__docgenInfo={exportName:"default",displayName:"DashboardCard",description:"",tags:{},props:[{name:"title",description:"O t\xEDtulo do alert. O t\xEDtulo tamb\xE9m pode ser usado com o slot.",type:{name:"string"},required:!1,defaultValue:{func:!1,value:"''"}},{name:"description",description:`Texto que ser\xE1 exibido abaixo do t\xEDtulo. Utilizado para melhor
descrever a informa\xE7\xE3o exibida no dashboard-card.`,type:{name:"string"},required:!1,defaultValue:{func:!1,value:"''"}},{name:"showAction",description:"Prop que exibe o bot\xE3o de a\xE7\xE3o do dashboard-card.",type:{name:"boolean"},required:!1,defaultValue:{func:!1,value:"false"}},{name:"action",description:"Prop que indica o texto do bot\xE3o de a\xE7\xE3o do dashboard-card.",type:{name:"string"},required:!1,defaultValue:{func:!1,value:"'Action'"}}],events:[{name:"action-button-click"}],slots:[{name:"title-slot"},{name:"status-slot"},{name:"description-slot"},{name:"action-slot",description:"Slot para renderiza\xE7\xE3o customizada do conte\xFAdo das actions. Sobrescreve a prop `showAction`."}]};function u(){return u=Object.assign?Object.assign.bind():function(e){for(var s=1;s<arguments.length;s++){var o=arguments[s];for(var d in o)Object.prototype.hasOwnProperty.call(o,d)&&(e[d]=o[d])}return e},u.apply(this,arguments)}const m=e=>({components:{CdsDashboardCard:p},setup(){return{args:e}},template:`
		<cds-dashboard-card
			v-bind="args"
			@action-button-click="handleActionClick"
		>
			<template slot="title-slot">
				<div>
					<div>
						<span>45</span>
						<span style="font-size: 12px; font-weight: 500;">gestantes</span>
					</div>
				</div>
			</template>
			<template slot="status-slot">
				<cds-badge variant="red">Alerta</cds-badge>
			</template>
			<template slot="description-slot">
				N\xE3o realizam consulta h\xE1 mais de 30 dias
			</template>
		</cds-dashboard-card>
	`,methods:{handleActionClick(){console.log("clicked")}}}),z={Template:m},O="wrapper";function f({components:e,...s}){return a(O,u({},z,s,{components:e,mdxType:"MDXLayout"}),a(x,{title:"Componentes/Containers/DashboardCard",component:p,mdxType:"Meta"}),a("h1",null,"DashboardCards"),a("h3",null,"DashboardCards s\xE3o componentes utilizados para construir cards com informa\xE7\xF5es que requeiram uma descri\xE7\xE3o curta e que possam ser classificadas em status."),a("hr",null),a("br",null),a("h2",null,"Recomendamos o uso de DashboardCards quando:"),a("ul",null,a("li",{parentName:"ul"},"For necess\xE1rio mostrar informa\xE7\xF5es de modo resumido em dashboards"),a("li",{parentName:"ul"},"For necess\xE1rio um card com bot\xE3o clic\xE1vel e que leve o usu\xE1rio a uma nova tela."),a("li",{parentName:"ul"},"A informa\xE7\xE3o descrita no card possa ser classificada.")),a("br",null),a("h2",null,"N\xE3o recomendamos o uso de DashboardCards quando:"),a("ul",null,a("li",{parentName:"ul"},"Houver um conjunto muito grande de informa\xE7\xF5es a ser exibido."),a("li",{parentName:"ul"},"Se deseja utilizar \xEDcones em conjunto com os dados. Utilize ",a("a",{href:"https://sysvale.github.io/cuida/?path=/docs/componentes-containers-expansioncard--expansion-card"},"ExpansionCards")," nesses cen\xE1rios.")),a("br",null),a("h2",null,"Observa\xE7\xF5es:"),a("ul",null,a("li",{parentName:"ul"},"O DashboardCard exibee informa\xE7\xF5es de modo vertical, ao contr\xE1rio do ",a("a",{href:"https://sysvale.github.io/cuida/?path=/docs/componentes-containers-expansioncard--expansion-card"},"ExpansionCard"),"."),a("li",{parentName:"ul"},a("a",{href:"https://sysvale.github.io/cuida/?path=/docs/componentes-containers-expansioncard--expansion-card"},"ExpansionCards")," comunicam informa\xE7\xF5es de modo mais direto e com aux\xEDlio de \xEDcones. DashboardCars focam mais em descri\xE7\xE3o e classifica\xE7\xE3o das informa\xE7\xF5es."),a("li",{parentName:"ul"},"Considere utilizar DashboardCards se precisa que o componente redirecione o usu\xE1rio para outra p\xE1gina para mais informa\xE7\xF5es."),a("li",{parentName:"ul"},"Considere ",a("a",{href:"https://sysvale.github.io/cuida/?path=/docs/componentes-containers-expansioncard--expansion-card"},"ExpansionCards")," se for necess\xE1rio detalhar o conte\xFAdo do card, mas sem tirar o usu\xE1rio da p\xE1gina.")),a("br",null),a("h2",null,"Preview"),a(v,{mdxType:"Canvas"},a(g,{name:"DashboardCard",args:{showAction:!0,action:"Ver lista"},mdxType:"Story"},m.bind({}))),a(_,{story:"DashboardCard",mdxType:"ArgsTable"}))}f.isMDXComponent=!0;const h=m.bind({});h.storyName="DashboardCard";h.args={showAction:!0,action:"Ver lista"};h.parameters={storySource:{source:`args => ({
  components: {
    CdsDashboardCard: DashboardCard
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-dashboard-card
			v-bind="args"
			@action-button-click="handleActionClick"
		>
			<template slot="title-slot">
				<div>
					<div>
						<span>45</span>
						<span style="font-size: 12px; font-weight: 500;">gestantes</span>
					</div>
				</div>
			</template>
			<template slot="status-slot">
				<cds-badge variant="red">Alerta</cds-badge>
			</template>
			<template slot="description-slot">
				N\xE3o realizam consulta h\xE1 mais de 30 dias
			</template>
		</cds-dashboard-card>
	\`,
  methods: {
    handleActionClick() {
      console.log('clicked');
    }

  }
})`}};const r={title:"Componentes/Containers/DashboardCard",component:p,includeStories:["dashboardCard"]},M={DashboardCard:"dashboardCard"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>a(C,{mdxStoryNameToKey:M,mdxComponentAnnotations:r},a(f,null))};const R=["Template","dashboardCard"];export{m as Template,R as __namedExportsOrder,h as dashboardCard,r as default};
//# sourceMappingURL=DashboardCard.stories.5b7be603.js.map
