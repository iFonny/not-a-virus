const routes = {
  home: '/',
  urlShortener: {
    create: '/url-shortener',
    show: (urlId: number | string) => `/url-shortener/${urlId}`,
    edit: (urlId: number | string) => `/url-shortener/edit/${urlId}`, // TODO: Implement edit ?
  },
};

export default routes;
