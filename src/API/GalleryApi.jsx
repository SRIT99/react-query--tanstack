import axios from "axios";

const gapi = axios.create(
    {
        baseURL: "https://jsonplaceholder.typicode.com"
    }
)
export const fetchPhotos = async ({ pageParam = 1 }) => {
    try {
        const res = await gapi.get(`/photos?_page=${pageParam}&_limit=10`);
        return res.status === 200 ? res.data : []

    }
    catch (error) {
        console.log(error)
        return <h1>{error.message || "something went wrong"}</h1>
    }
}