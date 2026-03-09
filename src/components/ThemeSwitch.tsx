import { useState, useEffect } from 'react';

export default function ThemeSwitch() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-2 py-1 border rounded"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}