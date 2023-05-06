import './style.scss';
import { useContext, useState } from 'react';
import DataContext from '../../context/DataContext';
import api from '../../api/posts';
import { format } from 'date-fns';

const NewPost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const { posts, setPosts, navigate } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = posts.length ? posts[0].id + 1 : 1;
      const newPost = {
        id,
        datetime: format(new Date(), 'MMMM dd, yyyy pp'),
        title: postTitle,
        body: postBody,
      };
      // CREATE ////////////////////////////
      const { data } = await api.post('/posts', newPost);
      setPosts([data, ...posts]);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main>
      <h2 className="post__title">Add New Post</h2>
      <form className="newPost__form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          required
          className="newPost__input"
          placeholder="Add title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="title" className="newPost__label newPost__label--title">
          Add title
        </label>

        <textarea
          type="text"
          rows="15"
          cols="70"
          id="body"
          required
          className="newPost__input"
          placeholder="Add body"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <label htmlFor="body" className="newPost__label newPost__label--body">
          Add body
        </label>
        <button type="submit" className="btn btn--submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default NewPost;
