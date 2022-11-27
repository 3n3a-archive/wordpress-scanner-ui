import React, { ReactNode, createContext, useState, useContext } from 'react';

const initialState = {
  url: ''
};

const useMyState = () => useState(initialState);

const MyContext = createContext<ReturnType<typeof useMyState> | null>(null);

export const useSharedState = () => {
  const value = useContext(MyContext);
  if (value === null) throw new Error('Please add SharedStateProvider');
  return value;
};

export const SharedStateProvider = ({ children }: { children: ReactNode }) => (
  <MyContext.Provider value={useMyState()}>{children}</MyContext.Provider>
);