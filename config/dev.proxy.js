module.exports = {
	'/root/': {
		target: 'https://m.levelup.org.cn',
		changeOrigin: true,
		pathRewrite: {
			'^/root/': ''
		}
	}
}
