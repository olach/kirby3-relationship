<template>
	<k-field class="kirby-relationship-field" v-bind="$props" :counter="counterOptions">
		<div class="relationship-search" v-if="search">
			<k-input v-model="query" theme="field" type="text" spellcheck="false" icon="search" />
		</div>
		
		<div class="relationship-lists">
			<relationship-listbox
				class="relationship-list"
				:items="filteredOptions"
				:selected="selected"
				:multiselectable="true"
				:sortable="false"
				:deletable="false"
				v-on:input="onInput"
			/>
			<relationship-listbox
				class="relationship-list"
				:items="selected"
				:multiselectable="false"
				:sortable="true"
				:deletable="true"
				v-on:input="onInput"
			/>
		</div>
	</k-field>
</template>

<script>
import Listbox from './Listbox.vue'

export default {
	inheritAttrs: false,
	components: {
		'relationship-listbox': Listbox
	},
	props: {
		autofocus: Boolean,
		counter: {
			type: Boolean,
			default: true
		},
		disabled: Boolean,
		help: String,
		id: {
			type: [Number, String],
				default() {
				return this._uid;
			}
		},
		label: String,
		max: Number,
		min: Number,
		name: String,
		options: {
			type: Array,
			default() {
				return [];
			}
		},
		required: Boolean,
		search: Boolean,
		value: {
			type: Array,
			default() {
				return [];
			}
		},
		multiselectable: String
	},
	data() {
		return {
			selected: this.value,
			query: ''
		}
	},
	computed: {
		counterOptions() {
			if (this.value === null || this.disabled || this.counter === false) {
				return false;
			}
			
			return {
				count: this.value && Array.isArray(this.value) ? this.value.length : 0,
				min: this.min,
				max: this.max
			};
		},
		filteredOptions() {
			return this.options.filter(item => {
				return item.text.toLowerCase().includes(this.query.toLowerCase())
			})
		}
	},
	watch: {
		value(value) {
			this.selected = value;
		}
	},
	mounted() {
		console.log(this.value);
//		this.onInvalid();
//		
//		if (this.$props.autofocus) {
//			this.focus();
//		}
	},
	methods: {
		onInput() {
			this.$emit('input', this.selected);
		}
	},
	validations() {
		return {
//			selected: {
//				required: this.required ? required : true,
//				min: this.min ? minLength(this.min) : true,
//				max: this.max ? maxLength(this.max) : true,
//			}
		};
	}
}
</script>

<style>
.relationship-lists {
	display: flex;
	flex-wrap: wrap;
	border: 1px solid #ccc;
}

.relationship-lists:not(:first-child) {
	margin-top: -1px; /* Prevent double borders */
}

.relationship-lists > .relationship-list {
	margin: -1px; /* Prevent double borders */
}

.relationship-lists > :first-child {
	background-color: #f7f7f7;
}

.relationship-search {
	position: relative; /* Prevent border to go underneath the other list when focused */
}

.relationship-search .k-input-element {
	order: 1; /* Place input after icon */
}
</style>
