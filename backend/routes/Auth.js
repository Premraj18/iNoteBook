const express = require('express');
const router = express.Router();
const User = require("../models/User")
const {body,validationResult} = require('express-validator')


// Create a user using: POST "/api/auth". Doesn't require auth
router.post('/CreateUser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 character').isLength({min:5})
], async (req,res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    } 

    // Check whether the user with this email exits already
    let user = User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error: 'This email alreday exist'})
    }
    user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    })
    
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    //     res.json({error:'Email already exits'})
    // })
})

module.exports = router


// simplest format to store data in mongodb
// router.post('/',(req,res) => {
//     console.log(req.body)
//     const user = User(req.body);
//     user.save()
//     res.send(req.body);
// })