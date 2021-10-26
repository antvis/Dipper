import type EventEmitter from 'eventemitter3';
import type { IWidgetProps } from '../interface';

export interface ISideBar {
  display: boolean;
  enableToggle: boolean;
  defaultTitle?: string;
  width?: number;
  opened?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  style?: React.CSSProperties;
  children?: IWidgetProps<string>[];
}

export interface ISideBarService extends EventEmitter {
  init: (config: Partial<ISideBar>) => void;
  show: () => void;
  hide: () => void;
  toggleOpen: () => void;
  changeWidth: (width: number) => void;
  changeTab: (tabs: any[]) => void;
}
