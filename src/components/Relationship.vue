<template>
	<k-field class="kirby-relationship-field" v-bind="$props">
		<div class="relationship-search" v-if="search">
			<relationship-search />
		</div>
		
		<div class="relationship-lists">							
			<relationship-listbox class="relationship-list relationship-list--available" :items="available" :selected="selected" :sortable="false" :multiselectable="true" :deletable="false" />
			<relationship-listbox class="relationship-list relationship-list--selected" :items="selected" :sortable="true" :multiselectable="false" :deletable="true" />
			
			<!--
			<ul
				class="relationship-list relationship-list--available"
				aria-activedescendant=""
				aria-label=""
				aria-multiselectable="true"
				role="listbox"
				tabindex="0"
				@focus="isInFocus"
				@blur="isBlurred"
				@keydown.down="keyDown"
				@keydown="key"
			>
				<li
					v-for="(item, index) in options"
					:id="'relationship_' + _uid + '_available_' + item.value"
					class=""
					role="option"
					data-key=""
					data-search-index=""
					@click="addItem(item)"
				>
					<span class="relationship-item-label">{{item.text}}</span>
					<button class="relationship-item-add" tabindex="-1" type="button">
						<k-icon :type="'add'" />
					</button>
				</li>
			</ul>
			-->
			
			<!--
			<ol
				class="relationship-list relationship-list--selected"
				data-sortable="true"
				data-deletable="true"
				aria-activedescendant=""
				aria-label=""
				role="listbox"
				tabindex="0"
			>
				<li
					v-for="(item, index) in value"
					:id="'relationship_' + _uid + '_selected_' + item.value"
					role="option"
					data-key=""
					aria-selected=""
					@click="removeItem(item)"
				>
					<span class="relationship-item-sort"><k-icon :type="'sort'" /></span>
					
					<span class="relationship-item-label">{{item.text}}</span>
					<button class="relationship-item-delete" tabindex="-1" type="button">
						<k-icon :type="'remove'" />
					</button>
				</li>
			</ol>
			-->
		</div>
	</k-field>
</template>

<script>
import Searchbox from './Searchbox.vue'
import Listbox from './Listbox.vue'

export default {
	inheritAttrs: false,
	props: {
		help: String,
		label: String,
		name: String,
		value: Array,
		options: Array,
		search: Boolean,
	},
	components: {
		'relationship-searchbox': Searchbox,
		'relationship-listbox': Listbox
	},
	methods: {
		addItem: function (item) {
			//console.log(this.$refs);
			this.value.push(item);
		},
		removeItem: function (item) {
			//console.log(this.$refs);
			//this.value.push(item);
			// remove tag and fire input event
			this.value.splice(this.index(item), 1);
			//this.onInput(this.value);
		},
		isInFocus: function () {
			console.log('in focus');
		},
		isBlurred: function () {
			console.log('blurred');
		},
		keyDown: function () {
			console.log('down');
		},
		key: function (event) {
			console.log(event.key);
		},
		index: function (theitem) {
			return this.value.findIndex(item => item.value === theitem.value);
		},
		onInput: function () {
			console.log('onInput');
			this.$emit("input", this.selected);
		}
	},
	watch: {
		items: function () {
			//console.log(this.items);
			this.$emit('input', this.items);
		}
	},
	computed: {
		selected: function () {
			//console.log(this.value[0]);
			//console.log(options[0]);
			return this.value;
		}
	},
	data: function () {
		return {
			items: this.value,
			available: this.options,
			selected: this.value,
			query: null
		}
	}
}
</script>

<style>
/* Wrapper for the lists: */
.relationship-lists {
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-flex-wrap: wrap;
	    -ms-flex-wrap: wrap;
	        flex-wrap: wrap;
	border: 1px solid #ccc;
	/*border-top: none;
	border-left: none;*/
}

/* Default styling for the lists: */
.relationship-list {
	-webkit-flex: 1 0 14em;
	    -ms-flex: 1 0 14em;
	        flex: 1 0 14em;
	overflow-x: hidden;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	height: 11.25em;
	margin: 0;
	padding: 0.5em;
	border: 1px solid #ccc;
	/*border-bottom: none;
	border-right: none;*/
	background-color: white;
	list-style: none;
	margin: -1px; /* Prevent double borders */
}

