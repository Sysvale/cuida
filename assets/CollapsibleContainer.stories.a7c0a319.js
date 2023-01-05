import"./jsx-runtime.db376543.js";import{c as e,A as y,C as h,S as x,M as q,a as S}from"./Props.519c721e.js";import"./iframe.facb5a71.js";import"./blocks.70b2f959.js";import{r as V,o as c,a as m,b,f as N,n as M,d as C,t as T,g as A}from"./vue.esm-bundler.3f4907d5.js";import{_ as z}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.7a88f6c6.js";import"./es.map.constructor.dc039611.js";import"./es.number.to-fixed.98762696.js";const v={props:{value:{type:Boolean,default:!1,required:!0},title:{type:String,default:"Visualizar mais"}},data(){return{internalValue:this.value}},watch:{internalValue(a){this.$emit("input",a)},value(a){this.internalValue=a}},methods:{triggerExpanded(){this.internalValue=!this.internalValue}}},E={id:"cds-collapsible-container"},P={class:"cds-collapsible-container__title"},I={key:0,class:"cds-collapsible-container__content"};function O(a,o,n,s,p,u){const g=V("ion-icon");return c(),m("span",E,[b("div",{class:"cds-collapsible-container__item",onClick:o[0]||(o[0]=(..._)=>u.triggerExpanded&&u.triggerExpanded(..._))},[N(g,{name:"chevron-down-outline",class:M(p.internalValue?"cds-collapsible-container__icon--expanded":"cds-collapsible-container__icon--collapsed")},null,8,["class"]),C(a.$slots,"title",{},()=>[b("span",P,T(n.title),1)])]),p.internalValue?(c(),m("div",I,[C(a.$slots,"default")])):A("",!0)])}const l=z(v,[["render",O]]);v.__docgenInfo={exportName:"default",displayName:"CollapsibleContainer",description:"",tags:{},props:[{name:"value",description:`Representa o estado do componente. Quando 'false' o conte\xFAdo n\xE3o \xE9 mostrado
e quando 'true' o conte\xFAdo do container \xE9 exibido.`,type:{name:"boolean"},required:!0,defaultValue:{func:!1,value:"false"}},{name:"title",description:"T\xEDtulo do item a ser expandido",type:{name:"string"},defaultValue:{func:!1,value:"'Visualizar mais'"}}],events:[{name:"expanded",description:"Evento emitido quando o conte\xFAdo do item \xE9 exibido ('true') ou ocultado ('false').",type:{names:["Event"]}}],slots:[{name:"title",description:"Slot para renderiza\xE7\xE3o do conte\xFAdo do header/title customizado do item"},{name:"default",description:"Slot para renderiza\xE7\xE3o conte\xFAdo do container"}]};function i(){return i=Object.assign?Object.assign.bind():function(a){for(var o=1;o<arguments.length;o++){var n=arguments[o];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(a[s]=n[s])}return a},i.apply(this,arguments)}const r=a=>({components:{CdsCollapsibleContainer:l},setup(){return{args:a}},template:`
		<cds-collapsible-container
			v-bind="args" 
		>
			<p class="p-3">
				Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
				v\xEA os porris que eu tomo, mas ningu\xE9m v\xEA os tombis que eu levo!
				Atirei o pau no gatis, per gatis num morreus. Pra l\xE1 , depois
				divoltis porris, paradis. Leite de capivaris, leite de mula
				manquis sem cabe\xE7a. Viva Forevis aptent taciti sociosqu ad
				litora torquent. Per aumento de cachacis, eu reclamis. Nec
				orci ornare consequat. Praesent lacinia ultrices consectetur.
				Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
			</p>
		</cds-collapsible-container>
	`}),w={Template:r},D="wrapper";function f({components:a,...o}){return e(D,i({},w,o,{components:a,mdxType:"MDXLayout"}),e(q,{title:"Componentes/Containers/CollapsibleContainer",component:l,mdxType:"Meta"}),e("h1",null,"CollapsibleContainer"),e("h3",null,"CollapsibleContainers s\xE3o componentes utilizados para reduzir o espa\xE7o vertical quando h\xE1 uma grande quantidade de informa\xE7\xF5es, com a possibilidade de ser expandido para exibir o conte\xFAdo sumarizado."),e("hr",null),e("br",null),e("h2",null,"Recomendamos o uso de CollapsibleContainers quando:"),e("ul",null,e("li",{parentName:"ul"},"For necess\xE1rio otimizar o espa\xE7o vertical."),e("li",{parentName:"ul"},"Se deseja mostrar itens sumarizados."),e("li",{parentName:"ul"},"Se possui uma grande quantidade de informa\xE7\xF5es que podem ser agrupadas em um t\xF3pico/t\xEDtulo.")),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de CollapsibleContainers quando:"),e("ul",null,e("li",{parentName:"ul"},"Houver poucos itens a ser sumarizados;")),e("br",null),e("h2",null,"Preview"),e(h,{mdxType:"Canvas"},e(x,{name:"CollapsibleContainer",args:{value:!1,title:"VEJA MAIS INFORMA\xC7\xD5ES"},mdxType:"Story"},r.bind({}))),e(S,{story:"CollapsibleContainer",mdxType:"ArgsTable"}))}f.isMDXComponent=!0;const d=r.bind({});d.storyName="CollapsibleContainer";d.args={value:!1,title:"VEJA MAIS INFORMA\xC7\xD5ES"};d.parameters={storySource:{source:`args => ({
  components: {
    CdsCollapsibleContainer: CollapsibleContainer
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-collapsible-container
			v-bind="args" 
		>
			<p class="p-3">
				Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
				v\xEA os porris que eu tomo, mas ningu\xE9m v\xEA os tombis que eu levo!
				Atirei o pau no gatis, per gatis num morreus. Pra l\xE1 , depois
				divoltis porris, paradis. Leite de capivaris, leite de mula
				manquis sem cabe\xE7a. Viva Forevis aptent taciti sociosqu ad
				litora torquent. Per aumento de cachacis, eu reclamis. Nec
				orci ornare consequat. Praesent lacinia ultrices consectetur.
				Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
			</p>
		</cds-collapsible-container>
	\`
})`}};const t={title:"Componentes/Containers/CollapsibleContainer",component:l,includeStories:["collapsibleContainer"]},F={CollapsibleContainer:"collapsibleContainer"};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:()=>e(y,{mdxStoryNameToKey:F,mdxComponentAnnotations:t},e(f,null))};const H=["Template","collapsibleContainer"];export{r as Template,H as __namedExportsOrder,d as collapsibleContainer,t as default};
//# sourceMappingURL=CollapsibleContainer.stories.a7c0a319.js.map
