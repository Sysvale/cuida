import"./jsx-runtime.ffeb56b3.js";import{c as e,A as g,C as b,S as x,M as C,a as N}from"./Props.13b11126.js";import"./iframe.093e9d3a.js";import"./blocks.947f14c5.js";import{o as i,a as s,b as t,F as S,e as q,t as p,n as w,g as v}from"./vue.esm-bundler.3f4907d5.js";import{_ as B}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.c56be6cf.js";import"./es.map.constructor.e6dc69c1.js";import"./es.number.to-fixed.b45394ab.js";const f={props:{history:{type:Array,default:()=>[],required:!0}}},D={id:"timeline"},A={class:"container"},M={class:"event__row"},O={class:"event__date"},j={class:"timeline__container"},U={key:0,class:"timeline"},E={class:"content__container"},L={class:"content__title"},P={class:"content__text"},X={key:0};function k(o,a,n,r,F,K){return i(),s("span",D,[t("div",A,[(i(!0),s(S,null,q(n.history,(m,d)=>(i(),s("div",{key:d},[t("div",M,[t("div",null,[t("p",O,p(m.date),1)]),t("div",j,[t("span",{class:w(m._dotStyle==="hollowed"?"event__pin--hollowed":"event__pin--filled")},null,2),d+1<n.history.length&&n.history.length>1?(i(),s("div",U)):v("",!0)]),t("div",E,[t("div",null,[t("p",L,p(m.title),1)]),t("span",P,p(m.text),1),d+1<n.history.length?(i(),s("hr",X)):v("",!0)])])]))),128))])])}const u=B(f,[["render",k]]);f.__docgenInfo={exportName:"default",displayName:"Timeline",description:"",tags:{},props:[{name:"history",description:"O array que especifica os eventos que v\xE3o ser mostrados na timeline",type:{name:"array"},required:!0,defaultValue:{func:!1,value:"[]"}}]};function c(){return c=Object.assign?Object.assign.bind():function(o){for(var a=1;a<arguments.length;a++){var n=arguments[a];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(o[r]=n[r])}return o},c.apply(this,arguments)}const _=o=>({components:{CdsTimeline:u},setup(){return{args:o}},template:`
		<cds-timeline
			v-bind="args" 
		/>
	`}),y=[{date:"22/09/2022",title:"Bloqueio n\xEDvel 1",text:"Usu\xE1rio: Uncle Bob",_dotStyle:"hollowed"},{date:"15/05/2022",title:"Bloqueio n\xEDvel 2",text:"Usu\xE1rio: Linus Torvalds",_dotStyle:"hollowed"},{date:"18/02/2022",title:"Bloqueio n\xEDvel 1",text:"Usu\xE1rio: Don Norman"},{date:"20/12/2021",title:"Bloqueio n\xEDvel 3",text:"Usu\xE1rio: Richard Stallman",_dotStyle:"filled"},{date:"04/11/2021",title:"Bloqueio n\xEDvel 1",text:"Usu\xE1rio: Dennis Ritchie"}],z={Template:_,history:y},R="wrapper";function T({components:o,...a}){return e(R,c({},z,a,{components:o,mdxType:"MDXLayout"}),e(C,{title:"Componentes/Display/Timeline",component:u,mdxType:"Meta"}),e("h1",null,"Timeline"),e("h3",null,"Timelines s\xE3o componentes utilizados para apresentar informa\xE7\xF5es em ordem cronol\xF3gica."),e("hr",null),e("br",null),e("h2",null,"Recomendamos o uso de Timelines quando:"),e("ul",null,e("li",{parentName:"ul"},"Se tem uma s\xE9rie de informa\xE7\xF5es que podem ser categorizadas por data.")),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de Timelines quando:"),e("ul",null,e("li",{parentName:"ul"},"Se precisa de um componente de stepper."),e("li",{parentName:"ul"},"A ordem das informa\xE7\xF5es que voc\xEA est\xE1 apresentando \xE9 irrelevante.")),e("br",null),e("h2",null,"Observa\xE7\xF5es:"),e("ul",null,e("li",{parentName:"ul"},"A timeline espera um array de objetos com os campos: ",e("inlineCode",{parentName:"li"},"date"),", ",e("inlineCode",{parentName:"li"},"title")," e ",e("inlineCode",{parentName:"li"},"text"),", como espeficiado na tabela de props abaixo;"),e("li",{parentName:"ul"},`Caso deseje que os pins da timeline tenham estilo com borda e sem preenchimento, voc\xEA pode especificar a Propriedade
`,e("inlineCode",{parentName:"li"},"_dotStyle")," no objeto de configura\xE7\xF5es. Essa propriedade aceita dois valores: ",e("inlineCode",{parentName:"li"},"hollowed")," para estilo com borda e ",e("inlineCode",{parentName:"li"},"filled"),`
para estilo com preenchimento.`)),e("br",null),e("h2",null,"Preview"),e(b,{mdxType:"Canvas"},e(x,{name:"Timeline",args:{history:y},mdxType:"Story"},_.bind({}))),e(N,{story:"Timeline",mdxType:"ArgsTable"}))}T.isMDXComponent=!0;const h=_.bind({});h.storyName="Timeline";h.args={history:y};h.parameters={storySource:{source:`args => ({
  components: {
    CdsTimeline: Timeline
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-timeline
			v-bind="args" 
		/>
	\`
})`}};const l={title:"Componentes/Display/Timeline",component:u,includeStories:["timeline"]},V={Timeline:"timeline"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>e(g,{mdxStoryNameToKey:V,mdxComponentAnnotations:l},e(T,null))};const ee=["Template","history","timeline"];export{_ as Template,ee as __namedExportsOrder,l as default,y as history,h as timeline};
//# sourceMappingURL=Timeline.stories.b4d92a37.js.map
