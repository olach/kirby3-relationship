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
	
</style>
