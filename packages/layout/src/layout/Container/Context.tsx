import React, { useEffect } from 'react';
import { useUnmount } from 'ahooks';
import { Provider } from 'inversify-react';
import type { IConfig } from '@antv/dipper-core';
import { Dipper } from '@antv/dipper-core';
import { useDipperContainer } from '../../hooks';
import type { Container } from 'inversify';

interface IContainerProps {
  cfg: IConfig;
  onLoad?: (sceneContainer: Dipper) => void;
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
    <>
      {/* 
        // @ts-ignore */}
      <Provider container={sceneContainer?.getContainer() as Container}>{children}</Provider>
    </>
  ) : (
    <></>
  );
}
