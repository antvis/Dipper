import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isDisplay } from '../../../util/ui';
import { Control, CustomControl } from '@antv/l7-react';
import type { IControlOption, PositionName, Scene } from '@antv/l7';
import { useConfigService, useSceneService } from '../../../hooks';
import { AppMapControlContent, LayoutContent } from '../../baseLayout';
import { CustomBaseWidgets } from '../../../baseWidget/widget';
import { groupBy } from 'lodash';
import { getWidgetChildren } from '@antv/dipper-core';
import { FloatingPanel } from 'antd-mobile';
import styles from './index.less';

const anchors = [100, window.innerHeight * 0.4, window.innerHeight * 0.8];
const THRESHOLD = window.innerHeight * 0.7;

export default function MapControl() {
  const { globalConfig } = useConfigService();
  const { controls, legends = [], defaultcontrols, panel } = globalConfig;
  const controlGroupBy = useMemo(() => {
    if (panel && panel.display) {
      return groupBy(
        controls?.filter(
          (item) =>
            isDisplay(item.display) && !['bottomleft', 'bottomright'].includes(item.position!),
        ),
        (c) => {
          const defaultLayout = c.position === 'topleft' ? 'horizontal' : 'vertical';
          return [c.position, c.layout || defaultLayout].join('-');
        },
      );
    }

    return groupBy(
      controls?.filter((item) => isDisplay(item.display)),
      (c) => {
        const defaultLayout = c.position === 'topleft' ? 'horizontal' : 'vertical';
        return [c.position, c.layout || defaultLayout].join('-');
      },
    );
  }, [controls, panel]);

  return (
    <>
      {defaultcontrols
        ?.filter((item: any) => isDisplay(item.display))
        .map((item: any, index: number) => {
          const key = `${item.type}${index}`;
          const { position } = item as IControlOption;
          return <Control key={key} type={item.type} position={position} {...item.options} />;
        })}
      {Object.keys(controlGroupBy).map((key: string) => {
        const [position, layout] = key.split('-');

        const flexDirection = layout === 'horizontal' ? 'row' : 'column';
        return (
          <CustomControl
            key={key}
            position={position as PositionName}
            style={{ display: 'flex', flexDirection, gap: '8px' }}
          >
            {controlGroupBy[key].map((c, index) => (
              <CustomBaseWidgets key={c.type + index} {...c} />
            ))}
          </CustomControl>
        );
      })}
      {/* 添加图例 */}
      <AppMapControlContent items={legends} />
    </>
  );
}

export function BottomControl() {
  const { globalConfig } = useConfigService();
  const { sceneService } = useSceneService();
  const scene = useRef<Scene>(null!);
  const { panel, controls } = globalConfig;
  const [top, setTop] = useState(0);
  const { position } = useSceneService();
  const [height, setHeight] = useState<number>(null!);
  const [showControl, setShowControl] = useState(true);

  const controlGroupBy = useMemo(() => {
    return groupBy(
      controls?.filter(
        (item) => isDisplay(item.display) && ['bottomright', 'bottomleft'].includes(item.position!),
      ),
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
        setHeight(height);
      }
    },
    [sceneService, position],
  );

  useEffect(() => {
    if (!position || height == null) {
      return;
    }

    if (Math.abs(height) > THRESHOLD) {
      setShowControl(false);
    } else if (Math.abs(height) < THRESHOLD) {
      setShowControl(true);
    }

    scene.current.setCenter(position, {
      padding: [0, 0, -height, 0],
    });
  }, [height, position]);

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
      {showControl ? (
        <div id="panel-control" className={styles['panel-control']} style={{ top: -(top + 13) }}>
          {Object.keys(controlGroupBy).map((position, index) => {
            return controlGroupBy[position].map((c, index) => (
              <CustomBaseWidgets key={c.type + index} {...c} />
            ));
          })}
        </div>
      ) : null}
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
