import { toggle } from "ionicons/icons";
import { useState } from "react";

function useThemeSwitcher(): [boolean, () => void] {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const [isDarkTheme, setDarkTheme] = useState(prefersDark.matches);

  document.body.classList.toggle('dark', isDarkTheme);
  function toggleDarkTheme() {
    setDarkTheme(!isDarkTheme);
  };

  // Listen for changes to the prefers-color-scheme media query
  prefersDark.addEventListener('change', (e) => {
    setDarkTheme(e.matches);
  });

  return [isDarkTheme, toggleDarkTheme];
}

export default useThemeSwitcher;