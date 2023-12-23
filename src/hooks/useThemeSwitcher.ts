import { useState, useEffect } from "react";

type ToggleDarkTheme = () => void;
function useThemeSwitcher(): [boolean, ToggleDarkTheme] {
  console.log('useThemeSwitcher called!');
  const prefersDark = document.body.classList.contains('dark');
  const [isDarkTheme, setDarkTheme] = useState(prefersDark);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkTheme);
    return () => {
      // Cleanup: Remove the 'dark' class when the component using the hook is unmounted
      document.body.classList.remove('dark');
    };
  }, [isDarkTheme]);

  function toggleDarkTheme() {
    console.log('toggleDarkTheme called! changed theme to',isDarkTheme);
    setDarkTheme(prevIsDarkTheme => !prevIsDarkTheme);
  };

  return [isDarkTheme, toggleDarkTheme];
}

export default useThemeSwitcher;
