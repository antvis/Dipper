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
import { Amaps } from '../service/amaps';
import { useLayerGroup } from '../Layout/hooks';

export function MeshName() {
  const { selectFeatures, updateProperties } = useLayerGroup('grid');
  const [edit, setEdit] = useState(false);
  const ref = useRef(null);

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
  }, [JSON.stringify(selectFeatures)]);

  // 修改 网格名称
  const editMeshName = useCallback(() => {
    // @ts-ignore
    const value = ref.current.state.value;
    selectFeatures.forEach((item) => {
      const properties = {
        // @ts-ignore
        ...item?.feature?.properties,
        name: value,
      };
      // @ts-ignore
      updateProperties(item?.feature, properties);
    });
    setEdit(false);
  }, [JSON.stringify(selectFeatures)]);

  useEffect(() => {
    const amaps = new Amaps<number>({ serviceMethod: '' });
    getLayerArea(amaps);
  }, [selectFeatures]);

  const getLayerArea = useCallback(
    async (amaps: any) => {
      let area = 0;
      if (!selectFeatures.length) return;
      (selectFeatures || []).forEach(async (item: any) => {
        const points = item.feature.geometry.coordinates;
        await amaps.ringArea(points[0], 'km²');
        area = amaps.getResult();
      });
    },
    [selectFeatures],
  );

  // select more meshname 编辑 网格名称
  const EditMeshName = () => {
    return (
      <>
        {!edit ? (
          <div onClick={() => setEdit(!edit)}>
            <span>{meshName}</span>
            <EditOutlined style={{ paddingLeft: 12 }} />
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
      <div>
        {meshName.length >= 2 &&
          meshName.map((s) => {
            return <span key={s}>{s},</span>;
          })}
      </div>
    );
  };

  return (
    <>
      {meshName && meshName.length ? (
        <div className={styles.meahname}>
          {meshName.length === 1 ? <EditMeshName /> : <ShowMeshNames />}
        </div>
      ) : null}
    </>
  );
}
