module.exports = {
    transpileDependencies: ['vuetify'],
    devServer: {
        proxy: `https://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}`,
    }
}