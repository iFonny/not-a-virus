import bundleAnalyzer from '@next/bundle-analyzer';
import withPlugins from 'next-compose-plugins';
import { nextI18NextRewrites } from 'next-i18next/rewrites.js';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const localeSubpaths = {
  tr: 'tr',
  en: 'en',
};

const config = {
  async redirects() {
    return [
      {
        // source: '/((?!api|u).*)/:slug',
        source: '/:path((?!api|u).*)*',
        has: [
          {
            type: 'header',
            key: 'host',
            value: '(.*)(en-f.eu|gouv.fr)(.*)',
          },
        ],
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
        permanent: false,
      },
    ];
  },
  rewrites: async () => [
    ...nextI18NextRewrites(localeSubpaths),
    { source: '/:path*', destination: '/:path*' },
    {
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_ORIGIN_URL}/:path*`,
    },
    {
      source: '/u/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_ORIGIN_URL}/u/:path*`,
    },
  ],
  publicRuntimeConfig: {
    localeSubpaths,
  },
  experimental: {
    forceSwcTransforms: true,
  },
		// eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

export default async (phase) => withPlugins([[withBundleAnalyzer]], config)(phase, { undefined });
