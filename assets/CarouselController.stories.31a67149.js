import"./jsx-runtime.db376543.js";import{c as e,A as O,C as M,S as x,M as g,a as y}from"./Props.519c721e.js";import"./iframe.facb5a71.js";import"./blocks.70b2f959.js";import{o as m,a as d,b as l,n as f,t as a}from"./vue.esm-bundler.3f4907d5.js";import{_ as I}from"./_plugin-vue_export-helper.cdc0426e.js";import"./string.7a88f6c6.js";import"./es.map.constructor.dc039611.js";import"./es.number.to-fixed.98762696.js";const N={props:{propertyName:{type:String,default:"Dados",required:!1},perPage:{type:Number,required:!0},total:{type:Number,required:!0},simple:{type:Boolean,default:!1,required:!1},fluid:{type:Boolean,default:!1,required:!1}},data(){return{currentNumberOfItemsMin:1,currentNumberOfItemsMax:this.perPage}},computed:{numberOfPages(){return Math.ceil(this.total/this.perPage)},disabledForward(){return this.currentNumberOfItemsMax>=this.total||this.simple&&this.currentNumberOfItemsMin>=this.numberOfPages},disabledBack(){return this.currentNumberOfItemsMin===1}},methods:{handleClickBack(){if(!this.disabledBack){if(this.simple&&this.currentNumberOfItemsMin>1){this.currentNumberOfItemsMin-=1,this.$emit("click-back",{min:this.currentNumberOfItemsMin-1,max:this.currentNumberOfItemsMax+1});return}else if(this.simple&&this.currentNumberOfItemsMin===1)return;this.currentNumberOfItemsMin-this.perPage<=0?(this.currentNumberOfItemsMin=1,this.currentNumberOfItemsMax=this.perPage,this.$emit("click-back",{min:this.currentNumberOfItemsMin-1,max:this.currentNumberOfItemsMax+1})):(this.currentNumberOfItemsMax-=this.currentNumberOfItemsMax-this.currentNumberOfItemsMin+1,this.currentNumberOfItemsMin-=this.perPage,this.$emit("click-back",{min:this.currentNumberOfItemsMin-1,max:this.currentNumberOfItemsMax}))}},handleClickForward(){if(!this.disabledForward){if(this.simple&&this.currentNumberOfItemsMin<this.numberOfPages){this.currentNumberOfItemsMin+=1,this.$emit("click-forward",{min:this.currentNumberOfItemsMin-1,max:this.currentNumberOfItemsMax+1});return}else if(this.simple&&this.currentNumberOfItemsMin===this.numberOfPages)return;this.currentNumberOfItemsMax+this.perPage>this.total?(this.currentNumberOfItemsMin=this.currentNumberOfItemsMax+1,this.currentNumberOfItemsMax=this.total,this.$emit("click-forward",{min:this.currentNumberOfItemsMin-1,max:this.currentNumberOfItemsMax+1})):(this.currentNumberOfItemsMin=this.currentNumberOfItemsMax+1,this.currentNumberOfItemsMax+=this.perPage,this.$emit("click-forward",{min:this.currentNumberOfItemsMin-1,max:this.currentNumberOfItemsMax+1}))}}}},_={key:0,class:"carousel-controller__text"},v={key:1,class:"carousel-controller__text"},w={class:"carousel-controller__property"};function P(s,r,n,i,u,t){return m(),d("div",null,[l("div",{class:f(["carousel-controller",{"carousel-controller--fluid":n.fluid}])},[l("span",{class:f({"carousel-controller__previous-button--disabled":t.disabledBack,"carousel-controller__previous-button":!t.disabledBack}),onClick:r[0]||(r[0]=(...c)=>t.handleClickBack&&t.handleClickBack(...c))},null,2),l("div",null,[n.simple?(m(),d("span",v,a(u.currentNumberOfItemsMin)+" de "+a(t.numberOfPages),1)):(m(),d("span",_,a(u.currentNumberOfItemsMin)+"-"+a(u.currentNumberOfItemsMax)+" de "+a(n.total),1)),l("span",w,a(n.propertyName),1)]),l("span",{class:f({"carousel-controller__next-button--disabled":t.disabledForward,"carousel-controller__next-button":!t.disabledForward}),onClick:r[1]||(r[1]=(...c)=>t.handleClickForward&&t.handleClickForward(...c))},null,2)],2)])}const b=I(N,[["render",P],["__scopeId","data-v-cfac8365"]]);N.__docgenInfo={exportName:"default",displayName:"CarouselController",description:"",tags:{},props:[{name:"propertyName",type:{name:"string"},required:!1,defaultValue:{func:!1,value:"'Dados'"}},{name:"perPage",type:{name:"number"},required:!0},{name:"total",type:{name:"number"},required:!0},{name:"simple",type:{name:"boolean"},required:!1,defaultValue:{func:!1,value:"false"}},{name:"fluid",type:{name:"boolean"},required:!1,defaultValue:{func:!1,value:"false"}}],events:[{name:"click-back",type:{names:["undefined"]}},{name:"click-forward",type:{names:["undefined"]}}]};function p(){return p=Object.assign?Object.assign.bind():function(s){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=n[i])}return s},p.apply(this,arguments)}const h=s=>({components:{CdsCarrouselController:b},setup(){return{args:s}},template:`
		<cds-carousel-controller
			v-bind="args"
			@click-forward="handleClickForwardEvent"
			@click-back="handleClickBackEvent"
		/>
	`,methods:{handleClickForwardEvent(){console.log("clicked forward")},handleClickBackEvent(){console.log("clicked back")}}}),B={Template:h},q="wrapper";function k({components:s,...r}){return e(q,p({},B,r,{components:s,mdxType:"MDXLayout"}),e(g,{title:"Componentes/Containers/CarouselController",component:b,mdxType:"Meta"}),e("h1",null,"CarouselController"),e("h3",null,"CarouselControllers s\xE3o componentes utilizados para controlar a exibi\xE7\xE3o de elementos em carross\xE9is."),e("hr",null),e("br",null),e("h2",null,"Recomendamos o uso de CarouselControllers quando:"),e("ul",null,e("li",{parentName:"ul"},"Voc\xEA possuir uma categoria de elementos da interface que se repetem e que podem ser exibidos em forma de carrossel.")),e("br",null),e("h2",null,"N\xE3o recomendamos o uso de CarouselControllers quando:"),e("ul",null,e("li",{parentName:"ul"},"Voc\xEA estiver trabalhando com tabelas. Nesses casos recomendamos o uso de pagina\xE7\xE3o (TODO)."),e("li",{parentName:"ul"},"Todo o conte\xFAdo a ser gerenciado puder ser exibido de uma s\xF3 vez. Nesse caso n\xE3o h\xE1 necessidade de controle de p\xE1ginas e do uso do componente;")),e("br",null),e("h2",null,"Preview"),e(M,{mdxType:"Canvas"},e(x,{name:"CarouselController",args:{total:12,perPage:4,propertyName:"M\xE9tricas"},mdxType:"Story"},h.bind({}))),e(y,{story:"CarouselController",mdxType:"ArgsTable"}))}k.isMDXComponent=!0;const C=h.bind({});C.storyName="CarouselController";C.args={total:12,perPage:4,propertyName:"M\xE9tricas"};C.parameters={storySource:{source:`args => ({
  components: {
    CdsCarrouselController: CarouselController
  },

  setup() {
    return {
      args
    };
  },

  template:
  /*html*/
  \`
		<cds-carousel-controller
			v-bind="args"
			@click-forward="handleClickForwardEvent"
			@click-back="handleClickBackEvent"
		/>
	\`,
  methods: {
    handleClickForwardEvent() {
      console.log('clicked forward');
    },

    handleClickBackEvent() {
      console.log('clicked back');
    }

  }
})`}};const o={title:"Componentes/Containers/CarouselController",component:b,includeStories:["carouselController"]},T={CarouselController:"carouselController"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>e(O,{mdxStoryNameToKey:T,mdxComponentAnnotations:o},e(k,null))};const K=["Template","carouselController"];export{h as Template,K as __namedExportsOrder,C as carouselController,o as default};
//# sourceMappingURL=CarouselController.stories.31a67149.js.map
