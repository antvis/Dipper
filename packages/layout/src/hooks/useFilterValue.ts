import { useEffect, useState } from 'react';
import { IWidget, IWidgetProps, WidgetsEventEnum, WidgetsServiceEnum } from '@antv/dipper-core';
import { useWidgetsService } from './useWidgetsService';

export function useFilterValue(components: IWidgetProps[], type: string) {
  const { widgetsService } = useWidgetsService();
  const [filterValue, setFilterValue] = useState<Record<string, any>[]>(null!);
  const [filterIds, setFilterIds] = useState<string[]>([]);
  const [widgets, setWidgets] = useState<Record<string, IWidget>>({});

  useEffect(() => {
    if (!components || !components.length) {
      return;
    }

    setFilterIds(
      (components || [])
        .filter((component: IWidgetProps) => component.type.toLocaleLowerCase().includes(type))
        .map((component: IWidgetProps) => component.id || component.type),
    );
  }, [components, type]);

  useEffect(() => {
    filterIds.forEach((id) => {
      const widgetsAdd = (newWidget: IWidget) => {
        if (newWidget.id === id) {
          setWidgets((prev) => ({ ...prev, [id]: newWidget }));
        }
      };
      const widget = widgetsService.getWidget(id);
      if (widget) {
        setWidgets((prev) => ({ ...prev, [id]: widget }));
      } else {
        widgetsService.on(WidgetsServiceEnum.ADD, widgetsAdd);
      }
    });
  }, [filterIds, widgetsService]);

  useEffect(() => {
    Object.keys(widgets).forEach((key) => {
      setFilterValue((prev) => ({ ...prev, [key]: widgets[key].getValue() }));
      const onValueChange = (e: any) => {
        setFilterValue((prev) => ({ ...(prev || {}), [key]: e }));
      };
      widgets[key]?.on(WidgetsEventEnum.VALUE_CHANGE, onValueChange);
    });
  }, [widgets]);

  return filterValue;
}
