import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css'
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedLanguage = localStorage.getItem('language');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {

    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('language', language);
  }, [darkMode, language]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, language, changeLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

const MainComponent = () => {
  const { darkMode, toggleDarkMode, language, changeLanguage } = useAppContext();

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="uz">Uzbek</option>
        <option value="ru">Russian</option>
      </select>
      <h1>{language === 'en' ? 'Hello' : language === 'uz' ? 'Salom' : 'Привет'}</h1>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <MainComponent />
    </AppProvider>
  );
};

export default App;