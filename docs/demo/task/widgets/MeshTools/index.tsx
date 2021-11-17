import React, { useMemo } from 'react';
import styles from './index.less'
import { MeshSplitSvg, MeshMergeSvg } from './SvgElement';
import { useLayerGroup } from '@antv/dipper'


export function MeshTools() {
  const { selectFeatures = [] } = useLayerGroup('grid')

  const disable = { cursor: 'pointer', opacity: 1 }
  const noDisable = { cursor: 'not-allowed', opacity: 0.25 }

  const cssPropsSplit = useMemo(() => {
    if (selectFeatures.length === 1) return disable
    return noDisable
  }, [selectFeatures])

  const cssPropsMerge = useMemo(() => {
    if (selectFeatures.length >= 2) {
      return disable
    }
    return noDisable
  }, [selectFeatures])

  const splitMesh = () => {
    // TODO 根据业务实现
  }

  const mergrMesh = () => {
    // TODO 根据业务实现
  }

  return (
    <div className={styles.meshTools}>
      <div style={{ ...cssPropsSplit }} onClick={splitMesh}>
        <MeshSplitSvg />
        <div style={{ width: 32 }}>网格拆分</div>
      </div>
      <div style={{ ...cssPropsMerge }} onClick={mergrMesh}>
        <MeshMergeSvg />
        <div style={{ width: 32 }}>网格合并</div>
      </div>
    </div>
  )
}
