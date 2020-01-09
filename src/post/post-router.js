const path = require('path')
const express = require('express')
const xss = require('xss')
const PostService = require('./post-service')

const postRouter = express.Router()
const jsonParser = express.json()

const sanitizePost = post => ({
	...post,
	title: xss(post.title),
	content: xss(post.content)
})

postRouter
	.route('/')
	.get((req, res, next) => {
		PostService.getAllPosts(req.app.get('db'))
			.then(posts => {
				res.json(posts.map(sanitizePost))
			})
			.catch(next)
	})
	.post(jsonParser, (req, res, next) => {
		const { title, content } = req.body
		const newPost = { title, content }

		// check for missing fields
		for (const [key, value] of Object.entries(newPost)) {
			if (value == null) {
				return res.status(400).json({
					error: { message: `Missing '${key}' in request body` }
				})
			}
		}

		PostService.insertPost(req.app.get('db'), newPost)
			.then(post => {
				res.status(201)
					.location(path.posix.join(req.originalUrl, `${post.id}`))
					.json(sanitizePost(post))
			})
			.catch(next)
	})

postRouter
	.route('/:post_id')
	.all((req, res, next) => {
		PostService.getById(req.app.get('db'), req.params.post_id)
			.then(post => {
				if (!post) {
					return res.status(404).json({
						error: { message: `Post doesn't exist` }
					})
				}
				res.post = post // save the post for the next middleware
				next() // don't forget to call next so the next middleware happens!
			})
			.catch(next)
	})
	.get((req, res, next) => {
		res.json(sanitizePost(res.post))
	})
	.patch(jsonParser, (req, res, next) => {
		const { title, content } = req.body
		const postToUpdate = { title, content }

		if (!title && !content) {
			return res.status(400).json({
				error: {
					message: `Request body must contain either 'title' or 'content'`
				}
			})
		}

		PostService.updatePost(
			req.app.get('db'),
			req.params.post_id,
			postToUpdate
		)
			.then(() => {
				res.status(204).end()
			})
			.catch(next)
	})
	.delete((req, res, next) => {
		PostService.deletePost(req.app.get('db'), req.params.post_id)
			.then(() => {
				res.status(204).end()
			})
			.catch(next)
	})

module.exports = postRouter
