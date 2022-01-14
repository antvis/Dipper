import React, { useMemo } from 'react';
import { Tooltip, Typography } from 'antd';
import { useLayerGroup } from '../Layout';
import styles from './index.less';

const { Paragraph } = Typography;

interface IProps {
  title: string;
}

function PanelHeader({ title }: IProps) {
  const { selectFeatures, updateProperties } = useLayerGroup('grid');
  const titles = useMemo(() => {
    if (selectFeatures?.length === 1) {
      // @ts-ignore
      return selectFeatures[0]?.feature?.properties.name;
    }
    if (selectFeatures?.length > 1) {
      return selectFeatures
        ?.map((item: any) => item?.feature.properties.name)
        .join(',');
    }
    return title;
  }, [title, selectFeatures]);

  return (
    <div className={styles.appPanelHeader}>
      <Tooltip overlay={titles} className={styles.appPanelHeaderTitle}>
        <Paragraph
          ellipsis={{ rows: selectFeatures?.length > 1 ? 2 : 1 }}
          editable={
            selectFeatures?.length === 1
              ? {
                  onChange: () => {
                    console.log('change');
                  },
                }
              : false
          }
        >
          {titles}
        </Paragraph>
      </Tooltip>
    </div>
  );
}

export default PanelHeader;
