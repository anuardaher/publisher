const axios = require('axios');

const getUsers = async (URL) => {
	try {
		const { data } = await axios.get(URL + '/api/v1/users', { params: {
			project: { username: 1 }
        }})
		if (!data) return
		return data.map(user => `/${user.username}`)
	} catch (error) {
			console.error(error.message);
	}	
}

const getArticles = async (URL) => {
	try {
		const { data } = await axios.get(URL + '/api/v1/articles', { params: {
			project: { title: 1 }
        }})
		if (!data) return
		return data.map(article => normalizeLink(article))
	} catch (error) {
			console.error(error.message);
	}	
}

const normalizeLink = (post) => {
    const title = post.title.toLowerCase()
    let normalizedName = title.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    normalizedName = normalizedName.replace(/[^a-zA-Z0-9 ]/g, "")
    normalizedName = normalizedName.replace(/[ ]/g, "-")
    let resumedId = post._id.split("-", 1).shift()
    return `/${normalizedName}/${resumedId}`
  }

  module.exports = {
    getUsers,
    getArticles
  }