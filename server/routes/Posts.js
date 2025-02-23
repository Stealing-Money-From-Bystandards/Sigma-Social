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

router.delete('/:id', validateToken, async (req,res) =>{
    const id = req.params.id
    const loggedInUser = req.user.username

    try {
        const post = await Posts.findByPk(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.username !== loggedInUser) {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
        }

        await Posts.destroy({where: {id: id}})

        res.json({message: "post deleted successfully"})

        }catch(error){
        console.error(error)
        }


})


router.get('/byid/:id', async (req,res)=>{
    const id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post)
})

module.exports = router