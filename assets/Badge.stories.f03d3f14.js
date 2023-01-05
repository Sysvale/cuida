import"./jsx-runtime.e92fe57f.js";import{c as e,A as g,C as b,S as f,M as y,a as v}from"./Props.6dcc4647.js";import"./iframe.9f7d92e6.js";import{o as _,a as h,b as B,d as x,n as p}from"./vue.esm-bundler.3f4907d5.js";import{_ as S}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.20804f82.js";import"./es.map.constructor.a5cd5795.js";import"./es.number.to-fixed.34b4d69d.js";const m={props:{variant:{type:String,default:"gray"},size:{type:String,default:"md"}},data(){return{predefinedColors:["turquoise","green","blue","indigo","violet","pink","red","orange","amber","gray","white"],predefinedSizes:["sm","md","lg"]}},computed:{predefinedStyle(){let a="";return this.predefinedColors.indexOf(this.variant)>-1&&(a+=`badge--${this.variant}`),this.predefinedSizes.indexOf(this.size)>-1&&(a+=` badge--${this.size}`),a}}};function z(a,n,t,o,w,c){return _(),h("div",{class:p(["badge__container",c.predefinedStyle])},[B("div",{class:p({"badge__content--sm":t.size==="sm","badge__content--md":t.size==="md","badge__content--lg":t.size==="lg"})},[x(a.$slots,"default",{},void 0,!0)],2)],2)}const d=S(m,[["render",z],["__scopeId","data-v-8d2993f3"]]);m.__docgenInfo={exportName:"default",displayName:"Badge",description:"",tags:{},props:[{name:"variant",description:`A variante da Badge. S\xE3o 9 variantes: 'turquoise', 'green', 'blue',
'violet', 'pink', 'red', 'orange', 'amber' e 'gray'.`,type:{name:"string"},defaultValue:{func:!1,value:"'gray'"}},{name:"size",description:"Especifica o tamanho da badge. S\xE3o 3 tamanhos implementados: 'sm', 'md', 'lg'.",type:{name:"string"},defaultValue:{func:!1,value:"'md'"}}],slots:[{name:"default",description:"Slot padr\xE3o utilizado para exibir o conte\xFAdo dentro da badge"}]};function s(){return s=Object.assign?Object.assign.bind():function(a){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(a[o]=t[o])}return a},s.apply(this,arguments)}const i=a=>({components:{CdsBadge:d},setup(){return{args:a}},template:`
		<cds-badge
			v-bind="args" 
		>
			Badge
		</cds-badge>`}),C={Template:i},T="wrapper";function u({components:a,...n}){return e(T,s({},C,n,{components:a,mdxType:"MDXLayout"}),e(y,{title:"Componentes/Display/Badge",component:d,argTypes:{variant:{control:{type:"select",options:["turquoise","green","blue","indigo","violet","pink","red","orange","amber","gray","white"]}},size:{control:{type:"select",options:["sm","md","lg"]}}},parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}},docs:{source:{language:"html",format:!0,code:`
<cds-badge
	variant="red"
>
	Badge
</cds-badge>`}}},mdxType:"Meta"}),e("h1",null,"Badge"),e("h3",null,"Badge s\xE3o indicadores de status utilizados para tornar evidentes metadados importates."),e("hr",null),e("br",null),e("h2",null,"Quando usar:"),e("ul",null,e("li",{parentName:"ul"},"For necess\xE1rio mostrar status associados com a l\xF3gica de neg\xF3cio ou a\xE7\xF5es do usu\xE1rio."),e("li",{parentName:"ul"},"O conte\xFAdo a ser mostrado for ",e("em",{parentName:"li"},"readonly"),"."),e("li",{parentName:"ul"},"For preciso categorizar algo.")),e("br",null),e("h2",null,"Quando n\xE3o usar:"),e("ul",null,e("li",{parentName:"ul"},"O conte\xFAdo que a badge representa puder ser setado ou removido pelo usu\xE1rio."),e("li",{parentName:"ul"},"O click no componente precisar executar uma a\xE7\xE3o ou funcionalidade.")),e("br",null),e("h2",null,"Preview"),e(b,{mdxType:"Canvas"},e(f,{name:"Badge",args:{variant:"red"},mdxType:"Story"},i.bind({}))),e(v,{story:"Badge",mdxType:"ArgsTable"}))}u.isMDXComponent=!0;const l=i.bind({});l.storyName="Badge";l.args={variant:"red"};l.parameters={storySource:{source:`args => ({
  components: {
    CdsBadge: Badge
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-badge
			v-bind="args" 
		>
			Badge
		</cds-badge>\`
})`}};const r={title:"Componentes/Display/Badge",parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}},docs:{source:{language:"html",format:!0,code:`
<cds-badge
	variant="red"
>
	Badge
</cds-badge>`}}},component:d,argTypes:{variant:{control:{type:"select",options:["turquoise","green","blue","indigo","violet","pink","red","orange","amber","gray","white"]}},size:{control:{type:"select",options:["sm","md","lg"]}}},includeStories:["badge"]},N={Badge:"badge"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>e(g,{mdxStoryNameToKey:N,mdxComponentAnnotations:r},e(u,null))};const j=["Template","badge"];export{i as Template,j as __namedExportsOrder,l as badge,r as default};
//# sourceMappingURL=Badge.stories.f03d3f14.js.map
