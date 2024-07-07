const Form = ({ title, author,url, handleNewPost, setTitle, setAuthor, setUrl }) => (
    <form onSubmit={handleNewPost}>
        <div>
          title :
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author :
            <input
            type="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url :
            <input
            type="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">Create</button>
      </form>
  )

  export default Form