import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../API/Api'

const FetchOld = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const getPostdata = async () => {
        try {
            const res = await fetchPosts()
            res.status === 200 ? setPosts(res.data) : setPosts([])
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
            setPosts([])
            setIsLoading(false)
            setIsError(true)
        }

    }
    useEffect(
        () => {
            getPostdata()
        }, [])

    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>oops! Something Went Wrong</h2>
    return (
        <div className="posts-container">
            {posts?.map((elem) => {
                const { id, title, body } = elem;

                return (
                    <div className="post-card" key={id}>
                        <span className="post-id">#{id}</span>
                        <h2>{title}</h2>
                        <p>{body}</p>
                    </div>
                );
            })}
        </div>
    )
}

export default FetchOld