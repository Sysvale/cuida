import"./jsx-runtime.db376543.js";import{c as a,A as N,C as E,S as q,M as F,a as O}from"./Props.519c721e.js";import"./iframe.facb5a71.js";import"./blocks.70b2f959.js";import{i as _}from"./index.d69b1daf.js";import{i as B}from"./index.8a3fbef1.js";import{c as f,a as D,b as j}from"./colors.f20a4d92.js";import{r as M,o as i,a as l,b as s,x as w,F as y,e as C,n as T,j as x,t as V,f as z,g as P,d as H}from"./vue.esm-bundler.3f4907d5.js";import{_ as L}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.7a88f6c6.js";import"./es.map.constructor.dc039611.js";import"./es.number.to-fixed.98762696.js";const A={props:{tabs:{type:Array,default:()=>[],required:!0,validator:e=>!e.filter(o=>_(o.title)||_(o.name)).length},activeTab:{type:Object,default:()=>({}),required:!0},activeColor:{type:String,default:"green",validator:e=>f.includes(e)},showAddAction:{type:Boolean,default:!1}},data(){return{internalActiveTab:this.activeTab,colorOptions:f}},computed:{activeBorderStyle(){return this.activeColor?{"--activeBorderColor":this.colorHexCode(this.activeColor),"--hoverBorderColor":this.colorLighterHexCode(this.activeColor)}:{"--activeBorderColor":"#206ED9","--hoverBorderColor":"#CED6FD"}}},watch:{tabs:{handler(e){const t=e.filter(o=>o.name===this.activeTab.name);[this.internalActiveTab]=t.length?t:e},immediate:!0}},methods:{colorHexCode:D,colorLighterHexCode:j,getSlotName(e){return e.name},handleRightClick(e,t){this.$emit("right-click",{event:e,item:t})},handleClick(e,t){this.$emit("change",{event:e,item:t}),this.internalActiveTab=t},handleAddAction(e){this.$emit("add-action",e)},isActive(e){return B(this.internalActiveTab,e)}}},X={id:"cds-tabs",class:"cds-tabs"},R={class:"card cds-tabs__wrapper"},K={class:"card-header"},I={class:"nav nav-tabs card-header-tabs"},Q=["onClick","onContextmenu"],$={class:"cds-tab__title"},G={key:0,role:"presentation",class:"nav-item cds-tab__action"},J={class:"tab-content cds-tab__content"},U={class:"container-fluid"};function W(e,t,o,m,ae,r){const k=M("ion-icon");return i(),l("span",X,[s("div",R,[s("div",{class:"tabs",style:w(r.activeBorderStyle)},[s("div",K,[s("ul",I,[(i(!0),l(y,null,C(o.tabs,(n,u)=>(i(),l("li",{key:`${u}-${n.name}-tab`,role:"presentation",class:"nav-item cds-tabs__item"},[s("a",{role:"tab",href:"javascript:void(0)",target:"_self",class:T(["nav-link cds-tabs__link",r.isActive(n)?"cds-tab__active-item active":""]),onClick:p=>r.handleClick(p,n),onContextmenu:x(p=>r.handleRightClick(p,n),["prevent","stop"])},[s("div",$,V(n.title),1)],42,Q)]))),128)),o.showAddAction?(i(),l("li",G,[s("a",{role:"tab",href:"javascript:void(0)",target:"_self",class:"nav-link",onClick:t[0]||(t[0]=x((...n)=>r.handleAddAction&&r.handleAddAction(...n),["prevent"]))},[z(k,{name:"add-outline"})])])):P("",!0)])]),s("div",J,[(i(!0),l(y,null,C(o.tabs,(n,u)=>(i(),l("div",{key:`${u}-${n.name}-tab`,role:"tabpanel",class:T(["tab-pane cds-tabs__tab-container card-body",r.isActive(n)?"active":""])},[s("div",U,[H(e.$slots,r.getSlotName(n))])],2))),128))])],4)])])}const v=L(A,[["render",W]]);A.__docgenInfo={exportName:"default",displayName:"Tabs",description:"",tags:{},props:[{name:"tabs",description:"Define a lista dos itens do Tabs a serem mostrados.\nOs itens da lista devem ser objetos com `name` (para identificar o slot)\ne `title` (t\xEDtulo da aba)",type:{name:"array"},required:!0,defaultValue:{func:!1,value:"[]"}},{name:"activeTab",description:"O item ativo dentre as abas",type:{name:"object"},required:!0,defaultValue:{func:!1,value:"{}"}},{name:"activeColor",description:"Cor da borda que indica o item ativo.\nExistem algumas cores predefinidas seguindo os guias do Cuida, s\xE3o elas: \n`turquoise`, `green`, `blue`, `violet`, `pink`, `red`, `orange`, `amber` e `gray`.",type:{name:"string"},defaultValue:{func:!1,value:"'green'"}},{name:"showAddAction",description:"Define se o bot\xE3o de adicionar deve ser exibido ou n\xE3o, por padr\xE3o ele n\xE3o ser\xE1 exibido",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"right-click",description:"Evento emitido quando uma das abas \xE9 clicada com o bot\xE3o direito",type:{names:["Event"]}},{name:"change",description:"Evento emitido quando muda de aba",type:{names:["Event"]}},{name:"add-action",description:"Evento emitido ao clicar no bot\xE3o de adicionar",type:{names:["Event"]}}],slots:[{name:"default",scoped:!0,description:"Slot para renderiza\xE7\xE3o customizada do conte\xFAdo das abas",bindings:[{name:"name",title:"binding"}]}]};function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var m in o)Object.prototype.hasOwnProperty.call(o,m)&&(e[m]=o[m])}return e},b.apply(this,arguments)}const g=e=>({components:{CdsTabs:v},setup(){return{args:e}},template:`
		<div style="background-color: #F8F9FA; padding: 16px; border-radius: 4px;">
			<cds-tabs
				v-bind="args"
			>
				<template v-slot:room-42>
					Sala de Psicologia
				</template>
				<template v-slot:room-51>
					Sala de Fisioterapia
				</template>
				<template v-slot:room-13>
					Sala de Otorrinolaringologista
				</template>
			</cds-tabs>
	</div>
	`}),c=[{title:"Psicologia",name:"room-42"},{title:"Fisioterapia",name:"room-51"},{title:"Otorrinolaringologista",name:"room-13"}],Y={Template:g,items:c},Z="wrapper";function S({components:e,...t}){return a(Z,b({},Y,t,{components:e,mdxType:"MDXLayout"}),a(F,{title:"Componentes/Navega\xE7\xE3o/Tabs",component:v,argTypes:{activeColor:{control:{type:"select",options:["turquoise","green","blue","indigo","violet","pink","red","orange","amber","gray"]}}},mdxType:"Meta"}),a("h1",null,"Tabs"),a("h3",null,"Tabs s\xE3o componentes utilizados para criar solu\xE7\xF5es de navega\xE7\xE3o internas."),a("hr",null),a("br",null),a("h2",null,"Recomendamos o uso de Tabs quando:"),a("ul",null,a("li",{parentName:"ul"},"For necess\xE1rio separar o conte\xFAdo por abas e navergar por elas."),a("li",{parentName:"ul"},"N\xE3o for o caso de utilizar solu\xE7\xF5es como navbars, sidebars, cards ou links como navega\xE7\xE3o.")),a("br",null),a("h2",null,"N\xE3o recomendamos o uso de Tabs quando:"),a("ul",null,a("li",{parentName:"ul"},"Houver muitos itens a serem mostrados como abas."),a("li",{parentName:"ul"},"Quando a a\xE7\xE3o de clique realizada pelo usu\xE1rio o levar para outra p\xE1gina.")),a("br",null),a("h2",null,"Preview"),a(E,{mdxType:"Canvas"},a(q,{name:"Tabs",args:{tabs:c,activeTab:c[1]},mdxType:"Story"},g.bind({}))),a(O,{story:"Tabs",mdxType:"ArgsTable"}))}S.isMDXComponent=!0;const h=g.bind({});h.storyName="Tabs";h.args={tabs:c,activeTab:c[1]};h.parameters={storySource:{source:`args => ({
  components: {
    CdsTabs: Tabs
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
			<cds-tabs
				v-bind="args"
			>
				<template v-slot:room-42>
					Sala de Psicologia
				</template>
				<template v-slot:room-51>
					Sala de Fisioterapia
				</template>
				<template v-slot:room-13>
					Sala de Otorrinolaringologista
				</template>
			</cds-tabs>
	</div>
	\`
})`}};const d={title:"Componentes/Navega\xE7\xE3o/Tabs",component:v,argTypes:{activeColor:{control:{type:"select",options:["turquoise","green","blue","indigo","violet","pink","red","orange","amber","gray"]}}},includeStories:["tabs"]},ee={Tabs:"tabs"};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:()=>a(N,{mdxStoryNameToKey:ee,mdxComponentAnnotations:d},a(S,null))};const be=["Template","items","tabs"];export{g as Template,be as __namedExportsOrder,d as default,c as items,h as tabs};
//# sourceMappingURL=Tabs.stories.5f89e53f.js.map
