const Post = require("../models/Post")

const getAllPosts = async (req, res, next) => {
    try {
        const [posts, _] = await Post.findAll()

        res.status(200).json({ count: posts.length, posts });
    } catch (error) {
        next(error)
    }
}

const createPost = async (req, res, next) => {
    try {
        let {title, body} = req.body
        let post = new Post(title, body)

        post = await post.save()

        res.status(201).json({ message: "Post created" });
    } catch (error) {
        next(error)
    }
}

const getPostById = async (req, res, next) => {
    try {
        let postId = req.params.id

        let [post, _] = await Post.findById(postId)

        return res.status(200).send({post: post[0]})
    } catch (error) {
        next(error)
    }
}



module.exports = {getAllPosts, createPost, getPostById}