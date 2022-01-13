import EventEmitter from 'eventemitter3';
import { IWidget, IWidgetProps, WidgetsEventEnum } from '@antv/dipper-core';
export default class BaseWidget<IOptions, IValue>
  extends EventEmitter
  implements IWidget<IOptions, IValue>
{
  private options: IWidgetProps = {
    type: 'base',
  };
  private values: Partial<IValue> = {};
  public id: string;
  constructor(props: IWidgetProps<IOptions>) {
    super();
    this.id = props.id || props.type;
    this.options = Object.assign({}, this.options, props);
  }
  getOptions(): IWidgetProps<IOptions> {
    return this.options;
  }

  getValue(): Partial<IValue> {
    return this.values;
  }

  show() {
    // this.options.display = true;
    this.setOptions({
      display: true,
    });
  }

  hide() {
    this.setOptions({
      display: false,
    });
    // this.options.display = false;
  }

  setOptions(option: Partial<IWidgetProps<IOptions>>) {
    this.options = Object.assign({}, this.options, option);
    this.emit(WidgetsEventEnum.OPTIONT_CHANGE, this.options);
  }

  setValues(values: Partial<IValue>) {
    this.values = values;
    this.emit(WidgetsEventEnum.VALUE_CHANGE, this.options);
  }
}
