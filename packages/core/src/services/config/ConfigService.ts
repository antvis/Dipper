import { injectable } from 'inversify';
import EventEmitter from 'eventemitter3';
import type { IConfigService, IConfig } from './IConfigService';
import { get, mergeWith } from 'lodash';
import { updateConfigsField } from '../../utils/';
import { defaultConfig } from './defaultConfig';

function customizer(obj: any, src: any) {
  if (Array.isArray(src)) {
    return src;
  }
}

export enum ConfigEventEnum {
  'CONFIG_CHANGE' = 'configchange',
}

@injectable()
export default class ConfigService<T>
  extends EventEmitter
  implements IConfigService<T>
{
  public config!: Partial<IConfig<T>>;

  private isInited: boolean = false;
  init(config: Partial<IConfig<T>> | undefined) {
    if (!this.isInited) {
      this.config = mergeWith(defaultConfig, config, customizer);
      this.emit(ConfigEventEnum.CONFIG_CHANGE, this.config);
    }
    this.isInited = true;
  }

  setConfig(field: string, value: any) {
    this.config = updateConfigsField(this.config, field, value);
    this.emit(ConfigEventEnum.CONFIG_CHANGE, this.config); // TODO 按需更新
  }

  updateLegend(id: string, value: any) {
    this.updateControlConfig('legends', id, value);
  }

  updateControl(type: string, value: any) {
    const index = this.config.controls?.findIndex((k) => k.type === type);
    if (index !== -1) {
      this.setConfig(`controls.${index}`, {
        ...this.getConfig(`controls.${index}`),
        ...value,
      });
    } else {
      // 组件未添加
      console.log('组件未添加');
    }
  }
  // legends;
  updateControlConfig(type: keyof IConfig<T>, id: string, value: any) {
    const index = this.config.legends?.findIndex((k) => k.id === id);
    if (index !== -1) {
      this.setConfig(`${type}.${index}`, value);
    } else {
      this.setConfig(`${type}.${0}`, {
        id,
        ...value,
      });
    }
  }

  getConfig(key: string) {
    return get(this.config, key, undefined);
  }

  // 设置组件结果值
  setWidgetsOptions(key: string, options: Record<string, any>) {
    this.setConfig(`viewData.widgets.${key}.options`, options);
  }

  // 设置组件结果值
  setWidgetsValue(key: string, value: Record<string, any>) {
    this.setConfig(`viewData.widgets.${key}.value`, value);
  }
  // 获取组件结果值
  getWidgetsValue(key: string) {
    return this.getConfig(`viewData.widgets.${key}.value`);
  }

  // 获取组件结果值
  getWidgetsOptions(key: string) {
    return this.getConfig(`viewData.widgets.${key}.options`);
  }
  reset() {
    this.isInited = false;
  }
}
