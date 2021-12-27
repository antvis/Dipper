export interface IWidgetProps {
  type: string;
  title?: string;
  position?: string;
  layout?: 'horizontal' | 'vertical';
  display?: boolean;
  options?: any;
  children?: IWidgetProps[];
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
