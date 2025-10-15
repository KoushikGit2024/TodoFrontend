import { createContext , useState } from "react";
import React from 'react';

export const ThemeContext =createContext({theme:{
    clr1:"#3396D3",
    clr2:"#FFF0CE",
    clr3:"#EBCB90",
    clr4:"#EEEEEE"
}});
/*
    F6F1E9
    FFD93D
    FF9A00
    4F200D
*/
/*
    FF0066
    6A0066
    934790
    E8D4B7
*/

export const ThemeProvider = (props) => {
    const [theme,setTheme]=useState({
        clr1:"#3396D3",
        clr2:"#FFF0CE",
        clr3:"#EBCB90",
        clr4:"#EEEEEE"
    });
    
  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}
