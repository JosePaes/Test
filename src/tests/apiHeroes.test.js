const assert = require('assert')
const api = require('./../api')

let app = {

}

describe('Suite de Testes API Heroes', function() {
    this.beforeAll(async() => {
        app = await api
    })

    it('listar /herois', async() => {
            const result = await app.inject({
                method: 'GET',
                url: '/herois?skip=0&limit=10'
            })

            const dados = JSON.parse(result.payload)
            const statusCode = result.statusCode
                // console.log('resultado--', result)
            assert.deepStrictEqual(statusCode, 200)
            assert.ok(Array.isArray(dados))
        }) //

    it('Listar /herois com 3 registros', async() => {
            const TAMANHO_LIMITE = 3
            const result = await app.inject({
                method: 'GET',
                url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
            })

            const dados = JSON.parse(result.payload)
                // console.log('--DADOS--', dados.length)
            const statusCode = result.statusCode
            assert.deepStrictEqual(statusCode, 200)
            assert.ok(dados.length === TAMANHO_LIMITE)
        }) //

    it('Listar /herois deve retornar erro  com limit incorreto', async() => {
            const TAMANHO_LIMITE = 'asd'
            const result = await app.inject({
                method: 'GET',
                url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
            })

            // const statusCode = result.statusCode
            assert.deepStrictEqual(result.payload, 'Erro interno no servidor')

        }) //

    it('Listar /herois - deve filtrar um item', async() => {
        // const TAMANHO_LIMITE = 1000
        const NAME = 'Senhor Fantastico-1610894531776'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=1000&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)
            // console.log('--DADOS--', dados)
        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(dados[0].nome === NAME)
    })

})