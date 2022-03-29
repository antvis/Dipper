import React, { useEffect } from 'react';
import { useLayerGroup } from '@antv/dipper-layout';

interface IProps {}

const MyPanel: React.FC<IProps> = () => {
  const { hoverFeature, selectFeatures } = useLayerGroup('point');

  useEffect(() => {
    console.log(hoverFeature);
  }, [hoverFeature]);

  useEffect(() => {
    console.log(selectFeatures);
  }, [selectFeatures]);

  return <div></div>;
};

export default MyPanel;
