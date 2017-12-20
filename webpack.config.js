const webpack = require('webpack')

module.exports = {
	entry:{
		yjShareJs:'./yjShareSdk.js'
	},
	output:{
		path:__dirname+'/lib',
		filename:'[name].min.js'
	},
	module:{
		rules:[{
	            test: /\.js?$/,
	            exclude: /node_modules/,
	            use: 'babel-loader'
	        }]
	},
	plugins:[
		// new webpack.optimize.UglifyJsPlugin({
		//             minimize: true,
		//             sourceMap:false,
		//             compressor: {
		//                 drop_debugger: true,
		//                 warnings: false,
		//                 drop_console: true
		//             }
		//  }),
	]
}