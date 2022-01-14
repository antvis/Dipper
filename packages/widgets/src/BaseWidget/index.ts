import EventEmitter from 'eventemitter3';
import type { Container } from 'inversify';
import { injectable, inject } from 'inversify';

import {
  IWidget,
  IWidgetsService,
  IWidgetProps,
  WidgetsEventEnum,
  WidgetsService,
  TYPES,
  ISceneService,
} from '@antv/dipper-core';
export default class BaseWidget<IOptions, IValue>
  extends EventEmitter
  implements IWidget<IOptions, IValue>
{
  private options: IWidgetProps = {
    type: 'base',
  };
  private values: Partial<IValue> = {};
  public id: string;
  private contianer!: Container;

  @inject(TYPES.SCENE_SYMBOL)
  public sceneService!: ISceneService;

  @inject(TYPES.WIDGETS_SYMBOL)
  public widgetsService!: IWidgetsService;

  constructor(props: IWidgetProps<IOptions>) {
    super();
    this.id = props.id || props.type;
    this.options = Object.assign({}, this.options, props);
  }

  public setContainer(container: Container) {
    this.contianer = container;
    this.sceneService = this.contianer.get(TYPES.SCENE_SYMBOL) as ISceneService;
    this.widgetsService = this.contianer.get(
      TYPES.WIDGETS_SYMBOL,
    ) as IWidgetsService;
  }

  public init() {}

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
  destroy() {
    this.removeAllListeners();
  }
}
