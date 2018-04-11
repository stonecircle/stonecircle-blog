'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'stonecircle-blog',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    blog: {
      title: "The Stone Circle",
      description: "The Stone Circle perspective on Software Development, Business and more.",
      logo: "/images/logo-white.png",
      coverImage: "/images/cover-image.jpg",
      coverMeta: {
        attribution: "by Conor Luddy",
        attributionLink: "https://unsplash.com/photos/QkQXTxJ7TLg"
      },
      twitter: "stonecircle_co",
      navigation: [
        { label: 'stonecircle.io', link: 'https://stonecircle.io' },
        { label: 'Blog Home', route: 'index' },
      ]
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    fastboot: {
      hostWhitelist: ["localhost:4200", "localhost:7784"]
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.blog.host = 'http://localhost:4200';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.blog.host = 'https://blog.stonecircle.io';

    ENV.analytics = {
      integrations: [{
        name: 'GoogleAnalytics',
        config: {
          id: 'UA-71683103-1',
          set: {
            hostname: 'blog.stonecircle.io'
          }
        }
      }]
    };
  }

  return ENV;
};
