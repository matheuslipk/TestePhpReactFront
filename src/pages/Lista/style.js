import styled, { css } from 'styled-components';

export const Container = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10px auto;
  min-width: 400px;
  padding: 5px;
  background-color: #eee;
  border: 1px solid;
  min-height: 500px;

  a{
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    align-self: flex-start;
    font-weight: bold;
    background: #40c8f4;
    padding: 5px;
    border-radius: 5px;
    }

  >.header{
    display: flex;
    justify-content: space-between;
  }

  >div{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;

    label{
      color: #999;
    }
  }


  @keyframes TransformAnimation {
    from{
      transform: scale(1);
    }

    to{
      transform: scale(1.2);
    }
  }

  .animation{
    animation: TransformAnimation 0.25s alternate;
    animation-iteration-count: 2;
  }

  .animation2{
    animation: TransformAnimation 0.25s alternate;
    animation-iteration-count: 2;
    animation-delay: 0.5s;
  }


  select{
    padding: 5px;
    margin-left: 10px;
    border: none;
    border-radius: 4px;
    background-color: #40c8f4;
    color: #fff;
  }

  h1{
    text-align: center;
    color: #999;
    flex: 1;
  }

  @media(max-width: 800px){
    & {
      width: 98%;
    }
  }

  #divPagination{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;

export const List = styled.ul`
  list-style: none;
  flex: 1;

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0;

    span{
      flex: 1;
      color: #888;
      font-size: 12px;
      text-align: center;

      & + span{
        border-left: 1px solid #ddd;
      }

      @media(max-width: 800px){
        font-size: 11px;
      }
    }

    &+li{
      border-top: 1px solid #ddd;
    }
  }
`;

export const Cell = styled.div`
  display: flex;
  ${(props) => props.flex && css`
    flex: ${props.flex};
  `};
  color: #888;
  font-size: 12px;
  padding: 10px 0;
  text-align: center;
  justify-content: center;

  @media(max-width: 800px){
    font-size: 11px;
  }
`;

export const ButtonOpt = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  background-color:${(props) => `${props.background}7`};
  border: none;
  padding: 3px;
  border-radius: 3px;
  margin-left: 2px;

  svg{
    color: #fff;
  }

  &:hover{
    background-color: ${(props) => `${props.background}`};
  }

  &[disabled]{
    opacity: 100%;
    background-color:#eee;
    cursor: auto;
    svg{
      color: #999;
    }
  }
`;

export const ButtonPag = styled.button.attrs({
  type: 'button',
})`
    background-color:#40c8f4cc;
    border: none;
    border-radius: 4px;
    margin: 0 10px;

    &:hover{
      background-color:#40c8f4;
    }

    svg{
      color: #fff;
    }  

    &[disabled]{
      background-color:#40c8f455;
      cursor: not-allowed;
    }
`;

export const Bg = styled.div`
  min-height: 100vh;
  width: 100vw;
  height: 100%;
  background: -webkit-linear-gradient(to top, #40c8f4, #2179b5);
  background: linear-gradient(to top, #40c8f4, #2179b5);
`;

export const Modal = styled.div`

    display: ${(props) => (props.visible ? 'flex' : 'none')};
    position: absolute;
    background-color: #000a;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    justify-content: center;
    align-items: center;
    color: #999;
    min-width: 400px;
    div{
      display: flex;
      flex-direction: column;
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;

      div{
        display: flex;
        flex-direction: row;
        button{
          flex: 1;
          margin: 0 10px;
          border: none;
          border-radius: 4px;
          padding: 5px;
          color: #fff;
          background-color: #f008;

          &+button{
            background-color: #40c8f4;
          }
        }

      }
    }

`;
