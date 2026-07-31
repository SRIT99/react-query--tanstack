import React from 'react'
import { fetchSinglePost } from '../../API/Api'
import { useQuery } from '@tanstack/react-query'
import { NavLink, useParams } from 'react-router-dom'

const MoreDetails = () => {
    const { id } = useParams()
    const { data, isError, isPending, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () => fetchSinglePost(id),
        staleTime: 100000,
    })
    if (isPending) return <h2>Loading...</h2>
    if (isError) return <h2>oops! Something Went Wrong: {error.message}</h2>

    const { title, body } = data
    return (
        <div className="single-post-page">

            <NavLink to="/rc" className="back-link">
                ← Back to Posts
            </NavLink>

            <div className="single-post-number">
                Post #{id}
            </div>

            <h1 className="single-post-title">
                {data.title}
            </h1>

            <div className="single-post-body">
                <p>{data.body}</p>
            </div>

        </div>)
}

export default MoreDetails