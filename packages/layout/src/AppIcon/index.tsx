import React from 'react';
// @ts-nocheck
import * as antdIcon from '@ant-design/icons';
import classNames from 'classnames';
import './index.less';

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
        <TargetIcon
          style={style}
          className={classNames([className, 'appIcon'])}
        />
      );
    }
  }
  if (type === 'ICON') {
    return (
      <i
        className={classNames([content, className, 'appIcon'])}
        style={style}
      />
    );
  }
  if (type === 'IMG') {
    return (
      <img
        src={content}
        style={style}
        className={classNames([className, 'appIcon'])}
      />
    );
  }
  if (type === 'HTML') {
    return (
      <span
        dangerouslySetInnerHTML={{ __html: content }}
        style={style}
        className={classNames([className, 'appIcon'])}
      />
    );
  }
  return <></>;
}
