var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];


// GET /api/owners
app.get('/api/owners', (req, res, next) =>
    res.send(owners))


// GET /api/owners/:id
app.get('/api/owners/:id', (req, res, next) => {
    let id = req.params.id
    let foundID = owners.find(function (person) {
        return person.id == id;
    })
    res.send(foundID);
})
// POST /api/owners

app.post('/api/owners', (req, res, next) => {
    // let nextId = owners.reduce((acc, element) => {
    //     if (element.id > acc) {
    //         return element.id
    //     }
    //     return acc++
    // }, 0) + 1

    let newID = {
        id: owners.length + 1,
        name: req.body.name,
        pets: [
            {
                id: req.body.pets[0].id,
                name: req.body.pets[0].name,
                type: req.body.pets[0].type
            }
        ]
    }
    owners.push(newID);
    res.json(newID);
})

// PUT /api/owners/:id
app.put('/api/owners/:id', (req, res, next) => {
    //Use the id param to find the owner where the id matches.
    let updatedID = owners.find(function (owner) {
        if (owner.id) {
            return owner.id === parseInt(req.params.id);
        }
    });
    //Create a new owner based on the body received in the request.body
    let updated = {
        id: updatedID.id
    };
    // update our todo list so that the todo with the id that was sent to us is updated.
    // alternative: you can use a splice and reduce function 
    owners = owners.filter(owner => {
        if (owner.id !== updatedID.id) {
            // owners.splice(updatedID, 0, updated) Trying to use splice function. Currently it creates a new array and pushes the modified entry to the end of the array. 
            return owner
        }
    })
    owners.push(updated);
    res.send(updated);
})

// DELETE /api/owners/:id
app.delete('/api/owners/:id', (req, res, next) => {
    const deleteID = req.params.id;

    let deletedID = owners.filter(deletedID => {
        return deletedID.id === deleteID;
    });

    const index = owners.indexOf(deletedID);
    owners.splice(index, 1);
    res.send('deleted ID at ID#' + deleteID)
})

// GET /api/owners/:id/pets
app.get('/api/owners/:id/pets', (req, res, next) => {
    let id = req.params.id
    let foundOwner = owners.find(function (owner) {
        return owner.id == id; 
    })
    res.send(foundOwner.pets); 
})


// GET /api/owners/:id/pets/:petId
// How do I setup API get requests with multiple params?H ere I need id and petsId.
app.get('/api/owners/:id/pets/:petId', (req, res, next) => {
    let id = req.params.id
    let petId = req.params.petId
    
    let foundOwner = owners.find(function (owner) {
        return owner.id == id; 
    })
    res.send(foundOwner); 
})

// POST /api/owners/:id/pets

// PUT /api/owners/:id/pets/:petId

// DELETE /api/owners/:id/pets/:petId


app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
})