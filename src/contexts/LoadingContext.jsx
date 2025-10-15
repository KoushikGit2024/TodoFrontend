// src/contexts/LoadingContext.js
import { createContext, useState } from "react";

export const LoadingContext = createContext({
  loading: true,
  setLoading: () => {}
});

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
