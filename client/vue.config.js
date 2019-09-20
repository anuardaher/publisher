// const axios = require('axios');

// const getArticlesId = async () => {
//   const parameters = {
//     data: {active: true},
//     projection: {text: 0, img: 0},
//   }
//   try {
//     const { data } = await axios.get(`${process.env.VUE_APP_SERVER_HOST}/articles`, { params: parameters });
//     const articlesRoutes = data ? data.map((element) => `/publicacao/${element.id}`) : [];
//     console.log(articlesRoutes);
//     return articlesRoutes;
//   } catch (error) {
//     throw new Error(error);
//   }
// }
module.exports = {
    transpileDependencies: ['vuetify'],

    devServer: {
        proxy: `${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}`,
    },

    pluginOptions: {
      prerenderSpa: {
        registry: undefined,
        renderRoutes: ['/artigos', '/noticias', '/publicacao/3f552f84-1435-44ea-a097-0a445b5a5cad'],
        useRenderEvent: true,
        headless: true,
        onlyProduction: true,
        postProcess: route => {
          // Defer scripts and tell Vue it's been server rendered to trigger hydration
          route.html = route.html
            .replace(/<script (.*?)>/g, '<script $1 defer>')
            .replace('id="app"', 'id="app" data-server-rendered="true"');
          return route;
        }
      }
    }
}
