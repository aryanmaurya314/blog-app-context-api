import { useState, useContext } from 'react';
import NavLink from './NavLink';
import './style.scss';
import DataContext from '../../context/DataContext';

const Navbar = () => {
  const { search, setSearch } = useContext(DataContext);
  const [activeNav, setActiveNav] = useState('Home');

  return (
    <nav className="nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <input
          id="search"
          className="searchForm__input"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search" className="searchForm__label">
          Search Posts
        </label>
      </form>
      <ul className="navItem">
        <NavLink
          to="/"
          navText="Home"
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />
        <NavLink
          to="/post"
          navText="Post"
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />
        <NavLink
          to="/about"
          navText="About"
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
