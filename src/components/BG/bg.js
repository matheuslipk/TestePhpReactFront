import styled from 'styled-components';
import img from '../../assets/bg.jpg';
import { tamanhos } from '../../constants';

export const Overlay = styled.div`
  position: fixed;
  /* display: none; */
  width: 73vw;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: -webkit-linear-gradient(to top, #40c8f4cc, #2179b5cc);
  background: linear-gradient(to top, #40c8f4cc, #2179b5cc);

`;

export default styled.div`
  flex: 1;
  background-image: url(${img});
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  

  @media(max-width: ${tamanhos.medio}){
    &{
      width: calc(100% - 250px);
    }
  }

  @media (max-width: ${tamanhos.pequeno}){
    &{
      display: none;
    }
  }

`;
