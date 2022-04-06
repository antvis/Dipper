import EventEmitter from 'eventemitter3';
import type { Container } from 'inversify';
import { inject } from 'inversify';
import type { IWidget, IWidgetsService, IWidgetProps } from './IWidgetsService';
import { WidgetEventEnum } from './IWidgetsService';
import type { ISceneService } from '../scene/ISceneService';
import type { IConfigService } from '../config/IConfigService';
import { TYPES } from '../../types';

export default class BaseWidget<IOptions, IValue>
  extends EventEmitter
  implements IWidget<IOptions, IValue>
{
  private props: IWidgetProps = {
    type: 'base',
  };
  private value: Partial<IValue> | any;
  public id: string;
  private contianer!: Container;

  @inject(TYPES.CONFIG_SYMBOL)
  public sceneService!: ISceneService;

  @inject(TYPES.SCENE_SYMBOL)
  public configService!: IConfigService;

  @inject(TYPES.WIDGETS_SYMBOL)
  public widgetsService!: IWidgetsService;

  constructor(props: IWidgetProps<IOptions>) {
    super();
    this.id = props.id || props.type;
    this.props = Object.assign({}, props);
  }

  public setContainer(container: Container) {
    this.contianer = container;
    this.sceneService = this.contianer.get(TYPES.SCENE_SYMBOL) as ISceneService;
    this.configService = this.contianer.get(TYPES.CONFIG_SYMBOL) as IConfigService;
    this.widgetsService = this.contianer.get(TYPES.WIDGETS_SYMBOL) as IWidgetsService;
    this.props = Object.assign(
      {},
      {
        ...this.props, // props chan'd
        options: {
          optionsdata: this.configService.getWidgetInitOptions(this.id), // 兼容历史版本
          ...this.configService.getWidgetInitOptions(this.id),
          ...this.props.options,
        },
      },
    );
    this.value = this.configService.getWidgetInitValue(this.id);
  }

  public init() {}

  getValue(): Partial<IValue> {
    return this.value;
  }

  setValue(value: Partial<IValue>) {
    this.value = value;
    this.emit(WidgetEventEnum.VALUE_CHANGE, this.value);
  }

  // 兼容旧 API
  setValues(value: Partial<IValue>) {
    console.warn('请将 setValues 方法替换 setValue 使用');
    this.setValue(value);
  }

  getOptions(): IWidgetProps<IOptions> {
    return this.props;
  }

  setOptions(options: Partial<IWidgetProps<IOptions>>) {
    this.props = Object.assign({}, this.props, options);
    this.emit(WidgetEventEnum.OPTIONT_CHANGE, this.props);
  }

  show() {
    this.setOptions({
      display: true,
    });
  }

  hide() {
    this.setOptions({
      display: false,
    });
  }

  destroy() {
    this.removeAllListeners();
  }
}
