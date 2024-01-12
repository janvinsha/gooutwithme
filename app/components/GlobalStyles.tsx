"use client";
import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
body{ 
    font-family: 'Rubik', sans-serif;
    overflow-x:hidden;
    color:black;
    transition:0.3s ease-in-out;
    background: "#ffffff";
 
}
input,textarea{
    font-family: 'Rubik', sans-serif;
    color:black;
}
button{
    font-family: 'Rubik', sans-serif;
  cursor:pointer;
  color:white;
  background:#f35cbe;
  border-radius:0.5px;
  border:2px solid #f35cbe;
  padding:0.4rem 1.4rem;
  font-size:1.2rem;
  border-radius:0.5rem ;
}
.theme-btn{
    background:none;
    border:none;
    color:black;
    padding:0rem 0rem
}
.secondary-btn{
    cursor:pointer;
  background:inherit;
  border:2px solid #e722a2;
  border-radius:0.4rem;
padding:0.4rem 1.4rem;
  font-size:1.2rem;
  color:black;
  display:flex;
  align-items:center;
  gap:0.1rem;
  border-radius:0.5rem ;
}

a{
    text-decoration: none;
    color:white;
}
.App{
 
    font-family: 'Rubik', sans-serif;
    background: "rgba(255,255,255,1)"
   
}
h1{
    font-weight:medium;
    font-weight:500; 
}
h2,h3{
    font-weight:lighter;
    font-family: 'Rubik', sans-serif;
}
`;
export default GlobalStyle;
