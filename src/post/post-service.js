const PostService = {
	getAllPosts(knex) {
		return knex.select('*').from('blog')
	},
	insertPost(knex, newPost) {
		return knex
			.insert(newPost)
			.into('blog')
			.returning('*')
			.then(rows => rows[0])
	},
	getById(knex, id) {
		return knex
			.from('blog')
			.select('*')
			.where('id', id)
			.first()
	},
	deletePost(knex, id) {
		return knex('blog')
			.where({ id })
			.delete()
	},
	updatePost(knex, id, newPostFields) {
		return knex('blog')
			.where({ id })
			.update(newPostFields)
	}
}

module.exports = PostService
