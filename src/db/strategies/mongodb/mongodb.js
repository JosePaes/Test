const ICrud = require('./../base/interfaces/interfaceCrud')
const Mongoose = require('Mongoose')
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
    }

    static connect() {

            const USER = 'josepaes'
            const PASSWD = 123
            const LOCATION = '127.0.0.1'
            const DBASE = 'herois'
            const DPORT = 27017
                // const Mongoose = require('mongoose')

            Mongoose.connect(`mongodb://${USER}:${PASSWD}@${LOCATION}:${DPORT}/${DBASE}`, { useNewUrlParser: true }, function(error) {
                if (!error) return;

                console.log('Falha na Conexão!!!', error)
            })

            const connection = Mongoose.connection

            connection.once('open', () => console.log('Database Rodando!!'))
            return connection



        } //

    async isConnected() {
            const state = STATUS[this._connection.readyState]
            if (state === 'Conectado') return state;

            if (state !== 'Conectando') return state
            await new Promise(resolve => setTimeout(resolve, 1000))

            return STATUS[this._connection.readyState]
        } //



    create(item) {
            return this._schema.create(item)

        } //

    read(item, skip = 0, limit = 10) {

            return this._schema.find(item).skip(skip).limit(limit)
        } //

    update(id, item) {
            return this._schema.updateOne({ _id: id }, { $set: item })
        } //

    delete(id) {
        // console.log('---ID----', id)
        return this._schema.deleteOne({ _id: id })
    }
}

module.exports = MongoDB