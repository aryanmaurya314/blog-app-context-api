import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

const Layout = () => {
  return (
    <div className="layout">
      <Header title="React JS Blog" />
      <DataProvider>
        <Navbar />
        <Outlet />
      </DataProvider>
      <Footer />
    </div>
  );
};

export default Layout;
