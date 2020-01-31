import styled from 'styled-components';
import { tamanhos } from '../../constants';

export default styled.div.attrs({
  id: 'container',
})`
  width: 27%;
  min-width: ${tamanhos.minContainer};
  height: 100vh;
  background: #fff;
  padding: 35px 25px;
  transition: all 0.5s;
  z-index: 10;
`;
