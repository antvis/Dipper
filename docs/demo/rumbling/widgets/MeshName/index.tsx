import React, { useRef, useState } from "react"
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined
} from '@ant-design/icons'
import styles from './index.less'
import { Input } from "antd"
import { useLayerGroup } from '@antv/dipper';

export function MeshName() {
  const { selectFeatures } = useLayerGroup()
  const [edit, setEdit] = useState(false)
  const ref = useRef()


  console.log('selectFeatures',selectFeatures)

  const editMeshName = () =>{
    console.log('4444',ref.current?.props?.value)
    setEdit(false)
  }

  return (
    <div className={styles.meahname}>
      {!edit ? <div onClick={() => setEdit(!edit)}>
        <span>网格-001</span>
        <EditOutlined />
      </div>
        : <div className={styles.edit}>
          <Input value="网格-001" ref={ref} />
          <CheckOutlined
          onClick={editMeshName}
          className={styles.closeicon}
          />
          <CloseOutlined onClick={()=>setEdit(false)} />
        </div>
      }
    </div>
  )
}
