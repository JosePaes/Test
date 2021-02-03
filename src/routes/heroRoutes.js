const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
            return {
                path: "/herois",
                method: "GET",
                handler: (request, headers) => {
                    try {
                        let query = {}
                        const { skip, limit, nome } = request.query

                        if (nome) {
                            query.nome = nome
                        }

                        if (isNaN(skip)) {
                            throw Error('O tipo de dado do skip esta incorreto')
                        }

                        if (isNaN(limit)) {
                            throw Error('O tipo de dado do limit esta incorreto')
                        }

                        // console.log('--limit--', limit)
                        // return this.db.read(query, parseInt(skip), parseInt(limit))
                        return this.db.read(query).skip(parseInt(skip)).limit(parseInt(limit))

                    } catch (error) {

                        console.log('Fudeu', error)

                        return "Erro interno no servidor"

                    }
                }
            }
        } // Final da rota list

} // Final da Classe HeroRoutes

module.exports = HeroRoutes