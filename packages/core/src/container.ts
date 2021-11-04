import type { Container } from 'inversify';
import createContainer from './inversify.config';
import type { IConfig, IConfigService } from './services/config/IConfigService';
import type { ISceneService } from './services/scene/ISceneService';
import type { IPanelService } from './services/panel/IPanelService';
import { TYPES } from './types';

export default class SceneContainer<T> {
  public sceneService: ISceneService;
  public configService: IConfigService<T>;
  public panelService: IPanelService;
  private container: Container;
  constructor(cfg: IConfig<T> | undefined) {
    this.container = createContainer();
    const sceneService = this.container.get(
      TYPES.SCENE_SYMBOL,
    ) as ISceneService;
    const configService = this.container.get(
      TYPES.CONFIG_SYMBOL,
    ) as IConfigService<T>;
    const panelService = this.container.get(
      TYPES.PANEL_SYMBOL,
    ) as IPanelService;
    configService.init(cfg);
    panelService.init(cfg?.panel || {});
    sceneService.init(this.container);
    this.sceneService = sceneService;
    this.configService = configService;
    this.panelService = panelService;
  }

  public getContainer() {
    return this.container;
  }
}
