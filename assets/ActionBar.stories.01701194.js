import"./jsx-runtime.e92fe57f.js";import{c as e,A as S,C as N,S as T,M as P,a as q}from"./Props.6dcc4647.js";import"./iframe.9f7d92e6.js";import{C as M}from"./Icon.8f5a5ec8.js";import{B as y}from"./Button.a5583993.js";import{r as f,o as a,a as s,b as g,d as h,F as V,e as E,f as v,w as D,t as O,n as B,g as A}from"./vue.esm-bundler.3f4907d5.js";import{_ as z}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.20804f82.js";import"./es.map.constructor.a5cd5795.js";import"./es.number.to-fixed.34b4d69d.js";const _={components:{CdsIcon:M,CdsButton:y},props:{show:{type:Boolean,default:!1,required:!1},float:{type:Boolean,default:!1},dismissible:{type:Boolean,default:!1},dark:{type:Boolean,default:!1},actions:{type:Array,default:()=>[]}},data(){return{internalShow:!1}},mounted(){this.internalShow=this.show},watch:{show(o){this.internalShow=o}},computed:{hasActionSlot(){return Object.keys(this.$slots).some(o=>o==="actions")}},methods:{handleClose(){this.internalShow=!1,this.$emit("close",!0)}}},X={key:0,class:"toolbar__container"},j={key:0,class:"toolbar__buttons-container"},I={key:1,class:"toolbar__buttons-container"};function F(o,t,n,i,w,c){const k=f("cds-button"),x=f("cds-icon");return w.internalShow?(a(),s("div",X,[g("div",{class:B({"toolbar--fixed":n.float,"toolbar--dark":n.dark,"toolbar--light":!n.dark})},[h(o.$slots,"description",{},void 0,!0),c.hasActionSlot?(a(),s("div",j,[h(o.$slots,"actions",{},void 0,!0)])):(a(),s("div",I,[(a(!0),s(V,null,E(n.actions,(l,b)=>(a(),s("div",{key:b,class:"toolbar__button"},[v(k,{id:`btn-${b+1}`,secondary:!n.dark,variant:"dark",onClick:G=>o.$emit("click",l)},{default:D(()=>[g("span",null,O(l),1)]),_:2},1032,["id","secondary","onClick"])]))),128))])),n.dismissible?(a(),s("div",{key:2,class:B(n.dark?"toolbar__icon--dark":"toolbar__icon--light"),onClick:t[0]||(t[0]=(...l)=>c.handleClose&&c.handleClose(...l))},[v(x,{name:"x-outline",height:"20",width:"20"})],2)):A("",!0)],2)])):A("",!0)}const u=z(_,[["render",F],["__scopeId","data-v-3ae07966"]]);_.__docgenInfo={exportName:"default",displayName:"ActionBar",description:"",tags:{},props:[{name:"show",description:"Controla a exibi\xE7\xE3o do modal.",type:{name:"boolean"},required:!1,defaultValue:{func:!1,value:"false"}},{name:"float",description:`Faz com que a ActionBar flutue acima do conte\xFAdo da view,
sendo colocada na parte inferior da p\xE1gina`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"dismissible",description:"Prop que exibe bot\xE3o de fechamento da ActionBar.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"dark",description:"Especifica se a vers\xE3o da ActionBar \xE9 a dark.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"actions",description:"Indica os bot\xF5es a serem exibidos na ActionBar.",type:{name:"array"},defaultValue:{func:!1,value:"[]"}}],events:[{name:"click",description:"Evento emitido quando os bot\xF5es s\xE3o clicados.",type:{names:["Event"]}},{name:"close",description:'Evento emitido quando o bot\xE3o "X" \xE9 clicado.',type:{names:["Event"]}}],slots:[{name:"description",description:"Slot utilizado para renderiza\xE7\xE3o de texto no componente."},{name:"actions",description:"Slot para renderiza\xE7\xE3o de bot\xF5es na ActionBar."}]};function d(){return d=Object.assign?Object.assign.bind():function(o){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(o[i]=n[i])}return o},d.apply(this,arguments)}const m=o=>({setup(){return{args:o}},data(){return{showActionBar:!1}},components:{CdsActionBar:u,CdsButton:y},template:`
		<div>
			<cds-button
				id="trigger-popover"
				@click="togglePopover"
			>
				Click
			</cds-button>
			<cds-action-bar
				v-bind="args"
				:show="showActionBar"
				@click="logAction"
				@close="logClose"
			>
				<template #description>
					8 itens selecionados
				</template>
			</cds-action-bar>
		</div>
	`,methods:{logAction(t){console.log("logAction: ",t)},logClose(t){this.showActionBar=!1,console.log("logClose: ",t)},togglePopover(){this.showActionBar=!0}}}),L={Template:m},K="wrapper";function C({components:o,...t}){return e(K,d({},L,t,{components:o,mdxType:"MDXLayout"}),e(P,{title:"Componentes/Display/ActionBar",component:u,parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}},docs:{source:{language:"html",format:!0,code:`
