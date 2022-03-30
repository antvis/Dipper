import { useInjection } from 'inversify-react';
import { ConfigEventEnum, IConfigService, TYPES, IConfig } from '@antv/dipper-core';
import { useEffect, useState, useCallback } from 'react';

export function useGlobalModel() {
  const configService = useInjection<IConfigService>(TYPES.CONFIG_SYMBOL);
  const [globalData, setGlobal] = useState(configService.getGlobalData() || {});

  useEffect(() => {
    configService.on(ConfigEventEnum.GLOBAL_CHANGE, (cfg: any) => {
      setGlobal(cfg.global);
    });
  }, []);

  const setGlobalData = useCallback(
    (value: Record<string, any> | ((prevState: Record<string, any>) => Record<string, any>)) => {
      if (typeof value === 'function') {
        const data = value(globalData);
        configService.setGlobalData(data);
      } else {
        configService.setGlobalData(value);
      }
    },
    [],
  );

  return [globalData, setGlobalData];
}
