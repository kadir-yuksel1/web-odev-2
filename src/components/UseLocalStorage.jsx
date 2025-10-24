import {useEffect, useState} from 'react';

//!Bu kısımda ,yorum satıralarını ve readme ai yardımıyla yapılmıstır.

//Storage'dan veri okuma fonksiyonu
const getLocalStorage = (key, defaultValue) => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const saved = window.localStorage.getItem (key);

    if (saved !== null) {
      return JSON.parse (saved);
    }
  } catch (error) {
    console.error ("Local Storage'dan okuma hatası:", error);
  }
  return defaultValue;
};

//Custom Hook: useLocalStorage
export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState (() => {
    return getLocalStorage (key, initialValue);
  });

  useEffect (
    () => {
      try {
        window.localStorage.setItem (key, JSON.stringify (value));
      } catch (error) {
        console.error ("Local Storage'a yazma hatası:", error);
      }
    },
    [key, value]
  );

  return [value, setValue];
};
