import './style.scss';

const Footer = () => {
  const today = new Date();
  return (
    <footer className="footer">
      <p className="copyright">Copright &copy; {today.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
