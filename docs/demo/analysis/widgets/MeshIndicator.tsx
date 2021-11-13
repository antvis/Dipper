import React, { useMemo } from 'react'
import { useLayerGroup } from '@antv/dipper';
import { MeshName } from '../../task/widgets/MeshName'


export function MeshIndicator() {
  const { selectFeatures, updateProperties } = useLayerGroup('grid')

  const meshName = useMemo(() => {
    if (!selectFeatures.length) return []
    return selectFeatures.map((item) => {
      // @ts-ignore
      return item.feature.properties.name
    })
  }, [selectFeatures])


  const MoreMeshName = () => {
    return (
      <div style={{ padding: 15}}>
        {meshName.length >= 2 && meshName.map((s) => {
          return (
            <span key={s}>{s},</span>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      {meshName.length === 1 ? <MeshName /> : <MoreMeshName />}
    </div>
  )
}