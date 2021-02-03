const assert = require('assert')



const HeroisSchema = require('./../db/strategies/mongodb/schemas/heroisSchema')
const MongoDB = require('../db/strategies/mongodb/mongodb')
const Context = require('../db/strategies/base/contentStrategy')
const { strictEqual, deepStrictEqual } = require('assert')

let MOCK_HEROI_ID = ''
const MOCK_HEROI_DEFAULT = {
    nome: `Senhor Fantastico-${Date.now()}`,
    poder: 'Elasticidade'
}
const MOCK_HEROI_CADASTRAR = {
    nome: 'Gavião Arqueiro',
    poder: 'Precisão'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: `Homem de Ferro-${Date.now()}`,
    poder: 'Armadura Tech'
}

let context = {}

describe('MongoDB switch de teste', function() {
    this.beforeAll(async() => {
        const connection = MongoDB.connect()
        context = new Context(new MongoDB(connection, HeroisSchema))
        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result.id
    })

    it('verificar Conexão', async() => {
            const result = await context.isConnected()
            const expected = 'Conectado'

            deepStrictEqual(result, expected)
        }) //teste para verificar a conexão com o BD

    it('Cadastrar', async() => {
            const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
            deepStrictEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
        }) // Teste de cadastro no Banco

    it('Listar', async() => {

            const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })

            const result = {
                nome,
                poder
            }
            deepStrictEqual(result, MOCK_HEROI_DEFAULT)
        }) // Teste de Listagem de Itens

    it('Atualizar', async() => {
            // console.log('MOCK_HEROI_ID', MOCK_HEROI_ID)
            const result = await context.update(MOCK_HEROI_ID, {
                nome: 'Luffy D.'
            })
            deepStrictEqual(result.nModified, 1)
        }) // Teste de Alteração de Item

    it('Remover', async() => {
            const result = await context.delete(MOCK_HEROI_ID)
            deepStrictEqual(result.n, 1)
        }) //
})