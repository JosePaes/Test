const ICrud = require('./../base/interfaces/interfaceCrud')
const { Sequelize } = require('sequelize')
const { connection } = require('mongoose')


class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema

    }

    static async connect() {

            const connection = new Sequelize(
                'heroes',
                'josepaes',
                '1234', {
                    host: 'localhost',
                    dialect: 'postgres',
                    quoteIdentifiers: false,
                    operatorsAliases: false,
                    logging: false
                }
            )

            return connection

        } //Metodo de conexão ao Banco de Dados

    async isConnected() {

            try {

                await this._connection.authenticate()
                return true

            } catch (error) {
                console.log('falha na conexão ao Banco de Dados')
            }

        } //

    async create(item) {
            const { dataValues } = await this._schema.create(item)
            return dataValues
        } // MEtodo usado para criação dos herois

    async read(item = {}) {
        return this._schema.findAll({ where: item, raw: true })

    }

    async update(id, item) {
        // console.log('item', item)
        return this._schema.update(item, { where: { id: id } })
    }

    async delete(id) {
        const query = id ? { id } : {}
        return this._schema.destroy({ where: query })
    }



    static async defineModel(connection, schema) {

        const model = connection.define(
            schema.name, schema.schema, schema.options
        )
        await model.sync()
        return model

    }

}

module.exports = Postgres