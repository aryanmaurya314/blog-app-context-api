import { useContext } from 'react';
import './style.scss';
import { useParams, Link } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import api from '../../api/posts';

const PostPage = () => {
  const { posts, setPosts, navigate } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  const handleDelete = async (id) => {
    try {
      // DELETE //////////////////////////
      await api.delete(`/posts/${id}`);
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main>
      <article className="post">
        {post && (
          <>
            <h2 className="post__title">{post.title}</h2>
            <p className="post__date">{post.datetime}</p>
            <p className="post__body">{post.body}</p>
            <Link to={`/post/edit/${post.id}`}>
              <button
                className="btn btn--edit"
                style={{ marginRight: '1.5rem' }}
              >
                Edit Post
              </button>
            </Link>
            <button
              className="btn btn--delete"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
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
      </article>
    </main>
  );
};

export default PostPage;
