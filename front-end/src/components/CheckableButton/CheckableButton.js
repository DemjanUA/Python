import React from 'react';
import { HighlightOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './CheckableButton.module.css';

const CheckableButton = props => {
  const { type, checked, onClick } = props;
  return (
    <button onClick={onClick} className={`${styles.checkable__button} ${checked ? styles.checked : ""}`}>
      {type === "highlightOutlined" && <HighlightOutlined />}
      {type === "deleteOutlined" && <DeleteOutlined />}
    </button>
  );
}

export default CheckableButton;