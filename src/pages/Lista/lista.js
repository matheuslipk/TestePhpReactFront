import React, { useEffect, useState } from 'react';
import {
  IoIosArrowBack, IoIosArrowForward, IoMdTrash, IoMdMore, IoIosArrowRoundBack,
} from 'react-icons/io';
import { useHistory, Link } from 'react-router-dom';
import {
  Container, List, ButtonPag, Bg, Modal,
} from './style';

function ButtomNext(props) {
  const { page, disabled } = props;

  const history = useHistory();

  function handleClick() {
    history.push(`/lista/${page}`);
  }

  return (
    <ButtonPag onClick={handleClick} disabled={disabled}>
      <IoIosArrowForward size={30} />
    </ButtonPag>
  );
}

function ButtomBack(props) {
  const { page, disabled } = props;

  const history = useHistory();

  function handleClick() {
    history.push(`/lista/${page}`);
  }

  return (
    <ButtonPag onClick={handleClick} disabled={disabled}>
      <IoIosArrowBack size={30} />
    </ButtonPag>
  );
}

export default function Lista({ match }) {
  const [lista, setLista] = useState([]);
  const [listVisible, setListVisible] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);
  const [emailAtual, setEmailAtual] = useState('');

  const quantPagina = lista.length / perPage;

  function handleEdit(email) {
    alert(`Editar: ${email}`);
  }

  function handleDelete() {
    let l = [];
    for (const u of lista) {
      if (u.email !== emailAtual) {
        l = [...l, u];
      }
    }
    setLista([...l]);
  }

  function handleOpenModal(email) {
    setModalVisible(true);
    setEmailAtual(email);
  }

  function handleChangePerPage(e) {
    setPerPage(Number.parseInt(e.target.value, 10));
    localStorage.setItem('perPage', e.target.value);
  }

  useEffect(() => {
    const allUser = lista;
    const initialUser = (page - 1) * perPage;

    let exibir = [];

    for (let i = initialUser; (i < allUser.length) && (i < initialUser + perPage); i += 1) {
      exibir = [...exibir, allUser[i]];
    }

    setListVisible(exibir);
  }, [page, perPage, lista]);

  useEffect(() => {
    const pageQuery = Number.parseInt(match.params.page, 10);

    if (Number.isInteger(pageQuery)) {
      if (pageQuery < 1) {
        setPage(1);
      } else {
        setPage(pageQuery);
      }
    } else {
      setPage(1);
    }
    setLista(JSON.parse(localStorage.getItem('usuarios')));
  }, [match.params.page]);

  useEffect(() => {
    const perPageStorage = localStorage.getItem('perPage');
    if (perPageStorage) {
      setPerPage(Number.parseInt(perPageStorage, 10));
      const select = document.getElementById('selectPerPage');
      select.value = perPage;
    }

    localStorage.setItem('usuarios', JSON.stringify(lista));
  }, [lista, perPage]);

  return (
    <Bg>
      <Modal visible={modalVisible} onClick={() => setModalVisible(false)}>
        <div>
          <h3>Tem certeza que deseja continuar?</h3>
          <div>
            <button type="button" onClick={handleDelete}>Sim</button>
            <button type="button">Não</button>
          </div>

        </div>
      </Modal>
      <Container>
        <Link to="/login">
          <IoIosArrowRoundBack size={30} />
          {' '}
            Voltar
        </Link>
        <h1>Lean lista</h1>

        <div className="animation">
          <label>Quantidade por página</label>
          <select onChange={handleChangePerPage} id="selectPerPage">
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>

        <List>
          <li>
            <span><strong>#Email</strong></span>
            <span><strong>Nome</strong></span>
            <span><strong>CPF</strong></span>
            <span><strong>Telefone</strong></span>
            <button type="button" disabled>
              <IoMdMore size={20} />
            </button>
          </li>
          {
            listVisible.map((usuario) => (
              <li key={usuario.email}>
                <span onClickCapture={() => handleEdit(usuario.email)}>{usuario.email}</span>
                <span onClickCapture={() => handleEdit(usuario.email)}>{usuario.name}</span>
                <span onClickCapture={() => handleEdit(usuario.email)}>{usuario.cpf}</span>
                <span onClickCapture={() => handleEdit(usuario.email)}>{usuario.phone}</span>
                <button type="button" onClick={() => handleOpenModal(usuario.email)}>
                  <IoMdTrash size={22} />
                </button>
              </li>
            ))
          }
        </List>

        <div id="divPagination" className="animation2">
          <ButtomBack page={page - 1} disabled={page < 2} />
          <label>
            {`Página ${page} de ${Math.ceil(quantPagina)}`}
          </label>
          <ButtomNext page={page + 1} disabled={page >= (lista.length / perPage)} />
        </div>

      </Container>
    </Bg>
  );
}
