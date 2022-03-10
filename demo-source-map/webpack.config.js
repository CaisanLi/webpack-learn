const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = [
	"eval",
	"eval-cheap-source-map",
	"eval-cheap-module-source-map",
	"eval-source-map",
	"cheap-source-map",
	"cheap-module-source-map",
	"inline-cheap-source-map",
	"inline-cheap-module-source-map",
	"source-map",
	"inline-source-map",
	"hidden-source-map",
	"nosources-source-map"
].map(devtool => ({
	mode: "development",
	entry: {
		entry: './index.js'
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: `./js/${devtool}.js`,
    clean: true
	},
	devtool,
  plugins: [
    new htmlWebpackPlugin({
      filename: `${ devtool }.html`
    })
  ]
}));