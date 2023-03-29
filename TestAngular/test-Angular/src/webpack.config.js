//module.exports = {
    //...
  //  devServer: {
    //  open: {
      //  target: ['index.html', 'http://localhost:3000/employees'],
        //app: {
          //name: 'google-chrome',
          //arguments: ['--incognito', '--new-window'],
        //},
      //},
    //},
  //};
  //above is a test, remove later if it turns out to not be the solution
  import { config } from 'webpack';
import DoISupportIt from './components/DoISupportIt';
  export default config;

  module.exports = {
    //...
    resolve:{
      extensions: ['.ts', '.js']
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000/employees',
          bypass: function (req, res, proxyOptions) {
            if (req.headers.accept.indexOf('html') !== -1) {
              console.log('Skipping proxy for browser request.');
              return '/index.html';
            }
          },
        },
      },
    },
  };