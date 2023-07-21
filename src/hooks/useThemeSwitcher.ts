import { toggle } from "ionicons/icons";
import { useState } from "react";

function useThemeSwitcher(): [boolean, () => void] {
  console.log('useThemeSwitcher called!');
  // check if body has dark class
  const prefersDark = document.body.classList.contains('dark');
  const [isDarkTheme, setDarkTheme] = useState(prefersDark);

  // document.body.classList.toggle('dark', isDarkTheme);
  function toggleDarkTheme() {
    console.log('toggleDarkTheme called!');
    setDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark', !isDarkTheme);
  };

  return [isDarkTheme, toggleDarkTheme];
}

export default useThemeSwitcher;