// implement your posts router here
const express = require('express')
const Post = require('./posts-model')
const router = express.Router()

router.get('/', (req, res) => {
    Post.find()
    .then(posts => {
    if (posts) {
        res.status(200).json(posts)
    } else {
        res.status(404).json('Missing Posts')
    }
    }).catch(err => {
        res.status(500).json({ 
            message: "The posts information could not be retrieved", 
            err: err.message, 
            stack: err.stack  })
    })
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post){
            res.status(200).json(post)
        }else {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
            return
        }}
    catch (err) {
        res.status(500).json({
            message: "The post with the specified ID does not exist",
            err: err.message, 
            stack: err.stack
        })
    }
})

router.post('/', (req, res) => {
    const {title, contents} = req.body
    if (!title || !contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else { 
    Post.insert({title, contents})
    .then(newPost => {
        Post.findById(newPost.id)
        .then(post => {
            res.status(201).json(post)
        }).catch(error => {
            res.status(500).json({ 
                message: "There was an error while saving the post to the database", 
                err: err.message, 
                stack: err.stack })
        })
    })
    .catch(error => {
        res.status(500).json({ 
        message: "There was an error while saving the post to the database", 
        err: err.message, 
        stack: err.stack })
    }) 
    }
})

router.delete('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(result => {
        if(!result) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200).json(result)
            Post.remove(req.params.id)
            .then(result => {
                return
            }).catch(error => {
                res.status(500).json({ 
                message: "There was an error while saving the post to the database", 
                err: err.message, 
                stack: err.stack })
            }) 
        }
    }).catch(error => {
        res.status(500).json({ 
        message: "There was an error while saving the post to the database", 
        err: err.message, 
        stack: err.stack })
    }) 
  Post.remove(req.params.id)
  .then(result => {
    console.log(result)
    return
  }).catch(error => {
    res.status(500).json({ 
        message: "There was an error while saving the post to the database", 
        err: err.message, 
        stack: err.stack })
})
})

router.put('/:id', (req, res) => {
    const {title, contents} = req.body
    if (!title || !contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
     } else {
         Post.findById(req.params.id)
             .then(result => {
                if (!result) {
                    res.status(404).json({ message: "The post with the specified ID does not exist" })
                } else {
                Post.update(req.params.id, req.body)
                    .then(resp => {
                        Post.findById(req.params.id)
                        .then(resp => {
                            res.status(200).json(resp)
                        })
                    }).catch(error => {
                        res.status(500).json({ 
                            message: "There was an error while saving the post to the database", 
                            err: err.message, 
                            stack: err.stack })
                            })
                    }})
        
        .catch(error => {
             res.status(500).json({ 
                    message: "There was an error while saving the post to the database", 
                    err: err.message, 
                    stack: err.stack })
                 })
}})

router.get('/:id/comments', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post) {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        } else {
            const post = await Post.findPostComments(res.params.id)
            res.json(messages)
             }
    }catch(err) {
                res.status(500).json({ 
                    message: "The comments information could not be retrieved"
                 })
                 }
   })

module.exports = router