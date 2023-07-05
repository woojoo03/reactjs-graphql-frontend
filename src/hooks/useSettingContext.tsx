import { useContext } from 'react';
import { SettingContext } from '@/providers/ContextProvider';

// ----------------------------------------------------------------------

const useSettingContext = () => useContext(SettingContext);

export default useSettingContext;
