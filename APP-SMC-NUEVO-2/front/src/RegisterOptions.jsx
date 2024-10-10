import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterOptions() {
  const navigate = useNavigate();

  const handleRegisterPerson = () => {
    // Lógica para redirigir o manejar el registro de una persona
    navigate('/register-person');
  };

  const handleRegisterCompany = () => {
    // Lógica para redirigir o manejar el registro de una empresa
    navigate('/register-company');
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <h1 className="mb-4 text-primary">Registrar Opciones</h1>
      <div className="d-flex">
        <button onClick={handleRegisterPerson} className="btn btn-primary btn-lg me-3">
          Registrar Persona
        </button>
        <button onClick={handleRegisterCompany} className="btn btn-primary btn-lg me-3">
          Registrar Empresa
        </button>
      </div>
    </div>
  );
}

export default RegisterOptions;
