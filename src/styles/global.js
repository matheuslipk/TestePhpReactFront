import { createGlobalStyle } from 'styled-components';
import { tamanhos } from '../constants';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;

    font-family: Arial, Helvetica, sans-serif;
  }

  html, body, #root{
    min-height: 100%;
  }

  #root{
    display: flex;
  }

  button{
    cursor: pointer;
  }


  #container{
    @media (max-width: ${tamanhos.pequeno}){
      &{
        width: 100%;
      }
    }
  }

`;
