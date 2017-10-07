let express = require('express')
let app = express()
let morgan = require('morgan')
let bodyParser = require('body-parser')
let port = process.env.PORT || 3000
let pet = require('./routes/pet')

if(process.env.NODE_ENV !== 'test'){
    app.use(morgan('combined'))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extened : true}))
app.use(bodyParser.text())
app.use(bodyParser.json({type : 'application/json'}))


app.get('/',(req,res)=> {
    res.json({
    message: 'Welcome to Pet Store'
    })
})


app.route('/pets')
    .get(pet.getPets)
    .post(pet.postPet)
app.route('/pets/:id')
    .get(pet.getPet)
    .put(pet.updatePet)
    .delete(pet.deletePet)

app.listen(port)
console.log('Listening on port: '+ port)

module.exports = app //for testing, if no testing then no need to declare this line