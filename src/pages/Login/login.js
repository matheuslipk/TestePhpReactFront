import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Bg, { Overlay } from '../../components/BG/bg';
import api from '../../services/api';
import Container from '../../components/Container/container';
import {
  Form, SubmitButton, Modal,
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
  const [modalVisible, setModalVisible] = useState(false);

  function registerActivities() {
    api.get('/principal/povoar').then((response) => {
      if (response.data.sucess) {
        toast.success('As atividades foram cadastradas');
      }
    }).catch((err) => {
      toast.error('Erro: ', err.message);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
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
          <h1>Teste React e PHP</h1>

          <div>
            <BtnEntrar />
          </div>

          <div id="footer">
            <button type="button" onClick={registerActivities}>
              Cadastrar atividades aleatórias
            </button>
          </div>

        </Form>


      </Container>
    </>
  );
}
