import { IWidgetProps, IWidgetsService } from '@antv/dipper-core';
import BaseWidget from '../BaseWidget';

export default class BaseLayout<IOptions, IValue> extends BaseWidget<
  IOptions,
  IValue
> {
  constructor(props: IWidgetProps<IOptions>, widgetsService: IWidgetsService) {
    super(props);

    if (props.subChildren) {
      props.subChildren.forEach((child) => {
        if (child.subChildren) {
          widgetsService.addWidget(new BaseLayout(child, widgetsService));
          return;
        }

        widgetsService.addWidget(new BaseWidget(child));
      });
    }
  }
}
