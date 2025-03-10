// 'use client';

// import React, { createContext, useContext, useReducer, ReactNode } from 'react';
// import { AppState, ActionType, reducer, initialState } from '../store/reducers';

// const AppContext = createContext<{
//   state: AppState;
//   dispatch: React.Dispatch<ActionType>;
// } | null>(null);

// export const AppProvider = ({ children }: { children: ReactNode }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <AppContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useAppContext must be used within an AppProvider');
//   }
//   return context;
// };