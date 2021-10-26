import type { Container } from 'inversify';
import createContainer from './inversify.config';
import type { IConfig, IConfigService } from './services/config/IConfigService';
import type { ISceneService } from './services/scene/ISceneService';
import type { ISideBarService } from './services/siderbar/ISidebarService';
import { TYPES } from './types';

export default class SceneContainer<T> {
  public sceneService: ISceneService;
  public configService: IConfigService<T>;
  public sidebarService: ISideBarService;
  private container: Container;
  constructor(cfg: IConfig<T> | undefined) {
    this.container = createContainer();
    const sceneService = this.container.get(
      TYPES.SCENE_SYMBOL,
    ) as ISceneService;
    const configService = this.container.get(
      TYPES.CONFIG_SYMBOL,
    ) as IConfigService<T>;
    const sidebarService = this.container.get(
      TYPES.SIDEBAR_SYMBOL,
    ) as ISideBarService;
    configService.init(cfg);
    sidebarService.init(cfg?.sidebar || {});
    sceneService.init(this.container);
    this.sceneService = sceneService;
    this.configService = configService;
    this.sidebarService = sidebarService;
  }

  public getContainer() {
    return this.container;
  }
}
