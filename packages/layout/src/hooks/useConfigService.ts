import { useInjection } from 'inversify-react';
import { ConfigEventEnum, IConfigService, TYPES, IConfig } from '@antv/dipper-core';
import { useEffect, useState } from 'react';

export function useConfigService() {
  const configService = useInjection<IConfigService>(TYPES.CONFIG_SYMBOL);
  const [globalConfig, setCfg] = useState<Partial<IConfig>>(configService.config);
  const [globalData, setGlobal] = useState(configService.getGlobal() || {});

  useEffect(() => {
    configService.on(ConfigEventEnum.CONFIG_CHANGE, (cfg: any) => {
      setCfg(cfg);
    });
    configService.on(ConfigEventEnum.GLOBAL_CHANGE, (cfg: any) => {
      setGlobal(cfg.global);
    });
  }, []);

  const setConfig = (field: string, value: any) => {
    return configService.setConfig(field, value);
  };

  const updateLegend = (id: string, value: any) => {
    return configService.updateLegend(id, value);
  };

  const updateControl = (type: string, value: any) => {
    return configService.updateControl(type, value);
  };

  const setWidgetsInitOptions = (key: string, options: Record<string, any>) => {
    return configService.setWidgetsInitOptions(key, options);
  };

  const setWidgetsInitValue = (key: string, options: Record<string, any>) => {
    return configService.setWidgetsInitValue(key, options);
  };

  const getWidgetsInitOptions = (key: string) => {
    return configService.getWidgetsInitOptions(key);
  };

  const getWidgetsInitValue = (key: string) => {
    return configService.getWidgetsInitValue(key);
  };

  const setGlobalData = (key: string, value: any) => {
    return configService.setGlobal(key, value);
  };

  const setGlobalData = (key: string, value: any) => {
    return configService.setGlobal(key, value);
  };

  return {
    globalConfig,
    globalData,
    setGlobalData,
    setConfig,
    updateLegend,
    updateControl,
    setWidgetsInitOptions,
    getWidgetsInitOptions,
    setWidgetsInitValue,
    getWidgetsInitValue,
    configService,
  };
}