<div>
	<cds-button
		id="trigger-popover"
		@click="togglePopover"
	>
		Click
	</cds-button>
	<cds-action-bar
		v-bind="args"
		:show="showActionBar"
		@click="logAction"
		@close="logClose"
	>
		<template #description>
			8 itens selecionados
		</template>
	</cds-action-bar>
</div>`}}},mdxType:"Meta"}),e("h1",null,"ActionBar"),e("h3",null,"ActionBars s\xE3o barras de ferramentas que podem exibir a\xE7\xF5es e informa\xE7\xF5es para o usu\xE1rio."),e("hr",null),e("br",null),e("h2",null,"Recomendamos o uso de ActionBars quando:"),e("ul",null,e("li",{parentName:"ul"},"Voc\xEA precisar agrupar a\xE7\xF5es que o usu\xE1rio pode tomar sobre itens de uma lista ou tabela."),e("li",{parentName:"ul"},"Voc\xEA n\xE3o tiver espa\xE7o nos menus e em outros locais para exibir a\xE7\xF5es e informa\xE7\xF5es.")),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de ActionBars quando:"),e("ul",null,e("li",{parentName:"ul"},"Para exibir os status do sistema."),e("li",{parentName:"ul"},"Em modo flutuante, a ActionBar ocultar permanentemente informa\xE7\xF5es na tela.")),e("br",null),e("h2",null,"Preview"),e(N,{mdxType:"Canvas"},e(T,{name:"Action Bar",args:{actions:["Button1","Button2","Button3"]},mdxType:"Story"},m.bind({}))),e(q,{story:"Action Bar",mdxType:"ArgsTable"}))}C.isMDXComponent=!0;const p=m.bind({});p.storyName="Action Bar";p.args={actions:["Button1","Button2","Button3"]};p.parameters={storySource:{source:`args => ({
  setup() {
    return {
      args
    };
  },

  data() {
    return {
      showActionBar: false
    };
  },

  components: {
    CdsActionBar: ActionBar,
    CdsButton: Button
  },
  template:
  /*html*/
  \`
		<div>
			<cds-button
				id="trigger-popover"
				@click="togglePopover"
			>
				Click
			</cds-button>
			<cds-action-bar
				v-bind="args"
				:show="showActionBar"
				@click="logAction"
				@close="logClose"
			>
				<template #description>
					8 itens selecionados
				</template>
			</cds-action-bar>
		</div>
	\`,
  methods: {
    logAction(btn) {
      console.log('logAction: ', btn);
    },

    logClose(event) {
      this.showActionBar = false;
      console.log('logClose: ', event);
    },

    togglePopover() {
      this.showActionBar = true;
    }

  }
})`}};const r={title:"Componentes/Display/ActionBar",parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}},docs:{source:{language:"html",format:!0,code:`
<div>
	<cds-button
		id="trigger-popover"
		@click="togglePopover"
	>
		Click
	</cds-button>
	<cds-action-bar
		v-bind="args"
		:show="showActionBar"
		@click="logAction"
		@close="logClose"
	>
		<template #description>
			8 itens selecionados
		</template>
	</cds-action-bar>
</div>`}}},component:u,includeStories:["actionBar"]},R={"Action Bar":"actionBar"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>e(S,{mdxStoryNameToKey:R,mdxComponentAnnotations:r},e(C,null))};const te=["Template","actionBar"];export{m as Template,te as __namedExportsOrder,p as actionBar,r as default};
//# sourceMappingURL=ActionBar.stories.01701194.js.map
