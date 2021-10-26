import type EventEmitter from 'eventemitter3';

export interface IControlService extends EventEmitter {
  addControl: (ctr: IControl) => void;
}

export interface IControl {
  name: string;
}
