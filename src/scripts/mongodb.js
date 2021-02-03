// // docker ps
// // docker exec -it c9dd280a7de5 /
// mongo - u josepaes - p 1234--authenticationDatabase herois

// //mostra os BDS
// show dbs;

// //acessa um bd especifico
// use herois;

// //lista as coleções(tabelas)
// show collections;

// db.herois.insert({
//     nome: 'flash',
//     poder: 'velocidade',
//     dataNascimento: '1995-05-10'
// })

// for (let i = 0; i <= 10000; i++) {
//     db.herois.insert({
//         nome: `Clone-${i}`,
//         poder: 'velocidade',
//         dataNascimento: '1995-05-10'
//     })
// }

// db.herois.findOne()
// db.herois.find()
// db.herois.find().limit(1000)
// db.herois.find().limit(1000).sort({ nome: -1 })
// db.herois.count()

// //Create
// db.herois.insert({
//     nome: 'flash',
//     poder: 'velocidade',
//     dataNascimento: '1995-05-10'
// })

// //read
// db.herois.findOne()
// db.herois.find()
// db.herois.find().limit(1000)
// db.herois.find().limit(1000).sort({ nome: -1 })

// //update

// db.herois.update({ _id: ObjectId("5fff03a8e5512177f7a24947") }, { nome: 'Mulher Maravilha' })
// db.herois.update({ _id: ObjectId("5fff03a8e5512177f7a24945") }, { $set: { nome: 'Lanterna Verde' } })


// //delete
// db.herois.remove({})
// db.herois.remove({nome: 'Lanterna Verde'})