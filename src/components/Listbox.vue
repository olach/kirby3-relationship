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
		@blur.native="onBlur"
		@change="onInput"
		@keydown.space.native.prevent="onKeySpace"
		@keydown.up.native.prevent="onKeyUp"
		@keydown.down.native.prevent="onKeyDown"
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
			focused: null,
			activedescendant: null
		};
	},
	methods: {
		clickItem(item) {
			if (this.multiselectable) {
				this.toggleItem(item);
			}
		},
		focusFirstItem() {
			var firstItem = this.items[0];

			if (firstItem) {
				this.focusItem(firstItem);
			}
		},
		focusItem(item) {
			this.focused = item;
			this.activedescendant = this._uid + item.value;

			this.scrollIntoView(item);
		},
		focusLastItem() {
			var lastItem = this.items[this.items.length - 1];

			if (lastItem) {
				this.focusItem(lastItem);
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
		getIndex(testitem) {
			return this.items.findIndex(item => item.value === testitem.value);
		},
		isFocused(item) {
			return item === this.focused;
		},
		isSelected(item) {
			const found = this.selected.find(current => current.value === item.value);

			if (!found) return false;

			return true;
		},
		moveDown(item) {
			var itemPos = this.getIndex(item);

			if (itemPos < this.items.length - 1) {
				var temp = this.items[itemPos + 1];
				this.items[itemPos + 1] = item;
				this.items[itemPos] = temp;
				this.onInput(this.items);
			}
		},
		moveUp(item) {
			var itemPos = this.getIndex(item);

			if (itemPos > 0) {
				var temp = this.items[itemPos - 1];
				this.items[itemPos - 1] = item;
				this.items[itemPos] = temp;
				this.onInput(this.items);
			}
		},
		onBlur() {
			if (this.sortable) {
				// Deselect all selected items.
				this.selected = [];
			}
		},
		onInput(value) {
			this.$emit('input', value);
		},
		onKeyDown() {
			if (this.sortable && this.focused && this.isSelected(this.focused)) {
				this.moveDown(this.focused);
			} else {
				this.focusNextItem();
			}
		},
		onKeySpace() {
			if (this.focused) {
				this.toggleItem(this.focused);
			}
		},
		onKeyUp() {
			if (this.sortable && this.focused && this.isSelected(this.focused)) {
				this.moveUp(this.focused);
			} else {
				this.focusPrevItem();
			}
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
		scrollIntoView(item) {
			// TODO: Scroll new item into view
		},
		selectItem(item) {
			this.selected.push(item);
			this.onInput(this.items);
		},
		setupFocus() {
			if (!this.focused) {
				this.focusFirstItem();
			}
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
		unselectItem(item) {
			const index = this.selected.findIndex(current => current.value === item.value);

			if (index === -1) return;

			this.selected.splice(index, 1);
			this.onInput(this.items);
		}
	}
}
</script>

<style lang="scss">
.relationship-list {
	overflow-x: hidden;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	height: 11.75rem;
	margin: 0;
	padding: var(--field-input-padding, 0.5rem);
	border: var(--field-input-border, 1px solid #ccc);
	background-color: var(--color-white, white);
	list-style: none;
	outline: 0;
}

/* List in focus: */
.relationship-list:focus {
	position: relative; /* Prevent border to go underneath the other list */
	border-radius: var(--rounded) !important;
	border: var(--field-input-focus-border, 1px solid #4271ae);
	box-shadow: var(--color-focus-outline, rgba(113, 143, 183, .25)) 0 0 0 2px;

	li.is-focused {
		background-color: var(--color-gray-300, #ddd);
		border-radius: var(--rounded-sm);
	}
}

/* Readonly state for the lists: */
.relationship-list[aria-readonly="true"] {
	color: var(--field-input-disabled-color, #999);
	background-color: var(--field-input-disabled-background, white);
	filter: grayscale(100%);
	pointer-events: none;
}

/* Default styling for all list items: */
.relationship-item {
	display: flex;
	align-items: center;
	padding: 0.25rem;
	overflow: hidden;
	user-select: none;

	> * {
		margin: 0 0.25rem;
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
	cursor: grab;
}

.relationship-item:hover .relationship-item-sort {
	opacity: 1;
}

.relationship-item-sort:active {
	cursor: grabbing;
}

.relationship-item button {
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
		color: var(--color-text-light, #777);

		button {
			visibility: hidden;
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
	background-color: var(--color-white, white);
	border-radius: var(--rounded-sm, 0.125rem);
	box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
}

/* Placeholder item when sorting: */
.relationship-item.k-sortable-ghost {
	background-color: var(--color-gray-300, #ddd);
	box-shadow: none;
	cursor: grabbing;

	> * {
		opacity: 0;
	}
}
</style>
