import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Bg, { Overlay } from '../../components/BG/bg';

import Container from '../../components/Container/container';
import {
  Form, SubmitButton, LabelError, Modal,
} from './style';

// Usando hook useHistory
function BtnEntrar() {
  const history = useHistory();

  function handleClick() {
    history.push('/lista');
  }

  return (
    <SubmitButton type="submit" onClick={handleClick}>
      Entrar
    </SubmitButton>
  );
}

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [labelOculto, setLabelOculto] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  function stringAleatoria(length) {
    let code = '';
    for (let i = 0; i < length; i += 1) {
      const num = Math.ceil(Math.random() * (122 - 97) + 97);
      code += String.fromCharCode(num);
    }
    return code;
  }

  function numAleatorio(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  function registerNewUser(newUser) {
    const listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));
    if (listaUsuarios) {
      localStorage.setItem('usuarios', JSON.stringify([...listaUsuarios, newUser]));
    } else {
      localStorage.setItem('usuarios', JSON.stringify([newUser]));
    }
    setModalVisible(true);
  }

  function register5Users() {
    for (let i = 0; i < 5; i += 1) {
      const string = stringAleatoria(4);
      const user = {
        name: string,
        phone: `(${numAleatorio(10, 99)}) ${numAleatorio(50000, 9999)}-${numAleatorio(1000, 9999)}`,
        email: `${string}@email.com`,
        cpf: `${numAleatorio(100, 999)}.${numAleatorio(100, 999)}.${numAleatorio(100, 999)}-${numAleatorio(10, 99)}`,
      };

      registerNewUser(user);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const lista = JSON.parse(localStorage.getItem('usuarios'));
    for (const u of lista) {
      if (u.email === email) {
        return;
      }
      setLabelOculto(false);
    }
  }

  return (
    <>
      <Modal visible={modalVisible}>
        <div>
          <h3>Usuários cadastrados com sucesso!!</h3>
          <p>Faça com login com alguma conta que você cadastrou para visualizar a lista completa</p>
          <button type="button" onClick={() => setModalVisible(false)}>Voltar</button>
        </div>
      </Modal>
      <Bg>
        <Overlay />
      </Bg>

      <Container>
        <Form onSubmit={handleSubmit}>
          <h1>Lean Login</h1>

          <div>
            <label>E-mail</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <LabelError id="labelError" oculto={labelOculto}>Email não existe</LabelError>
          </div>

          <div id="submit">

            <Link to="/">
              Não tem conta? Cadastre-se aqui!
            </Link>

            <BtnEntrar email={email} />
          </div>

          <div id="footer">
            <button type="button" onClick={register5Users}>
              Cadastrar 5 usuarios aleatórios
            </button>
          </div>

        </Form>


      </Container>
    </>
  );
}
