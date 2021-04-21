import React, {createContext} from 'react';
 
export const ThemeContext = createContext();

export function ThemeProvider(props) {
    const color = JSON.parse(localStorage.getItem("theme-color"));
    return (
        <ThemeContext.Provider value={{color}}>
            {props.children}
        </ThemeContext.Provider>
    );
}
 
