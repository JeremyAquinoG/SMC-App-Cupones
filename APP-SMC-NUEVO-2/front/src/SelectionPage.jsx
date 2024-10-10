import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectionPage() {
  const navigate = useNavigate();

  const handleFirstButtonClick = () => {
    navigate('/coupon-system');
  };

  const handleSecondButtonClick = () => {
    navigate('/data-entry');
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <h1 className="mb-4 text-primary">Seleccione una opción</h1>
      <div className="d-flex">
        <button onClick={handleFirstButtonClick} className="btn btn-primary btn-lg me-3">
          Ingreso a la Cuponera
        </button>
        <button onClick={handleSecondButtonClick} className="btn btn-primary btn-lg me-3">
          Ingreso al Registro de Datos
        </button>
      </div>
    </div>
  );
}

export default SelectionPage;
