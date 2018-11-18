<template>
	<k-field class="kirby-relationship-field" v-bind="$props">
		<div class="relationship-search" v-if="search">
			<relationship-searchbox />
		</div>
		
		<div class="relationship-lists">							
			<relationship-listbox class="relationship-list relationship-list--available" :items="options" :selected="selected" :sortable="false" :multiselectable="true" :deletable="false" v-on:input="onInput" />
			<relationship-listbox class="relationship-list relationship-list--selected" :items="selected" :sortable="true" :multiselectable="false" :deletable="true" v-on:input="onInput" />
		</div>
	</k-field>
</template>

<script>
import Searchbox from './Searchbox.vue'
import Listbox from './Listbox.vue'

export default {
	inheritAttrs: false,
	components: {
		'relationship-searchbox': Searchbox,
		'relationship-listbox': Listbox
	},
	props: {
		autofocus: Boolean,
		disabled: Boolean,
		help: String,
		id: {
			type: [Number, String],
				default() {
				return this._uid;
			}
		},
		label: String,
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
	},
	data() {
		return {
			selected: this.value,
			query: null
		}
	},
	watch: {
		value(value) {
			this.selected = value;
		}
	},
	mounted() {
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
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-flex-wrap: wrap;
	    -ms-flex-wrap: wrap;
	        flex-wrap: wrap;
	border: 1px solid #ccc;
}

.relationship-search + .relationship-lists {
	margin-top: -1px; /* Prevent double borders */
}

.relationship-lists > .relationship-list {
	margin: -1px; /* Prevent double borders */
}
</style>
