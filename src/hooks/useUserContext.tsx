import { useContext } from 'react';
import { UserContext } from '@/providers/ContextProvider';

// ----------------------------------------------------------------------

const useUserContext = () => useContext(UserContext);

export default useUserContext;
