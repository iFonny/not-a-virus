const routes = {
  home: '/',
  urlShortener: {
    create: '/url-shortener',
    show: (urlId: number | string) => `/url-shortener/${urlId}`,
  },
};

export default routes;
