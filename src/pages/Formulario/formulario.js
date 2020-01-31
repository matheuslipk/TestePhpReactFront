import React, { useState } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Input from 'react-input-mask';
import Bg, { Overlay } from '../../components/BG/bg';

import Container from '../../components/Container/container';
import { Form, SubmitButton, Modal } from './style';

export default function Formulario() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function limparCampos() {
    setName('');
    setEmail('');
    setPhone('');
    setCpf('');
  }

  function isPhoneValido() {
    return (phone.length >= 14 && phone.length <= 15);
  }

  function isCpfValido() {
    return (cpf.length === 14);
  }

  function emailExist() {
    const listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));

    if (!listaUsuarios) return false;

    for (const u of listaUsuarios) {
      if (u.email === email) return true;
    }
    return false;
  }

  function registerNewUser(newUser) {
    const listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));
    if (listaUsuarios) {
      localStorage.setItem('usuarios', JSON.stringify([...listaUsuarios, newUser]));
    } else {
      localStorage.setItem('usuarios', JSON.stringify([newUser]));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!isPhoneValido()) {
      return alert('Telefone inválido');
    }
    if (!isCpfValido()) {
      return alert('Cpf inválido');
    }

    if (emailExist()) {
      return alert('Email já cadastrado');
    }

    const newUser = {
      name, phone, email, cpf,
    };
    registerNewUser(newUser);
    setModalVisible(true);
    return limparCampos();
  }

  return (
    <>
      <Bg>
        <Overlay />
      </Bg>

      <Modal visible={modalVisible}>
        <div>
          <h2>Usuário cadastrado com sucesso</h2>
          <button type="button" onClick={() => setModalVisible(false)}>Voltar</button>
        </div>
      </Modal>

      <Container>
        <Form onSubmit={handleSubmit}>
          <h1>Lean Cadastro</h1>
          <div>
            <label>Nome Completo</label>
            <input
              value={name}
              onChange={((e) => setName(e.target.value))}
              required
              minLength={3}
            />
          </div>

          <div>
            <label>E-mail</label>
            <input
              value={email}
              onChange={((e) => setEmail(e.target.value))}
              type="email"
              required
            />
          </div>

          <div>
            <label>CPF</label>
            <Input
              maskChar={null}
              mask="999.999.999-99"
              value={cpf}
              onChange={((e) => setCpf(e.target.value))}
              required
            />
          </div>

          <div>
            <label>Telefone</label>
            <Input
              maskChar={null}
              mask="(99) 99999-9999"
              value={phone}
              onChange={((e) => setPhone(e.target.value))}
              required
            />
          </div>

          <div id="submit">
            <SubmitButton type="submit">
              Cadastrar
            </SubmitButton>

            <Link to="/login">
              Login
              <IoIosArrowRoundForward color="#999" size={25} />
            </Link>

          </div>

        </Form>

      </Container>
    </>
  );
}
