import type { Container } from 'inversify';
import createContainer from './inversify.config';
import type { IConfig, IConfigService, IBaseConfig } from './services/config/IConfigService';
import type { ISceneService } from './services/scene/ISceneService';
import type { IPanelService } from './services/panel/IPanelService';
import { TYPES } from './types';
import type { Scene } from '@antv/l7';

export default class Dipper<T = any> {
  public sceneService: ISceneService;
  public configService: IConfigService;
  // public panelService: IPanelService;
  private container: Container;
  constructor(cfg: IBaseConfig & T) {
    this.container = createContainer();
    const sceneService = this.container.get(TYPES.SCENE_SYMBOL) as ISceneService;
    const configService = this.container.get(TYPES.CONFIG_SYMBOL) as IConfigService;
    // const panelService = this.container.get(
    //   TYPES.PANEL_SYMBOL,
    // ) as IPanelService;
    configService.init(cfg);
    // panelService.init(cfg?.panel || {});
    sceneService.init(this.container);
    this.sceneService = sceneService;
    this.configService = configService;
    // this.panelService = panelService;
  }

  public getContainer() {
    return this.container;
  }

  /**
   * 获取L7 地图场景 实例 scene
   * @returns
   */
  public getScene() {
    return this.sceneService.getScene() as Scene;
  }

  public reset() {
    this.configService.reset();
  }

  public destroy() {
    this.sceneService.destroy();
  }
}
