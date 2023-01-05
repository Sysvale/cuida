import"./jsx-runtime.db376543.js";import{c as e,A as y,C as _,S as v,M as V,a as T}from"./Props.519c721e.js";import"./iframe.facb5a71.js";import"./blocks.70b2f959.js";import{o as h,a as x,b as r,n as k,j as N,d as S,i as M,t as A,g as q}from"./vue.esm-bundler.3f4907d5.js";import{_ as j}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.7a88f6c6.js";import"./es.map.constructor.dc039611.js";import"./es.number.to-fixed.98762696.js";const f={props:{modelValue:{default:null,required:!0},disabled:{type:Boolean,default:!1},label:{type:String,default:"checkbox content"},noText:{type:Boolean,default:!1}},data(){return{isChecked:this.modelValue}},methods:{toggleValue(){this.disabled||(this.isChecked=!this.isChecked,this.$emit("update:modelValue",this.isChecked))}}},E={class:"checkbox__content"},w=["value","id","name","checked","disabled"],B=["for"];function D(t,o,a,c,b,n){return h(),x("span",{id:"cds-checkbox",class:"checkbox__container",onClick:o[2]||(o[2]=(...l)=>n.toggleValue&&n.toggleValue(...l))},[r("div",E,[r("input",{value:a.modelValue,type:"checkbox",id:t.$attrs.id||"cds-checkbox-option-input",name:t.$attrs.name||"cds-checkbox-option",checked:b.isChecked,disabled:a.disabled,onInput:o[0]||(o[0]=(...l)=>n.toggleValue&&n.toggleValue(...l))},null,40,w),r("label",{for:t.$attrs.id||"cds-checkbox-option-input",class:k({"checkbox__content--checked":b.isChecked,"checkbox__content--disabled":a.disabled}),onClick:o[1]||(o[1]=N((...l)=>n.toggleValue&&n.toggleValue(...l),["stop"]))},null,10,B)]),a.noText?q("",!0):(h(),x("div",{key:0,class:k(["checkbox__label",{"checkbox__label--disabled":a.disabled}])},[S(t.$slots,"default",{},()=>[M(A(a.label),1)])],2))])}const i=j(f,[["render",D]]);f.__docgenInfo={exportName:"default",displayName:"Checkbox",description:"",tags:{},props:[{name:"modelValue",description:"A prop usada como v-model para monitorar a sele\xE7\xE3o do Checkbox",type:{name:"object"},required:!0,defaultValue:{func:!1,value:"null"}},{name:"disabled",description:"Controla o status checkbox",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"label",description:"Exibe a etiqueta do checkbox",type:{name:"string"},defaultValue:{func:!1,value:"'checkbox content'"}},{name:"noText",description:"Controla a exibi\xE7\xE3o da etiqueta do checkbox",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"update:modelValue",description:"Evento utilizado para implementar o v-model.",type:{names:["Event"]}}],slots:[{name:"default",description:"Slot usado pra mostrar o conte\xFAdo do checkbox."}]};function d(){return d=Object.assign?Object.assign.bind():function(t){for(var o=1;o<arguments.length;o++){var a=arguments[o];for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(t[c]=a[c])}return t},d.apply(this,arguments)}const u=t=>({components:{CdsCheckbox:i},setup(){return{args:t}},template:`
		<cds-checkbox
			v-bind="args" 
		/>
	`}),m=!0,C="checkbox",O={Template:u,value:m},P="wrapper";function g({components:t,...o}){return e(P,d({},O,o,{components:t,mdxType:"MDXLayout"}),e(V,{title:"Componentes/Forms/Checkbox",component:i,mdxType:"Meta"}),e("h1",null,"Checkbox"),e("h3",null,"Checkboxes permitem que os usu\xE1rios selecionem um ou mais itens de um conjunto."),e("hr",null),e("br",null),e("h2",null,"Recomendamos o uso de Checkboxes quando:"),e("ul",null,e("li",{parentName:"ul"},"Selecionar uma ou mais op\xE7\xF5es de uma lista."),e("li",{parentName:"ul"},"Apresentar uma lista contendo sub-sele\xE7\xF5es."),e("li",{parentName:"ul"},"Ativar ou desativar um item na \xE1rea de trabalho.")),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de Checkboxes quando:"),e("ul",null,e("li",{parentName:"ul"},"Quando \xE9 necess\xE1rio uma a\xE7\xE3o imediata. Prefira utilizar ToggleSwitch.")),e("h2",null,"Preview"),e(_,{mdxType:"Canvas"},e(v,{name:"Checkbox",args:{value:m,label:C},mdxType:"Story"},u.bind({}))),e(T,{story:"Checkbox",mdxType:"ArgsTable"}))}g.isMDXComponent=!0;const p=u.bind({});p.storyName="Checkbox";p.args={value:m,label:C};p.parameters={storySource:{source:`args => ({
  components: {
    CdsCheckbox: Checkbox
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-checkbox
			v-bind="args" 
		/>
	\`
})`}};const s={title:"Componentes/Forms/Checkbox",component:i,includeStories:["checkbox"]},X={Checkbox:"checkbox"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>e(y,{mdxStoryNameToKey:X,mdxComponentAnnotations:s},e(g,null))};const J=["Template","value","label","checkbox"];export{u as Template,J as __namedExportsOrder,p as checkbox,s as default,C as label,m as value};
//# sourceMappingURL=Checkbox.stories.435ed2eb.js.map
