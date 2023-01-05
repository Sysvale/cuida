import"./jsx-runtime.e92fe57f.js";import{c as e,A as N,C as A,S,M as q,a as O}from"./Props.6dcc4647.js";import"./iframe.9f7d92e6.js";import"./blocks.3c9ce2d7.js";import{i as y}from"./index.8320c527.js";import{i as k}from"./index.83107f25.js";import{c as f,a as E}from"./colors.f20a4d92.js";import{o as s,a as i,b as l,F as T,e as h,n as p,t as z,x as F,d as w}from"./vue.esm-bundler.3f4907d5.js";import{_ as D}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.20804f82.js";import"./es.map.constructor.a5cd5795.js";import"./es.number.to-fixed.34b4d69d.js";const C={props:{tabs:{type:Array,default:()=>[],required:!0,validator:a=>!a.filter(n=>y(n.title)||y(n.name)).length},activeTab:{type:Object,default:()=>({}),required:!0},variant:{type:String,default:"green",validator:a=>f.includes(a)}},data(){return{internalActiveTab:this.activeTab,colorOptions:f}},computed:{activeBorderStyle(){return{"--indicatorColor":this.colorHexCode(this.variant)}}},watch:{tabs:{handler(a){const t=a.filter(n=>n.name===this.activeTab.name);[this.internalActiveTab]=t.length?t:a},immediate:!0}},methods:{colorHexCode:E,getSlotName(a){return a.name},handleClick(a,t){this.$emit("change",{event:a,item:t}),this.internalActiveTab=t},isActive(a){return k(this.internalActiveTab,a)}}},M={id:"inner-tabs"},j={class:"inner-tabs__header"},V=["onClick"],B=l("hr",{class:"inner-tabs__divider"},null,-1),X={class:"inner-tabs__content"};function H(a,t,n,m,R,o){return s(),i("div",M,[l("ul",j,[(s(!0),i(T,null,h(n.tabs,(r,u)=>(s(),i("li",{key:`${u}-${r.name}-tab`,role:"presentation"},[l("a",{role:"tab",href:"javascript:void(0)",target:"_self",class:p(["inner-tabs__tab",o.isActive(r)?"inner-tabs__tab--active":"inner-tabs__tab--inactive"]),onClick:I=>o.handleClick(I,r)},z(r.title),11,V),l("div",{class:p(o.isActive(r)?"tab__indicator--active":""),style:F(o.activeBorderStyle)},null,6)]))),128))]),B,l("div",X,[(s(!0),i(T,null,h(n.tabs,(r,u)=>(s(),i("div",{key:`${u}-${r.name}-tab`,role:"tabpanel",class:p(["content__pane",o.isActive(r)?"content__pane--active":"content__pane--inactive"])},[w(a.$slots,o.getSlotName(r))],2))),128))])])}const v=D(C,[["render",H]]);C.__docgenInfo={exportName:"default",displayName:"InnerTabs",description:"",tags:{},props:[{name:"tabs",description:"Define a lista dos itens da InnerTabs a serem mostrados.\nOs itens da lista devem ser objetos com `name` (para identificar o slot)\ne `title` (t\xEDtulo da aba)",type:{name:"array"},required:!0,defaultValue:{func:!1,value:"[]"}},{name:"activeTab",description:"O item ativo dentre as abas",type:{name:"object"},required:!0,defaultValue:{func:!1,value:"{}"}},{name:"variant",description:"Cor da borda que indica o item ativo.\nExistem algumas cores predefinidas seguindo os guias do Cuida, s\xE3o elas: \n`turquoise`, `green`, `blue`, `violet`, `pink`, `red`, `orange`, `amber` e `gray`.",type:{name:"string"},defaultValue:{func:!1,value:"'green'"}}],events:[{name:"change",description:"Evento emitido quando a aba ativa \xE9 alterada",type:{names:["Event"]}}],slots:[{name:"default",scoped:!0,description:"Slot para renderiza\xE7\xE3o customizada do conte\xFAdo das abas",bindings:[{name:"name",title:"binding"}]}]};function b(){return b=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var m in n)Object.prototype.hasOwnProperty.call(n,m)&&(a[m]=n[m])}return a},b.apply(this,arguments)}const g=a=>({components:{CdsInnerTabs:v},setup(){return{args:a}},template:`
		<div style="background-color: #F8F9FA; padding: 16px; border-radius: 4px;">
			<cds-inner-tabs
				v-bind="args"
			>
				<template v-slot:overview>
					Overview
				</template>
				<template v-slot:indicator-1>
					Conte\xFAdo da tab-1
				</template>
				<template v-slot:indicator-2>
					Conte\xFAdo da tab-2
				</template>
				<template v-slot:indicator-3>
					Conte\xFAdo da tab-3
				</template>
				<template v-slot:indicator-4>
					Conte\xFAdo da tab-4
				</template>
			</cds-inner-tabs>
	</div>
	`}),c=[{title:"Vis\xE3o geral",name:"overview"},{title:"Indicador 1",name:"indicator-1"},{title:"Indicador 2",name:"indicator-2"},{title:"Indicador 3",name:"indicator-3"},{title:"Indicador 4",name:"indicator-4"}],L={Template:g,items:c},P="wrapper";function x({components:a,...t}){return e(P,b({},L,t,{components:a,mdxType:"MDXLayout"}),e(q,{title:"Componentes/Navega\xE7\xE3o/InnerTabs",component:v,argTypes:{variant:{control:{type:"select",options:["turquoise","green","blue","indigo","violet","pink","red","orange","amber","gray"]}}},mdxType:"Meta"}),e("h1",null,"InnerTabs"),e("h3",null,"InnerTabs s\xE3o componentes utilizados para criar solu\xE7\xF5es de navega\xE7\xE3o interas \xE0s ",e("a",{href:"https://sysvale.github.io/cuida/?path=/docs/componentes-navega%C3%A7%C3%A3o-tabs--tabs"},"Tabs"),"."),e("hr",null),e("br",null),e("h2",null,"Recomendamos o uso de InnerTabs quando:"),e("ul",null,e("li",{parentName:"ul"},"Dentro de tabs, houver necessidade de mais um n\xEDvel na estrutura de navega\xE7\xE3o;"),e("li",{parentName:"ul"},"For necess\xE1rio separar o conte\xFAdo por abas e navergar por elas."),e("li",{parentName:"ul"},"N\xE3o for o caso de utilizar solu\xE7\xF5es como navbars, sidebars, cards ou links como navega\xE7\xE3o.")),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de InnerTabs quando:"),e("ul",null,e("li",{parentName:"ul"},"Eles forem o \xFAnico componente de abas na p\xE1gina."),e("li",{parentName:"ul"},"Houver muitos itens a serem mostrados como abas."),e("li",{parentName:"ul"},"Quando a a\xE7\xE3o de clique realizada pelo usu\xE1rio o levar para outra p\xE1gina.")),e("br",null),e("h2",null,"Observa\xE7\xF5es:"),e("ul",null,e("li",{parentName:"ul"},"\u26A0\uFE0F ",e("strong",{parentName:"li"},"Importante:")," Refor\xE7ando as recomenda\xE7\xF5es acima, InnerTabs foram concebidas para funcionar dentro de abas. O componente n\xE3o deve ser utilizado isoladamente."),e("li",{parentName:"ul"},"TODO: Scroll horizontal quando o n\xFAmero de abas for maior que 6.")),e("br",null),e("h2",null,"Preview"),e(A,{mdxType:"Canvas"},e(S,{name:"InnerTabs",args:{tabs:c,activeTab:c[1]},mdxType:"Story"},g.bind({}))),e(O,{story:"InnerTabs",mdxType:"ArgsTable"}))}x.isMDXComponent=!0;const _=g.bind({});_.storyName="InnerTabs";_.args={tabs:c,activeTab:c[1]};_.parameters={storySource:{source:`args => ({
  components: {
    CdsInnerTabs: InnerTabs
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<div style="background-color: #F8F9FA; padding: 16px; border-radius: 4px;">
			<cds-inner-tabs
				v-bind="args"
			>
				<template v-slot:overview>
					Overview
				</template>
				<template v-slot:indicator-1>
					Conte\xFAdo da tab-1
				</template>
				<template v-slot:indicator-2>
					Conte\xFAdo da tab-2
				</template>
				<template v-slot:indicator-3>
					Conte\xFAdo da tab-3
				</template>
				<template v-slot:indicator-4>
					Conte\xFAdo da tab-4
				</template>
			</cds-inner-tabs>
	</div>
	\`
})`}};const d={title:"Componentes/Navega\xE7\xE3o/InnerTabs",component:v,argTypes:{variant:{control:{type:"select",options:["turquoise","green","blue","indigo","violet","pink","red","orange","amber","gray"]}}},includeStories:["innerTabs"]},K={InnerTabs:"innerTabs"};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:()=>e(N,{mdxStoryNameToKey:K,mdxComponentAnnotations:d},e(x,null))};const re=["Template","items","innerTabs"];export{g as Template,re as __namedExportsOrder,d as default,_ as innerTabs,c as items};
//# sourceMappingURL=InnerTabs.stories.ee8ecbc1.js.map
