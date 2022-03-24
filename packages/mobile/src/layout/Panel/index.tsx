import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  useConfigService,
  LayoutContent,
  useSceneService,
  BaseControl,
  CustomBaseWidgets,
} from '@antv/dipper-layout';
import type { Scene } from '@antv/l7';
import { groupBy } from 'lodash';
import { getWidgetChildren, isDisplay } from '@antv/dipper-core';
import { FloatingPanel } from 'antd-mobile';
import styles from './index.less';

const anchors = [50, window.innerHeight * 0.4, window.innerHeight * 0.8];
const THRESHOLD = window.innerHeight * 0.7;

export function MapPanel() {
  const { globalConfig } = useConfigService();
  const { sceneService } = useSceneService();
  const scene = useRef<Scene>(null!);
  const { panel, controls } = globalConfig;
  const [top, setTop] = useState(0);
  const prevHeight = useRef(0);
  const [showControl, setShowControl] = useState(true);

  const controlGroupBy = useMemo(() => {
    return groupBy(
      controls
        ?.filter(
          (item) =>
            isDisplay(item.display) && ['bottomright', 'bottomleft'].includes(item.position!),
        )
        .filter((item) => {
          return ['zoom', 'scale', 'layers'].indexOf(item.type) === -1;
        }),
      (c) => c.position,
    );
  }, [controls]);

  useEffect(() => {
    const panel = document.querySelector('#panel-control');
    setTop(panel?.clientHeight ?? 0);
  }, []);

  const onHeightChange = useCallback(
    (height: number, animating: boolean) => {
      if (!scene.current) {
        scene.current = sceneService.getScene()!;
      }
      if (!animating) {
        if (Math.abs(height) > THRESHOLD) {
          setShowControl(false);
        } else if (Math.abs(height) < THRESHOLD) {
          setShowControl(true);
        }
        const { lng, lat } = scene.current.getCenter();
        if (height === prevHeight.current) {
          return;
        }
        scene.current.setCenter([lng, lat], {
          padding: [
            0,
            0,
            Math.abs(prevHeight.current - height) * (height > prevHeight.current ? -1 : 1),
            0,
          ],
        });
        prevHeight.current = height;
      }
    },
    [sceneService],
  );

  return panel && panel.display ? (
    <FloatingPanel
      anchors={anchors}
      onHeightChange={onHeightChange}
      handleDraggingOfContent={false}
      style={{
        // @ts-ignore
        '--header-height': '40px',
        zIndex: 10000,
      }}
    >
      <div
        id="panel-control"
        className={styles['panel-control']}
        style={{ top: -(top + 13), display: showControl ? 'block' : 'none' }}
      >
        {/* 底部控件需要和滑块联动 */}
        {Object.keys(controlGroupBy).map((position, index) => {
          return controlGroupBy[position].map((c, index) => (
            <CustomBaseWidgets key={c.type + index} {...c} />
          ));
        })}
      </div>
      <div
        style={{
          display: 'flex',
          overflowY: 'auto',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <LayoutContent items={getWidgetChildren(panel)} />
      </div>
    </FloatingPanel>
  ) : null;
}
