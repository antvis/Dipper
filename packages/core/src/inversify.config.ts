import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import type { ISceneService } from './services/scene/ISceneService';
import type { ILayerService } from './services/layer/ILayerService';
import type { IConfigService } from './services/config/IConfigService';
import type { IWidgetsService } from './services/widgets/IWidgetsService';
import SceneService from './services/scene/SceneService';
import LayerService from './services/layer/LayerService';
import ConfigService from './services/config/ConfigService';
import ControlService from './services/widgets/WidgetsService';
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
    .bind<IWidgetsService>(TYPES.WIDGETS_SYMBOL)
    .to(ControlService)
    .inSingletonScope();

  container
    .bind<IPanelService>(TYPES.PANEL_SYMBOL)
    .to(PanelService)
    .inSingletonScope();

  return container;
}
