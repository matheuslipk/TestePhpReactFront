import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Bg, Form, ButtonHandleSubmit } from './styles';

export default function EditarAtividade({ match, location }) {
  const { state } = location;
  const { projetos, atividade } = state;
  const [desc, setDesc] = useState(atividade.descricao);
  const [idProjeto, setIdProjeto] = useState(atividade.idProjeto);

  const { id } = match.params;

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post(`/atividade/update/${atividade.id}`, {
      descricao: desc,
      idProjeto,
    }).then((response) => {
      if (response.data.success) {
        toast.success('Atividade atualizada com sucesso');
      } else {
        toast.error(`Erro: ${response.data.msg}`);
      }
    }).catch((err) => {
      toast.error(`Erro: ${err.message}`);
    });
  };

  return (
    <Bg>
      <Form onSubmit={handleSubmit}>
        <h3>{`Editando atividade ${id}`}</h3>
        <div>
          <label>Descrição</label>
          <input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <div>
          <label>Projeto</label>
          <select defaultValue={idProjeto} onChange={(e) => setIdProjeto(e.target.value)}>
            <option disabled value={0}>Selecione um projeto</option>
            {
              projetos.map((p) => (
                <option key={p.id} value={p.id}>{p.descricao}</option>
              ))
            }
          </select>
        </div>
        <ButtonHandleSubmit>
           Salvar
        </ButtonHandleSubmit>
      </Form>
    </Bg>
  );
}
