module.exports = {
    transpileDependencies: ['vuetify'],
    devServer: {
        proxy: `http://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}`,
    }
}