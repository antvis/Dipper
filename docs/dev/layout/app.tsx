import type { IFeature } from '@antv/dipper';
import { useGlobalModel, useLayerGroup, useWidget } from '@antv/dipper';
import React, { useEffect } from 'react';
const poidata = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 1,
      },
      geometry: {
        type: 'Point',
        coordinates: [115.11474609375001, 37.84883250647402],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 2,
      },
      geometry: {
        type: 'Point',
        coordinates: [116.114501953125, 36.527294814546245],
      },
    },
  ],
};

const aoidata = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 1,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [114.093017578125, 35.746512259918504],
            [117.3779296875, 35.746512259918504],
            [117.3779296875, 38.556757147352215],
            [114.093017578125, 38.556757147352215],
            [114.093017578125, 35.746512259918504],
          ],
        ],
      },
    },
  ],
};
export default function AppMap() {
  const { setOptions, widgetOptions } = useWidget('panelTabContent');
  const { setValue: setAoiValue, widget } = useWidget('aoilayer');
  const { setValue: setPoiValue } = useWidget('poilayer');
  const { layerGroup: aoilayer } = useLayerGroup('aoilayer');
  const { widgetOptions: popupOption, setOption: setPopupOption } = useWidget('popup');
  const [globaldata, setGlobalData] = useGlobalModel<any>();
  useEffect(() => {
    setPoiValue(poidata);
    setAoiValue(aoidata);
  }, [widget]);
  useEffect(() => {
    if (widgetOptions && widgetOptions?.components) {
      widgetOptions.components = widgetOptions?.components.map((co) => {
        // @ts-ignore
        co.options.disabled = false;
        return co;
      });
      setOptions(widgetOptions);
    }
  }, [JSON.stringify(widgetOptions)]);
  const popupHander = (e: IFeature) => {
    setPopupOption({
      display: true,
      options: {
        lngLat: e.lngLat,
        children: <h2>1122</h2>,
      },
    });
  };
  const popupOffHander = (e: IFeature) => {
    setPopupOption({
      display: false,
    });
  };

  useEffect(() => {
    if (aoilayer) {
      aoilayer.mainLayer.on('mousemove', popupHander);
      aoilayer.mainLayer.on('mouseout', popupOffHander);
      aoilayer.mainLayer.on('click', (ev: IFeature) => {
        setGlobalData({
          d: Math.random(),
        });
      });
    }
  }, [aoilayer]);
  return <></>;
}
