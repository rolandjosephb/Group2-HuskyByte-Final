let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Dog = require('../models/dog');

module.exports.displayDogList = (req, res, next) => {
    Dog.find((err, dogList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(DogList);

            res.render('dog/list', 
            {title: 'Dogs', 
            DogList: dogList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('dog/add', {title: 'Add Dog', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newDog = Dog({
        "name": req.body.name,
        "owner": req.body.owner,
        "age": req.body.age,
        "description": req.body.description,
        "breed": req.body.breed
    });

    Dog.create(newDog, (err, Dog) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the dog list
            res.redirect('/dog-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Dog.findById(id, (err, dogToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('dog/edit', {title: 'Edit Dog', dog: dogToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedDog = Dog({
        "_id": id,
        "name": req.body.name,
        "owner": req.body.owner,
        "age": req.body.age,
        "description": req.body.description,
        "breed": req.body.breed
    });

    Dog.updateOne({_id: id}, updatedDog, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the dog list
            res.redirect('/dog-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Dog.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the dog list
             res.redirect('/dog-list');
        }
    });
}