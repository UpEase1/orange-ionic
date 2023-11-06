import { useState, useEffect } from "react";
interface toggleDarkTheme {
  (): void;
}
function useThemeSwitcher(): [boolean, toggleDarkTheme] {
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
    console.log('toggleDarkTheme called!');
    setDarkTheme(prevIsDarkTheme => !prevIsDarkTheme);
  };

  return [isDarkTheme, toggleDarkTheme];
}

export default useThemeSwitcher;

//! Old version of useThemeSwitcher
// import { useState } from "react";

// function useThemeSwitcher(): [boolean, () => void] {
//   console.log('useThemeSwitcher called!');
//   // check if body has dark class
//   const prefersDark = document.body.classList.contains('dark');
//   const [isDarkTheme, setDarkTheme] = useState(prefersDark);

//   // document.body.classList.toggle('dark', isDarkTheme);
//   function toggleDarkTheme() {
//     console.log('toggleDarkTheme called!');
//     setDarkTheme(!isDarkTheme);
//     document.body.classList.toggle('dark', !isDarkTheme);
//   };

//   return [isDarkTheme, toggleDarkTheme];
// }

// export default useThemeSwitcher;