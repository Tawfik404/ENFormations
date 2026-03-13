import { createContext, useContext } from 'react';
 
export const ThemeContext = createContext({
  dark: true,
  setDark: () => {},
});
 
export const useTheme = () => useContext(ThemeContext);