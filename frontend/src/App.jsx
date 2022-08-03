import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from "./layouts/AuthLayout";
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import NuevoPassword from './paginas/NuevoPassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import { AuthProvider } from "./context/AuthProvider";
import { ProyectosProvider } from "./context/ProyectosProvider";
import Proyectos from "./paginas/Proyectos";
import RutaProtegida from "./layouts/RutaProtegida";
import NuevoProyecto from "./paginas/NuevoProyecto";

function App() {
  return(
      <BrowserRouter>
          <AuthProvider>
              <ProyectosProvider>
                  <Routes>
                      <Route path="/" element={<AuthLayout />}>
                          <Route index element={<Login />} />
                          <Route path="registrar" element={<Registrar />} />
                          <Route path="olvide-password" element={<OlvidePassword />} />
                          <Route path="olvide-password/:token" element={<NuevoPassword />} />
                          <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                      </Route>

                      <Route path="/proyectos" element={<RutaProtegida />} >
                          <Route index element={<Proyectos />} />
                          <Route path={'crear-proyecto'} element={<NuevoProyecto /> }/>
                      </Route>
                  </Routes>
              </ProyectosProvider>
          </AuthProvider>
      </BrowserRouter>
  )
}

export default App
