import React, { useEffect, useState } from 'react';
import {
  IoIosArrowBack, IoIosArrowForward, IoMdTrash, IoMdMore,
  IoIosAdd, IoIosHome, IoIosSearch,
} from 'react-icons/io';

import { FaPencilAlt } from 'react-icons/fa';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container, List, ButtonPag, Bg, Modal, ButtonOpt, Cell,
  ButtonLink, InputSearch, Search,
} from './style';
import api from '../../services/api';

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
  const [projetos, setProjetos] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [atividadeAtual, setAtividadeAtual] = useState('');
  const [idSearch, setIdSearch] = useState('');
  const history = useHistory();

  function handleSearchAtividade() {
    api.get(`/atividade/get/${idSearch}`).then((response) => {
      if (!response.data[0]) {
        toast.error('Atividade não encontrada');
        return;
      }
      setLista(response.data);
    });
  }

  function dateFormmated(dateSql) {
    const date = new Date(dateSql);
    const dateF = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const time = `${date.getHours()}:${date.getMinutes() + 1}:${date.getSeconds()}`;
    return `${dateF} - ${time}`;
  }

  function handleDelete() {
    api.post(`/atividade/delete/${atividadeAtual}`).then(() => {
      api.get(`atividade?page=${page}&limit=${perPage}`).then((response) => {
        const { lastPage: last } = response.data;
        setLista(response.data.data);
        setlastPage(last);
        if (page > last) {
          setPage(last);
          history.push(`/lista/${last}`);
        }
      });
    });
  }

  function handleOpenModalDelete(atividade) {
    setModalVisible(true);
    setAtividadeAtual(atividade);
  }

  function handleChangePerPage(e) {
    setPerPage(Number.parseInt(e.target.value, 10));
    localStorage.setItem('perPage', e.target.value);
  }

  function getProjectById(id) {
    for (let i = 0; i < projetos.length; i += 1) {
      if (projetos[i].id === id) {
        return projetos[i];
      }
    }
    return null;
  }

  useEffect(() => {
    api.get('projeto').then((response) => {
      setProjetos(response.data);
    });
  }, []);

  useEffect(() => {
    api.get(`atividade?page=${page}&limit=${perPage}`).then((response) => {
      const { lastPage: last } = response.data;
      setLista(response.data.data);
      setlastPage(last);
      if (page > last) {
        setPage(last);
        history.push(`/lista/${last}`);
      }
    });
  }, [page, perPage, history]);

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
  }, [match.params.page]);

  return (
    <Bg>
      <Modal visible={modalVisible} onClick={() => setModalVisible(false)}>
        <div>
          <h3>Deseja apagar essa atividade?</h3>
          <div>
            <button type="button" onClick={handleDelete}>Sim</button>
            <button type="button">Não</button>
          </div>
        </div>
      </Modal>
      <Container>
        <div className="header">
          <ButtonLink onClick={() => history.push('/')}>
            <IoIosHome size={25} />
            Home
          </ButtonLink>

          <ButtonLink onClick={() => history.push('/atividade/create', { projetos })}>
            Nova Atividade
            <IoIosAdd size={30} />
          </ButtonLink>
        </div>

        <h1>Listade Atividades</h1>

        <div className="header">
          <Search>
            <InputSearch
              placeholder="Pesquise por ID"
              type="number"
              value={idSearch}
              onChange={(e) => setIdSearch(e.target.value)}
            />
            <ButtonLink onClick={handleSearchAtividade}>
              <IoIosSearch size={25} />
            </ButtonLink>
          </Search>

          <div>
            <label>Quantidade por página</label>
            <select onChange={handleChangePerPage} id="selectPerPage" defaultValue={10}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

        </div>

        <List>
          <li>
            <Cell flex={1}><strong>ID</strong></Cell>
            <Cell flex={3}><strong>Descrição</strong></Cell>
            <Cell flex={3}><strong>Data Cadastro</strong></Cell>
            <Cell flex={2}><strong>ID Projeto</strong></Cell>
            <Cell flex={1}>
              <IoMdMore size={15} />
            </Cell>
          </li>
          {
            lista.map((at) => {
              const projeto = getProjectById(at.idProjeto);
              return (
                <li key={at.id}>
                  <Cell flex={1}>{at.id}</Cell>
                  <Cell flex={3}>{at.descricao}</Cell>
                  <Cell flex={3}>{dateFormmated(at.dataCadastro)}</Cell>
                  <Cell flex={2}>{projeto && projeto.descricao}</Cell>
                  <Cell flex={1}>
                    <ButtonOpt
                      background="#00f"
                      onClick={() => history.push(`/atividade/update/${at.id}`, { atividade: at, projetos })}
                    >
                      <FaPencilAlt size={18} />
                    </ButtonOpt>
                    <ButtonOpt background="#f00" onClick={() => handleOpenModalDelete(at.id)}>
                      <IoMdTrash size={22} />
                    </ButtonOpt>
                  </Cell>
                </li>
              );
            })
          }
        </List>


        <div id="divPagination" className="animation2">
          <ButtomBack page={page - 1} disabled={page < 2} />
          <label>
            {`Página ${page} de ${lastPage}`}
          </label>
          <ButtomNext page={page + 1} disabled={page >= lastPage} />
        </div>

      </Container>
    </Bg>
  );
}
