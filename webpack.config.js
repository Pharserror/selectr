module.exports = {
  context: __dirname,
  entry: {
    selectr: [
      './src/v2/selectr'
    ]
  },
  externals: {
    'react': 'umd react',
    'react-dom': 'umd react-dom'
  },
  mode: 'none',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader'
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'selectr',
    publicPath: '/',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
