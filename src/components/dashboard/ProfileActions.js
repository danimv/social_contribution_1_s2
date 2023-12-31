import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <a href="edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Editar perfil
      </a>
      <a href="stats" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" /> Estadístiques
      </a>
      <a href="config" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" /> Configuració
      </a>
    </div>
  );
};
export default ProfileActions;
