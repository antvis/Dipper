import { IWidgetProps, BaseWidget } from '@antv/dipper-core';

export default class BaseLayout extends BaseWidget<any, any> {
  public widgets: IWidgetProps<any>[] = [];
  constructor(props: IWidgetProps) {
    super(props);
    this.initWidgets();
  }

  private initWidgets() {
    const option = this.getOptions();
    this.widgets = [...(option.subChildren || [])];
  }
}
