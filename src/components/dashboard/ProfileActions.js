import { Link } from 'react-router-dom';
import Stats from './Stats';
import React, { useState } from 'react';

const ProfileActions = () => {
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(true);
  };
  return (
    <div>
      <div className="btn-group mb-4" role="group">
        <a href="edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> Editar perfil
        </a>
        <button style={{ border: 'none' }} onClick={handleClick}>
          <i className="fab fa-black-tie text-info mr-1" /> Estadístiques
        </button>
        <a className="btn btn-light">
          <i className="fas fa-graduation-cap text-info mr-1" /> Configuració
        </a>
      </div>
      <div>{showComponent && <Stats />}</div>
    </div>
  );
};
export default ProfileActions;
