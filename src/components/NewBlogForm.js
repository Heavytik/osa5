import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ notification }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const sendBlog = async (event) => {
        event.preventDefault()
        console.log("form sent")

        const newBlog = { title: title, author: author, url: url }
        try {
            await blogService.create(newBlog)
            notification(`a new blog ${title} by ${author} added`)
        } catch {
            console.log("error with blog create")
            notification("error with blog create")
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={sendBlog}>
                <div>
                    title:
          <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
          <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
          <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewBlogForm