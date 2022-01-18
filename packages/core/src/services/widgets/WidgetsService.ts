import { injectable, inject } from 'inversify';
import EventEmitter from 'eventemitter3';
import type { IWidget, IWidgetsService } from './IWidgetsService';
import type { Container } from 'inversify';
import type { ISceneService } from '../scene/ISceneService';
import { WidgetsServiceEnum } from './IWidgetsService';
import { TYPES } from '../../types';

@injectable()
export default class WidgetsService
  extends EventEmitter
  implements IWidgetsService
{
  @inject(TYPES.SCENE_SYMBOL)
  protected sceneService!: ISceneService;

  private widgets: IWidget[] = [];

  public addWidget(w: IWidget) {
    this.widgets.push(w);
    w.setContainer(this.sceneService?.container as Container);
    w.init();
    this.emit(WidgetsServiceEnum.ADD, w);
  }

  public getWidget(id: string) {
    return this.widgets.find((w: IWidget) => w.id === id);
  }

  public removeWidget(id: string) {
    const index = this.widgets.findIndex((w: IWidget) => w.id === id);
    const w = this.widgets.splice(index, 1);
    this.emit(WidgetsServiceEnum.REMOVE, w[0]);
  }
}
