import type EventEmitter from 'eventemitter3';

export interface IWidgetsService extends EventEmitter {
  addWidget: (ctr: IWidget) => void;
  removeWidget: (id: string) => void;
  getWidget: (id: string) => IWidget | undefined;
}

export interface IWidgetProps<P = any> {
  type: string; //
  id?: string;
  position?: string;
  display?: boolean;
  options?: Partial<P>; // 不同组件的配置不同
  children?: IWidgetProps<P>[];
}

export interface IControlWidgetsProps<IControlOption = any>
  extends IWidgetProps<IControlOption> {
  layout?: 'horizontal' | 'vertical';
}

export interface IWidget<IOptions = any, IValue = any> {
  id: string;
  show: () => void;
  hide: () => void;
  getOptions: () => IWidgetProps<IOptions>;
  getValue: () => Partial<IValue>;
  setOptions: (option: Partial<IWidgetProps<IOptions>>) => void;
  setValues: (values: Partial<IValue>) => void;
}

export enum WidgetsEventEnum {
  'OPTIONT_CHANGE' = 'optionchange',
  'VALUE_CHANGE' = 'valuechange',
}
