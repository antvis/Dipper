import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './index.less';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input } from 'antd';
import classnames from 'classnames';
import { cloneDeep } from 'lodash';
import { useConfigService } from '@antv/dipper-layout';

function FunnelFilter({ title, data }: any) {
  const { globalConfig, setConfig } = useConfigService();
  const [conditionList, setConditionList] = useState<any[]>([]);

  useEffect(() => {
    setConditionList(cloneDeep(data));
  }, [JSON.stringify(data)]);

  const hasFilterValue = useMemo(() => {
    return !!(globalConfig.initData.filterData ?? []).find(
      (item) => item.value,
    );
  }, [globalConfig.initData.filterData]);

  const onItemChange = useCallback(
    (newValue: string, index: number) => {
      const newConditionList = [...conditionList];
      newConditionList[index].value = newValue;
      setConditionList(newConditionList);
    },
    [conditionList],
  );

  const onSubmit = useCallback(
    (newConditionList) => {
      setConfig('initData', {
        ...globalConfig?.initData,
        filterData: cloneDeep(newConditionList),
      });
    },
    [globalConfig.initData, setConfig],
  );

  const onReset = useCallback(() => {
    const newConditionList = [...conditionList].map((item) => {
      return {
        ...item,
        value: null,
      };
    });
    setConditionList(newConditionList);
    onSubmit(newConditionList);
  }, [conditionList, onSubmit]);

  const content = (
    <div className="funnelSelectContent">
      <div onClick={(e) => e.stopPropagation()}>
        {conditionList.map((item, index) => (
          <div
            className="conditionItem"
            key={item.code}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="conditionName">{item.name}</div>
            <Input
              value={item.value}
              addonBefore={item.prefix ? <span>{item.prefix}</span> : undefined}
              placeholder={0}
              onChange={(e) => onItemChange(e.target.value, index)}
              allowClear
            />
          </div>
        ))}
      </div>
      <div className="btnGroup">
        <Button type="link" onClick={onReset}>
          一键清空
        </Button>
        <Button type="primary" onClick={() => onSubmit(conditionList)}>
          确认
        </Button>
      </div>
    </div>
  );

  return (
    <Dropdown overlay={content}>
      <div
        className={classnames({
          funnelSelect: true,
          funnelSelectActive: hasFilterValue,
        })}
      >
        <span className="funnelSelectTitle">{title}</span>
        <DownOutlined className="downIcon" />
      </div>
    </Dropdown>
  );
}

export default FunnelFilter;
