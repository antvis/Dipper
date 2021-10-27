import { useInjection } from 'inversify-react';
import {
  ConfigEventEnum,
  IConfigService,
  TYPES,
  IConfig,
} from '@antv/dipper-core';
import { useEffect, useState } from 'react';

export function useConfigService<T>() {
  const configService = useInjection<IConfigService<T>>(TYPES.CONFIG_SYMBOL);
  const [globalConfig, setCfg] = useState<Partial<IConfig<T>>>(
    configService.config,
  );

  useEffect(() => {
    configService.on(ConfigEventEnum.CONFIG_CHANGE, (cfg: any) => {
      setCfg(cfg);
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

  return {
    globalConfig,
    setConfig,
    updateLegend,
    updateControl,
    configService,
  };
}