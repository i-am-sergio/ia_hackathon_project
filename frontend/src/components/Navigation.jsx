import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className='ml-10'>
      <ul className='flex'>
        <li className='mr-4'>
          <Link to="/">Login</Link>
        </li>
        <li className='mr-4'>
          <Link to="/register">Register</Link>
        </li>
        <li className='mr-4'>
          <Link to="/collection">Collection</Link>
        </li>
        <li>
          <Link to="/info">InfoPage</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
