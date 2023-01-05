import"./jsx-runtime.db376543.js";import{c as e,A as c,C as x,S as T,M as g,a as h}from"./Props.519c721e.js";import"./iframe.facb5a71.js";import"./blocks.70b2f959.js";import{o as y,a as S,x as f}from"./vue.esm-bundler.3f4907d5.js";import{_}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.7a88f6c6.js";import"./es.map.constructor.dc039611.js";import"./es.number.to-fixed.98762696.js";const p={props:{width:{type:String,required:!1},height:{type:String,required:!1,default:"16"}},computed:{computedStyle(){return{"--width":`${this.width}px`,"--height":`${this.height}px`}}}};function k(t,n,a,s,N,i){return y(),S("div",{class:"skeleton__container",style:f(i.computedStyle)},null,4)}const l=_(p,[["render",k],["__scopeId","data-v-7de2131c"]]);p.__docgenInfo={exportName:"default",displayName:"SkeletonText",description:"",tags:{},props:[{name:"width",type:{name:"string"},required:!1},{name:"height",type:{name:"string"},required:!1,defaultValue:{func:!1,value:"'16'"}}]};function r(){return r=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(t[s]=a[s])}return t},r.apply(this,arguments)}const d=t=>({components:{CdsSkeletonText:l},setup(){return{args:t}},template:`
		<cds-skeleton-text
			v-bind="args" 
		/>
	`}),b={Template:d},v="wrapper";function u({components:t,...n}){return e(v,r({},b,n,{components:t,mdxType:"MDXLayout"}),e(g,{title:"Componentes/Loaders/SkeletonText",component:l,mdxType:"Meta"}),e("h1",null,"Skeleton Text"),e("h3",null,"Skeleton texts permitem exibir um estado de carregamento para v\xE1rios tipos de componentes"),e("h3",null,"enquanto seus dados est\xE3o sendo buscados."),e("hr",null),e("br",null),e("h2",null,"Recomendamos o uso de Skeleton Texts quando:"),e("ul",null,e("li",{parentName:"ul"},"Informar ao usu\xE1rio que as informa\xE7\xF5es do componentes est\xE3o sendo carregadas."),e("li",{parentName:"ul"},"O conte\xFAdo a ser carregado for din\xE2mico.")),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de Skeleton Texts quando:"),e("ul",null,e("li",{parentName:"ul"},"O conte\xFAdo a ser carregado for est\xE1tico.")),e("h2",null,"Observa\xE7\xF5es"),e("ul",null,e("li",{parentName:"ul"},"O Skeleton text deve ser ajustado de acordo com o componente a ser utilizado.")),e("br",null),e("h2",null,"Preview"),e(x,{mdxType:"Canvas"},e(T,{name:"SkeletonText",args:{width:"250"},mdxType:"Story"},d.bind({}))),e(h,{story:"SkeletonText",mdxType:"ArgsTable"}))}u.isMDXComponent=!0;const m=d.bind({});m.storyName="SkeletonText";m.args={width:"250"};m.parameters={storySource:{source:`args => ({
  components: {
    CdsSkeletonText: SkeletonText
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-skeleton-text
			v-bind="args" 
		/>
	\`
})`}};const o={title:"Componentes/Loaders/SkeletonText",component:l,includeStories:["skeletonText"]},C={SkeletonText:"skeletonText"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>e(c,{mdxStoryNameToKey:C,mdxComponentAnnotations:o},e(u,null))};const X=["Template","skeletonText"];export{d as Template,X as __namedExportsOrder,o as default,m as skeletonText};
//# sourceMappingURL=SkeletonText.stories.785bb8f7.js.map
