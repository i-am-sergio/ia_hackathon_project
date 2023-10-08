import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className='ml-24'>
      <ul className='flex'>
        <li className='mr-4 mt-4 px-2 py-2 rounded-sm bg-slate-300'>
          <Link to="/">Login</Link>
        </li>
        <li className='mr-4 mt-4 px-2 py-2 rounded-sm bg-slate-300'>
          <Link to="/register">Register</Link>
        </li>
        <li className='mr-4 mt-4 px-2 py-2 rounded-sm bg-slate-300'>
          <Link to="/collection">Collection</Link>
        </li>
        <li className='mr-4 mt-4 px-2 py-2 rounded-sm bg-slate-300'>
          <Link to="/info">InfoPage</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
