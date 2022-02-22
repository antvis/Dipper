import type EventEmitter from 'eventemitter3';
import type { IMapConfig, IPopupOption } from '@antv/l7';
import type {
  IWidgetProps,
  IControlWidgetsProps,
} from '../widgets/IWidgetsService';
import type { IPanel } from '../panel/IPanelService';

export interface IToolBar {
  display?: boolean;
  components?: IWidgetProps[];
  children?: React.ReactNode;
}

export interface IConfig {
  widgets?: {
    [key: string]: {
      options?: Record<string, any> | Record<string, any>[]; // 初始化数据
      value?: Record<string, any> | Record<string, any>[]; // 结果数据
    };
  };
  global?: Record<string, any>;
  headerbar:
    | {
        display?: boolean;
        options: {
          headerstyle?: React.CSSProperties;
          logo?: Partial<{
            display: boolean;
            value: string;
            style: React.CSSProperties;
            href: string;
          }>;
          title: Partial<{
            url?: string;
            value: string;
            display: boolean;
            style: React.CSSProperties;
          }>;
        };
        components?: IWidgetProps[];
        children?: React.ReactNode;
      }
    | false;
  panel: Partial<IPanel>;
  toolbar: IToolBar[];
  mapType?: 'GaodeV1' | 'GaodeV2' | 'MapBox' | 'Map';
  map: Partial<IMapConfig>;
  popup: {
    // 信息框
    display?: boolean; // 是否显示
    enable?: boolean; // 是否生效
    options?: Partial<IPopupOption>;
    lngLat?:
      | number[]
      | {
          lng: number;
          lat: number;
        };
    children?: React.ReactNode;
  };
  controls: IControlWidgetsProps[]; // 自定义组件配置
  defaultcontrols: IWidgetProps[]; // 地图自带组件
  legends: IWidgetProps[];
  layers: {
    type: string;
    options: any;
  }[];
  [key: string]: any;
}

export interface IConfigService extends EventEmitter {
  config: Partial<IConfig>;
  reset: () => void;
  init: (config: Partial<IConfig> | undefined) => void;
  setConfig: (field: string, value: any) => void;
  getConfig: (key: string) => any;
  updateLegend: (id: string, value: any) => void;
  updateControl: (type: string, value: any) => void;
  setWidgetsOptions: (key: string, options: Record<string, any>) => void;
  getWidgetsValue: (key: string) => Record<string, any> | undefined;
  setWidgetsValue: (key: string, options: Record<string, any>) => void;
  getWidgetsOptions: (key: string) => Record<string, any> | undefined;
}
