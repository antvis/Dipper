import React, { useCallback, useMemo } from '@alipay/bigfish/react';
import styles from './index.less';

import { Tooltip, Typography } from '@alipay/bigfish/antd';
import { useConfigService, useLayerGroup } from '@/core';
import { featureOperate } from '@/services/mapstudio/MapController';
import { message } from '@alipay/bigfish/antd';

const { Paragraph } = Typography;

interface IProps {
  title: string;
}

function SidebarHeader({ title }: IProps) {
  const { globalConfig } = useConfigService();
  const { sceneCode, areaCode } = globalConfig.initData;
  const { selectFeatures, updateProperties } = useLayerGroup('grid');
  const titles = useMemo(() => {
    if (selectFeatures?.length === 1) {
      return selectFeatures[0].feature.properties.name;
    }
    if (selectFeatures?.length > 1) {
      return selectFeatures
        ?.map((item) => item.feature.properties.name)
        .join(',');
    }
    return title;
  }, [title, selectFeatures]);

  const onNameChange = useCallback(
    async (name: string) => {
      const [feature] = selectFeatures;
      const { id } = feature.feature.properties ?? {};
      if (name === titles && !feature && !id) {
        return;
      }
      const res = await featureOperate({
        action: 'update',
        actionType: 'feature',
        sceneCode,
        areaCode,
        feature: JSON.stringify({
          id,
          name,
        }),
      });
      if (res.success) {
        message.success('修改成功');
        updateProperties(feature.feature, { name });
      }
    },
    [selectFeatures, titles, sceneCode, areaCode, updateProperties],
  );

  return (
    <div className={styles.appSidebarHeader}>
      <Tooltip overlay={titles} className={styles.appSidebarHeaderTitle}>
        <Paragraph
          ellipsis={{ rows: selectFeatures?.length > 1 ? 2 : 1 }}
          editable={
            selectFeatures?.length === 1
              ? {
                  onChange: onNameChange,
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

export default SidebarHeader;
