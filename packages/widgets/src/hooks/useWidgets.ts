import { IWidget, WidgetsServiceEnum } from '@antv/dipper-core';
import { useState, useEffect, useCallback } from 'react';
import type { IWidgetProps } from '@antv/dipper-core';
import { useInjection } from 'inversify-react';
import { TYPES, WidgetsEventEnum } from '@antv/dipper-core';
import type { IWidgetsService } from '@antv/dipper-core';

export function useWidgets(id: string, cb?: (e: any) => void) {
  const widgetsService = useInjection<IWidgetsService>(TYPES.WIDGETS_SYMBOL);
  const [widget, setWidget] = useState<IWidget>();
  const [widgetsOptions, setWidgetsOptions] = useState<IWidgetProps>();
  const [widgetsValue, setWidgetsValue] = useState<any>();

  useEffect(() => {
    const widgetsAdd = (e: IWidget) => {
      if (!widget) {
        setWidget(e);
      }
    };
    if (widgetsService.getWidget(id)) {
      setWidget(widgetsService.getWidget(id) as IWidget);
    } else {
      widgetsService.on(WidgetsServiceEnum.ADD, widgetsAdd);
    }
    return () => {
      widgetsService.off(WidgetsServiceEnum.ADD, widgetsAdd);
    };
  }, []);

  const valueCallback = useCallback(
    (e: any) => {
      setWidgetsValue(e);
      console.log(cb);
      cb?.({
        type: WidgetsEventEnum.VALUE_CHANGE,
        payload: e,
      });
    },
    [cb],
  );

  const optionCallback = useCallback(
    (e: any) => {
      setWidgetsValue(e);
      cb?.({
        type: WidgetsEventEnum.OPTIONT_CHANGE,
        payload: e,
      });
    },
    [cb],
  );

  useEffect(() => {
    console.log(111111);
    widget?.on(WidgetsEventEnum.VALUE_CHANGE, valueCallback);
    widget?.on(WidgetsEventEnum.OPTIONT_CHANGE, optionCallback);
  }, [widget, valueCallback, optionCallback]);

  return {
    widgetsOptions,
    widget,
    widgetsValue,
  };
}
