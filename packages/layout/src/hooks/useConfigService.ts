import { useInjection } from 'inversify-react';
import type { IConfigService, IConfig } from '@antv/dipper-core';
import { ConfigEventEnum, TYPES } from '@antv/dipper-core';
import { useEffect, useState } from 'react';

export function useConfigService() {
  const configService = useInjection<IConfigService>(TYPES.CONFIG_SYMBOL);
  const [globalConfig, setCfg] = useState<Partial<IConfig>>(configService.config);

  useEffect(() => {
    configService.on(ConfigEventEnum.CONFIG_CHANGE, (cfg: any) => {
      setCfg(cfg);
    });
  }, []);

  const setConfig = (field: string, value: any) => {
    return configService.setConfig(field, value);
  };

  const updateLegend = (id: string, value: any) => {
    console.warn('请将 updateLegend 方法替换 updateControl 使用');
    return configService.updateControl(id, value);
  };

  const updateControl = (type: string, value: any) => {
    return configService.updateControl(type, value);
  };

  const setWidgetInitOptions = (key: string, options: Record<string, any>) => {
    return configService.setWidgetInitOptions(key, options);
  };

  const setWidgetInitValue = (key: string, options: Record<string, any>) => {
    return configService.setWidgetInitValue(key, options);
  };

  const getWidgetInitOptions = (key: string) => {
    return configService.getWidgetInitOptions(key);
  };

  const getWidgetInitValue = (key: string) => {
    return configService.getWidgetInitValue(key);
  };

  return {
    globalConfig,
    setConfig,
    updateLegend,
    updateControl,
    getWidgetInitOptions,
    getWidgetsInitOptions: getWidgetInitOptions, // 兼容旧 API
    setWidgetInitOptions,
    setWidgetsInitOptions: setWidgetInitOptions, // 兼容旧 API
    getWidgetInitValue,
    getWidgetsInitValue: getWidgetInitValue, // 兼容旧 API
    setWidgetInitValue,
    setWidgetsInitValue: setWidgetInitValue, // 兼容旧 API
    configService,
  };
}
