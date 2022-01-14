import React, { useState } from 'react';
import styles from './index.less';
import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
interface IProps {
  opened: boolean;
  setIsFold: (newIsFold: boolean) => void;
  position: 'left' | 'right' | 'top' | 'bottom';
}

export default function ToggleButton({ opened, setIsFold, position }: IProps) {
  return (
    <div
      className={`${styles.toggleButton} ${styles[position]}`}
      onClick={() => {
        setIsFold(!opened);
      }}
    >
      <RightOutlined
        style={{ transform: opened ? '' : 'rotate(180deg)' }}
        className={classNames({
          [styles.toggleButtonIcon]: true,
        })}
      />
    </div>
  );
}
