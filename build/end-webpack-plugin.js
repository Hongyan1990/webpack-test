class EndWebpackPlugin {
	constructor(doneCallback, failCallback) {
		this.doneCallback = doneCallback;
		this.failCallback = failCallback;
	}

	apply(compiler) {
		compiler.plugin('done', stats => {
			this.doneCallback(stats);
		});
		compiler.plugin('failed', stats => {
			this.failCallback(stats);
		})
	}
}

module.exports = EndWebpackPlugin;