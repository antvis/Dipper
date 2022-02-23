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
    const widgetsAdd = (newWidget: IWidget) => {
      if (!widget && newWidget.id === id) {
        setWidget(newWidget);
      }
    };
    const widget = widgetsService.getWidget(id);
    if (widget) {
      setWidget(widget as IWidget);
      setWidgetsValue(widget.getValue());
      setWidgetsOptions(widget.getOptions());
    } else {
      widgetsService.on(WidgetsServiceEnum.ADD, widgetsAdd);
    }
    return () => {
      widgetsService.off(WidgetsServiceEnum.ADD, widgetsAdd);
    };
  }, [id]);

  useEffect(() => {
    if (widget) {
      const onValueChange = (e: any) => {
        setWidgetsValue(e);
      };
      const onOptionsChange = (e: any) => {
        setWidgetsOptions(e);
      };
      widget?.on(WidgetsEventEnum.VALUE_CHANGE, onValueChange);
      widget?.on(WidgetsEventEnum.OPTIONT_CHANGE, onOptionsChange);
      return () => {
        widget?.off(WidgetsEventEnum.VALUE_CHANGE, onValueChange);
        widget?.off(WidgetsEventEnum.OPTIONT_CHANGE, onOptionsChange);
      };
    }
  }, [widget]);

  const setOption = (option: Partial<IWidgetProps<any>>) => {
    return widget?.setOptions(option);
  };
  const setValues = (values: any) => {
    return widget?.setValues(values);
  };

  return {
    widgetsOptions,
    widget,
    widgetsValue,
    setOption,
    setValues,
  };
}
