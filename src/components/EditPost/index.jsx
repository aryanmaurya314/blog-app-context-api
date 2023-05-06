import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import { format } from 'date-fns';
import api from '../../api/posts';

const EditPost = () => {
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const { posts, setPosts, navigate } = useContext(DataContext);

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  const handleEdit = async (id) => {
    try {
      const updatedPost = {
        id,
        datetime: format(new Date(), 'MMMM dd, yyyy pp'),
        title: editTitle,
        body: editBody,
      };
      // UPDATE //////////////////////
      const { data } = await api.put(`/posts/${id}`, updatedPost);

      setPosts(posts.map((post) => (post.id === id ? { ...data } : post)));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <main>
      {post && (
        <>
          <h2 className="post__title">Edit Post</h2>
          <form className="newPost__form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              id="title"
              required
              className="newPost__input"
              placeholder="Add title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label
              htmlFor="title"
              className="newPost__label newPost__label--title"
            >
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
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <label
              htmlFor="body"
              className="newPost__label newPost__label--body"
            >
              Add body
            </label>

            <button
              type="submit"
              className="btn btn--submit"
              onClick={() => handleEdit(post.id)}
            >
              Submit
            </button>
          </form>
        </>
      )}
      {!post && (
        <>
          <h2 className="post__title">Post not Found</h2>
          <p>Well, that's disappointing</p>
          <p style={{ textDecoration: 'underline', marginTop: '2rem' }}>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
