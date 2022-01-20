import type EventEmitter from 'eventemitter3';
import type { Container } from 'inversify';
export interface IWidgetsService extends EventEmitter {
  addWidget: (ctr: IWidget) => void;
  removeWidget: (id: string) => void;
  getWidget: (id: string) => IWidget | undefined;
}

export interface IWidgetProps<P = any> {
  type: string; //
  id?: string;
  title?: string;
  position?: string;
  display?: boolean;
  options?: Partial<P>; // 不同组件的配置不同
  children?:
    | JSX.Element
    | JSX.Element[]
    | Array<JSX.Element | undefined>
    | React.FC;
  childrens?: IWidgetProps<P>[];
  event?: {
    actionType: string;
    action: string;
  };
}

export interface IControlWidgetsProps<IControlOption = any>
  extends IWidgetProps<IControlOption> {
  layout?: 'horizontal' | 'vertical';
}

export interface IWidget<IOptions = any, IValue = any> extends EventEmitter {
  id: string;
  show: () => void;
  hide: () => void;
  setContainer: (container: Container) => void;
  init: () => void;
  getOptions: () => IWidgetProps<IOptions>;
  getValue: () => Partial<IValue>;
  setOptions: (option: Partial<IWidgetProps<IOptions>>) => void;
  setValues: (values: Partial<IValue>) => void;
  destroy: () => void;
}

export enum WidgetsEventEnum {
  'OPTIONT_CHANGE' = 'optionchange',
  'VALUE_CHANGE' = 'valuechange',
}

export enum WidgetsServiceEnum {
  'ADD' = 'add',
  'REMOVE' = 'remove',
}
