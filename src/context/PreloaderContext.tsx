"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PreloaderContextType {
  isPreloaderDone: boolean;
  setIsPreloaderDone: (val: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isPreloaderDone: false,
  setIsPreloaderDone: () => {},
});

export const usePreloader = () => useContext(PreloaderContext);

export const PreloaderProvider = ({ children }: { children: ReactNode }) => {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  return (
    <PreloaderContext.Provider value={{ isPreloaderDone, setIsPreloaderDone }}>
      {children}
    </PreloaderContext.Provider>
  );
};
