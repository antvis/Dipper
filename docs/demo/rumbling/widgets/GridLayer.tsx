import {
  useSceneService,
  useConfigService,
  LayerGroupEventEnum,
  useLayerService,
} from '@antv/dipper';
import React, { useEffect, useMemo, useState } from 'react';
import { geojson } from '../configs/mock';
import { GridLayerGroup } from '@antv/dipper';

export function GridLayer() {
  const { layerService } = useLayerService();
  const { sceneService } = useSceneService();
  const { globalConfig, updateLegend, getWidgetsValue } = useConfigService();
  const { layers } = globalConfig;
  const [gridLayer, setGridLayer] = useState<GridLayerGroup>();
  const cityValue = getWidgetsValue('citySelect');
  const [geoData, setGeoData] = useState();

  const layerProps = useMemo(() => {
    return layers.find((item: any) => item.type === 'gridLayer');
  }, [layers]);

  const updateLayerLegend = (items: any[]) => {
    updateLegend('gridLayerLegend', {
      type: 'classifycolor',
      display: true,
      position: 'bottomleft',
      options: {
        targetName: '区域类型',
        unkownName: layerProps.options.unkownName,
        items,
      },
    });
  };

  // 根据筛选器条件请求数据
  useEffect(() => {
    // 可以根据业务需求配置接口
    fetch(
      `https://gw.alipayobjects.com/os/antvdemo/assets/dipper-city/${cityValue[1]}.json`,
    )
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data);
      });
    // 切换城市 高德地图方法
    sceneService.getScene().map?.setCity(cityValue[1]);
  }, [JSON.stringify(cityValue)]);

  useEffect(() => {
    if (!geoData) {
      return;
    }
    if (gridLayer) {
      console.log(gridLayer);
      gridLayer.setData(geoData);
      return;
    }

    const layer = new GridLayerGroup({
      name: 'grid',
      geodata: geoData,
      options: layerProps.options,
    });
    layerService.addLayer(layer);

    layer.on(LayerGroupEventEnum.DATAUPDATE, () => {
      updateLayerLegend(layer.getLegendItem());
    });

    // 更新图例
    updateLayerLegend(layer.getLegendItem());

    setGridLayer(layer);
  }, [geoData]);

  return <></>;
}