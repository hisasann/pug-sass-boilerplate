const webpack = require('webpack')
const path = require('path')
const globule = require('globule')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// ディレクトリの設定
const opts = {
  srcDir: path.join(__dirname, 'app'),
  destDir: path.join(__dirname, 'dist')
}

// key の拡張子のファイルが、 value の拡張子のファイルに変換される
const convertExtensions = {
  js: 'js'
}

// トランスパイルするファイルを列挙する
// _ から始まるファイルは、他から import されるためのファイルとして扱い、個別のファイルには出力しない
const files = {}
Object.keys(convertExtensions).forEach(from => {
  const to = convertExtensions[from]
  globule.find([`**/*.${from}`, `!**/_*.${from}`], {cwd: opts.srcDir}).forEach(filename => {
    files[filename.replace(new RegExp(`.${from}$`, 'i'), `.${to}`)] = path.join(opts.srcDir, filename)
  })
})
console.log(files);

const config = {
  mode: process.env.NODE_ENV,
  context: opts.srcDir,
  entry: files,
  output: {
    filename: '[name]',
    path: opts.destDir
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/webpack-dev-server)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name]'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

module.exports = config
