<template>
	<k-draggable element="ul" :list="items" :options="{'disabled':!sortable,animation:150}" role="listbox" :data-sortable="sortable" tabindex="0">
		<li v-for="item in items" :aria-selected="isSelected(item)" role="option" @click="toggleItem(item)">
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
	data: function () {
		return {
			items: this.items,
			selected: this.selected
		};
	},
	watch: {
		items: function () {
			//console.log(this.items);
			//this.$emit('input', this.items);
		}
	},
	methods: {
		onInput() {
			//this.$emit("input", this.selected);
		},
		index: function (option) {
			return this.state.findIndex(item => item.value === option.value);
		},
		isSelected: function (item) {
			// todo: Use findIndex instead:
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
			for (var i = 0; i < this.selected.length; i++) {
				if (this.selected[i].value === item.value) {
					return true;
				}
			}
			
			return false;
		},
		selectItem: function (item) {
			this.selected.push(item);
		},
		unselectItem: function (item) {
			// todo: Use findIndex instead:
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
			for (var i = 0; i < this.selected.length; i++) {
				if (this.selected[i].value === item.value) {
					this.selected.splice(i, 1);
					return;
				}
			}
			
//			var index = this.selected.indexOf(item);
			
//			if (index !== -1) {
//				this.selected.splice(index, 1);
//			}
		},
		removeItem: function (item) {
			if (this.deletable === false) {
				return false;
			}
			
			var index = this.items.indexOf(item);
			
			if (index !== -1) {
				this.items.splice(index, 1);
			}
		},
		toggleItem: function (item) {
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
	
</style>
