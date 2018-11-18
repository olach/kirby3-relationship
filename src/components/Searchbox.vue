<template>
	<k-input v-model="query" @input="onInput()" theme="field" type="text" spellcheck="false" icon="search" />
</template>

<script>
export default {
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
	}
}
</script>

<style>
.relationship-search {
	position: relative; /* Prevent border to go underneath the other list when focused */
}

.relationship-search .k-input-element {
	order: 1; /* Place input after icon */
}
</style>
