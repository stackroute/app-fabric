module.exports = {
    entry: "./client/index.jsx",
    output: {
    	path:'./client',
        filename: "bundle.js"
    },
    module:{
        loaders:[
            {
      test: /\.jsx$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015',"react","stage-1"]
      }
    }
	
        ]
    }
}