/* List in focus, add a green 2px border: */
.relationship-list:focus {
	border-color: #4271ae;
	/*box-shadow: 0px 0px 0px 1px #8dae28;*/ /* Add another 1px border */
	-webkit-box-shadow: 0 0 0 2px rgba(66, 113, 174, .25);
	        box-shadow: 0 0 0 2px rgba(66, 113, 174, .25);
	outline: none;
	position: relative; /* Prevent border to go underneath the other list */
}

/* Readonly state for the lists: */
.relationship-list[aria-readonly="true"] {
	color: #777;
	background-color: transparent;
	filter: grayscale(100%);
	pointer-events: none;
}

/* Reset native button styles: */
/*.relationship-list button {
	border: none;
	background: none;
	margin: 0;
	padding: 0;
	color: inherit;
}*/

/* Fix vertical centering on Kirby buttons: */
.relationship-list button figure {
	vertical-align: bottom;
}

.relationship-list button:not([disabled]) {
	cursor: pointer;
}

/* Default styling for all list items: */
.relationship-list li {
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-align-items: center;
	    -ms-flex-align: center;
	        align-items: center;
	padding: 0.25em;
	overflow: hidden;
	cursor: pointer;
}

.relationship-list li > * {
	margin: 0 0.25em;
	
	/* Workaround for a bug in IE 10: Inline elements are not treated as flex-items */
	/* https://github.com/philipwalton/flexbugs#12-inline-elements-are-not-treated-as-flex-items */
	display: block;
}

.relationship-list li[aria-hidden="true"] {
	display: none;
}

.relationship-list li .relationship-item-label {
	-webkit-flex: 1;
	    -ms-flex: 1;
	        flex: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.relationship-list li .relationship-item-sort {
	color: #ccc;
}

.relationship-list li .relationship-item-thumb {
	width: 1.375em;
	height: 1.375em;
	margin-top: -0.1875em;
	margin-bottom: -0.1875em;
	object-fit: cover;
	border-radius: 12%;
}

/* Hide the checkboxes: */
.relationship-list li input[type="checkbox"] {
	display: none;
}

/* List with available items: */
.relationship-list--available {
	background-color: #f7f7f7;
}

.relationship-list--available:focus li.is-focused {
	background-color: rgba(0, 0, 0, 0.075);
}

.relationship-list--available li[aria-selected="true"] {
	color: #777;
}

.relationship-list--available li[aria-selected="true"] .relationship-item-thumb {
	opacity: 0.2;
	filter: grayscale(100%);
}

.relationship-list--available li[aria-selected="true"] button {
	display: none;
}

/* Selected list items: */
.relationship-list--selected li {
	cursor: move;
	transition: box-shadow 150ms ease-out;
}

/*.relationship-list--selected li .relationship-item-add {
	display: none;
}*/

.relationship-list--selected:focus li.is-focused {
	background-color: rgba(0, 0, 0, 0.075);
}

/* List item during sorting: */
/*.relationship-list--selected[data-sortable="true"]:focus li[aria-selected="true"],
.relationship-list--selected[data-sortable="true"] li.ui-sortable-helper {
	background-color: white;
	border-radius: 2px;
	box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
}*/
.relationship-list--selected[data-sortable="true"] li.sortable-chosen {
	background-color: white;
	border-radius: 2px;
	box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
}

/* Placeholder item when sorting: */
/*.relationship-list--selected[data-sortable="true"] li.ui-sortable-placeholder {
	background-color: rgba(0, 0, 0, 0.025);
}*/
.relationship-list--selected[data-sortable="true"] li.sortable-ghost {
	background-color: rgba(0, 0, 0, 0.025);
	box-shadow: none;
}
.relationship-list--selected[data-sortable="true"] li.sortable-ghost > * {
	opacity: 0.4;
}

/* Search input: */
.relationship-search {
	position: relative;
	margin-bottom: -1px; /* Prevent double borders */
}

.relationship-search .k-input-element {
	order: 1; /* Place input after icon */
}



/*
.k-list-item .k-sort-handle {
    position: absolute;
    left: -38px;
    width: 38px;
    height: 38px;
    color: #16171a;
    opacity: 0;
    z-index: 1;
    cursor: -webkit-grab;
    will-change: opacity, color;
    -webkit-transition: opacity .3s;
    transition: opacity .3s
}

.k-list-item .k-sort-handle:active {
    cursor: -webkit-grabbing
}

.k-list:hover .k-sort-handle {
    opacity: .25
}

.k-list-item:hover .k-sort-handle {
    opacity: 1
}
*/
</style>
