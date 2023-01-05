import"./jsx-runtime.ffeb56b3.js";import{c as e,A as c,C as g,S as y,M as v,a as f}from"./Props.13b11126.js";import"./iframe.093e9d3a.js";import"./blocks.947f14c5.js";import{c as S}from"./colors.f20a4d92.js";import{o as _,a as b,b as C,n as h}from"./vue.esm-bundler.3f4907d5.js";import{_ as x}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.c56be6cf.js";import"./es.map.constructor.e6dc69c1.js";import"./es.number.to-fixed.b45394ab.js";const z=["sm","md","lg"],l={props:{size:{type:String,default:"md",validator:n=>z.indexOf(n)>-1},variant:{type:String,default:"green",validator:n=>S.indexOf(n)>-1}},computed:{computedSizeClass(){return`spinner--${this.size}`},computedColorClass(){return`spinner--${this.variant}`},computedSpinnerClass(){return`${this.computedSizeClass} ${this.computedColorClass}`}}},T={id:"cds-spinner",class:"spinner__container"};function N(n,o,t,a,$,u){return _(),b("div",T,[C("div",{id:"spinner",class:h(u.computedSpinnerClass)},null,2)])}const i=x(l,[["render",N],["__scopeId","data-v-823029bb"]]);l.__docgenInfo={exportName:"default",displayName:"Spinner",description:"",tags:{},props:[{name:"size",description:"Propriedade referente ao tamanho do componente ('sm', 'md' ou 'lg')",type:{name:"string"},defaultValue:{func:!1,value:"'md'"},values:["sm","md","lg"]},{name:"variant",description:`Variante de cor do componente ('turquoise', 'green', 'blue',
            'indigo', 'violet', 'pink', 'red', 'orange', 'amber')`,type:{name:"string"},defaultValue:{func:!1,value:"'green'"}}]};function s(){return s=Object.assign?Object.assign.bind():function(n){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(n[a]=t[a])}return n},s.apply(this,arguments)}const p=n=>({components:{CdsSpinner:i},setup(){return{args:n}},template:`
		<center>
			<cds-spinner
				v-bind="args"
			/>
		</center>
	`}),O={Template:p},M="wrapper";function d({components:n,...o}){return e(M,s({},O,o,{components:n,mdxType:"MDXLayout"}),e(v,{title:"Componentes/Display/Spinner",component:i,argTypes:{size:{control:{type:"select",options:["sm","md","lg"]}},variant:{control:{type:"select",options:["turquoise","green","blue","indigo","violet","pink","red","orange","amber"]}}},mdxType:"Meta"}),e("h1",null,"Spinner"),e("h3",null,"Spinners \xE9 um componente utilizado para indicar que o progresso de uma opera\xE7\xE3o ainda n\xE3o foi finalizado."),e("hr",null),e("br",null),e("h2",null,"Recomendamos o uso de Spinners quando:"),e("ul",null,e("li",{parentName:"ul"},"For necess\xE1rio impedir a visualiza\xE7\xE3o e navega\xE7\xE3o do conte\xFAdo de p\xE1ginas enquanto houver alguma pend\xEAncia de opera\xE7\xE3o.")),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de Spinners quando:"),e("ul",null,e("li",{parentName:"ul"},"A visualiza\xE7\xE3o e navega\xE7\xE3o n\xE3o puder ser interrompida.")),e("br",null),e("h2",null,"Preview"),e(g,{mdxType:"Canvas"},e(y,{name:"Spinner",mdxType:"Story"},p.bind({}))),e(f,{story:"Spinner",mdxType:"ArgsTable"}))}d.isMDXComponent=!0;const m=p.bind({});m.storyName="Spinner";m.parameters={storySource:{source:`args => ({
  components: {
    CdsSpinner: Spinner
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<center>
			<cds-spinner
				v-bind="args"
			/>
		</center>
	\`
})`}};const r={title:"Componentes/Display/Spinner",component:i,argTypes:{size:{control:{type:"select",options:["sm","md","lg"]}},variant:{control:{type:"select",options:["turquoise","green","blue","indigo","violet","pink","red","orange","amber"]}}},includeStories:["spinner"]},q={Spinner:"spinner"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>e(c,{mdxStoryNameToKey:q,mdxComponentAnnotations:r},e(d,null))};const I=["Template","spinner"];export{p as Template,I as __namedExportsOrder,r as default,m as spinner};
//# sourceMappingURL=Spinner.stories.5a942b2c.js.map
