module.exports = {
	'/root/': {
		target: 'http://47.99.240.71:8000/',
		changeOrigin: true,
		pathRewrite: {
			'^/root/': ''
		}
	}
}