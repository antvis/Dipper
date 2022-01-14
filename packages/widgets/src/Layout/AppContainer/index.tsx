import React, { FC, useEffect } from 'react';
import { useUnmount } from 'ahooks';
import { Layout } from 'antd';
import styles from './index.less';
import AppHeader from '../AppHeader';
import AppToolbar from '../AppToolbar';
import AppControl from '../AppControl';
import AppPanel from '../AppPanel';
import AppLayerControl from '../AppLayer';
import AppMap from '../AppMap';
import { Provider } from 'inversify-react';

import type { IConfig, IPanel } from '@antv/dipper-core';
import { Dipper } from '@antv/dipper-core';
import { useDipperContainer, useConfigService } from '../hooks';
import type { Container } from 'inversify';

const { Content } = Layout;

interface IContainerProps {
  cfg: IConfig;
  onLoad?: (sceneContainer: Dipper) => void;
}

export const ContainerContent: FC<
  Pick<IConfig, 'controls' | 'defaultcontrols' | 'legends' | 'panel'>
> = ({ controls, defaultcontrols, legends, panel, children }) => {
  return (
    <Content
      style={{
        flexDirection:
          panel?.position === 'bottom' || panel?.position === 'top'
            ? 'column'
            : 'row',
      }}
    >
      {/* 地图 */}
      <AppMap>
        <>
          {/* 地图控件 图例、比例尺 */}
          <AppControl
            defaultcontrols={defaultcontrols}
            legends={legends}
            controls={controls}
          />
          {/* 添加图层 */}
          <AppLayerControl />
          {/* 自定义内容 */}
          {children}
        </>
      </AppMap>
      {/* 地图信息栏 */}
      {/* <AppPanel panel={panel as IPanel} /> */}
    </Content>
  );
};

const DipperContainer: FC<IContainerProps> = ({ cfg, children, onLoad }) => {
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
      <Provider container={sceneContainer?.getContainer() as Container}>
        <Layout className={styles.pageMap}>
          {/* 导航栏 */}
          <AppHeader {...cfg.headerbar} />
          {/* 导航栏工具条 */}
          <AppToolbar {...cfg.toolbar} />
          {/* 地图区域 */}

          <ContainerContent
            controls={cfg.controls}
            defaultcontrols={cfg.defaultcontrols}
            legends={cfg.legends}
            panel={cfg.panel}
          >
            {children}
          </ContainerContent>
        </Layout>
      </Provider>
    </>
  ) : (
    <></>
  );
};

export default DipperContainer;
