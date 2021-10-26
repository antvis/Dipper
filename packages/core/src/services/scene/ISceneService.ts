import type { Scene } from '@antv/l7';
import type EventEmitter from 'eventemitter3';
import type { Container } from 'inversify';

export type ISceneEventName = 'sceneChange';

// export interface IConfig {
//   header: Partial<{
//     display: boolean;
//     style: React.CSSProperties;
//   }>;
//   logo: Partial<{
//     display: boolean;
//     img: string;
//     style: React.CSSProperties;
//     href: string;
//   }>;
//   title: Partial<{
//     text: string;
//     display: boolean;
//     style: React.CSSProperties;
//   }>;
// }

export interface ISceneService extends EventEmitter<ISceneEventName> {
  scene: Scene | undefined;
  container: Container | undefined;
  init: (container: Container) => void;
  setScene: (scene: Scene) => void;
  getScene: () => Scene | undefined;
}
