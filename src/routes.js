import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Formulario from './pages/Formulario/formulario';
import Lista from './pages/Lista/lista';
import Login from './pages/Login/login';
import EditarAtividade from './pages/Atividade/Editar';
import NovaAtividade from './pages/Atividade/Nova';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Formulario} />
        <Route path="/lista/:page?" component={Lista} />
        <Route path="/login" component={Login} />
        <Route path="/atividade/update/:id" component={EditarAtividade} />
        <Route path="/atividade/create" component={NovaAtividade} />
      </Switch>
    </BrowserRouter>
  );
}
