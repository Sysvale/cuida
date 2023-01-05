import"./jsx-runtime.db376543.js";import{c as e,A as b,C as f,S as g,M as y,a as x}from"./Props.519c721e.js";import"./iframe.facb5a71.js";import"./blocks.70b2f959.js";import{o as h,a as _,b as d,d as R,t as O}from"./vue.esm-bundler.3f4907d5.js";import{_ as C}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.7a88f6c6.js";import"./es.map.constructor.dc039611.js";import"./es.number.to-fixed.98762696.js";const p={model:{prop:"modelValue",event:"change"},props:{modelValue:{default:null,required:!0},value:{default:null,required:!0},label:{type:String,default:"radio content"},disabled:{type:Boolean,default:!1}},computed:{isChecked(){return this.modelValue===this.value}}},q={class:"cds-radio"},N=["id","value","disabled","name","checked"],S=["for"],T=["disabled"];function V(a,n,o,l,j,c){return h(),_("span",q,[d("input",{type:"radio",id:o.value,value:o.value,disabled:o.disabled,name:a.$attrs.name,checked:c.isChecked,onChange:n[0]||(n[0]=v=>a.$emit("change",v.target.value))},null,40,N),d("label",{class:"cds-radio__label",for:o.value},[R(a.$slots,"default",{},()=>[d("span",{class:"cds-radio__label-text",disabled:o.disabled},O(o.label),9,T)])],8,S)])}const i=C(p,[["render",V]]);p.__docgenInfo={exportName:"default",displayName:"Radio",description:"",tags:{},props:[{name:"v-model",description:"A prop usada como v-model para monitorar a sele\xE7\xE3o do Radio",type:{name:"object"},required:!0,defaultValue:{func:!1,value:"null"}},{name:"value",description:`A prop usada como valor associado ao Radio. O que ser\xE1 atribu\xEDdo
v-model quando essa op\xE7\xE3o for selecionado`,type:{name:"object"},required:!0,defaultValue:{func:!1,value:"null"}},{name:"label",description:"Define a label do input, o conte\xFAdo que \xE9 exibido para descrever o Radio",type:{name:"string"},defaultValue:{func:!1,value:"'radio content'"}},{name:"disabled",description:"Controla o status do Radio",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"change",description:"Evento emitido quando o Radio muda seu estado.",type:{names:["Event"]}}],slots:[{name:"default",description:"Slot padr\xE3o para renderiza\xE7\xE3o de conte\xFAdo customizado da label"}]};function s(){return s=Object.assign?Object.assign.bind():function(a){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var l in o)Object.prototype.hasOwnProperty.call(o,l)&&(a[l]=o[l])}return a},s.apply(this,arguments)}const r=a=>({components:{CdsRadio:i},setup(){return{args:a}},data(){return{selected:"option-3",option2:{value:"option-2",label:"Op\xE7\xE3o 2",disabled:!1},option3:{value:"option-3",label:"Op\xE7\xE3o 3",disabled:!0}}},template:`
		<div>
			<div style="display: flex;">
				<cds-radio
					v-model="selected"
					v-bind="args"
					style="margin-right: 4px; margin-left: 4px"
				>
					Op\xE7\xE3o de <strong> destaque </strong>
				</cds-radio>
				<cds-radio
					v-model="selected"
					v-bind="option2"
					style="margin-right: 4px; margin-left: 4px"
				/>
				<cds-radio
					v-model="selected"
					v-bind="option3"
					style="margin-right: 4px; margin-left: 4px"
				/>
			</div>
			<br>
			<small>
				Op\xE7\xE3o selecionada: {{ selected }}
			</small>
		</div>
	`}),A={Template:r},D="wrapper";function m({components:a,...n}){return e(D,s({},A,n,{components:a,mdxType:"MDXLayout"}),e(y,{title:"Componentes/Forms/Radio",component:i,mdxType:"Meta"}),e("h1",null,"Radio"),e("h3",null,"O Radio permite que os usu\xE1rios selecionem uma op\xE7\xE3o de um conjunto."),e("hr",null),e("br",null),e("h2",null,"Recomendamos o uso de Radios quando:"),e("ul",null,e("li",{parentName:"ul"},"As op\xE7\xF5es que o componente busca prover s\xE3o mutuamente exclusivas.")),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de Radios quando:"),e("ul",null,e("li",{parentName:"ul"},"Duas ou mais op\xE7\xF5es puderem ser selecionadas ao mesmo tempo."),e("li",{parentName:"ul"},"Houver 4 ou mais op\xE7\xF5es. Voc\xEA pode usar o componente ",e("inlineCode",{parentName:"li"},"Dropdown")," nesses casos.")),e("br",null),e("h2",null,"Preview"),e(f,{mdxType:"Canvas"},e(g,{name:"Radio",args:{value:"option-1",label:"Op\xE7\xE3o 1",disabled:!1},mdxType:"Story"},r.bind({}))),e(x,{story:"Radio",mdxType:"ArgsTable"}))}m.isMDXComponent=!0;const u=r.bind({});u.storyName="Radio";u.args={value:"option-1",label:"Op\xE7\xE3o 1",disabled:!1};u.parameters={storySource:{source:`args => ({
  components: {
    CdsRadio: Radio
  },

  setup() {
    return {
      args
    };
  },

  data() {
    return {
      selected: 'option-3',
      option2: {
        value: 'option-2',
        label: 'Op\xE7\xE3o 2',
        disabled: false
      },
      option3: {
        value: 'option-3',
        label: 'Op\xE7\xE3o 3',
        disabled: true
      }
    };
  },

  template:
  /*html*/
  \`
		<div>
			<div style="display: flex;">
				<cds-radio
					v-model="selected"
					v-bind="args"
					style="margin-right: 4px; margin-left: 4px"
				>
					Op\xE7\xE3o de <strong> destaque </strong>
				</cds-radio>
				<cds-radio
					v-model="selected"
					v-bind="option2"
					style="margin-right: 4px; margin-left: 4px"
				/>
				<cds-radio
					v-model="selected"
					v-bind="option3"
					style="margin-right: 4px; margin-left: 4px"
				/>
			</div>
			<br>
			<small>
				Op\xE7\xE3o selecionada: {{ selected }}
			</small>
		</div>
	\`
})`}};const t={title:"Componentes/Forms/Radio",component:i,includeStories:["radio"]},M={Radio:"radio"};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:()=>e(b,{mdxStoryNameToKey:M,mdxComponentAnnotations:t},e(m,null))};const L=["Template","radio"];export{r as Template,L as __namedExportsOrder,t as default,u as radio};
//# sourceMappingURL=Radio.stories.b792531c.js.map
