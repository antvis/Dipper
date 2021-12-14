import { TableOutlined } from '@ant-design/icons';
import { useLayerService } from '@antv/dipper';
import { Button, Modal, Table } from 'antd';
import React, { useEffect, useState, ReactNode } from 'react';

interface ColProps {
  title: string | ReactNode,
  dataIndex: string
}

interface TableData {
  column: Record<string, any>[];
  dataSource: Record<string, any>[];
  totalCount: number
}

export function PropertyTable() {
  const { layerService } = useLayerService()
  const [tableProperty, setTableProperty] = useState<TableData>()
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!layerService) { return }
    // @ts-ignore
    const geoSource = layerService.getLayerSource('grid')
    const obj: ColProps = {
      title: '',
      dataIndex: ''
    };
    const col: ColProps[] = []
    if (geoSource) {
      const geoProperty = (geoSource.features || []).map((ft: any) => ft.properties)
      geoProperty.forEach((props: Record<string, any>) => {
        Object.keys(props).forEach((key: string) => {
          const propertyKey = {
            title: `${key}[${typeof props[key]}]`,
            dataIndex: key
          }
          col.push(propertyKey)
        })
      })
      const column: TableData['column'] = col.reduce((item, cur: ColProps) => {
        const current = cur.dataIndex
        // @ts-ignore
        if (!obj[current]) { item.push(cur); obj[current] = true }
        return item;
      }, []);
      setTableProperty({
        column,
        dataSource: geoProperty,
        totalCount: geoProperty.length
      })
    }
    // @ts-ignore
  }, [JSON.stringify(layerService.getLayerSource('grid'))])

  return (
    <div>
      <Button icon={<TableOutlined />} onClick={() => setIsModalVisible(true)} />
      <Modal title='属性表' footer={null}
        destroyOnClose width={1400} visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}>
        <Table columns={tableProperty?.column} dataSource={tableProperty?.dataSource} />
      </Modal>
    </div>
  )
}
