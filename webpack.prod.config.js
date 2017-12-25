const webpack = require('webpack')

module.exports = {
	entry:{
		yjSharejs:'./yjSharejs'
	},
	output:{
		path:__dirname+'/lib',
		filename:'[name].min.js',
		library: {
			commonjs: "yjSharejs",
		   	root: "yjSharejs"
		},
		libraryTarget: "umd",
		umdNamedDefine: true
	},
	module:{
		rules:[{
	            test: /\.js?$/,
	            exclude: /node_modules/,
	            use: 'babel-loader'
	        }]
	},

	plugins:[
		new webpack.optimize.UglifyJsPlugin({
		            minimize: true,
		            sourceMap:false,
		            compressor: {
		                drop_debugger: true,
		                warnings: false,
		                drop_console: true
		            }
		 }),
	]
}
