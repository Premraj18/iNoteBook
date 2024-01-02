const express = require('express');
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// Create a user using: POST "/api/auth". Doesn't require auth
router.post('/CreateUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 })
], async (req, res) => {

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with this email exits already
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'This email alreday exist' })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        //Create a new User
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,process.env.JWT_SECRET);
        // console.log(authtoken)

        // res.json({ "msg": "User successfully registered" });
        res.json({authtoken});


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error Occured");
    }

})

module.exports = router


// simplest format to store data in mongodb
// router.post('/',(req,res) => {
//     console.log(req.body)
//     const user = User(req.body);
//     user.save()
//     res.send(req.body);
// })