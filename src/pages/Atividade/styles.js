import styled from 'styled-components';

export const Bg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  height: 100%;
  background: -webkit-linear-gradient(to top, #40c8f4, #2179b5);
  background: linear-gradient(to top, #40c8f4, #2179b5);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border-radius: 5px;

  h3{
    font-size: 22px;
    text-align: center;
  }

  >div{
    display: flex;
    margin-top: 10px;


    label{
      margin-right: 8px;
    }
    input, select{
      flex: 1;
      padding: 5px;
      border-radius: 5px;
    }
    input{
      /* padding: 5px; */
    }

  
    

  }
`;

export const ButtonHandleSubmit = styled.button.attrs({
  type: 'submit',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
  background: #afa;
  border: none;
  border-radius: 5px;
  color: #444;
  font-size: 16px;
  &:hover{
    background: #8d8;
  }

  @keyframes mymove {
    from {
      transform: rotate();
    }

    to {
      transform: rotate(360deg);
    }
  }

  & svg {
    animation: mymove 1s infinite linear;
  }
  

`;
