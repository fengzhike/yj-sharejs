const webpack = require('webpack')

module.exports = {
	entry:{
		main:'./index.js'
	},
	output:{
		path:__dirname+'/build',
		filename:'[name].js'
	},
	module:{
		rules:[{
	            test: /\.js?$/,
	            exclude: /node_modules/,
	            use: 'babel-loader'
	        }]
	},
	devServer: {
        hot: true,
        proxy: {
            '/v1/*': 'http://debug.rrtimes.com:8088/'		//devbug
//             '/v1/*': 'http://192.168.1.50:8086/'			//实时测试库
            //'/v1/*': 'http://192.168.1.22:80/'			//实时测试库
        },
        disableHostCheck: true
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
