import axios from 'axios'

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const fetchPosts = (page) => {
    return api.get(`/posts?_start=${page}&_limit=3`)
}
export const fetchComment = async () => {
    return api.get("/posts/1/comments")

}

// to fetch single page data
export const fetchSinglePost = async (id) => {

    try {
        const res = await api.get(`/posts/${id}`)
        return res.status === 200 ? res.data : []
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => {
    console.log(`delete post running ${id}`)
    return api.delete(`/posts/${id}`)
}
export const updatePost = (id) => {
    console.log(`update post running ${id}`)
    return api.patch(`/posts/${id}`, { title: "updated title" })
}