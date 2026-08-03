import React, { useState } from 'react'
import { deletePost, fetchPosts, updatePost } from '../API/Api'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const FetchRq = () => {
    const queryClient = useQueryClient()
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

    //use mutation
    {/* 
        const mutation = useMutation(mutationFn, {
        // optional configuration here
        })
        */}
    //! mutation function to delete the post
    const mutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(["posts", page], (elem) => {
                return elem?.filter((post) => post.id != id)
            })
        }
    })
    //! mutation function to update the post
    const updateMutation = useMutation({
        mutationFn: (id) => updatePost(id),
        onSuccess: (apiData, postId) => {
            queryClient.setQueryData(["posts", page], (postData) => {
                return postData?.map((postElem) => {
                    return postElem.id === postId ? { ...postElem, title: apiData.data.title } : postElem;
                })
            })
        }
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
                        <div className='buttons'>
                            <div className='delete'>
                                <button onClick={() => mutation.mutate(id)}>Delete</button>
                            </div>
                            <div className='delete'>
                                <button onClick={() => updateMutation.mutate(id)}>Update</button>
                            </div>
                        </div>
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