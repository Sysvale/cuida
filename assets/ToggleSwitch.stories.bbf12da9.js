import"./jsx-runtime.ffeb56b3.js";import{c as e,A as v,C as w,S,M as y,a as b}from"./Props.13b11126.js";import"./iframe.093e9d3a.js";import"./blocks.947f14c5.js";import{o as T,a as _,b as d,p as C,u as x,n as g}from"./vue.esm-bundler.3f4907d5.js";import{_ as A}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.c56be6cf.js";import"./es.map.constructor.e6dc69c1.js";import"./es.number.to-fixed.b45394ab.js";const f={data(){return{isActive:this.value,internalFocus:this.focused}},props:{value:{type:Boolean,default:!1,required:!0},small:{type:Boolean,default:!1},large:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},focused:{type:Boolean,default:!1}},computed:{toggleSwitchSize(){return this.small===this.large?"switch--medium":this.small?"switch--small":"switch--large"}},watch:{value(l,t){l!==t&&(this.isActive=l)}},methods:{handleClick(){this.$emit("input",!this.isActive)}}},N=["disabled"];function F(l,t,a,i,o,r){return T(),_("div",null,[d("label",{class:g(["switch",r.toggleSwitchSize])},[C(d("input",{"onUpdate:modelValue":t[0]||(t[0]=n=>o.isActive=n),type:"checkbox",disabled:a.disabled,onClick:t[1]||(t[1]=(...n)=>r.handleClick&&r.handleClick(...n))},null,8,N),[[x,o.isActive]]),d("span",{tabindex:"0",onFocusout:t[2]||(t[2]=n=>o.internalFocus=!1),onFocusin:t[3]||(t[3]=n=>o.internalFocus=!0),class:g(["switch__slider",{"switch__slider--active-focused":o.internalFocus&&o.isActive&&!a.disabled,"switch__slider--inactive-focused":o.internalFocus&&!o.isActive&&!a.disabled,"switch__slider--small":a.small&&a.small!==a.large,"switch__slider--large":a.large&&a.small!==a.large,"switch__slider--medium":a.small===a.large}])},null,34)],2)])}const u=A(f,[["render",F],["__scopeId","data-v-ad4d44a0"]]);f.__docgenInfo={exportName:"default",displayName:"ToggleSwitch",description:"",tags:{},props:[{name:"value",description:"Prop utilizada como v-model. Controla a o estado do ToggleSwitch.",type:{name:"boolean"},required:!0,defaultValue:{func:!1,value:"false"}},{name:"small",description:"Torna o ToggleSwitch pequeno.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"large",description:"Torna o ToggleSwitch grande.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Controla a disponibilidade do ToggleSwitch",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"focused",description:"Controla o focus do ToggleSwitch",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"input",description:"Evento utilizado para implementar o v-model.",type:{names:["Event"]}}]};function c(){return c=Object.assign?Object.assign.bind():function(l){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(l[i]=a[i])}return l},c.apply(this,arguments)}const m=l=>({components:{CdsToggleSwitch:u},data(){return{isSelected:!1}},setup(){return{args:l}},template:`
		<cds-toggle-switch
			v-model="isSelected"
			v-bind="args"
		/>
	`}),M={Template:m},B="wrapper";function h({components:l,...t}){return e(B,c({},M,t,{components:l,mdxType:"MDXLayout"}),e(y,{title:"Componentes/Forms/ToggleSwitch",component:u,mdxType:"Meta"}),e("h1",null,"ToggleSwitch"),e("h3",null,"ToggleSwitches s\xE3o componentes utilizados para ativar ou desativar configura\xE7\xF5es ou op\xE7\xF5es espec\xEDficas."),e("hr",null),e("br",null),e("h2",null,"Recomenda\xE7\xF5es de uso:"),e("ul",null,e("li",{parentName:"ul"},"A configura\xE7\xE3o controlada pelo ToggleSwitch deve aplicar mudan\xE7as automaticamente."),e("li",{parentName:"ul"},"Ao usar labels. Quando usados em conjunto, devem descrever dois estados, dependentes do estado do ToggleSwitch.")),e("br",null),e("h2",null,"O que evitar:"),e("ul",null,e("li",{parentName:"ul"},"Em formul\xE1rios que possuem bot\xE3o de submit."),e("li",{parentName:"ul"},"Utilizar ToggleSwitches para controlar a\xE7\xF5es que dependam de requisi\xE7\xF5es sem indicar o tempo de espera ao usu\xE1rio.")),e("br",null),e("h2",null,"Preview"),e(w,{mdxType:"Canvas"},e(S,{name:"Switch",args:{value:!1},mdxType:"Story"},m.bind({}))),e(b,{story:"Switch",mdxType:"ArgsTable"}))}h.isMDXComponent=!0;const p=m.bind({});p.storyName="Switch";p.args={value:!1};p.parameters={storySource:{source:`args => ({
  components: {
    CdsToggleSwitch: ToggleSwitch
  },

  data() {
    return {
      isSelected: false
    };
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-toggle-switch
			v-model="isSelected"
			v-bind="args"
		/>
	\`
})`}};const s={title:"Componentes/Forms/ToggleSwitch",component:u,includeStories:["switchStory"]},q={Switch:"switchStory"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>e(v,{mdxStoryNameToKey:q,mdxComponentAnnotations:s},e(h,null))};const I=["Template","switchStory"];export{m as Template,I as __namedExportsOrder,s as default,p as switchStory};
//# sourceMappingURL=ToggleSwitch.stories.bbf12da9.js.map
