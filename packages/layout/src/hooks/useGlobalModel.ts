import { useInjection } from 'inversify-react';
import { ConfigEventEnum, IConfigService, TYPES, IConfig } from '@antv/dipper-core';
import { useEffect, useState } from 'react';

export function useGlobalModel() {
  const configService = useInjection<IConfigService>(TYPES.CONFIG_SYMBOL);
  const [globalData, setGlobal] = useState(configService.getGlobalData() || {});

  useEffect(() => {
    configService.on(ConfigEventEnum.GLOBAL_CHANGE, (cfg: any) => {
      setGlobal(cfg.global);
    });
  }, []);

  const setGlobalData = (data: Record<string, any>) => {
    return configService.setGlobalData(data);
  };

  return [globalData, setGlobalData];
}
