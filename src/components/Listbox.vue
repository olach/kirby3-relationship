<template>
	<k-draggable
		element="ul"
		:list="items"
		:options="{'disabled':!sortable,animation:150,forceFallback:true}"
		:data-sortable="sortable"
		aria-readonly=""
		:aria-activedescendant="activedescendant"
		aria-label=""
		role="listbox"
		tabindex="0"
		@focus.native="setupFocus"
		@change="onInput"
	>
		<li
			v-for="item in items"
			:id="_uid + item.value"
			:aria-selected="isSelected(item)"
			role="option"
			@click="toggleItem(item)"
		>
			<k-icon v-if="sortable" class="relationship-item-sort" :type="'sort'" />
			<span class="relationship-item-label">{{item.text}}</span>				
			<k-button v-if="multiselectable" tabindex="-1" icon="add"></k-button>
			<k-button v-if="deletable" @click="removeItem(item)" tabindex="-1" icon="remove"></k-button>
		</li>
	</k-draggable>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		items: Array,
		selected: {
			type: Array,
			default: function () {
				return [];
			}
		},
		sortable: Boolean,
		multiselectable: Boolean,
		deletable: Boolean,
		activedescendant: String
	},
	data() {
		return {
			items: this.items,
			selected: this.selected
		};
	},
	methods: {
		/**
		 * Make sure an item is focused. If there is no activeDescendant, focus on the first option.
		 */
		setupFocus() {
//			if (this.activeDescendant) {
//				var activeDescendant = this.listboxNode.querySelector('#' + this.activeDescendant);
//				var activeDescendantisHidden = activeDescendant.getAttribute('aria-hidden') === 'true';
//				
//				if (activeDescendant && activeDescendantisHidden) {
//					this.focusFirstItem();
//					return;
//				}
//				
//				this.focusItem(activeDescendant);
//				return;
//			}
			
			this.focusFirstItem();
		},
		/**
		 * Focus on the specified item.
		 */
		focusItem(item) {
			console.log(item.text);
			this.activedescendant = this._uid + item.value;
//			if (this.activeDescendant && this.activeDescendant !== item.id) {
//				this.defocusItem(document.getElementById(this.activeDescendant));
//			}
//			
//			item.classList.add('is-focused');
//			this.setActiveDescendant(item.id);
//			
//			if (this.listboxNode.scrollHeight > this.listboxNode.clientHeight) {
//				var scrollBottom = this.listboxNode.clientHeight + this.listboxNode.scrollTop;
//				var itemBottom = item.offsetTop + item.offsetHeight;
//				if (itemBottom > scrollBottom) {
//					this.listboxNode.scrollTop = itemBottom - this.listboxNode.clientHeight;
//				}
//				else if (item.offsetTop < this.listboxNode.scrollTop) {
//					this.listboxNode.scrollTop = item.offsetTop;
//				}
//			}
		},
		/**
		 * Focus on the first option.
		 */
		focusFirstItem() {
			var firstItem = this.items[0];
			
			if (firstItem) {
				this.focusItem(firstItem);
			}
		},
		onInput(value) {
			this.$emit('input', value);
		},
		index(option) {
			return this.state.findIndex(item => item.value === option.value);
		},
		isSelected(item) {
			// todo: Use findIndex instead:
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
			for (var i = 0; i < this.selected.length; i++) {
				if (this.selected[i].value === item.value) {
					return true;
				}
			}
			
			return false;
		},
		selectItem(item) {
			this.selected.push(item);
			this.onInput(this.items);
		},
		unselectItem(item) {
			// todo: Use findIndex instead:
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
			for (var i = 0; i < this.selected.length; i++) {
				if (this.selected[i].value === item.value) {
					this.selected.splice(i, 1);
					this.onInput(this.items);
					return;
				}
			}
			
//			var index = this.selected.indexOf(item);
			
//			if (index !== -1) {
//				this.selected.splice(index, 1);
//			}
		},
		removeItem(item) {
			if (this.deletable === false) {
				return false;
			}
			
			var index = this.items.indexOf(item);
			
			if (index !== -1) {
				this.items.splice(index, 1);
			}
			
			this.onInput(this.items);
		},
		toggleItem(item) {
			if (this.isSelected(item)) {
				this.unselectItem(item);
			} else {
				this.selectItem(item);
			}
		}
	}
}
</script>

<style>
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
	background-color: white;
	list-style: none;
}

/* List in focus: */
.relationship-list:focus {
	border-color: #4271ae;
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

.relationship-list--selected[data-sortable="true"] li {
	-webkit-user-select: none;
	   -moz-user-select: none;
	    -ms-user-select: none;
	        user-select: none;
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
