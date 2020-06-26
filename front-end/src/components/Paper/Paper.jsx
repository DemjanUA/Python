import React from 'react';
import styles from './Paper.module.css';

const Paper = ({
  children,
  className,
  paperClass,
}) => {
  return (
    <div className={`paper-wrapper ${styles["paper-wrapper-default"]} ${className}`}>
      <div className={`${styles.paper} ${paperClass || ''}`}>{children}</div>
    </div>
  );
};

export default Paper;
