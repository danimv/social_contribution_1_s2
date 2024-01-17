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
        <Link>
          <button className="btn btn-light" style={{ border: 'none' }}>
            <i className="fas fa-user-circle text-info mr-1" /> Edita
          </button>
        </Link>
        <button className="btn btn-light" style={{ border: 'none' }} onClick={handleClick}>
          <i className="fas fa-chart-bar text-info mr-1" /> Estadístiques
        </button>
        <Link>
          <button className="btn btn-light" style={{ border: 'none' }}>
            <i className="fas fa-cog text-info mr-1" /> Configuració
          </button>
        </Link>
      </div>
      <div>{showComponent && <Stats />}</div>
    </div>
  );
};
export default ProfileActions;
