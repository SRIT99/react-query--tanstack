import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { fetchPhotos } from '../API/GalleryApi'

const Gallery = () => {

    const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ["photos"],
        queryFn: fetchPhotos,
        getNextPageParam: (lastPage, allPages) => {
            console.log("last page", lastPage, allPages)
            return lastPage.length === 10 ? allPages.length + 1 : undefined
        }
    })
    const handleScroll = () => {
        const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
        if (bottom && hasNextPage) {
            fetchNextPage();
        }

    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    })
    return (
        <div className="gallery-page">
            <h1 className="gallery-title">My Gallery</h1>

            {
                data?.pages?.map((page, index) => {
                    return (
                        <div key={index} className="gallery-grid">
                            {
                                page.map(
                                    (photos) => {
                                        console.log("photos is: ", photos)
                                        return (
                                            <div key={photos.id} className="gallery-card">
                                                <div className="gallery-image">
                                                    <img
                                                        src={photos.url}
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="gallery-content">
                                                    <h2>{photos.title}</h2>
                                                    <p>Lorem ipsum, dolor sit amet
                                                        consectetur adipisicing elit.
                                                        a voluptatibus aliquam.</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Gallery