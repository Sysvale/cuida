import"./jsx-runtime.db376543.js";import{c as e,A as f,C,S as b,M as h,a as y}from"./Props.519c721e.js";import"./iframe.facb5a71.js";import"./blocks.70b2f959.js";import{o as P,a as S,b as t,t as p,d as c,n as q,y as x,z as T}from"./vue.esm-bundler.3f4907d5.js";import{_ as N}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.7a88f6c6.js";import"./es.map.constructor.dc039611.js";import"./es.number.to-fixed.98762696.js";const m={props:{title:{type:String,default:"T\xEDtulo",required:!0},subtitle:{type:String,default:"Subt\xEDtulo",required:!0},noContentPadding:{type:Boolean,default:!1}},computed:{contentClass(){return this.noContentPadding?"panel-card__content--no-pading":"panel-card__content"}}},_=a=>(x("data-v-d4331068"),a=a(),T(),a),M={class:"panel-card"},F={class:"panel-card__header"},A={class:"panel-card__title"},I=_(()=>t("br",null,null,-1)),O={class:"panel-card__subtitle"},V={class:"ml-auto"},D=_(()=>t("hr",{class:"panel-card__divider"},null,-1));function w(a,n,o,r,L,g){return P(),S("div",M,[t("div",F,[t("div",null,[t("span",A,p(o.title),1),I,t("span",O,p(o.subtitle),1)]),t("div",V,[c(a.$slots,"panel-actions",{},void 0,!0)])]),D,t("div",{class:q(g.contentClass)},[c(a.$slots,"default",{},void 0,!0)],2)])}const i=N(m,[["render",w],["__scopeId","data-v-d4331068"]]);m.__docgenInfo={exportName:"default",displayName:"PanelCard",description:"",tags:{},props:[{name:"title",description:"T\xEDtulo do card.",type:{name:"string"},required:!0,defaultValue:{func:!1,value:"'T\xEDtulo'"}},{name:"subtitle",description:"Subt\xEDtulo do card.",type:{name:"string"},required:!0,defaultValue:{func:!1,value:"'Subt\xEDtulo'"}},{name:"noContentPadding",description:"Remove o padding padr\xE3o do corpo do card.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"panel-actions",description:"Slot usado para inser\xE7\xE3o de elemento \xE0 direita no header."},{name:"default",description:"Slot usado para inser\xE7\xE3o de conte\xFAdo customizado."}]};function l(){return l=Object.assign?Object.assign.bind():function(a){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(a[r]=o[r])}return a},l.apply(this,arguments)}const d=a=>({components:{CdsPanelCard:i},setup(){return{args:a}},template:`
		<div style="background-color: #F5F5F5; padding: 24px;">
			<cds-panel-card
				v-bind="args"
			>
				<template v-slot:panel-actions>
					<h2>#</h2>
				</template>
				Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
				v\xEA os porris que eu tomo, mas ningu\xE9m v\xEA os tombis que eu levo!
				Atirei o pau no gatis, per gatis num morreus. Pra l\xE1 , depois
				divoltis porris, paradis. Leite de capivaris, leite de mula
				manquis sem cabe\xE7a. Viva Forevis aptent taciti sociosqu ad
				litora torquent. Per aumento de cachacis, eu reclamis. Nec
				orci ornare consequat. Praesent lacinia ultrices consectetur.
				Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
			</cds-panel-card>
		</div>
	`}),z={Template:d},B="wrapper";function v({components:a,...n}){return e(B,l({},z,n,{components:a,mdxType:"MDXLayout"}),e(h,{title:"Componentes/Containers/PanelCard",component:i,mdxType:"Meta"}),e("h1",null,"PanelCard"),e("h3",null,"PanelCards s\xE3o componentes utilizados para agrupar informa\xE7\xE3o em containers com uma estrutura m\xEDnima formada por t\xEDtulo, subt\xEDtulo, e conte\xFAdo."),e("hr",null),e("br",null),e("h2",null,"Recomenda\xE7\xF5es de uso:"),e("ul",null,e("li",{parentName:"ul"},"Houver a constru\xE7\xE3o de p\xE1ginas e dashboards com cars em grid."),e("li",{parentName:"ul"},"O slot de a\xE7\xF5es deve agrupar \xEDcones ou bot\xF5es que aplicam mudan\xE7as em todas as informa\xE7\xF5es contidas no PainelCard.")),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de PanelCards quando:"),e("ul",null,e("li",{parentName:"ul"},"For necess\xE1rio agrupar elementos fora da estrutura b\xE1sica: t\xEDtulo + subt\xEDtulo + conte\xFAdo."),e("li",{parentName:"ul"},"Ele for o \xFAnico componente do seu tipo na p\xE1gina, ocupando toda a largura dispon\xEDvel.")),e("br",null),e("h2",null,"Preview"),e(C,{mdxType:"Canvas"},e(b,{name:"PanelCard",args:{title:"Redes",subtitle:"Habilite as redes da regula\xE7\xE3o"},mdxType:"Story"},d.bind({}))),e(y,{story:"PanelCard",mdxType:"ArgsTable"}))}v.isMDXComponent=!0;const u=d.bind({});u.storyName="PanelCard";u.args={title:"Redes",subtitle:"Habilite as redes da regula\xE7\xE3o"};u.parameters={storySource:{source:`args => ({
  components: {
    CdsPanelCard: PanelCard
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<div style="background-color: #F5F5F5; padding: 24px;">
			<cds-panel-card
				v-bind="args"
			>
				<template v-slot:panel-actions>
					<h2>#</h2>
				</template>
				Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
				v\xEA os porris que eu tomo, mas ningu\xE9m v\xEA os tombis que eu levo!
				Atirei o pau no gatis, per gatis num morreus. Pra l\xE1 , depois
				divoltis porris, paradis. Leite de capivaris, leite de mula
				manquis sem cabe\xE7a. Viva Forevis aptent taciti sociosqu ad
				litora torquent. Per aumento de cachacis, eu reclamis. Nec
				orci ornare consequat. Praesent lacinia ultrices consectetur.
				Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
			</cds-panel-card>
		</div>
	\`
})`}};const s={title:"Componentes/Containers/PanelCard",component:i,includeStories:["panelCard"]},E={PanelCard:"panelCard"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>e(f,{mdxStoryNameToKey:E,mdxComponentAnnotations:s},e(v,null))};const Q=["Template","panelCard"];export{d as Template,Q as __namedExportsOrder,s as default,u as panelCard};
//# sourceMappingURL=PanelCard.stories.48f27226.js.map
