import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchComment } from '../API/Api'

const Reactquery = () => {
    const fetchcommentdata = async () => {
        const res = await fetchComment()
        return res.status === 200 ? res.data : []
    }
    const { data, isPending, isError } = useQuery({
        queryKey: ['comment'],
        queryFn: fetchcommentdata,
    })
    if (isPending) return <h2>Loading...</h2>
    if (isError) return <h2>oops! Something Went Wrong</h2>
    return (
        <div className='posts-container'>
            {
                data?.map((elem) => {
                    const { id, email, body } = elem
                    return (
                        <div className='post-card' key={id} >
                            <span className="post-id">#{id}</span>
                            <h1>{email}</h1>
                            <p>{body}</p>
                        </div>
                    )


                })
            }
        </div >
    )
}

export default Reactquery