import React, { useState } from 'react'
import { fetchPosts } from '../API/Api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const FetchRq = () => {
    const [page, setPage] = useState(0)
    const getPostdata = async () => {
        try {
            const res = await fetchPosts(page)
            return res.status === 200 ? res.data : []
        }
        catch (error) {
            console.log(error)
            return []
        }

    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["posts", page], //works like useState
        queryFn: getPostdata,//works like useEffect
        placeholderData: keepPreviousData,
    })
    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>oops! Something Went Wrong: {error.message}</h2>
    return (
        <div className="posts-container">
            {data?.map((elem) => {
                const { id, title, body } = elem;

                return (
                    <div className="post-card" key={id}>
                        <NavLink to={`/rc/${id}`} className='post-link' >
                            <span className="post-id">#{id}</span>
                            <h2>{title}</h2>
                            <p>{body}</p>
                        </NavLink>

                    </div>
                );
            })}
            <div className='pagination'>
                <button disabled={page === 0 ? true : false} onClick={() => setPage((prev) => prev - 3)}>Prev</button>
                <h2>{(page / 3) + 1}</h2>
                <button onClick={() => setPage((prev) => prev + 3)}>Next</button>
            </div>
        </div >
    )
}

export default FetchRq