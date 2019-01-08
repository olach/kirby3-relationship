<template>
	<k-draggable
		element="ul"
		:list="items"
		:options="{disabled:!sortable,handle:'.relationship-item-sort',animation:150,forceFallback:true}"
		:data-sortable="sortable"
		:data-multiselectable="multiselectable"
		:data-deletable="deletable"
		aria-readonly=""
		:aria-activedescendant="activedescendant"
		aria-label=""
		role="listbox"
		tabindex="0"
		@focus.native="setupFocus"
		@change="onInput"
		@keydown.space.native.prevent="onSpace"
		@keydown.up.native.prevent="focusPrevItem"
		@keydown.down.native.prevent="focusNextItem"
		@keydown.delete.native.prevent="removeItem(focused)"
	>
		<li
			v-for="item in items"
			:id="_uid + item.value"
			:aria-selected="isSelected(item)"
			role="option"
			@mousedown="focusItem(item)"
			@click="clickItem(item)"
			class="relationship-item"
			:class="{'is-focused': isFocused(item)}"
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
		deletable: Boolean
	},
	data() {
		return {
			items: this.items,
			selected: this.selected,
			focused: null,
			activedescendant: null
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
			
			if (!this.focused) {
				this.focusFirstItem();
			}
		},
		/**
		 * Focus on the specified item.
		 */
		focusItem(item) {
			this.focused = item;
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
		focusPrevItem() {
			if (!this.focused) {
				this.focusFirstItem();
				return;
			}
			
			var prevItem = this.items[this.getIndex(this.focused) - 1];
			
			if (prevItem) {
				this.focusItem(prevItem);
			}
		},
		focusNextItem() {
			if (!this.focused) {
				this.focusFirstItem();
				return;
			}
			
			var nextItem = this.items[this.getIndex(this.focused) + 1];
			
			if (nextItem) {
				this.focusItem(nextItem);
			}
		},
		onInput(value) {
			this.$emit('input', value);
		},
		onSpace() {
			if (this.focused) {
				this.toggleItem(this.focused);
			}
		},
		getIndex(testitem) {
			return this.items.findIndex(item => item.value === testitem.value);
		},
		isFocused(item) {
			return item === this.focused;
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
			if (!this.deletable || !item) {
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
				if (!this.multiselectable) {
					// Deselect all other selected items.
					this.selected = [];
				}
				
				this.selectItem(item);
			}
		},
		clickItem(item) {
			// todo:
			if (this.multiselectable) {
				this.toggleItem(item);
			} else {
				// Deselect all other selected items.
			}
		}
	}
}
</script>

<style lang="scss">
.relationship-list {
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
	box-shadow: 0 0 0 2px rgba(66, 113, 174, .25);
	outline: none;
	position: relative; /* Prevent border to go underneath the other list */
	
	li.is-focused {
		background-color: rgba(0, 0, 0, 0.075);
	}
}

/* Readonly state for the lists: */
.relationship-list[aria-readonly="true"] {
	color: #777;
	background-color: transparent;
	filter: grayscale(100%);
	pointer-events: none;
}

/* Default styling for all list items: */
.relationship-item {
	display: flex;
	align-items: center;
	padding: 0.25em;
	overflow: hidden;
	user-select: none;
	
	> * {
		margin: 0 0.25em;
		
		/* Workaround for a bug in IE 10: Inline elements are not treated as flex-items */
		/* https://github.com/philipwalton/flexbugs#12-inline-elements-are-not-treated-as-flex-items */
		display: block;
	}
	
	&[aria-hidden="true"] {
		display: none;
	}
}

.relationship-item-label {
	flex: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.relationship-item-sort {
	opacity: 0.25;
	will-change: opacity;
	transition: opacity 0.3s;
	cursor: -webkit-grab;
}

.relationship-item:hover .relationship-item-sort {
	opacity: 1;
}

.relationship-item-sort:active {
	cursor: -webkit-grabbing;
}

.relationship-item-thumb {
	width: 1.375em;
	height: 1.375em;
	margin-top: -0.1875em;
	margin-bottom: -0.1875em;
	object-fit: cover;
	border-radius: 12%;
}

.relationship-item button {
	figure {
		vertical-align: bottom;
	}
	
	&:not([disabled]) {
		cursor: pointer;
	}
}

/* List with multiselectable items: */
.relationship-list[data-multiselectable="true"] {
	li {
		cursor: pointer;
	}
	
	li[aria-selected="true"] {
		color: #777;
		
		.relationship-item-thumb {
			opacity: 0.2;
			filter: grayscale(100%);
		}
		
		button {
			display: none;
		}
	}
}

/* Sortable list items: */
.relationship-list[data-sortable="true"] li {
	transition: box-shadow 150ms ease-out;
}

/* List item during sorting: */
.relationship-list[data-sortable="true"]:focus li[aria-selected="true"],
.relationship-item.k-sortable-fallback {
	background-color: white;
	border-radius: 2px;
	box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
}

/* Placeholder item when sorting: */
.relationship-item.k-sortable-ghost {
	background-color: rgba(0, 0, 0, 0.025);
	box-shadow: none;
	cursor: -webkit-grabbing;
	
	> * {
		opacity: 0;
	}
}
</style>
