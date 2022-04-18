import {
  useSceneService,
  useConfigService,
  LayerGroupEventEnum,
  useLayerService,
} from '@antv/dipper';
import React, { useEffect, useMemo, useState } from 'react';
import { GridLayerGroup, useWidget } from '@antv/dipper';
const formatLegend = (data: any[]) => {
  return data.map((item) => {
    if (Array.isArray(item.value)) {
      return {
        ...item,
        value: item.value.map((v) => v.toFixed(2)),
      };
    } else {
      return {
        ...item,
        value: item.value.toFixed(2),
      };
    }
  });
};
export function GridLayer() {
  const { layerService } = useLayerService();
  const { sceneService } = useSceneService();
  const { globalConfig, updateControl } = useConfigService();
  const { layers } = globalConfig;
  const [gridLayer, setGridLayer] = useState<GridLayerGroup>();
  const { widgetsValue: cityValue } = useWidget('citySelect');
  const [geoData, setGeoData] = useState();

  const layerProps = useMemo(() => {
    return layers?.find((item: any) => item.type === 'gridLayer');
  }, [layers]);

  const updateLayerLegend = (items: any[]) => {
    updateControl('gridLayerLegend', {
      type: 'multiClassifyColor',
      id:'gridLayerLegend',
      display: true,
      position: 'bottomleft',
      options: {
        title: '网格',
        unkownName: layerProps.options.unkownName,
        items: [
          {
            colors: ['#BEC3BD', '#A1A6A0', '#828681', '#646763'],
            title: '已分配',
          },
          {
            colors: ['#CFE1B9', '#B0C298', '#90A276', '#718355'],
            title: '未分配',
          },
        ],
        values: items.map((item) => {
          return item.value.map((v) => {
            return (v / 10000).toFixed(2);
          });
        }),
      },
    });
  };

  // 根据筛选器条件请求数据
  useEffect(() => {
    if (!cityValue) {
      return;
    }
    // 可以根据业务需求配置接口
    fetch(`https://gw.alipayobjects.com/os/antvdemo/assets/dipper-city/${cityValue[1]}.json`)
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data);
      });
    // 切换城市 高德地图方法
    sceneService.getScene()?.map?.setCity(cityValue[1]);
  }, [JSON.stringify(cityValue)]);

  useEffect(() => {
    if (!geoData) {
      return;
    }
    if (gridLayer) {
      gridLayer.setData(geoData);
      return;
    }

    const layer = new GridLayerGroup({
      name: 'grid',
      data: geoData,
      options: {
        text: {
          field: 'name',
        },
        normal: {
          fillColor: {
            field: 'unit_price',
            value: ['#CFE1B9', '#B0C298', '#90A276', '#718355'],
          },
          scale: {
            unit_price: {
              type: 'quantile',
            },
          },
          borderWidth: 1,
          borderColor: '#ffffff',
        },
      },
    });

    layerService.addLayerGroup(layer);

    layer.on(LayerGroupEventEnum.DATA_UPDATE, () => {
      layer.getLegendItem().map((item) => {
        if (Array.isArray(item.value)) {
          return {
            ...item,
            value: item.value.map((v) => v.toFixed(2)),
          };
        } else {
          return {
            ...item,
            value: item.value.toFixed(2),
          };
        }
      });
      updateLayerLegend(formatLegend(layer.getLegendItem()));
    });
    // 更新图例
    updateLayerLegend(formatLegend(layer.getLegendItem()));

    setGridLayer(layer);
  }, [geoData, cityValue]);

  return <></>;
}
