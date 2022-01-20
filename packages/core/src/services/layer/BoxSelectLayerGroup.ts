import { cloneDeep, merge } from 'lodash';
import LayerGroup, { ILayerGroupProps } from './LayerGroup';

export interface IBoxSelectLayerGroupOptions {
  color: string;
  size: number;
  zIndex: number;
}

export const defaultBoxSelectOptions = {
  color: '#000000',
  size: 3,
  zIndex: 100,
};

export default class BoxSelectLayerGroup extends LayerGroup {
  constructor(props: ILayerGroupProps<IBoxSelectLayerGroupOptions>) {
    super(props);

    this.initLayer(this.options);
  }

  initLayer({ zIndex, size, color }: IBoxSelectLayerGroupOptions) {}

  getDefaultOptions(): IBoxSelectLayerGroupOptions {
    return cloneDeep(defaultBoxSelectOptions);
  }
}
