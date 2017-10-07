let pet = require('../model/pet')


let getPets = (req,res) => {

    pet.find((err,pets)=>{
        if(err) {
            res.send(err)
            return
        }
        res.send(pets)
    })
}

let postPet = (req,res) => {
    let objPet = req.body
    if(typeof objPet.name === 'undefined' || typeof objPet.status === 'undefined'  ){
        res.send({
            message: 'Pet is invalid'
        })
        return
    }
    pet.save(objPet,(err, pet)=>{
        if(err){
            res.send(err)
            return
        }
        res.send({
            message : 'Created',
            pet : pet
        })
    })
}
let getPet = (req,res) => {
    let id = req.params.id
    pet.findById(id,(err,pet)=>{
        if(err){
            res.send(err)
            return
        }
        if(typeof pet === 'undefined'){
            res.send({
                message : 'Can not find pet'
            })
            return
        }
        res.send({
            pet
        })
    })
}

let deletePet = (req,res) => {
    let id = req.params.id
    pet.delete(id,(err,pet)=>{
        if(err){
            res.send(err)
            return
        }
        res.send({
            message : 'Delete pet success',
            pet : pet
        })
    })
}

let updatePet = (req,res)=>{
    let id = req.params.id
    let body = req.body
    pet.update(id,body,(err,pet)=>{
        if(typeof pet === 'undefined'){
            res.send({
                message : 'Can not find pet'
            })
            return
        }
    if(err){
            res.send(err)
            return
        }
        res.send({
            message : 'Updated',
            pet : pet
        })
    })
}

module.exports = {
    getPets,postPet,getPet,deletePet,updatePet
}