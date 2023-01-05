import"./jsx-runtime.ffeb56b3.js";import{c as e,A as g,C as _,S as f,M as y,a as b}from"./Props.13b11126.js";import"./iframe.093e9d3a.js";import{o as h,a as P,b as r,t as p,d as x,n as v}from"./vue.esm-bundler.3f4907d5.js";import{_ as H}from"./_plugin-vue_export-helper.cdc0426e.js";import{B as C}from"./Button.a5583993.js";import"./string.c56be6cf.js";import"./es.map.constructor.e6dc69c1.js";import"./es.number.to-fixed.b45394ab.js";const m={props:{title:{type:String,required:!0},subtitle:{type:String,default:null},compact:{type:Boolean,default:!1}}},B={class:"page-header__text"},N={class:"page-header__title"},S={class:"page-header__subtitle"},T={class:"page-header__aside-slot"};function k(a,t,n,o,E,O){return h(),P("header",{class:v(n.compact?"page-header__container--compact":"page-header__container")},[r("div",B,[r("p",N,p(n.title),1),r("p",S,p(n.subtitle),1)]),r("div",T,[x(a.$slots,"aside")])],2)}const d=H(m,[["render",k]]);m.__docgenInfo={exportName:"default",displayName:"PageHeader",description:"",tags:{},props:[{name:"title",type:{name:"string"},required:!0},{name:"subtitle",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"compact",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"aside"}]};function l(){return l=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(a[o]=n[o])}return a},l.apply(this,arguments)}const c=a=>({components:{CdsPageHeader:d,CdsButton:C},setup(){return{args:a}},template:`
		<cds-page-header
			v-bind="args"
		>
			<template
				#aside
			>
				<div class="d-flex">
					<cds-button
						secondary
						@click="logClick('Btn 1')"
						text="Button 1"
					/>
					<cds-button
						class="d-flex align-items-center ml-4"
						variant="success"
						@click="logClick('Btn 2')"
						text="Button 2"
					/>
				</div>
			</template>
		</cds-page-header>
	`,methods:{logClick(t){console.log(t)}}}),M={Template:c},A="wrapper";function u({components:a,...t}){return e(A,l({},M,t,{components:a,mdxType:"MDXLayout"}),e(y,{title:"Componentes/Estrutural/PageHeader",component:d,mdxType:"Meta"}),e("h1",null,"PageHeader"),e("h3",null,"PageHeader s\xE3o componentes utilizados para adicionar t\xEDtulo, subt\xEDtulo e a\xE7\xF5es em p\xE1ginas."),e("hr",null),e("br",null),e("h2",null,"Recomendamos o uso de PageHeaderPageHeader quando:"),e("ul",null,e("li",{parentName:"ul"},"Precisar colocar headers em p\xE1ginas."),e("li",{parentName:"ul"},"Precisar adicionar bot\xF5es de a\xE7\xE3o a n\xEDvel de p\xE1gina."),e("li",{parentName:"ul"},"Precisar adicionar cards informativos no topo de p\xE1ginas.")),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de PageHeader quando:"),e("ul",null,e("li",{parentName:"ul"},"Fora do topo de p\xE1ginas.")),e("br",null),e("h2",null,"Preview"),e(_,{mdxType:"Canvas"},e(f,{name:"PageHeader",args:{title:"Procedimentos",subtitle:"Gerencie os procedimentos cadastrados"},mdxType:"Story"},c.bind({}))),e(b,{story:"PageHeader",mdxType:"ArgsTable"}))}u.isMDXComponent=!0;const i=c.bind({});i.storyName="PageHeader";i.args={title:"Procedimentos",subtitle:"Gerencie os procedimentos cadastrados"};i.parameters={storySource:{source:`args => ({
  components: {
    CdsPageHeader: PageHeader,
    CdsButton: Button
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-page-header
			v-bind="args"
		>
			<template
				#aside
			>
				<div class="d-flex">
					<cds-button
						secondary
						@click="logClick('Btn 1')"
						text="Button 1"
					/>
					<cds-button
						class="d-flex align-items-center ml-4"
						variant="success"
						@click="logClick('Btn 2')"
						text="Button 2"
					/>
				</div>
			</template>
		</cds-page-header>
	\`,
  methods: {
    logClick(btnName) {
      console.log(btnName);
    }

  }
})`}};const s={title:"Componentes/Estrutural/PageHeader",component:d,includeStories:["pageHeader"]},D={PageHeader:"pageHeader"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>e(g,{mdxStoryNameToKey:D,mdxComponentAnnotations:s},e(u,null))};const $=["Template","pageHeader"];export{c as Template,$ as __namedExportsOrder,s as default,i as pageHeader};
//# sourceMappingURL=PageHeader.stories.9eace287.js.map
