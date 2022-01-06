import { injectable } from 'inversify';
import EventEmitter from 'eventemitter3';
import type { IWidget, IWidgetsService } from './IWidgetsService';

@injectable()
export default class WidgetsService
  extends EventEmitter
  implements IWidgetsService
{
  private widgets: IWidget[] = [];

  public addWidget(w: IWidget) {
    this.widgets.push(w);
  }

  public getWidget(id: string) {
    return this.widgets.find((w: IWidget) => w.id === id);
  }

  public removeWidget(id: string) {
    const index = this.widgets.findIndex((w: IWidget) => w.id === id);
    this.widgets.splice(index, 1);
  }
}
