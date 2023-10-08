// NavBarCollection.jsx
import '../css/collectionPage.css';

const NavBarCollection = () => {
  const handleGoBack = () => {
    console.log('Retroceder Inicio Page');
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button onClick={handleGoBack} className="nav-button">
            Atrás
          </button>
        </div>
        <div className="navbar-right">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBarCollection;

