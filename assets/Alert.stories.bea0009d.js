import"./jsx-runtime.e92fe57f.js";import{c as e,A,C as h,S as C,M as T,a as w}from"./Props.6dcc4647.js";import"./iframe.9f7d92e6.js";import{C as N}from"./Icon.8f5a5ec8.js";import{r as k,o as s,a as l,b as i,f as g,n as c,t as S,d as q,g as M}from"./vue.esm-bundler.3f4907d5.js";import{_ as O}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.20804f82.js";import"./es.map.constructor.a5cd5795.js";import"./es.number.to-fixed.34b4d69d.js";const v={components:{CdsIcon:N},props:{variant:{type:String,default:"info",required:!1},text:{type:String,default:"T\xEDtulo do AlertCard",required:!1},dismissible:{type:Boolean,default:!1,required:!1}},data(){return{icon:"warning-outline"}},methods:{close(){this.$emit("close")}},watch:{variant:{handler(a){switch(console.log("OPA"),a){case"info":this.icon="info-outline";break;case"success":this.icon="check-circle-outline";break;case"warning":this.icon="warning-outline";break;case"danger":this.icon="alert-outline";break;default:this.icon="alert-outline";break}},immediate:!0}}},P={id:"alert"},E={class:"alert__body"},V={key:0,class:"alert__text"},D={key:1,class:"alert__text"};function B(a,n,t,r,y,f){const _=k("cds-icon");return s(),l("span",P,[i("div",{class:c(["alert",{"alert__container--info":t.variant==="info","alert__container--success":t.variant==="success","alert__container--warning":t.variant==="warning","alert__container--danger":t.variant==="danger"}])},[i("div",E,[i("div",null,[g(_,{name:y.icon,class:c({"alert__icon--info":t.variant==="info","alert__icon--success":t.variant==="success","alert__icon--warning":t.variant==="warning","alert__icon--danger":t.variant==="danger"})},null,8,["name","class"])]),t.text.length>0?(s(),l("span",V,S(t.text),1)):(s(),l("span",D,[q(a.$slots,"default",{},void 0,!0)]))]),t.dismissible?(s(),l("div",{key:0,onClick:n[0]||(n[0]=(...x)=>f.close&&f.close(...x)),class:"alert__close-button"},[g(_,{name:"x-outline",class:c({"alert__icon--info":t.variant==="info","alert__icon--success":t.variant==="success","alert__icon--warning":t.variant==="warning","alert__icon--danger":t.variant==="danger"})},null,8,["class"])])):M("",!0)],2)])}const u=O(v,[["render",B],["__scopeId","data-v-30b81b38"]]);v.__docgenInfo={exportName:"default",displayName:"Alert",description:"",tags:{},props:[{name:"variant",description:`A variante do Alert. S\xE3o 3 variantes implementadas: 'info', 'warning'
e 'danger'`,type:{name:"string"},required:!1,defaultValue:{func:!1,value:"'info'"}},{name:"text",description:"O t\xEDtulo do alert. O t\xEDtulo tamb\xE9m pode ser usado com o slot.",type:{name:"string"},required:!1,defaultValue:{func:!1,value:"'T\xEDtulo do AlertCard'"}},{name:"dismissible",description:"Prop que exibe bot\xE3o de fechamento do alert.",type:{name:"boolean"},required:!1,defaultValue:{func:!1,value:"false"}}],events:[{name:"expanded",description:"Evento emitido quando o bot\xE3o de fechar o alert \xE9 clicado.",type:{names:["Event"]}}],slots:[{name:"default"}]};function d(){return d=Object.assign?Object.assign.bind():function(a){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(a[r]=t[r])}return a},d.apply(this,arguments)}const m=a=>({components:{CdsAlert:u},setup(){return{args:a}},template:`
		<cds-alert
			v-bind="args" 
		>
			Texto do alerta pelo slot
		</cds-alert>
	`}),X={Template:m},j="wrapper";function b({components:a,...n}){return e(j,d({},X,n,{components:a,mdxType:"MDXLayout"}),e(T,{title:"Componentes/Notifica\xE7\xE3o/Alert",component:u,argTypes:{variant:{control:{type:"select",options:["info","success","warning","danger"]}}},mdxType:"Meta"}),e("h1",null,"Alert"),e("h3",null,"Alerts s\xE3o componentes utilizados para prover feedbacks contextuais e notifica\xE7\xF5es em resposta a a\xE7\xF5es do usu\xE1rio ou atividades do sistema."),e("hr",null),e("br",null),e("h2",null,"Recomendamos o uso de Alerts quando:"),e("ul",null,e("li",{parentName:"ul"},"For necess\xE1rio mostrar informa\xE7\xF5es contextuais."),e("li",{parentName:"ul"},"Para feedbacks urgentes.")),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de Alerts quando:"),e("ul",null,e("li",{parentName:"ul"},"N\xE3o cubra outros elementos da interface com um Alert."),e("li",{parentName:"ul"},"For necess\xE1rio mostrar informa\xE7\xF5es de modo n\xE3o intrusivo. Para esse caso, recomendamos o uso de b-toasts."),e("li",{parentName:"ul"},"For necess\xE1rio mostrar informa\xE7\xF5es contextuais extensas. Para esse caso, recomendamos o uso de AlertCard.")),e("br",null),e("h2",null,"Preview"),e(h,{mdxType:"Canvas"},e(C,{name:"Alert",args:{variant:"info",text:"Texto do alerta"},mdxType:"Story"},m.bind({}))),e(w,{story:"Alert",mdxType:"ArgsTable"}))}b.isMDXComponent=!0;const p=m.bind({});p.storyName="Alert";p.args={variant:"info",text:"Texto do alerta"};p.parameters={storySource:{source:`args => ({
  components: {
    CdsAlert: Alert
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-alert
			v-bind="args" 
		>
			Texto do alerta pelo slot
		</cds-alert>
	\`
})`}};const o={title:"Componentes/Notifica\xE7\xE3o/Alert",component:u,argTypes:{variant:{control:{type:"select",options:["info","success","warning","danger"]}}},includeStories:["alert"]},F={Alert:"alert"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>e(A,{mdxStoryNameToKey:F,mdxComponentAnnotations:o},e(b,null))};const U=["Template","alert"];export{m as Template,U as __namedExportsOrder,p as alert,o as default};
//# sourceMappingURL=Alert.stories.bea0009d.js.map
