import"./jsx-runtime.e92fe57f.js";import{c as e,A as _,C as x,S as B,M as h,a as T}from"./Props.6dcc4647.js";import"./iframe.9f7d92e6.js";import{B as S}from"./Button.a5583993.js";import{r as V,o as k,a as A,b as n,n as i,t as C,d as f,i as q,f as D}from"./vue.esm-bundler.3f4907d5.js";import{_ as O}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.20804f82.js";import"./es.map.constructor.a5cd5795.js";import"./es.number.to-fixed.34b4d69d.js";const v={components:{CdsButton:S},props:{title:{type:String,default:"T\xEDtulo do AlertCard",required:!0},text:{type:String,default:"Subt\xEDtulo do AlertCard",required:!0},image:{type:String,default:"",required:!0},imageDescription:{type:String,default:"Imagem de CalloutCard"},actionButtonVariant:{type:String,default:"green"},actionButtonText:{type:String,default:"Ok"},actionButtonSecondary:{type:Boolean,default:!1},actionButtonDisabled:{type:Boolean,default:!1},compact:{type:Boolean,default:!1}},methods:{resolveClass(t){return this.compact?`${t}--compact`:t}}},M={id:"callout-card"},N={class:"image__container"},w=["src","alt"],E={class:"content__title"},j={class:"content__text"};function z(t,o,a,r,F,s){const b=V("cds-button");return k(),A("span",M,[n("div",{class:i(s.resolveClass("callout-card__container"))},[n("div",N,[n("img",{class:i(s.resolveClass("image__content")),src:a.image,alt:a.imageDescription},null,10,w)]),n("div",{class:i(s.resolveClass("content__container"))},[n("div",{class:i(s.resolveClass("content"))},[n("p",E,C(a.title),1),n("span",j,[f(t.$slots,"text",{},()=>[q(C(a.text),1)])])],2),n("div",null,[f(t.$slots,"action",{},()=>[D(b,{id:"content-button",variant:a.actionButtonVariant,text:a.actionButtonText,secondary:a.actionButtonSecondary,disabled:a.actionButtonDisabled,onClick:o[0]||(o[0]=K=>t.$emit("action-button-click",!0))},null,8,["variant","text","secondary","disabled"])])])],2)],2)])}const u=O(v,[["render",z]]);v.__docgenInfo={exportName:"default",displayName:"CalloutCard",description:"",tags:{},props:[{name:"title",description:"O t\xEDtulo do card. O t\xEDtulo tamb\xE9m pode ser usado com o slot.",type:{name:"string"},required:!0,defaultValue:{func:!1,value:"'T\xEDtulo do AlertCard'"}},{name:"text",description:"O texto do card. O texto tamb\xE9m pode ser usado com o slot.",type:{name:"string"},required:!0,defaultValue:{func:!1,value:"'Subt\xEDtulo do AlertCard'"}},{name:"image",description:"A imagem do card.",type:{name:"string"},required:!0,defaultValue:{func:!1,value:"''"}},{name:"imageDescription",description:"A descri\xE7\xE3o da imagem do card.",type:{name:"string"},defaultValue:{func:!1,value:"'Imagem de CalloutCard'"}},{name:"actionButtonVariant",description:"A cor do bot\xE3o do card.",type:{name:"string"},defaultValue:{func:!1,value:"'green'"}},{name:"actionButtonText",description:"O texto do bot\xE3o do card.",type:{name:"string"},defaultValue:{func:!1,value:"'Ok'"}},{name:"actionButtonSecondary",description:"A vers\xE3o secund\xE1ria do bot\xE3o.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"actionButtonDisabled",description:"A vers\xE3o disabled do bot\xE3o.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"compact",description:"Modo de exibi\xE7\xE3o do card.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"action-button-click",description:"Evento que indica que o Bot\xE3o foi clicado",type:{names:["Event"]}}],slots:[{name:"text",description:"Slot usado para inser\xE7\xE3o de conte\xFAdo customizado no texto."},{name:"action",description:"Slot usado para inser\xE7\xE3o de conte\xFAdo customizado no lugar do bot\xE3o de a\xE7\xE3o."}]};function d(){return d=Object.assign?Object.assign.bind():function(t){for(var o=1;o<arguments.length;o++){var a=arguments[o];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t},d.apply(this,arguments)}const c=t=>({components:{CdsCalloutCard:u},setup(){return{args:t}},template:`
		<cds-callout-card
			v-bind="args"
			@actionButtonClick="logButtonClick"
		/>
	`,methods:{logButtonClick(o){console.log("logClick: ",o)}}}),m="T\xEDtulo do CalloutCard",p=`Existe uma teoria que diz que, se um dia algu\xE9m descobrir 
	exatamente para que serve o Universo e por que ele est\xE1 aqui, ele 
	desaparecer\xE1 instantaneamente.`,P={Template:c,title:m,text:p},X="wrapper";function y({components:t,...o}){return e(X,d({},P,o,{components:t,mdxType:"MDXLayout"}),e(h,{title:"Componentes/Display/CalloutCard",component:u,argTypes:{actionButtonVariant:{control:{type:"select",options:["teal","green","blue","indigo","violet","pink","red","orange","amber"]}}},parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}},docs:{source:{language:"html",format:!0,code:`
<cds-callout-card
	image="caminho-da-imagem.jpg"
	text="Texto do CalloutCard"
	title="T\xEDtulo do CalloutCard"
/>`}}},mdxType:"Meta"}),e("h1",null,"CalloutCard"),e("h3",null,"CalloutCards s\xE3o componentes usados para fornecer ao usu\xE1rio informa\xE7\xF5es \xFAteis, como tutoriais, atalhos ou dicas."),e("hr",null),e("br",null),e("h2",null,"Quando usar:"),e("ul",null,e("li",{parentName:"ul"},"For necess\xE1rio mostrar atalhos, dicas ou tutoriais de uma forma n\xE3o intrusiva e visualmente marcante.")),e("br",null),e("h2",null,"Quando n\xE3o usar:"),e("ul",null,e("li",{parentName:"ul"},"For necess\xE1rio mostrar mensagens relacionadas a mudan\xE7as ou condi\xE7\xF5es especiais que ocorrem em um componente ou p\xE1gina. Para estes casos, recomenda-se o uso do Alert.")),e("br",null),e("h2",null,"Preview"),e(x,{mdxType:"Canvas"},e(B,{name:"CalloutCard",args:{image:"https://cdn-icons-png.flaticon.com/512/7486/7486747.png",title:m,text:p},mdxType:"Story"},c.bind({}))),e(T,{story:"CalloutCard",mdxType:"ArgsTable"}))}y.isMDXComponent=!0;const g=c.bind({});g.storyName="CalloutCard";g.args={image:"https://cdn-icons-png.flaticon.com/512/7486/7486747.png",title:m,text:p};g.parameters={storySource:{source:`args => ({
  components: {
    CdsCalloutCard: CalloutCard
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-callout-card
			v-bind="args"
			@actionButtonClick="logButtonClick"
		/>
	\`,
  methods: {
    logButtonClick(event) {
      console.log('logClick: ', event);
    }

  }
})`}};const l={title:"Componentes/Display/CalloutCard",parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}},docs:{source:{language:"html",format:!0,code:`
<cds-callout-card
	image="caminho-da-imagem.jpg"
	text="Texto do CalloutCard"
	title="T\xEDtulo do CalloutCard"
/>`}}},component:u,argTypes:{actionButtonVariant:{control:{type:"select",options:["teal","green","blue","indigo","violet","pink","red","orange","amber"]}}},includeStories:["calloutCard"]},I={CalloutCard:"calloutCard"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>e(_,{mdxStoryNameToKey:I,mdxComponentAnnotations:l},e(y,null))};const Z=["Template","title","text","calloutCard"];export{c as Template,Z as __namedExportsOrder,g as calloutCard,l as default,p as text,m as title};
//# sourceMappingURL=CalloutCard.stories.f5ee66d7.js.map
