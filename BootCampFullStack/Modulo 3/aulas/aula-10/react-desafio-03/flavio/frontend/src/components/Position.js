import React from 'react';
import css from './Position.module.css';
export default function Position({ children }) {
  return <div className={css.position}>{children}</div>;
}
