import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export { UserContext };

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  // Utiliza useMemo para crear el objeto de valor del contexto una vez
  const contextValue = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};