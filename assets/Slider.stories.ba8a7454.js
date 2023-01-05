import"./jsx-runtime.ffeb56b3.js";import{c as e,A as S,C as x,S as _,M as h,a as C}from"./Props.13b11126.js";import"./iframe.093e9d3a.js";import"./blocks.947f14c5.js";import{r as N,o as c,l as q,w as v,b as T,a as M,t as y,g as w,x as O,d as V,m as z,n as A}from"./vue.esm-bundler.3f4907d5.js";import{_ as P}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.c56be6cf.js";import"./es.map.constructor.e6dc69c1.js";import"./es.number.to-fixed.b45394ab.js";const f={props:{min:{type:Number,default:0,required:!0},max:{type:Number,default:100,required:!0},value:{type:Array,default:()=>[],required:!0}},computed:{attrs(){const{min:a,max:r,value:o,...t}=this.$attrs;return t},showMergeTooltip(){return this.value[1]-this.value[0]<10}}},D={key:0,class:A(["merge-tooltip","vue-slider-dot-tooltip-inner","vue-slider-dot-tooltip-inner-top"])};function j(a,r,o,t,X,l){const b=N("vue-slider");return c(),q(b,z(l.attrs,{modelValue:o.value,"onUpdate:modelValue":r[0]||(r[0]=s=>o.value=s),"enable-cross":!1,min:o.min,max:o.max,tooltip:l.showMergeTooltip?"none":"always","dot-style":{borderColor:"#3498db"},"process-style":{background:"#3498db"}}),{process:v(({style:s})=>[T("div",{class:"vue-slider-process",style:O(s)},[l.showMergeTooltip?(c(),M("div",D,y(o.value[0])+" - "+y(o.value[1]),1)):w("",!0)],4)]),tooltip:v(s=>[V(a.$slots,"tooltip",{tooltip:s})]),_:3},16,["modelValue","min","max","tooltip"])}const i=P(f,[["render",j]]);f.__docgenInfo={exportName:"default",displayName:"Slider",description:"",tags:{},props:[{name:"min",description:"O valor m\xEDnimo do slider.",type:{name:"number"},required:!0,defaultValue:{func:!1,value:"0"}},{name:"max",description:"O valor m\xE1ximo do slider.",type:{name:"number"},required:!0,defaultValue:{func:!1,value:"100"}},{name:"value",description:"Prop utilizada como v-model. Retorna as posi\xE7\xF5es selecionadas no slider.",type:{name:"array"},required:!0,defaultValue:{func:!1,value:"[]"}}],slots:[{name:"tooltip",scoped:!0,description:"Scoped slot para renderiza\xE7\xE3o customizada dos tooltips.",bindings:[{name:"tooltip",title:"binding"}]}]};function d(){return d=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var o=arguments[r];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(a[t]=o[t])}return a},d.apply(this,arguments)}const m=a=>({components:{CdsSlider:i},setup(){return{args:a}},template:`
		<cds-slider
			v-bind="args" 
		/>
	`}),u=[0,100],k={Template:m,value:u},B="wrapper";function g({components:a,...r}){return e(B,d({},k,r,{components:a,mdxType:"MDXLayout"}),e(h,{title:"Componentes/Forms/Slider",component:i,mdxType:"Meta"}),e("h1",null,"Slider"),e("h3",null,"Sliders s\xE3o componentes utilizados para sele\xE7\xE3o de valores dentro de um intervalo."),e("hr",null),e("br",null),e("h2",null,"Recomendamos o uso de Sliders quando:"),e("ul",null,e("li",{parentName:"ul"},`Recomendamos o uso de sliders quando for preciso a sele\xE7\xE3o de valores dentro de um intervalo,
sobretudo quando for preciso selecionar mais de um valor.`),e("li",{parentName:"ul"},`Recomendamos o uso de sliders quando a velocidade na sele\xE7\xE3o de valores em um intervalo for
mais relevante que a precis\xE3o.`)),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de Sliders quando:"),e("ul",null,e("li",{parentName:"ul"},"N\xE3o recomendamos o uso de sliders quando n\xE3o houver necessidade de uma precis\xE3o muito grande na sele\xE7\xE3o dos valores."),e("li",{parentName:"ul"},`N\xE3o recomendamos o uso de sliders em conjunto com inputs para que o usu\xE1rio consiga editar
o dado tanto pelo slider quanto pelos inputs.`)),e("h2",null,"Observa\xE7\xF5es:"),e("ul",null,e("li",{parentName:"ul"},"O slider do Cuida \xE9 um wrapper do ",e("a",{target:"_blank",href:"https://nightcatsama.github.io/vue-slider-component/#/"},"Vue slider component"),`
com a sua adequa\xE7\xE3o aos nossos princ\xEDpios e recomenda\xE7\xF5es. Para informa\xE7\xF5es detalhadas do componente, recomendamos
leitura da documenta\xE7\xE3o.`)),e("br",null),e("h2",null,"Preview"),e(x,{mdxType:"Canvas"},e(_,{name:"Slider",args:{min:0,max:100,value:u},mdxType:"Story"},m.bind({}))),e(C,{story:"Slider",mdxType:"ArgsTable"}))}g.isMDXComponent=!0;const p=m.bind({});p.storyName="Slider";p.args={min:0,max:100,value:u};p.parameters={storySource:{source:`args => ({
  components: {
    CdsSlider: Slider
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-slider
			v-bind="args" 
		/>
	\`
})`}};const n={title:"Componentes/Forms/Slider",component:i,includeStories:["slider"]},R={Slider:"slider"};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:()=>e(S,{mdxStoryNameToKey:R,mdxComponentAnnotations:n},e(g,null))};const Q=["Template","value","slider"];export{m as Template,Q as __namedExportsOrder,n as default,p as slider,u as value};
//# sourceMappingURL=Slider.stories.ba8a7454.js.map
