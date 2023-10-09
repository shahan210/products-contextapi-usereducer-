import React, { createContext, useContext, useReducer, useState } from 'react';
export const StateContext = createContext()

export const GlobalState = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)
export const useStateValue =()=> useContext(StateContext);
