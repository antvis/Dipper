import type { Scene } from '@antv/l7';
import type EventEmitter from 'eventemitter3';
import type { Container } from 'inversify';

export type ISceneEventName = 'sceneChange';

export interface ISceneService extends EventEmitter<ISceneEventName> {
  scene: Scene | undefined;
  container: Container;
  init: (container: Container) => void;
  setScene: (scene: Scene) => void;
  getScene: () => Scene | undefined;
  destroy: () => void;
}
