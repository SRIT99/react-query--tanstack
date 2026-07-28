import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../API/Api'

const FetchOld = () => {
    const [posts, setPosts] = useState([])
    const getPostdata = async () => {
        try {
            const res = await fetchPosts()
            res.status === 200 ? setPosts(res.data) : setPosts([])
        }
        catch (error) {
            console.log(error)
            setPosts([])
        }

    }
    useEffect(
        () => {
            getPostdata()
        }, [])
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