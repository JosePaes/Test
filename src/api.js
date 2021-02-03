const Hapi = require('hapi')
const Context = require('./db/strategies/base/contentStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const heroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoutes = require('./routes/heroRoutes')

const app = new Hapi.Server({
    port: 5000

})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, heroiSchema))

    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
    ])


    await app.start()
    console.log('Servidor Rodando na porta', app.info.port)

    return app
}

module.exports = main()