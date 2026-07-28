import React from 'react'
import { fetchPosts } from '../API/Api'
import { useQuery } from '@tanstack/react-query'

const FetchRq = () => {
    const getPostdata = async () => {
        try {
            const res = await fetchPosts()
            return res.status === 200 ? res.data : []
        }
        catch (error) {
            console.log(error)
            return []
        }

    }

    const { data } = useQuery({
        queryKey: ["posts"], //works like useState
        queryFn: getPostdata //works like useEffect
    })
    return (
        <div className="posts-container">
            {data?.map((elem) => {
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

export default FetchRq