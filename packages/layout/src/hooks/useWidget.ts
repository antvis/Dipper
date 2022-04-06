import { useState, useEffect } from 'react';
import { WidgetsServiceEnum } from '@antv/dipper-core';
import type { IWidgetProps, IWidget } from '@antv/dipper-core';
import { useInjection } from 'inversify-react';
import { TYPES, WidgetEventEnum } from '@antv/dipper-core';
import type { IWidgetsService } from '@antv/dipper-core';

export function useWidget(id: string) {
  const widgetsService = useInjection<IWidgetsService>(TYPES.WIDGETS_SYMBOL);
  const [widget, setWidget] = useState<IWidget>();
  const [widgetOptions, setWidgetOptions] = useState<IWidgetProps>();
  const [widgetValue, setWidgetValue] = useState<any>();

  useEffect(() => {
    const widgetsAdd = (newWidget: IWidget) => {
      if (!widget && newWidget.id === id) {
        setWidget(newWidget);
      }
    };
    const _widget = widgetsService.getWidget(id);
    if (_widget) {
      setWidget(_widget as IWidget);
      setWidgetValue(_widget.getValue());
      setWidgetOptions(_widget.getOptions());
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
        setWidgetValue(e);
      };
      const onOptionsChange = (e: any) => {
        setWidgetOptions(e);
      };
      widget?.on(WidgetEventEnum.VALUE_CHANGE, onValueChange);
      widget?.on(WidgetEventEnum.OPTIONT_CHANGE, onOptionsChange);
      return () => {
        widget?.off(WidgetEventEnum.VALUE_CHANGE, onValueChange);
        widget?.off(WidgetEventEnum.OPTIONT_CHANGE, onOptionsChange);
      };
    }
  }, [widget]);

  const setOptions = (options: Partial<IWidgetProps<any>>) => {
    return widget?.setOptions(options);
  };
  const setValue = (values: any) => {
    return widget?.setValue(values);
  };

  return {
    widget,

    widgetValue,
    widgetsValue: widgetValue, // 兼容旧 API
    setValue,
    setValues: setValue, // 兼容旧 API

    widgetOptions,
    widgetsOptions: widgetOptions, // 兼容旧 API
    setOptions,
    setOption: setOptions, // 兼容旧 API
  };
}

// 兼容旧 API
export const useWidgets = useWidget;
