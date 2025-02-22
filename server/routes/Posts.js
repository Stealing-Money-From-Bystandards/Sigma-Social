const {validateToken} = require('../middlewares/AuthMiddleware')
const express = require('express');
const router = express.Router();
const { Posts } = require('../models')

router.post('/createpost', validateToken, async (req, res) =>{
    const post = {
        postbody: req.body.postbody,
        username: req.user.username
    }
    await Posts.create(post)
    res.json(post)
})

router.get('/getusersposts', validateToken, async (req, res) => {
    const username = req.user.username
    const listOfUserPosts = await Posts.findAll({where: {username: username}})
    res.json(listOfUserPosts)
})

router.get('/', async (req,res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts)
}) 

router.get('/byid/:id', async (req,res)=>{
    const id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post)
})

module.exports = router