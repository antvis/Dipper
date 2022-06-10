import EventEmitter from 'eventemitter3';
import { injectable } from 'inversify';
import { get, mergeWith } from 'lodash';
import { updateConfigsField } from '../../utils/';
import { defaultConfig } from './defaultConfig';
import type { GlobalModel, IConfig, IConfigService } from './IConfigService';

function customizer(obj: any, src: any) {
  if (Array.isArray(src)) {
    return src;
  }
}

export enum ConfigEventEnum {
  'CONFIG_CHANGE' = 'configchange',
  'GLOBAL_CHANGE' = 'globalchange',
}

@injectable()
export default class ConfigService extends EventEmitter implements IConfigService {
  public config!: Partial<IConfig>;

  private isInited: boolean = false;
  init(config: Partial<IConfig> | undefined) {
    if (!this.isInited) {
      this.config = mergeWith({}, defaultConfig, config, customizer);
      this.emit(ConfigEventEnum.CONFIG_CHANGE, this.config);
    }
    this.isInited = true;
  }

  setConfig(field: string, value: any) {
    this.config = updateConfigsField(this.config, field, value);
    this.emit(ConfigEventEnum.CONFIG_CHANGE, this.config); // TODO 按需更新
  }

  updateLegend(id: string, value: any) {
    console.warn('请将 updateLegend 方法替换 updateControl 使用');
    this.updateControl(id, value);
  }

  // 添加地图控件s
  addControl(value: any) {
    this.setConfig(`controls.${this.config.controls?.length}`, {
      ...value,
    });
  }
  // 移除地图控件
  removeControl(id: string) {
    const index = this.findWidgetsById(id, 'controls');
    if (index !== -1) {
      this.setConfig('controls', this.config.controls?.splice(0, index));
    }
  }

  updateControl(id: string, value: any) {
    const index = this.findWidgetsById(id, 'controls');
    if (index !== -1) {
      this.setConfig(`controls.${index}`, {
        ...this.getConfig(`controls.${index}`),
        ...value,
      });
    } else {
      // 组件未添加,
      this.addControl(value);
      console.warn('组件未添加');
    }
  }

  getConfig(key: string) {
    return get(this.config, key, undefined);
  }

  // 设置组件结果值
  setWidgetInitOptions(key: string, options: Record<string, any>) {
    this.setConfig(`widgets.${key}.options`, options);
  }

  // 设置组件结果值
  setWidgetInitValue(key: string, value: Record<string, any>) {
    this.setConfig(`widgets.${key}.value`, value);
  }
  // 获取组件结果值
  getWidgetInitValue(key: string) {
    return this.getConfig(`widgets.${key}.value`);
  }

  // 获取组件结果值
  getWidgetInitOptions(key: string) {
    return this.getConfig(`widgets.${key}.options`);
  }

  reset() {
    this.isInited = false;
  }

  // 获取全局数据
  getGlobalData(): GlobalModel {
    return this.config?.global || {};
  }

  // 设置全局数据
  setGlobalData(data: GlobalModel) {
    const global = this.config?.global || {};

    this.config = updateConfigsField(this.config, 'global', Object.assign({}, global, data));
    this.emit(ConfigEventEnum.GLOBAL_CHANGE, this.config);
  }

  private findWidgetsById(id: string, type: string) {
    let index = this.config[type]?.findIndex((k: any) => k.id === id);
    if (index === -1) {
      index = this.config[type]?.findIndex((k: any) => k.type === id);
    }
    return index;
  }
}
