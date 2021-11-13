import React, { useRef, useState, useMemo, useCallback } from "react"
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined
} from '@ant-design/icons'
import styles from './index.less'
import { Input } from 'antd'
import { useLayerGroup } from '@antv/dipper';

export function MeshName() {
  const { selectFeatures, updateProperties } = useLayerGroup('grid')
  const [edit, setEdit] = useState(false)
  const ref = useRef()

  const meshName = useMemo(() => {
    if (!selectFeatures.length || selectFeatures.length >= 2) return
    // @ts-ignore
    return selectFeatures[0]?.feature.properties.name
  }, [selectFeatures])

  console.log('meshName',meshName)

  const editMeshName = useCallback(() => {
    // @ts-ignore
    const value = ref.current.state.value
    selectFeatures.forEach((item) => {
      const properties = {
        ...item.feature.properties,
        name: value
      }
      updateProperties(item.feature, properties)
    })
    setEdit(false)
  }, [selectFeatures])

  return (
    <>
      {meshName && <div className={styles.meahname}>
        {!edit ? <div onClick={() => setEdit(!edit)}>
          <span>{meshName}</span>
          <EditOutlined />
        </div>
          : <div className={styles.edit}>
            <Input defaultValue={meshName} ref={ref} />
            <CheckOutlined
              onClick={editMeshName}
              className={styles.closeicon}
            />
            <CloseOutlined onClick={() => setEdit(false)} />
          </div>
        }
      </div>}
    </>

  )
}
