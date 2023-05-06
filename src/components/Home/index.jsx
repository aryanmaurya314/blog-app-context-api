import Feed from './Feed';
import './style.scss';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';

const Home = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext);

  return (
    <main>
      {isLoading && <p>Loading posts...</p>}
      {!isLoading && fetchError && (
        <p
          style={{ color: 'var(--color-warning-dark)' }}
        >{`Error: ${fetchError}`}</p>
      )}
      {!isLoading &&
        !fetchError &&
        (searchResults.length ? (
          <Feed posts={searchResults} />
        ) : (
          <p style={{ marginTop: '2rem' }}>No posts to Display.</p>
        ))}
    </main>
  );
};

export default Home;
