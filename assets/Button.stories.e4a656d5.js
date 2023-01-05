import"./jsx-runtime.ffeb56b3.js";import{c as t,A as i,C as c,S as d,M as g,a as b}from"./Props.13b11126.js";import"./iframe.093e9d3a.js";import"./blocks.947f14c5.js";import{B as m}from"./Button.a5583993.js";import"./string.c56be6cf.js";import"./es.map.constructor.e6dc69c1.js";import"./es.number.to-fixed.b45394ab.js";import"./vue.esm-bundler.3f4907d5.js";import"./_plugin-vue_export-helper.cdc0426e.js";function s(){return s=Object.assign?Object.assign.bind():function(e){for(var o=1;o<arguments.length;o++){var r=arguments[o];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},s.apply(this,arguments)}const u=e=>({components:{CdsButton:m},setup(){return{args:e}},template:`
		<cds-button
			v-bind="args" 
		>
		</cds-button>`}),y={Template:u},x="wrapper";function p({components:e,...o}){return t(x,s({},y,o,{components:e,mdxType:"MDXLayout"}),t(g,{title:"Componentes/Forms/Button",component:m,argTypes:{variant:{control:{type:"select",options:["teal","green","blue","indigo","violet","pink","red","orange","amber"]}},size:{control:{type:"select",options:["sm","md","lg"]}}},mdxType:"Meta"}),t("h1",null,"Button"),t("h3",null,"Buttons s\xE3o componentes que permitem que o usu\xE1rio execute uma a\xE7\xE3o com um toque."),t("hr",null),t("br",null),t("h2",null,"Recomendamos o uso de Buttons quando:"),t("ul",null,t("li",{parentName:"ul"},`For necess\xE1rio comunicar ao usu\xE1rio que ele pode executar uma a\xE7\xE3o na interface,
seja em di\xE1logos, janelas modais, formul\xE1rios, cards, etc.`)),t("br",null),t("h2",null,"N\xE3o recomendamos o uso de Buttons quando:"),t("ul",null,t("li",{parentName:"ul"},`For necess\xE1rio dar a op\xE7\xE3o de executar uma a\xE7\xE3o como um detalhe pequeno na interface.
Nesse caso, recomendamos o uso de links.`)),t("br",null),t("h2",null,"Preview"),t(c,{mdxType:"Canvas"},t(d,{name:"Button",args:{variant:"green",size:"md",text:"Lorem Ipsum"},mdxType:"Story"},u.bind({}))),t(b,{story:"Button",mdxType:"ArgsTable"}))}p.isMDXComponent=!0;const l=u.bind({});l.storyName="Button";l.args={variant:"green",size:"md",text:"Lorem Ipsum"};l.parameters={storySource:{source:`args => ({
  components: {
    CdsButton: Button
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-button
			v-bind="args" 
		>
		</cds-button>\`
})`}};const n={title:"Componentes/Forms/Button",component:m,argTypes:{variant:{control:{type:"select",options:["teal","green","blue","indigo","violet","pink","red","orange","amber"]}},size:{control:{type:"select",options:["sm","md","lg"]}}},includeStories:["button"]},B={Button:"button"};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:()=>t(i,{mdxStoryNameToKey:B,mdxComponentAnnotations:n},t(p,null))};const A=["Template","button"];export{u as Template,A as __namedExportsOrder,l as button,n as default};
//# sourceMappingURL=Button.stories.e4a656d5.js.map
