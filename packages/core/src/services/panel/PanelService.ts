import type { IPanelService, IPanel } from './IPanelService';
import type { IConfigService } from '../config/IConfigService';
import type { Scene } from '@antv/l7';
import type { Container } from 'inversify';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import EventEmitter from 'eventemitter3';

@injectable()
export default class PanelService
  extends EventEmitter
  implements IPanelService {
  private config: Partial<IPanel> = {};
  public scene: Scene | undefined;
  public container: Container | undefined = undefined;

  @inject(TYPES.CONFIG_SYMBOL)
  protected configService!: IConfigService<string>;

  init(config: Partial<IPanel>) {
    this.config = config;
  }

  show() {
    this.configService.setConfig('panel.opened', true);
  }

  hide() {
    this.configService.setConfig('panel.opened', false);
  }

  toggleOpen() {
    this.configService.setConfig(
      'panel.opened',
      !this.configService.getConfig('panel.opened'),
    );
  }
  setDispay(visble: boolean) {
    this.configService.setConfig(
      'panel.opened',
      !this.configService.getConfig('panel.opened'),
    );
  }
  changeTab() {}

  changeWidth(width: number) {
    this.configService.setConfig('panel.width', width);
  }
}
