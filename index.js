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
	inheritAttrs: true,
	props: {
		items: Array,
		sortable: Boolean,
		multiselectable: Boolean,
		deletable: Boolean
	},
	data: function () {
		return {
			items: this.items
		};
	},
	watch: {
		items: function () {
			console.log(this.items);
			//this.$emit('input', this.items);
		}
	},
	methods: {
		onInput() {
			//this.$emit("input", this.selected);
		}
	},
	template: `
		<k-draggable element="ul" :list="items" :options="{'disabled':!sortable}" role="listbox" tabindex="0">
			<li v-for="item in items">
				<span v-if="sortable" class="relationship-item-sort"><k-icon :type="'sort'" /></span>
				<span class="relationship-item-label">{{item.text}}</span>				
				<k-button v-if="multiselectable" tabindex="-1" icon="add"></k-button>
				<k-button v-if="deletable" tabindex="-1" icon="remove"></k-button>
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
				options: Array,
				search: Boolean,
				value: Array,
			},
			components: {
				'relationship-search': RelationshipSearch,
				'relationship-listbox': RelationshipListbox
			},
			methods: {
				addItem: function (item) {
					console.log(this.$refs);
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
					this.$emit("input", this.selected);
				}
			},
			computed: {
				selected: function () {
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
						<relationship-listbox class="relationship-list relationship-list--available" :items="available" :sortable="false" :multiselectable="true" :deletable="false" />
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
