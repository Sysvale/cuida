import"./jsx-runtime.db376543.js";import{c as e,A as c,C as g,S as f,M as y,a as _}from"./Props.519c721e.js";import"./iframe.facb5a71.js";import"./blocks.70b2f959.js";import{o as x,a as k,b as d,d as b,t as h}from"./vue.esm-bundler.3f4907d5.js";import{_ as v}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.7a88f6c6.js";import"./es.map.constructor.dc039611.js";import"./es.number.to-fixed.98762696.js";const u={props:{href:{type:String,required:!0},newTab:{type:Boolean,default:!1},text:{type:String,required:!0}}},L={class:"cds-link__container"},N=["href","target"];function T(n,a,t,r,q,w){return x(),k("div",L,[d("a",{href:t.href,target:t.newTab?"_blank":!1},[b(n.$slots,"default",{class:"cds-link__text"},()=>[d("span",null,h(t.text),1)])],8,N)])}const i=v(u,[["render",T]]);u.__docgenInfo={exportName:"default",displayName:"Link",description:"",tags:{},props:[{name:"href",description:"URL de redirecionamento.",type:{name:"string"},required:!0},{name:"newTab",description:"Prop utilizada para o redirecionamento do link ser a partir de uma nova aba.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"text",description:"Texto utilizado no endere\xE7o da URL para o usu\xE1rio.",type:{name:"string"},required:!0}],slots:[{name:"default",scoped:!0,description:"Slot padr\xE3o para renderiza\xE7\xE3o de conte\xFAdo customizado do texto do link.",bindings:[{name:"class",title:"binding"}]}]};function s(){return s=Object.assign?Object.assign.bind():function(n){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},s.apply(this,arguments)}const l=n=>({components:{CdsLink:i},setup(){return{args:n}},template:`
		<cds-link
			v-bind="args"
		/>
	`}),S={Template:l},C="wrapper";function m({components:n,...a}){return e(C,s({},S,a,{components:n,mdxType:"MDXLayout"}),e(y,{title:"Componentes/Navega\xE7\xE3o/Link",component:i,mdxType:"Meta"}),e("h1",null,"Link"),e("h3",null,"Links s\xE3o componentes usados \u200B\u200Bpara navegar para outra p\xE1gina e podem abrir uma nova guia."),e("hr",null),e("br",null),e("h2",null,"Recomendamos o uso de Links quando:"),e("ul",null,e("li",{parentName:"ul"},e("p",{parentName:"li"},"For necess\xE1rio navegar para outra se\xE7\xE3o ou p\xE1gina.")),e("li",{parentName:"ul"},e("p",{parentName:"li"},"For necess\xE1rio redirecionar para um site ou documento externo."))),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de Links quando:"),e("ul",null,e("li",{parentName:"ul"},"For necess\xE1rio executar uma a\xE7\xE3o (exemplo: salvar, editar). Nesses casos \xE9 recomendado utilizar o componente Button.")),e("br",null),e("h2",null,"Preview"),e(g,{mdxType:"Canvas"},e(f,{name:"Link",args:{href:"https://github.com/Sysvale/cuida",text:"Cuida"},mdxType:"Story"},l.bind({}))),e(_,{story:"Link",mdxType:"ArgsTable"}))}m.isMDXComponent=!0;const p=l.bind({});p.storyName="Link";p.args={href:"https://github.com/Sysvale/cuida",text:"Cuida"};p.parameters={storySource:{source:`args => ({
  components: {
    CdsLink: Link
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-link
			v-bind="args"
		/>
	\`
})`}};const o={title:"Componentes/Navega\xE7\xE3o/Link",component:i,includeStories:["link"]},M={Link:"link"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>e(c,{mdxStoryNameToKey:M,mdxComponentAnnotations:o},e(m,null))};const F=["Template","link"];export{l as Template,F as __namedExportsOrder,o as default,p as link};
//# sourceMappingURL=Link.stories.3b08f8b1.js.map
