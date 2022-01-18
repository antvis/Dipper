import React from 'react';
export interface IIcon {
  type: 'ICON' | 'ANTD' | 'IMG' | 'HTML';
  content: string;
  style?: ComponentStyle;
}
export declare type ComponentStyle = React.CSSProperties;
interface IProps {
  config: IIcon;
  className?: string;
}
export default function AppIcon({ config, className }: IProps): JSX.Element;
export {};
