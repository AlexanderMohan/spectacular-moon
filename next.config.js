const sourcebit = require('sourcebit');
const sourcebitConfig = require('./sourcebit.js');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache')

sourcebit.fetch(sourcebitConfig);

module.exports = withPWA({
    trailingSlash: true,
    devIndicators: {
        autoPrerender: false
    },
    pwa: {
        dest: 'public',
        runtimeCaching,
      },
    webpack: (config, { webpack }) => {
        // Tell webpack to ignore watching content files in the content folder.
        // Otherwise webpack receompiles the app and refreshes the whole page.
        // Instead, the src/pages/[...slug].js uses the "withRemoteDataUpdates"
        // function to update the content on the page without refreshing the
        // whole page
        config.plugins.push(new webpack.WatchIgnorePlugin([[/\/content\//]]));
        return config;
    }
});
