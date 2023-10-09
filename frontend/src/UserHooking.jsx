import { useContext } from 'react';
import { UserContext } from './UserContext';

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser utilizado dentro de un UserProvider');
  }
  return context;
}
