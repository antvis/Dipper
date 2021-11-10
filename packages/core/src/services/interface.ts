export interface IWidgetProps<T> {
  type: string;
  title?: string;
  position?: T | string;
  display?: boolean;
  options?: any;
  children?: IWidgetProps<T>[];
  [key: string]: any;
}

export type PanelPostions = 'left' | 'right' | 'top' | 'bottom';
export type ControlPostions =
  | 'bottomleft'
  | 'bottomright'
  | 'topleft'
  | 'topright'
  | 'topcenter'
  | 'bottomcenter'
  | 'leftcenter'
  | 'rightcenter';
