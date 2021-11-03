import type EventEmitter from 'eventemitter3';
import type { IWidgetProps } from '../interface';

export interface IPanel {
  display: boolean;
  enableToggle: boolean;
  defaultTitle?: string;
  width?: number;
  opened?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  style?: React.CSSProperties;
  children?: IWidgetProps<string>[];
}

export interface IPanelService extends EventEmitter {
  init: (config: Partial<IPanel>) => void;
  setDispay: (visble: boolean) => void;
  show: () => void;
  hide: () => void;
  toggleOpen: () => void;
  changeWidth: (width: number) => void;
  changeTab: (tabs: any[]) => void;
}
