const express = require('express');
const router = express.Router();
const { Users } = require('../models');


const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const {validateToken} = require('../middlewares/AuthMiddleware')


router.post("/register", async (req, res) => {
    const {username, password, firstname, lastname} = req.body

    bcrypt.hash(password, 10).then((hash) =>{
        Users.create({
            username: username,
            password: hash,
            firstname: firstname,
            lastname: lastname,
        })
        res.json("success")
    })

})

router.post("/login", async (req,res) => {
    const {username, password, firstname, lastname} = req.body

    const user = await Users.findOne({where: {username: username}})


    if (user) {
        bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
                return res.json({ erorr: "Wrong username or password" });
            }
            const accessToken = sign({username: user.username, id: user.id,},"secret");
            return res.json({accessToken: accessToken, username: user.username})
        })
    } else {
            return res.json({error: "user doesnt exist"})
    }
})

router.get('/auth', validateToken, async (req, res) => {
    res.json(req.user)
})


module.exports = router;