import type { IWidgetProps } from '@antv/dipper-core';
import { BaseWidget, getWidgetChildren } from '@antv/dipper-core';

export default class BaseLayout extends BaseWidget<any, any> {
  public widgets: IWidgetProps<any>[] = [];
  constructor(props: IWidgetProps) {
    super(props);
    this.initWidgets();
  }

  private initWidgets() {
    const option = this.getOptions();
    this.widgets = [...getWidgetChildren(option)];
  }
}
