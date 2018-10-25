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
				index(theitem) {
					return this.value.findIndex(item => item.value === theitem.value);
				},
			},
			computed: {
				selected: function () {
					return this.value;
				}
			},
			data() {
				return {
					items: this.value,
					selected: null,
					query: null
				};
			},
			template: `
				<k-field class="kirby-relationship-field" v-bind="$props">
					<k-input v-model="query" theme="field" type="text" icon="search" />
					
					<div class="relationship-field">
						<div class="relationship-search" v-if="search">
							<k-input theme="field">
								<k-icon :type="'search'" slot="before" />
								<k-text-input class="input" type="text" role="search" autocomplete="off" />
							</k-input>
						</div>
						
						<div class="relationship-lists">							
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
						</div>
					</div>
				</k-field>
			`
		}
	}
});
