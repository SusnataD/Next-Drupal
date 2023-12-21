import { createContext, useContext, useState } from "react";

const CommonContext = createContext();

export const CommonProvider = ({ children }) => {
  const [commonState, setCommonState] = useState(/* your initial state here */);

  const updateCommonState = (newState) => {
    setCommonState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <CommonContext.Provider value={{ commonState, updateCommonState }}>
      {children}
    </CommonContext.Provider>
  );
};

export const useCommonContext = () => {
  return useContext(CommonContext);
};
