import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import styles from './index.less';
import { Input } from 'antd';
import { useLayerGroup, useConfigService } from '@antv/dipper';
import _ from 'loadsh';

export function MeshName() {
  const { selectFeatures, updateProperties } = useLayerGroup('grid');
  const [edit, setEdit] = useState(false);
  const ref = useRef();
  const { globalConfig, setConfig } = useConfigService();
  const { panel } = globalConfig;

  /**
   * get meshname
   * type []string
   */
  const meshName = useMemo(() => {
    if (!selectFeatures.length) return [];
    return selectFeatures.map((item) => {
      // @ts-ignore
      return item.feature.properties.name;
    });
  }, [selectFeatures]);

  // 修改 网格名称
  const editMeshName = useCallback(() => {
    // @ts-ignore
    const value = ref.current.state.value;
    selectFeatures.forEach((item) => {
      const properties = {
        ...item.feature.properties,
        name: value,
      };
      updateProperties(item.feature, properties);
    });
    setEdit(false);
  }, [selectFeatures]);

  // select more meshname 编辑 网格名称
  const EditMeshName = () => {
    return (
      <>
        {!edit ? (
          <div onClick={() => setEdit(!edit)}>
            <span>{meshName}</span>
            <EditOutlined />
          </div>
        ) : (
          <div className={styles.edit}>
            <Input defaultValue={meshName} ref={ref} />
            <CheckOutlined
              onClick={editMeshName}
              className={styles.closeicon}
            />
            <CloseOutlined onClick={() => setEdit(false)} />
          </div>
        )}
      </>
    );
  };

  // show 多个网格名称
  const ShowMeshNames = () => {
    return (
      <div style={{ padding: 15 }}>
        {meshName.length >= 2 &&
          meshName.map((s) => {
            return <span key={s}>{s},</span>;
          })}
      </div>
    );
  };

  useEffect(() => {
    if (selectFeatures.length) {
      const findIdBySiderbartabcontent = (panel.children || []).findIndex(
        (item) => item.type === 'siderbartabcontent',
      );
      const findIdMeshchart = (panel.children || []).findIndex(
        (item) => item.type === 'meshchart',
      );
      // TODO 报错
      setConfig(`panel.children.2.display`, true);
      // setConfig(`panel.children.${findIdMeshchart}.display`, false)
    }
    console.log('panel', globalConfig);
  }, [selectFeatures]);

  return (
    <>
      {meshName && meshName.length ? (
        <div className={styles.meahname}>
          {meshName.length === 1 ? <EditMeshName /> : <ShowMeshNames />}
        </div>
      ) : (
        <h4 style={{ padding: 15 }}>所有网格数据概览</h4>
      )}
    </>
  );
}
