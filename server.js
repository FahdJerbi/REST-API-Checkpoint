
//  ****************************   Imports   ********************
require('dotenv').config()
// console.log(process.env)
const express = require('express')
const mongoose = require('mongoose')

// importing User schema
const User = require('./models/User')

// express app
const app = express()


//  ******************************   Database Connection   **********************  
// connect to database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('connected to dababase !!'))
.catch((error) => console.log(error))



// ******************************     Routes    *****************
// initilize the middleware
app.use(express.json())

// First Route: RETURN ALL USERS 
app.get('/api/users' , async (req, res) => { 
    try {
        const allUsers = await User.find()
        res.json(allUsers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})


// Second Route: ADD A NEW USER TO THE DATABASE 
app.post('/api/register', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
        });

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


// Third Route: EDIT A USER BY ID 
app.put('/api/updateUser' , async (req, res) => { 
    try {
        const findUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
            )
        res.status(200).json(findUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Fourth Route: REMOVE A USER BY ID 
app.delete('/api/deleteUser/:id' , async (req, res) => { 
    try {
        const deleteUser= await User.findByIdAndRemove(
            req.params.id
        )
        res.status(200).json({message: 'User deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

// listen to port 3000
app.listen(3000, () => console.log('server is running on port 3000'))