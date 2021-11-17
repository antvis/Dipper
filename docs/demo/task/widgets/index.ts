import { registerWidget } from '@antv/dipper-core';
import {
  CitySelect,
  SiderBar,
  NavBar,
  ClassifyColor,
  DiscreteColor,
  Location,
  MapStyle,
} from '@antv/dipper-widgets';
import { Activity } from './Activity';
import { ActivityTask } from './ActivityTask';
import { GridLayer } from './GridLayer';
import { MapExhibit } from './MapExhibit';
import { MeshName } from './MeshName/index';
import { Save } from './Save';
import { SearchPerson } from './SearchPerson';
import { Send } from './Send';
import { Status } from './Status';
import { MeshTools } from './MeshTools';

export function initWidgets() {
  registerWidget('citySelect', CitySelect);
  registerWidget('siderbartabcontent', SiderBar);
  registerWidget('navibar', NavBar);
  registerWidget('gridLayer', GridLayer);
  registerWidget('classifyColor', ClassifyColor);
  registerWidget('discreteColor', DiscreteColor);
  registerWidget('mapStyle', MapStyle);
  registerWidget('location', Location);
  registerWidget('meshName', MeshName);
  registerWidget('meshTools', MeshTools);

  registerWidget('save', Save);
  registerWidget('publishbar', Send);
  registerWidget('activity', Activity);
  registerWidget('status', Status);
  registerWidget('mapExhibit', MapExhibit);
  registerWidget('searchPerson', SearchPerson);
  registerWidget('activityTask', ActivityTask);
}
