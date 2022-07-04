import type { Dipper, IBaseConfig } from '@antv/dipper-core';
import { useUnmount } from 'ahooks';
import type { Container } from 'inversify';
import { Provider } from 'inversify-react';
import React, { useEffect, useState } from 'react';
import { useDipperContainer } from '../../hooks';

export interface IContainerProps<T = any> {
  /** 布局根容器，初始化化上下文 */
  cfg: IBaseConfig & T;
  /** 回调函数 */
  onLoad?: (sceneContainer: Dipper) => void; //
  /** 子组件 */
  children?: React.ReactNode;
}

export function DipperContainerContext<T = any>({ cfg, children, onLoad }: IContainerProps<T>) {
  const [providerKey] = useState(Math.random());
  const { sceneContainer } = useDipperContainer<T>(cfg);
  useUnmount(() => {
    if (sceneContainer) {
      sceneContainer.destroy();
    }
  });
  useEffect(() => {
    if (sceneContainer && onLoad) {
      onLoad(sceneContainer);
    }
  }, [sceneContainer]);

  return sceneContainer ? (
    // key for rendering: https://github.com/Kukkimonsuta/inversify-react/blob/master/src/provider.tsx#L50
    <Provider key={providerKey} container={sceneContainer?.getContainer() as Container}>
      {children}
    </Provider>
  ) : (
    <></>
  );
}
