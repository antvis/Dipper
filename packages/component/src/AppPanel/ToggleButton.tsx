import React from 'react';
import styles from './index.less';
import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
interface IProps {
  isFold: boolean;
  setIsFold: (newIsFold: boolean) => void;
  position: 'left' | 'right' | 'top' | 'bottom';
}

export default function ToggleButton({ isFold, setIsFold, position }: IProps) {
  return (
    <div
      className={`${styles.toggleButton} ${styles[position]}`}
      onClick={() => setIsFold(isFold)}
    >
      <RightOutlined
        className={classNames({
          [styles.toggleButtonIcon]: true,
          transform: true,
          'rotate-180': !isFold,
        })}
      />
    </div>
  );
}
