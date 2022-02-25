import React, { useEffect } from 'react';
import { useUnmount } from 'ahooks';
import { Provider } from 'inversify-react';
import type { IConfig } from '@antv/dipper-core';
import { Dipper } from '@antv/dipper-core';
import { useDipperContainer } from '../../hooks';
import type { Container } from 'inversify';

export interface IContainerProps {
  /** 布局根容器，初始化化上下文 */
  cfg: IConfig;
  /** 回调函数 */
  onLoad?: (sceneContainer: Dipper) => void; //
  /** 子组件 */
  children?: React.ReactNode;
}

export function DipperContainerContext({ cfg, children, onLoad }: IContainerProps) {
  const { sceneContainer } = useDipperContainer(cfg);
  useUnmount(() => {
    if (sceneContainer) {
      sceneContainer.destroy();
    }
  });
  useEffect(() => {
    if (sceneContainer && onLoad) {
      onLoad(sceneContainer);
    }
  }, []);

  return sceneContainer ? (
    <Provider container={sceneContainer?.getContainer() as Container}>{children}</Provider>
  ) : (
    <></>
  );
}
