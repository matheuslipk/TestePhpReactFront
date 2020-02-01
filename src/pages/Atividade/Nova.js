import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { IoMdRefresh } from 'react-icons/io';
import api from '../../services/api';
import { Bg, Form, ButtonHandleSubmit } from './styles';

export default function NovaAtividade({ location }) {
  const { state } = location;
  const { projetos } = state;
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [idProjeto, setIdProjeto] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idProjeto || !desc) return;
    setLoading(true);
    api.post('/atividade/create', {
      descricao: desc,
      idProjeto,
    }).then((response) => {
      if (response.data.success) {
        toast.success('Atividade Criada com sucesso');
        setDesc('');
      } else {
        toast.error(`Erro: ${response.data.msg}`);
      }
      setLoading(false);
    }).catch((err) => {
      toast.error(`Erro: ${err.message}`);
      setLoading(false);
    });
  };

  return (
    <Bg>
      <Form onSubmit={handleSubmit}>
        <h3>Criar Atividade</h3>
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
        <ButtonHandleSubmit className="rotate" disabled={loading}>
          {
            loading ? <IoMdRefresh size={30} /> : 'Salvar'
          }
        </ButtonHandleSubmit>
      </Form>
    </Bg>
  );
}
