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
        <div>
            <ul>
                {
                    posts.map((elem) => {
                        console.log(elem)
                        const { id, title, body } = elem
                        return (
                            <li key={id}>
                                <h1>{title}</h1>
                                <p>{body}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default FetchOld