import EventEmitter from 'eventemitter3';
import type { Container } from 'inversify';
import { inject } from 'inversify';
import type { IWidget, IWidgetsService, IWidgetProps } from './IWidgetsService';
import { WidgetsEventEnum } from './IWidgetsService';
import { ISceneService } from '../scene/ISceneService';
import { IConfigService } from '../config/IConfigService';
import { TYPES } from '../../types';

export default class BaseWidget<IOptions, IValue>
  extends EventEmitter
  implements IWidget<IOptions, IValue>
{
  private options: IWidgetProps = {
    type: 'base',
  };
  private values: Partial<IValue> | any;
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
    this.options = Object.assign({}, props);
  }

  public setContainer(container: Container) {
    this.contianer = container;
    this.sceneService = this.contianer.get(TYPES.SCENE_SYMBOL) as ISceneService;
    this.configService = this.contianer.get(
      TYPES.CONFIG_SYMBOL,
    ) as IConfigService;
    this.widgetsService = this.contianer.get(
      TYPES.WIDGETS_SYMBOL,
    ) as IWidgetsService;
    this.options = Object.assign(
      {},
      {
        ...this.options,
        options: {
          optionsData: this.configService.getWidgetsOptions(this.id),
          ...this.options.options,
        },
      },
    );
    this.values = this.configService.getWidgetsValue(this.id);
  }

  public init() {}

  getOptions(): IWidgetProps<IOptions> {
    return this.options;
  }

  getValue(): Partial<IValue> {
    return this.values;
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

  setOptions(option: Partial<IWidgetProps<IOptions>>) {
    this.options = Object.assign({}, this.options, option);
    this.emit(WidgetsEventEnum.OPTIONT_CHANGE, this.options);
  }

  setValues(values: Partial<IValue>) {
    this.values = values;
    this.emit(WidgetsEventEnum.VALUE_CHANGE, this.values);
  }
  destroy() {
    this.removeAllListeners();
  }
}