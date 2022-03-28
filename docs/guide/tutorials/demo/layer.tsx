import React, { useEffect, useState } from 'react';
import { AMapScene, LoadImage, PointLayer } from '@antv/l7-react';
import {
  DipperContainer,
  registerWidget,
  useConfigService,
} from '@antv/dipper';
import { Select } from 'antd';
const { Option } = Select;

const ControlPosition = () => {
  const { updateControl } = useConfigService();
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
const pointLayer = () => {
  return (
    <>
      <LoadImage
        name="00"
        url="https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg"
      />
      <LoadImage
        name="01"
        url="https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg"
      />
      <LoadImage
        name="02"
        url="https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg"
      />
      <PointLayer
        key={'2'}
        options={{
          autoFit: true,
        }}
        source={{
          data: [
            {
              id: '5011000000404',
              name: '铁路新村(华池路)',
              longitude: 121.4316962,
              latitude: 31.26082325,
              unit_price: 71469.4,
              count: 2,
            },
            {
              id: '5011000002716',
              name: '金元坊',
              longitude: 121.3810096,
              latitude: 31.25302026,
              unit_price: 47480.5,
              count: 2,
            },
            {
              id: '5011000003403',
              name: '兰溪路231弄',
              longitude: 121.4086229,
              latitude: 31.25291206,
              unit_price: 55218.4,
              count: 2,
            },
          ],
          // @ts-ignore
          parser: {
            type: 'json',
            x: 'longitude',
            y: 'latitude',
          },
        }}
        shape={{
          field: 'name',
          values: ['00', '01', '02'],
        }}
        size={{
          values: 20,
        }}
        style={{
          opacity: 1,
        }}
      />
    </>
  );
};
const panelName = () => {
  return <h1>这是个文本</h1>;
};

// 注册图层
registerWidget('panelName', panelName);

registerWidget('controlPosition', ControlPosition);
registerWidget('pointLayer', pointLayer);

export default function RumbMap() {
  return (
    <div style={{ height: '500px' }}>
      <DipperContainer
        cfg={{
          controls: [
            {
              display: true,
              position: 'topleft',
              type: 'mapStyle',
              title: '地图样式',
            },
            {
              display: true,
              position: 'topright',
              type: 'controlPosition',
              title: '组件控制',
            },
          ],
          panel: {
            display: true,
            options: {
              enableToggle: true,
              defaultTitle: '所有网格',
              opened: true,
              width: 426,
            },
            position: 'right',
            components: [
              {
                display: true,
                type: 'panelName',
                title: '网格名称',
              },
            ],
          },
          layers: [
            {
              type: 'pointLayer',
              options: {},
            },
          ],
        }}
      />
    </div>
  );
}
