import type { GlobalModel, IConfigService } from '@antv/dipper-core';
import { ConfigEventEnum, TYPES } from '@antv/dipper-core';
import { useInjection } from 'inversify-react';
import { useCallback, useEffect, useState } from 'react';

export function useGlobalModel<T = GlobalModel>() {
  const configService = useInjection<IConfigService>(TYPES.CONFIG_SYMBOL);
  const [globalData, setGlobal] = useState<T>((configService.getGlobalData() || {}) as T);

  useEffect(() => {
    configService.on(ConfigEventEnum.GLOBAL_CHANGE, (cfg: any) => {
      setGlobal(cfg.global);
    });
  }, []);

  const setGlobalData = useCallback(
    (value: GlobalModel | ((prevState: GlobalModel) => GlobalModel)) => {
      if (value instanceof Function) {
        const data = value(globalData);
        if (typeof data !== 'object') {
          throw new Error("setGlobalData: return data is't object");
        }
        configService.setGlobalData(data);
      } else {
        configService.setGlobalData({
          ...globalData,
          ...value,
        });
      }
    },
    [globalData],
  );

  return [globalData, setGlobalData];
}
