import"./jsx-runtime.ffeb56b3.js";import{c as t,A as v,C as b,S,M as x,a as _}from"./Props.13b11126.js";import"./iframe.093e9d3a.js";import{B as C}from"./Button.a5583993.js";import{r as E,o as p,a as T,d as c,b as s,t as u,i as h,l as B,g as k}from"./vue.esm-bundler.3f4907d5.js";import{_ as V}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.c56be6cf.js";import"./es.map.constructor.e6dc69c1.js";import"./es.number.to-fixed.b45394ab.js";const A=["teal","green","blue","indigo","violet","pink","red","orange","amber"],g={components:{CdsButton:C},props:{image:{type:String,default:""},imageDescription:{type:String,default:"Imagem de Empty State"},title:{type:String,default:"T\xEDtulo do empty state",required:!0},text:{type:String,default:"Para sair dessa situa\xE7\xE3o de empty state, realize a a\xE7\xE3o abaixo."},hideActionButton:{type:Boolean,default:!1},actionButtonText:{type:String,default:"Finalizar"},actionButtonVariant:{type:String,default:"green",validator:e=>A.includes(e)}}},z={class:"empty-state"},D=["src","alt"],N={class:"empty-state__title"},M={class:"empty-state__text"};function O(e,o,a,i,q,L){const f=E("cds-button");return p(),T("div",z,[c(e.$slots,"graphic-element",{},()=>[s("img",{class:"empty-state__image",src:a.image,alt:a.imageDescription},null,8,D)],!0),s("div",N,u(a.title),1),s("div",M,[c(e.$slots,"text",{},()=>[h(u(a.text),1)],!0)]),a.hideActionButton?k("",!0):(p(),B(f,{key:0,class:"empty-state__button",text:a.actionButtonText,variant:a.actionButtonVariant,onClick:o[0]||(o[0]=U=>e.$emit("action-button-click",!0))},null,8,["text","variant"]))])}const l=V(g,[["render",O],["__scopeId","data-v-0ed9d438"]]);g.__docgenInfo={exportName:"default",displayName:"EmptyState",description:"",tags:{},props:[{name:"image",description:`A imagem a ser mostrada no Empty State. Obs.: o addon Controls
do Storybook ainda n\xE3o permite a sele\xE7\xE3o de arquivos. Desse modo
n\xE3o \xE9 poss\xEDvel testar o funcionamento dessa prop por aqui.`,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"imageDescription",description:"O descritor da imagem do Empty State adicionado \xE0 'alt' da tag <img>",type:{name:"string"},defaultValue:{func:!1,value:"'Imagem de Empty State'"}},{name:"title",description:"O t\xEDtulo do Empty State.",type:{name:"string"},required:!0,defaultValue:{func:!1,value:"'T\xEDtulo do empty state'"}},{name:"text",description:"O texto instrutivo do Empty State",type:{name:"string"},defaultValue:{func:!1,value:"'Para sair dessa situa\xE7\xE3o de empty state, realize a a\xE7\xE3o abaixo.'"}},{name:"hideActionButton",description:"Prop utilizada para ocultar o bot\xE3o de a\xE7\xE3o do Empty State.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"actionButtonText",description:"O texto mostrado no bot\xE3o de a\xE7\xE3o do Empty State",type:{name:"string"},defaultValue:{func:!1,value:"'Finalizar'"}},{name:"actionButtonVariant",description:"A variante do bot\xE3o de a\xE7\xE3o do Empty State (segue as variantes do componente de bot\xE3o do Cuida)",type:{name:"string"},defaultValue:{func:!1,value:"'green'"},values:["teal","green","blue","indigo","violet","pink","red","orange","amber"]}],events:[{name:"action-button-click",description:"Evento emitido quando o bot\xE3o do Empty State \xE9 clicado",type:{names:["Event"]}}],slots:[{name:"graphic-element",description:"Slot usado para inser\xE7\xE3o de conte\xFAdo gr\xE1fico"},{name:"text",description:"Slot usado para inser\xE7\xE3o de conte\xFAdo customizado no texto do corpo do"}]};function r(){return r=Object.assign?Object.assign.bind():function(e){for(var o=1;o<arguments.length;o++){var a=arguments[o];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e},r.apply(this,arguments)}const m=e=>({components:{CdsEmptyState:l},setup(){return{args:e}},template:`
		<cds-empty-state
			v-bind="args" 
			@actionButtonClick="logButtonClick"
		/>
	`,methods:{logButtonClick(o){console.log("logClick: ",o)}}}),P={Template:m},I="wrapper";function y({components:e,...o}){return t(I,r({},P,o,{components:e,mdxType:"MDXLayout"}),t(x,{title:"Componentes/Display/EmptyState",component:l,argTypes:{actionButtonVariant:{control:{type:"select",options:["teal","green","blue","indigo","violet","pink","red","orange","amber"]}}},parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}},docs:{source:{language:"html",format:!0,code:`
