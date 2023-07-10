const express = require('express')
const router = express.Router();
// posts model\
const Posts = require('../../posts');
const { model } = require('mongoose');


// get
// get all post 

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find();
        if (!posts) throw Error('No items')
        res.status(200).json(posts)
    } catch {
        res.status(400).json({ msg: err })

    }
})



// get /:id
// get a post by id 

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post) throw Error('No items')
        res.status(200).json(post)
    } catch {
        res.status(400).json({ msg: err })

    }
})

// POST
// Create an post 
router.post('/', async (req, res) => {
    const newPost = new Posts(req.body)
    try {
        const post = await newPost.save();
        if (!post) throw Error('Something went wrong while saving the post');
        res.status(200).json(post)

    } catch (err) {
        res.status(400).json({ msg: err })
    }
    // console.log(req.body)
})


// Delete /:id
// 
router.delete('/:id', async (req, res) => {
    try {
    const post = await Posts.findByIdAndDelete(req.params.id)
    if(!post) throw Error('No post found')
    res.status(200).json({success : true})


    } catch (err) {
        res.status(400).json({ msg: err })
    }
    // console.log(req.body)
})


// update/:id
router.patch('/:id', async (req, res) => {
    try {
    const post = await Posts.findByIdAndUpdate(req.params.id , req.body)
    if(!post) throw Error('Something went wrong while udating the post')
    res.status(200).json({success : true})


    } catch (err) {
        res.status(400).json({ msg: err })
    }
    // console.log(req.body)
})

module.exports = router;