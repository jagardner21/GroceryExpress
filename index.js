const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 8000
let groceries = require('./groceries')
let idCounter = 151

const app = express()

app.use(cors())
app.use(bodyParser.json())

//get handlers
app.get(`/groceries`, (req,res) => {
    res.json(groceries)
})

app.get(`/groceries/:id`, (req, res) => {
    let specGrocery = groceries.find(grocery => grocery.id == req.params.id)
    res.json(specGrocery)
})

//post handler
//per the project repo, states should only send back the added grocery, can update and fix that if need be
app.post(`/groceries`, (req, res) => {
    let newGrocery = {
        id: idCounter,
        ...req.body
    }
    groceries.push(newGrocery)
    res.json(groceries)
    idCounter++
})

//increase/decrease handlers

app.patch(`/groceries/:id/increase`, (req, res) => {
    let updatedGrocery = groceries.find(grocery => grocery.id == req.params.id)
    updatedGrocery.quantity++
    res.json(updatedGrocery)
})

app.listen(port, () => { console.log(`Listening on port ${port}`)})