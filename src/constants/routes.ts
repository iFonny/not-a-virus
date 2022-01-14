const routes = {
  home: '/',
  signin: '/auth/signin',

  notFound: '/404',

  urlShortener: {
    create: '/url-shortener',
    show: (urlId: number | string) => `/url-shortener/${urlId}`,
    edit: (urlId: number | string) => `/url-shortener/edit/${urlId}`, // TODO: Implement edit ?
  },

  urls: {
    list: '/urls',
  },
};

export default routes;
