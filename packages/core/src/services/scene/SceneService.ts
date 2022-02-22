import type { ISceneEventName, ISceneService } from './ISceneService';
import type { IConfigService, IConfig } from '../config/IConfigService';
import type { Scene } from '@antv/l7';
import type { Container } from 'inversify';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import EventEmitter from 'eventemitter3';

@injectable()
export default class SceneService
  extends EventEmitter<ISceneEventName>
  implements ISceneService
{
  private config: Partial<IConfig> = {};
  public scene: Scene | undefined;
  public container!: Container;
  public position: [number, number] | undefined;

  @inject(TYPES.CONFIG_SYMBOL)
  protected configService!: IConfigService;

  init(container: Container) {
    this.container = container;
  }
  getConfigByKey(key: keyof IConfig) {
    return this.config[key];
  }
  getConfig(): IConfig {
    return this.config as IConfig;
  }

  getPosition() {
    return this.position;
  }

  setPosition(position: [number, number]) {
    this.position = position;
    this.emit('sceneChange', { position, scene: this.scene });
  }

  getScene() {
    return this.scene;
  }

  setScene(scene: Scene) {
    this.scene = scene;
    this.emit('sceneChange', { scene, position: this.position });
  }
  destroy() {
    this.scene?.destroy();
  }
}
