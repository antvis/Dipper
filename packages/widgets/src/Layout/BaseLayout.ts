import { IWidgetProps } from '@antv/dipper-core';
import BaseWidget from '../BaseWidget';

export default class BaseLayout<IOptions, IValue> extends BaseWidget<
  IOptions,
  IValue
> {
  constructor(props: IWidgetProps<IOptions>) {
    super(props);
  }
}
