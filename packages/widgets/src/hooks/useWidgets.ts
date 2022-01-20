import { IWidget, WidgetsServiceEnum } from '@antv/dipper-core';
import { useState, useEffect, useCallback } from 'react';
import type { IWidgetProps } from '@antv/dipper-core';
import { useInjection } from 'inversify-react';
import { TYPES, WidgetsEventEnum } from '@antv/dipper-core';
import type { IWidgetsService } from '@antv/dipper-core';

export function useWidgets(id: string) {
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
    const widget = widgetsService.getWidget(id);
    if (widget) {
      setWidget(widget as IWidget);
      setWidgetsValue(widget.getValue());
    } else {
      widgetsService.on(WidgetsServiceEnum.ADD, widgetsAdd);
    }
    return () => {
      widgetsService.off(WidgetsServiceEnum.ADD, widgetsAdd);
    };
  }, [id]);

  useEffect(() => {
    widget?.on(WidgetsEventEnum.VALUE_CHANGE, (e: any) => {
      setWidgetsValue(e);
    });
    widget?.on(WidgetsEventEnum.OPTIONT_CHANGE, (e: any) => {
      setWidgetsOptions(e);
    });
  }, [widget]);

  return {
    widgetsOptions,
    widget,
    widgetsValue,
  };
}
