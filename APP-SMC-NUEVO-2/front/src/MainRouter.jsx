// src/MainRouter.jsx
import { Routes, Route } from 'react-router-dom';
import App from './App';
import DisplayData from './DisplayData';
import Login from './Login';
import SelectionPage from './SelectionPage';
import CouponSystem from './CouponSystem'; // Importa el nuevo componente
import RegisterCliente from './RegisterCliente';

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/selection" element={<SelectionPage />} />
      <Route path="/coupon-system" element={<CouponSystem />} /> 
      <Route path="/register-cliente" element={<RegisterCliente />} /> 
      <Route path="/register-person" element={<RegisterPerson />} /> 
      <Route path="/register-company" element={<RegisterCompany />} />
      <Route path="/data-entry" element={<App />} />
      <Route path="/display/:nroCertificado" element={<DisplayData />} />      
    </Routes>
  );
}

export default MainRouter;
