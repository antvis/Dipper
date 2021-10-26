import type { ISideBarService, ISideBar } from './ISidebarService';
import type { IConfigService } from '../config/IConfigService';
import type { Scene } from '@antv/l7';
import type { Container } from 'inversify';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import EventEmitter from 'eventemitter3';

@injectable()
export default class SidebarService
  extends EventEmitter
  implements ISideBarService
{
  private config: Partial<ISideBar> = {};
  public scene: Scene | undefined;
  public container: Container | undefined = undefined;

  @inject(TYPES.CONFIG_SYMBOL)
  protected configService!: IConfigService<string>;

  init(config: Partial<ISideBar>) {
    this.config = config;
  }

  show() {
    this.configService.setConfig('sidebar.opened', true);
  }

  hide() {
    this.configService.setConfig('sidebar.opened', false);
  }

  toggleOpen() {
    this.configService.setConfig(
      'sidebar.opened',
      !this.configService.getConfig('sidebar.opened'),
    );
  }

  changeTab() {}

  changeWidth(width: number) {
    this.configService.setConfig('sidebar.width', width);
  }
}
