import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Simulate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './src/index.js', // Entry point for the application
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Match all JavaScript files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel loader
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Add React preset
          },
        },
      },
      {
        test: /\.css$/, // Match all CSS files
        use: ['style-loader', 'css-loader'], // Use CSS loaders
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to the template HTML file
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
  },
};
