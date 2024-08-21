import React, { createContext, useState } from 'react';

export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (product) => {
    setCompareList(prevList => {
      if (!prevList.some(p => p.id === product.id)) {
        return [...prevList, product];
      }
      return prevList;
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList(prevList => prevList.filter(p => p.id !== productId));
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare }}>
      {children}
    </CompareContext.Provider>
  );
};
