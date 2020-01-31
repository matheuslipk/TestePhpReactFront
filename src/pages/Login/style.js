import styled from 'styled-components';

export const Form = styled.form`

  display: flex;
  flex-direction: column;

  h1{
    margin-bottom:25px;
    font-weight: normal;
    color: #888;
    font-size: 24px;
  }

  div{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    label{
      color: #999999;
      font-size: 12px;
      font-weight: bold;
    }

    #labelError{
      color: red;
    }

    input {
      border: none;
      flex: 1;
      padding: 5px 10px;
      margin-top: 5px;
      color: #efeeed;
      border-bottom: 2px solid #dbdbdb;
      margin-bottom: 10px;
      
      &:focus{
        color: #555555;
      }
    }
  }

  #submit{

    a{
      display: flex;
      flex: 1;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-decoration: underline;
      font-size: 12px;
      color: #999;
      padding-right: 10px;
      margin: 20px 0;
      /* border: solid 1px; */

      svg{
        /* border: 1px solid; */
      }
    }
  }

  #footer{
    margin-top: 20px;
    
    button{
      color: #fff;
      background-color: #f008;
      border:none;
      padding: 10px 0;
      border-radius: 5px;
    }
  }

`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  flex: 1;  
  border: none;
  color: #ffffff;
  background-color: #40c8f4;
  border-radius: 50px;
  margin-top: 10px;
  padding: 8px 20px;
  font-size: 12px; 

  &:hover{
    opacity: 70%;
  }

  svg{
    margin-left: 10px;
  }
`;

export const LabelError = styled.label`

  display: ${(props) => (props.oculto ? 'none' : 'block')};

`;

export const Modal = styled.div`

    display: ${(props) => (props.visible ? 'flex' : 'none')};
    position: absolute;
    background-color: #000a;
    width: 100vw;
    height: 100vh;
    z-index: 20;
    justify-content: center;
    align-items: center;
    color: #777;
    min-width: 400px;
    div{
      display: flex;
      flex-direction: column;
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
      margin: 0 2%;

      p{
        margin: 10px 0;
        color: #999;
      
      }

      button{
        background-color: #40c8f4;
        color: #fff;
        padding: 5px 0;
        border: none;
        border-radius: 4px;
        margin-top: 10px;
      }
    }

`;
