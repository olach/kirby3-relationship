(function(){'use strict';var a={inheritAttrs:!1,props:{items:Array,selected:{type:Array,default:function(){return[]}},sortable:Boolean,multiselectable:Boolean,deletable:Boolean},data:function(){return{focused:null,activedescendant:null}},methods:{clickItem:function(a){this.multiselectable&&this.toggleItem(a)},focusFirstItem:function(){var a=this.items[0];a&&this.focusItem(a)},focusItem:function(a){this.focused=a,this.activedescendant=this._uid+a.value,this.scrollIntoView(a)},focusLastItem:function(){var a=this.items[this.items.length-1];a&&this.focusItem(a)},focusNextItem:function(){if(!this.focused)return void this.focusFirstItem();var a=this.items[this.getIndex(this.focused)+1];a&&this.focusItem(a)},focusPrevItem:function(){if(!this.focused)return void this.focusFirstItem();var a=this.items[this.getIndex(this.focused)-1];a&&this.focusItem(a)},getIndex:function(a){return this.items.findIndex(function(b){return b.value===a.value})},isFocused:function(a){return a===this.focused},isSelected:function(a){for(var b=0;b<this.selected.length;b++)if(this.selected[b].value===a.value)return!0;return!1},moveDown:function(a){var b=this.getIndex(a);if(b<this.items.length-1){var c=this.items[b+1];this.items[b+1]=a,this.items[b]=c,this.onInput(this.items)}},moveUp:function(a){var b=this.getIndex(a);if(0<b){var c=this.items[b-1];this.items[b-1]=a,this.items[b]=c,this.onInput(this.items)}},onBlur:function(){this.sortable&&(this.selected=[])},onInput:function(a){this.$emit("input",a)},onKeyDown:function(){this.sortable&&this.focused&&this.isSelected(this.focused)?this.moveDown(this.focused):this.focusNextItem()},onKeySpace:function(){this.focused&&this.toggleItem(this.focused)},onKeyUp:function(){this.sortable&&this.focused&&this.isSelected(this.focused)?this.moveUp(this.focused):this.focusPrevItem()},removeItem:function(a){if(!this.deletable||!a)return!1;var b=this.items.indexOf(a);-1!==b&&this.items.splice(b,1),this.onInput(this.items)},scrollIntoView:function(){},selectItem:function(a){this.selected.push(a),this.onInput(this.items)},setupFocus:function(){this.focused||this.focusFirstItem()},toggleItem:function(a){this.isSelected(a)?this.unselectItem(a):(!this.multiselectable&&(this.selected=[]),this.selectItem(a))},unselectItem:function(a){for(var b=0;b<this.selected.length;b++)if(this.selected[b].value===a.value)return this.selected.splice(b,1),void this.onInput(this.items)}}},b=function(a,b,c,d,e,f,g,h,i,j){"boolean"!=typeof g&&(i=h,h=g,g=!1);var k="function"==typeof c?c.options:c;a&&a.render&&(k.render=a.render,k.staticRenderFns=a.staticRenderFns,k._compiled=!0,e&&(k.functional=!0)),d&&(k._scopeId=d);var l;if(f?(l=function(a){a=a||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,a||"undefined"==typeof __VUE_SSR_CONTEXT__||(a=__VUE_SSR_CONTEXT__),b&&b.call(this,i(a)),a&&a._registeredComponents&&a._registeredComponents.add(f)},k._ssrRegister=l):b&&(l=g?function(){b.call(this,j(this.$root.$options.shadowRoot))}:function(a){b.call(this,h(a))}),l)if(k.functional){var m=k.render;k.render=function(a,b){return l.call(b),m(a,b)}}else{var n=k.beforeCreate;k.beforeCreate=n?[].concat(n,l):[l]}return c};var c=b({render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("k-draggable",{attrs:{element:"ul",list:a.items,options:{disabled:!a.sortable,handle:".relationship-item-sort",animation:150,forceFallback:!0},"data-sortable":a.sortable,"data-multiselectable":a.multiselectable,"data-deletable":a.deletable,"aria-readonly":"","aria-activedescendant":a.activedescendant,"aria-label":"",role:"listbox",tabindex:"0"},on:{change:a.onInput},nativeOn:{focus:function(b){return a.setupFocus(b)},blur:function(b){return a.onBlur(b)},keydown:[function(b){return!b.type.indexOf("key")&&a._k(b.keyCode,"space",32,b.key,[" ","Spacebar"])?null:(b.preventDefault(),a.onKeySpace(b))},function(b){return!b.type.indexOf("key")&&a._k(b.keyCode,"up",38,b.key,["Up","ArrowUp"])?null:(b.preventDefault(),a.onKeyUp(b))},function(b){return!b.type.indexOf("key")&&a._k(b.keyCode,"down",40,b.key,["Down","ArrowDown"])?null:(b.preventDefault(),a.onKeyDown(b))},function(b){return!b.type.indexOf("key")&&a._k(b.keyCode,"delete",[8,46],b.key,["Backspace","Delete","Del"])?null:(b.preventDefault(),a.removeItem(a.focused))}]}},a._l(a.items,function(b){return c("li",{staticClass:"relationship-item",class:{"is-focused":a.isFocused(b)},attrs:{id:a._uid+b.value,"aria-selected":a.isSelected(b),role:"option"},on:{mousedown:function(){return a.focusItem(b)},click:function(){return a.clickItem(b)}}},[a.sortable?c("k-icon",{staticClass:"relationship-item-sort",attrs:{type:"sort"}}):a._e(),a._v(" "),c("span",{staticClass:"relationship-item-label"},[a._v(a._s(b.text))]),a._v(" "),a.multiselectable?c("k-button",{attrs:{tabindex:"-1",icon:"add"}}):a._e(),a._v(" "),a.deletable?c("k-button",{attrs:{tabindex:"-1",icon:"remove"},on:{click:function(){return a.removeItem(b)}}}):a._e()],1)}),0)},staticRenderFns:[]},void 0,a,void 0,!1,void 0,void 0,void 0),d={inheritAttrs:!1,components:{"relationship-listbox":c},props:{autofocus:Boolean,disabled:Boolean,help:String,id:{type:[Number,String],default:function(){return this._uid}},label:String,name:String,options:{type:Array,default:function(){return[]}},required:Boolean,search:Boolean,value:{type:Array,default:function(){return[]}},multiselectable:String},data:function(){return{selected:this.value,query:""}},computed:{filteredOptions:function(){var a=this;return this.options.filter(function(b){return b.text.toLowerCase().includes(a.query.toLowerCase())})}},watch:{value:function(a){this.selected=a}},mounted:function(){console.log(this.value)},methods:{onInput:function(){this.$emit("input",this.selected)}},validations:function(){return{}}};var e=b({render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("k-field",a._b({staticClass:"kirby-relationship-field"},"k-field",a.$props,!1),[a.search?c("div",{staticClass:"relationship-search"},[c("k-input",{attrs:{theme:"field",type:"text",spellcheck:"false",icon:"search"},model:{value:a.query,callback:function(b){a.query=b},expression:"query"}})],1):a._e(),a._v(" "),c("div",{staticClass:"relationship-lists"},[c("relationship-listbox",{staticClass:"relationship-list",attrs:{items:a.filteredOptions,selected:a.selected,multiselectable:!0,sortable:!1,deletable:!1},on:{input:a.onInput}}),a._v(" "),c("relationship-listbox",{staticClass:"relationship-list",attrs:{items:a.selected,multiselectable:!1,sortable:!0,deletable:!0},on:{input:a.onInput}})],1)])},staticRenderFns:[]},void 0,d,void 0,!1,void 0,void 0,void 0);panel.plugin("olach/relationship",{fields:{relationship:e}})})();
