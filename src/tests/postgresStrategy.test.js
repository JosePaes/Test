const assert = require('assert')
const Postgres = require('../db/strategies/postgres/postgres')
const Context = require('../db/strategies/base/contentStrategy')
const HeroiSchema = require('./../db/strategies/postgres/schemas/heroisSchema')
const { strictEqual, deepEqual, deepStrictEqual } = require('assert')

// const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome: 'Tocha Humana',
    poder: 'Fogo'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: 'Deku',
    poder: 'one for all'
}

let context = ''
describe('Postgres Strategy', function() {
        this.timeout(Infinity)

        this.beforeAll(async function() {
            const connection = await Postgres.connect()
            const model = await Postgres.defineModel(connection, HeroiSchema)
            context = new Context(new Postgres(connection, model))
            await context.delete()
            await context.create(MOCK_HEROI_ATUALIZAR)
        })

        it('PostgresSQL Connection', async function() {

                const result = await context.isConnected()
                strictEqual(result, true)

            }) //Final teste de Conexão

        it('cadastrar', async function() {
                const result = await context.create(MOCK_HEROI_CADASTRAR)
                delete result.id

                deepStrictEqual(result, MOCK_HEROI_CADASTRAR)
            }) // Final teste cadastrar

        it('Listar', async function() {
            const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
            delete result.id
                // console.log('resultado', result)
            deepStrictEqual(result, MOCK_HEROI_CADASTRAR)
        })

        it('atualizar', async function() {
            const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
            const novoItem = {
                ...MOCK_HEROI_ATUALIZAR,
                nome: 'All Might'
            }
            const [result] = await context.update(itemAtualizar.id, novoItem)
            const [itemAtualizado] = await context.read({ id: itemAtualizar.id })
            assert.deepStrictEqual(result, 1)
            assert.deepStrictEqual(itemAtualizado.nome, novoItem.nome)
        })

        it('remover por id', async function() {
            const [item] = await context.read({})
            const result = await context.delete(item.id)
            assert.deepStrictEqual(result, 1)
        })

    }) //