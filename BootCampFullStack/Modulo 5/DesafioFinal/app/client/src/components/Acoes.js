import React from 'react';

export default function Acoes({ label, id, type, onActionClick }) {
  const handleIconClick = () => {
    onActionClick(id, type);
  };

  return (
    <a
      className="waves-effect waves-light btn-tiny"
      href="/#"
      onClick={handleIconClick}
    >
      <i className="material-icons left">{type}</i>
      {label}
    </a>
  );
}
