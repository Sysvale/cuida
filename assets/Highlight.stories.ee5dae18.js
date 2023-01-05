import"./jsx-runtime.e92fe57f.js";import{c as e,A as c,C as h,S as g,M as f,a as y}from"./Props.6dcc4647.js";import"./iframe.9f7d92e6.js";import{o as _,a as v,d as b,n as x,x as H}from"./vue.esm-bundler.3f4907d5.js";import{_ as T}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.20804f82.js";import"./es.map.constructor.a5cd5795.js";import"./es.number.to-fixed.34b4d69d.js";const p={props:{variant:{type:String,default:"info"},animated:{type:Boolean,default:!1},duration:{type:Number,default:1},delay:{type:Number,default:0}},computed:{dynamicHighlightClass(){let a="";switch(this.animated&&(a="highlight__container--highlighted"),this.variant){case"info":return`${a} highlight__container--info`;case"success":return`${a} highlight__container--success`;case"danger":return`${a} highlight__container--danger`;default:return`${a} highlight__container--info`}},dynamicStyle(){return{"--duration":`${this.duration}s`,"--delay":`${this.delay}s`}}}};function S(a,t,i,s,w,m){return _(),v("span",{class:x(["highlight__container",m.dynamicHighlightClass]),style:H(m.dynamicStyle)},[b(a.$slots,"default",{},void 0,!0)],6)}const r=T(p,[["render",S],["__scopeId","data-v-686ac417"]]);p.__docgenInfo={exportName:"default",displayName:"Highlight",description:"",tags:{},props:[{name:"variant",description:`A variante do Highlight. S\xE3o 3 variantes implementadas: 'info', 'success'
e 'danger'`,type:{name:"string"},defaultValue:{func:!1,value:"'info'"}},{name:"animated",description:"Especifica se o highlight vai ser est\xE1tico ou animado.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"duration",description:"Especifica a dura\xE7\xE3o da anima\xE7\xE3o.",type:{name:"number"},defaultValue:{func:!1,value:"1"}},{name:"delay",description:"O tempo de espera at\xE9 a anima\xE7\xE3o come\xE7ar.",type:{name:"number"},defaultValue:{func:!1,value:"0"}}],slots:[{name:"default",description:"Slot usado para especificar o texto que receber\xE1 o highlight."}]};function o(){return o=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(a[s]=i[s])}return a},o.apply(this,arguments)}const l=a=>({components:{CdsHighlight:r},setup(){return{args:a}},template:`
		<cds-highlight v-bind="args">
			<span> Texto bem importante</span>
		</cds-highlight>
	`}),C={Template:l},N="wrapper";function u({components:a,...t}){return e(N,o({},C,t,{components:a,mdxType:"MDXLayout"}),e(f,{title:"Componentes/Display/Highlight",component:r,argTypes:{variant:{control:{type:"select",options:["info","success","danger"]}},duration:{control:{type:"range",min:.5,max:5,step:.1}},delay:{control:{type:"range",min:0,max:5,step:.1}}},parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}},docs:{source:{language:"html",format:!0,code:`<cds-highlight
	animated
	:duration="1"
	:delay="0"
>
	<span> Texto bem importante</span>
</cds-highlight>`}}},mdxType:"Meta"}),e("h1",null,"Highlight"),e("h3",null,"Highlights s\xE3o componentes utilizados para destacar palavras ou frases importantes em um determinado contexto."),e("hr",null),e("br",null),e("h2",null,"Quando usar:"),e("ul",null,e("li",{parentName:"ul"},"Se deseja guiar a aten\xE7\xE3o do usu\xE1rio para palavras ou frases espec\xEDficas na interface (nesses cen\xE1rios, Highlights animados podem ser ainda mais efetivos que os comuns)."),e("li",{parentName:"ul"},"Estiver implementando alguma feature de ",e("em",{parentName:"li"},"diff")," e precisar indicar elementos que foram substitu\xEDdos por outros.")),e("br",null),e("h2",null,"Quando n\xE3o usar:"),e("ul",null,e("li",{parentName:"ul"},"Se deseja criar hierarquia na p\xE1gina. Para esses casos, use mecanismos de hierarquia tipogr\xE1fica como peso da fonte, tamanho ou cor."),e("li",{parentName:"ul"},"O elemento sobre o qual o Highlight ser\xE1 ",e("em",{parentName:"li"},"wrapper")," n\xE3o for um elemento de texto."),e("li",{parentName:"ul"},"Forem destacados trechos muito grandes de texto. Isso pode acabar resultando no oposto do que se espera com o uso de Highlights.")),e("br",null),e("h2",null,"Preview"),e(h,{mdxType:"Canvas"},e(g,{name:"Highlight",args:{animated:!0,duration:1,delay:0},mdxType:"Story"},l.bind({}))),e(y,{story:"Highlight",mdxType:"ArgsTable"}))}u.isMDXComponent=!0;const d=l.bind({});d.storyName="Highlight";d.args={animated:!0,duration:1,delay:0};d.parameters={storySource:{source:`args => ({
  components: {
    CdsHighlight: Highlight
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-highlight v-bind="args">
			<span> Texto bem importante</span>
		</cds-highlight>
	\`
})`}};const n={title:"Componentes/Display/Highlight",parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}},docs:{source:{language:"html",format:!0,code:`<cds-highlight
	animated
	:duration="1"
	:delay="0"
>
	<span> Texto bem importante</span>
</cds-highlight>`}}},component:r,argTypes:{variant:{control:{type:"select",options:["info","success","danger"]}},duration:{control:{type:"range",min:.5,max:5,step:.1}},delay:{control:{type:"range",min:0,max:5,step:.1}}},includeStories:["highlight"]},M={Highlight:"highlight"};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:()=>e(c,{mdxStoryNameToKey:M,mdxComponentAnnotations:n},e(u,null))};const V=["Template","highlight"];export{l as Template,V as __namedExportsOrder,n as default,d as highlight};
//# sourceMappingURL=Highlight.stories.ee5dae18.js.map
