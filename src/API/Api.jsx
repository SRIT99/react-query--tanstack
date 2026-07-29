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
