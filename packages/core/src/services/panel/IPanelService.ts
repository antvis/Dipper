import type EventEmitter from 'eventemitter3';
import type { IWidgetProps } from '../widgets/IWidgetsService';

export interface IPanel {
  display: boolean;
  enableToggle: boolean;
  defaultTitle?: string;
  width?: number;
  opened?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  options: Partial<{
    enableToggle: boolean;
    defaultTitle?: string;
    width?: number;
    opened?: boolean;
    style?: React.CSSProperties;
  }>;
  children?: IWidgetProps[];
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
