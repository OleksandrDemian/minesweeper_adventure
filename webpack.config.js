const path = require('path');

module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'build'),
	},
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		hot: true,
		port: 9000
	}
};