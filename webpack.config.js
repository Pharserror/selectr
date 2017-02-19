module.exports = {
  context: __dirname, // we just want to use $cwd
  // entry is the file that renders our React app.
  entry: {
    selectr: [
      './SelectR.jsx'
    ]
  },
  output: {
    path: __dirname + '/dist',
    // filename is the name of the output file that will be compiled by Webpack
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    // our loaders are our transpilers and interpreters such as Babel
    loaders: [
      {
        test: /\.jsx?$/, // we tell babel to look for js and jsx files
        exclude: /node_modules/, // we expect our node modules to already be transpiled
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'] // we need to use this preset so that Babel doesn't choke on JSX syntax
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    // modulesDirectories tells Webpack where stuff lives when we do require('some-module')
    modulesDirectories: ['node_modules']
  },
  externals: {
    'react': 'React'
  }
};
