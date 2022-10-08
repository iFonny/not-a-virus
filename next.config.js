const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {
  tr: 'tr',
  en: 'en',
};

const config = {
  rewrites: async () => [
    ...nextI18NextRewrites(localeSubpaths),
    { source: '/:path*', destination: '/:path*' },
    { source: '/api/:path*', destination: `${process.env.NEXT_PUBLIC_API_ORIGIN_URL}/:path*` },
    { source: '/u/:path*', destination: `${process.env.NEXT_PUBLIC_API_ORIGIN_URL}/u/:path*` },
  ],
  publicRuntimeConfig: {
    localeSubpaths,
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = async (phase) => withPlugins([[withBundleAnalyzer]], config)(phase, { undefined });
