import { useQuery } from '@tanstack/react-query'
import api from '../api'
import { Navbar } from '../components/Navbar'
import { useState } from 'react'

export function PostsPage() {
  const [page, setPage] = useState(1)
  
  const { 
    data: response,
    isLoading,
    error,
    isError,
    isFetching
  } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => api.get(`/posts/?page=${page}`).then(res => res.data),
    keepPreviousData: true
  })

  const posts = response?.results || []
  const hasNext = !!response?.next
  const hasPrevious = !!response?.previous

  if (isLoading && !isFetching) return <div>Loading posts...</div>
  if (isError) return <div>Error loading posts: {error.message}</div>

  return (
    <div>
      <Navbar />
      <h1>Posts</h1>
      
      {isFetching && <div>Loading...</div>}
      
      {posts.length === 0 ? (
        <div>No posts found</div>
      ) : (
        <>
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="post-meta">
                <span>Category: {post.category_details?.name}</span>
                <br />
                <span>Published: {new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}

          <div className="pagination">
            <button 
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={!hasPrevious || isFetching}
            >
              Previous
            </button>
            
            <span>Page {page}</span>
            
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={!hasNext || isFetching}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}