<cds-empty-state
	image="static/media/CuidaTempLogo.f4adb1cc.png"
	image-description="Imagem de empty state"
	title="T\xEDtulo do empty state"
	text="Para sair dessa situa\xE7\xE3o de empty state, realize a a\xE7\xE3o abaixo"
	action-button-text="Adicionar novo recurso"
	@action-button-click="handleClick"
/>`}}},mdxType:"Meta"}),t("h1",null,"EmptyState"),t("h3",null,"EmptyStates s\xE3o componentes utilizados em momentos instrutivos aos usu\xE1rios."),t("hr",null),t("br",null),t("h2",null,"Quando usar:"),t("ul",null,t("li",{parentName:"ul"},"For necess\xE1rio instruir o usu\xE1rio sobre o funcionamento de uma determinada p\xE1gina."),t("li",{parentName:"ul"},"Uma p\xE1gina ou componente n\xE3o possuir conte\xFAdo padr\xE3o a ser mostrado."),t("li",{parentName:"ul"},"Uma determinada a\xE7\xE3o resultar em erro.")),t("br",null),t("h2",null,"Quando n\xE3o usar:"),t("ul",null,t("li",{parentName:"ul"},"Utilizado como um loader."),t("li",{parentName:"ul"},"Utilizado apenas com t\xEDtulo.")),t("br",null),t("h2",null,"Preview"),t(b,{mdxType:"Canvas"},t(S,{name:"EmptyState",args:{image:"https://cdn-icons-png.flaticon.com/512/7486/7486747.png",imageDescription:"Imagem de empty state",title:"T\xEDtulo do empty state",text:"Para sair dessa situa\xE7\xE3o de empty state, realize a a\xE7\xE3o abaixo",actionButtonText:"Adicionar novo recurso"},mdxType:"Story"},m.bind({}))),t(_,{story:"EmptyState",mdxType:"ArgsTable"}))}y.isMDXComponent=!0;const d=m.bind({});d.storyName="EmptyState";d.args={image:"https://cdn-icons-png.flaticon.com/512/7486/7486747.png",imageDescription:"Imagem de empty state",title:"T\xEDtulo do empty state",text:"Para sair dessa situa\xE7\xE3o de empty state, realize a a\xE7\xE3o abaixo",actionButtonText:"Adicionar novo recurso"};d.parameters={storySource:{source:`args => ({
  components: {
    CdsEmptyState: EmptyState
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-empty-state
			v-bind="args" 
			@actionButtonClick="logButtonClick"
		/>
	\`,
  methods: {
    logButtonClick(event) {
      console.log('logClick: ', event);
    }

  }
})`}};const n={title:"Componentes/Display/EmptyState",parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}},docs:{source:{language:"html",format:!0,code:`
<cds-empty-state
	image="static/media/CuidaTempLogo.f4adb1cc.png"
	image-description="Imagem de empty state"
	title="T\xEDtulo do empty state"
	text="Para sair dessa situa\xE7\xE3o de empty state, realize a a\xE7\xE3o abaixo"
	action-button-text="Adicionar novo recurso"
	@action-button-click="handleClick"
/>`}}},component:l,argTypes:{actionButtonVariant:{control:{type:"select",options:["teal","green","blue","indigo","violet","pink","red","orange","amber"]}}},includeStories:["emptyState"]},w={EmptyState:"emptyState"};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:()=>t(v,{mdxStoryNameToKey:w,mdxComponentAnnotations:n},t(y,null))};const R=["Template","emptyState"];export{m as Template,R as __namedExportsOrder,n as default,d as emptyState};
//# sourceMappingURL=EmptyState.stories.4950f119.js.map
