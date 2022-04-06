import {
  useSceneService,
  useConfigService,
  LayerGroupEventEnum,
  useLayerService,
  useLayerGroup,
} from '@antv/dipper';
import React, { useEffect, useMemo, useState } from 'react';
import { GridLayerGroup, useWidget } from '@antv/dipper';
import { randomNumBoth } from '../configs/mock';
import { FeatureCollection } from '@turf/turf';

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
export function GridLayer({ options }: any) {
  const { layerService } = useLayerService();
  const { sceneService } = useSceneService();
  const { globalConfig, updateLegend, setConfig } = useConfigService();
  const { layers } = globalConfig;
  const [gridLayer, setGridLayer] = useState<GridLayerGroup>();
  const { widgetValue: cityValue } = useWidget('citySelect');
  const { widgetValue: brandValue } = useWidget('brand');
  const [geoData, setGeoData] = useState<FeatureCollection | undefined>();
  const { selectFeatures } = useLayerGroup('grid');

  // const gridLayerProps = useMemo(() => {
  //   return layers.find((item: any) => item.type === 'gridLayer');
  // }, [layers]);

  // const pointLayerProps = useMemo(() => {
  //   return layers.find((item: any) => item.type === 'pointLayer');
  // }, [layers]);
  //
  // const updateLayerLegend = (items: any[]) => {
  //   updateLegend('gridLayerLegend', {
  //     type: 'classifyColor',
  //     display: true,
  //     position: 'bottomleft',
  //     options: {
  //       title: '充电宝投放数量',
  //       unkownName: gridLayerProps.options.unkownName,
  //       items: items.map((item) => {
  //         return {
  //           color: item.color,
  //           value: item.value.map((v) => {
  //             return (v / 10000).toFixed(2);
  //           }),
  //         };
  //       }),
  //     },
  //   });
  // };

  // 根据筛选器条件请求数据
  useEffect(() => {
    if (!cityValue) {
      return;
    }
    // 可以根据业务需求配置接口
    fetch(
      `https://gw.alipayobjects.com/os/antvdemo/assets/dipper-city/${cityValue[1]}.json`,
    )
      .then((res) => res.json())
      .then((data) => {
        const geoDataList =
          data &&
          data.features?.map((item) => {
            return {
              ...item,
              properties: {
                ...item.properties,
                brand_type: randomNumBoth(1, 4).toString(), // 充电宝品牌
              },
            };
          });

        // 品牌 过滤
        if (brandValue && geoDataList) {
          // @ts-ignore
          const data =
            brandValue === '1'
              ? geoDataList
              : geoDataList.filter(
                  (item) => item.properties.brand_type === brandValue,
                );
          if (data.length) {
            // @ts-ignore
            setGeoData({ type: 'FeatureCollection', features: data });
          }
        } else {
          // @ts-ignore
          setGeoData({ type: 'FeatureCollection', features: geoDataList });
        }
      });
    // 切换城市 高德地图方法
    sceneService.getScene()?.map?.setCity(cityValue[1]);
  }, [JSON.stringify(cityValue), brandValue]);

  useEffect(() => {
    if (!geoData) {
      return;
    }
    if (gridLayer) {
      gridLayer.setData(geoData);
      return;
    }
    const newGridLayer = new GridLayerGroup({
      name: 'grid',
      data: geoData,
      options: {
        text: {
          field: 'name',
        },
        normal: {
          fillColor: {
            field: 'unit_price',
            value: [
              'rgb(247, 251, 255)',
              'rgb(222, 235, 247)',
              'rgb(198, 219, 239)',
              'rgb(158, 202, 225)',
              'rgb(107, 174, 214)',
              'rgb(66, 146, 198)',
              'rgb(33, 113, 181)',
              'rgb(8, 81, 156)',
              'rgb(8, 48, 107)',
            ],
          },
          scale: {
            unit_price: {
              type: 'quantile',
            },
          },
          borderWidth: 1,
          borderColor: '#ffffff',
          opacity: 1,
        },
        multipleSelect: true,
      },
    });

    layerService.addLayerGroup(newGridLayer);

    setGridLayer(newGridLayer);
  }, [geoData]);

  useEffect(() => {
    if (selectFeatures.length) {
      // TODO 报错
      setConfig(`panel.childrens.1.display`, false);
      setConfig(`panel.childrens.2.display`, true);
      // setConfig(`panel.childrens.${findIdMeshchart}.display`, false)
    } else {
      setConfig(`panel.childrens.1.display`, true);
      setConfig(`panel.childrens.2.display`, false);
    }
  }, [JSON.stringify(selectFeatures)]);

  return <></>;
}
