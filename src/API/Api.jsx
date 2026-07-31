import axios from 'axios'

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const fetchPosts = () => {
    return api.get("/posts?_limit=20")
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
