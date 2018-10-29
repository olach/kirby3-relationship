var RelationshipSearch = {
	inheritAttrs: false,
	props: {
		search: Boolean
	},
	data() {
		return {
			query: null
		};
	},
	methods: {
		onInput() {
			//this.$emit("input", this.selected);
		}
	},
	template: `
		<k-input v-model="query" @input="onInput()" theme="field" type="text" spellcheck="false" icon="search" />
	`
}

var RelationshipListbox = {
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
	},
	template: `
		<k-draggable element="ul" :list="items" :options="{'disabled':!sortable,animation:150}" role="listbox" :data-sortable="sortable" tabindex="0">
			<li v-for="item in items" :aria-selected="isSelected(item)" role="option" @click="toggleItem(item)">
				<k-icon v-if="sortable" class="relationship-item-sort" :type="'sort'" />
				<span class="relationship-item-label">{{item.text}}</span>				
				<k-button v-if="multiselectable" tabindex="-1" icon="add"></k-button>
				<k-button v-if="deletable" @click="removeItem(item)" tabindex="-1" icon="remove"></k-button>
			</li>
		</k-draggable>
	`
}

panel.plugin('olach/relationship', {
	fields: {
		relationship: {
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
				'relationship-search': RelationshipSearch,
				'relationship-listbox': RelationshipListbox
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
				};
			},
			template: `
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
			`
		}
	}
});
