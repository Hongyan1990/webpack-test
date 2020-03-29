function getTitle (vm) {
	const {title} = vm.$options
	if(title) {
		return typeof title === 'function' ? title.call(vm) : title
	}
}

const serverTitleMixin = {
	created () {
		const title = getTitle(this)
		if(title) {
			this.$ssrContext.title = title
		}
	}
}

const clientTitleMixin = {
	async mounted () {
		await this.dataPromise
		const title = getTitle(this)
		if(title) {
			document.title = title
		}
	}
}

export default process.env.VUE_ENV === 'server' ? serverTitleMixin : clientTitleMixin
