import type { IWidgetProps} from '@antv/dipper';
import { useConfigService } from '@antv/dipper';
import { Select } from 'antd';
import React from 'react';
const { Option } = Select;
const ControlPosition = (props: IWidgetProps) => {
  const { updateControl } = useConfigService();
  console.log(props.options);
  return (
    <Select
      defaultValue="topleft"
      style={{ width: 120 }}
      onChange={(e) => {
        updateControl('mapStyle', {
          position: e,
        });
      }}
    >
      {[
        'bottomleft',
        'bottomright',
        'topleft',
        'topright',
        'topcenter',
        'bottomcenter',
        'leftcenter',
        'rightcenter',
      ].map((value: string) => {
        return (
          <Option key={value} value={value}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
};

export default ControlPosition;
