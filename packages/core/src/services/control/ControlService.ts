import { injectable } from 'inversify';
import EventEmitter from 'eventemitter3';
import type { IControl, IControlService } from './IControlService';

export enum ControlConfigEventEnum {
  'CONFIG_CHANGE' = 'configchange',
}

@injectable()
export default class ControlService
  extends EventEmitter
  implements IControlService
{
  private controls: IControl[] = [];

  addControl(ctr: IControl) {
    this.controls.push(ctr);
  }
}
