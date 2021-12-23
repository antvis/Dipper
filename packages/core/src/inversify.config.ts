import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import type { ISceneService } from './services/scene/ISceneService';
import type { ILayerService } from './services/layer/ILayerService';
import type { IConfigService } from './services/config/IConfigService';
import type { IControlService } from './/services/control/IControlService';
import SceneService from './services/scene/SceneService';
import LayerService from './services/layer/LayerService';
import ConfigService from './services/config/ConfigService';
import ControlService from './services/control/ControlService';
import type { IPanelService } from './services/panel/IPanelService';
import PanelService from './services/panel/PanelService';

export default function createContainer() {
  const container = new Container();

  container
    .bind<ISceneService>(TYPES.SCENE_SYMBOL)
    .to(SceneService)
    .inSingletonScope();

  container
    .bind<ILayerService>(TYPES.LAYER_SYMBOL)
    .to(LayerService)
    .inSingletonScope();

  container
    .bind<IConfigService>(TYPES.CONFIG_SYMBOL)
    .to(ConfigService)
    .inSingletonScope();

  container
    .bind<IControlService>(TYPES.CONTROL_SYMBOL)
    .to(ControlService)
    .inSingletonScope();

  container
    .bind<IPanelService>(TYPES.PANEL_SYMBOL)
    .to(PanelService)
    .inSingletonScope();

  return container;
}
