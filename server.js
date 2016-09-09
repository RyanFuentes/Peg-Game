const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// In production mode, serve assets from dist folder
// In non-production mode, setup webpack dev server
if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static('dist'));
} else {
  let webpack = require('webpack');
  let config = require('./webpack.config.dev');
  let compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    historyApiFallback: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`${process.env.NODE_ENV || 'Development'} Mode - Listening on port ${PORT}`);
});
