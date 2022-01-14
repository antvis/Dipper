import React from 'react';
// @ts-nocheck
import * as antdIcon from '@ant-design/icons';
import classNames from 'classnames';
import styles from './index.less';
import { BaseLayoutComp } from '../BaseLayoutComp';

export interface IIcon {
  type: 'ICON' | 'ANTD' | 'IMG' | 'HTML';
  content: string;
  style?: ComponentStyle;
}
export type ComponentStyle = React.CSSProperties;

interface IProps {
  config: IIcon;
  className?: string;
}

export default function AppIcon({ config, className }: IProps) {
  const { type, content, style } = config;
  if (type === 'ANTD') {
    // @ts-ignore
    const TargetIcon = antdIcon[content];
    if (TargetIcon) {
      return (
        <BaseLayoutComp type="antdIcon">
          <TargetIcon
            style={style}
            className={classNames([className, styles.appIcon])}
          />
        </BaseLayoutComp>
      );
    }
  }
  if (type === 'ICON') {
    return (
      <BaseLayoutComp type="icon">
        <i
          className={classNames([content, className, styles.appIcon])}
          style={style}
        />
      </BaseLayoutComp>
    );
  }
  if (type === 'IMG') {
    return (
      <BaseLayoutComp type="img">
        <img
          src={content}
          style={style}
          className={classNames([className, styles.appIcon])}
        />
      </BaseLayoutComp>
    );
  }
  if (type === 'HTML') {
    return (
      <BaseLayoutComp type="html">
        <span
          dangerouslySetInnerHTML={{ __html: content }}
          style={style}
          className={classNames([className, styles.appIcon])}
        />
      </BaseLayoutComp>
    );
  }
  return <></>;
}
