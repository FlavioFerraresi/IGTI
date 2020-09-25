import React from 'react';
import css from './Picture.module.css';

export default function Picture({ imageSource, description }) {
  return (
    <div>
      <img
        className={css.picture}
        src={imageSource}
        alt={description}
        title={description}
      />
    </div>
  );
}
