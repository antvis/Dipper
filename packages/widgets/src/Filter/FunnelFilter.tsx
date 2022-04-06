import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.less';
import { Button, Dropdown, Input } from 'antd';
import classnames from 'classnames';
import { cloneDeep } from 'lodash';
import { useWidget } from '@antv/dipper';
import { DownOutlined } from '@ant-design/icons';

function FunnelFilter({ condition, type, event }: any) {
  // const { defaultOpen = false } = options || {};
  const [visible, setVisible] = useState(false);
  const { setOptions: setWidgetOptions, setValue: setWidgetValue } = useWidget('filterData');
  const [conditionList, setConditionList] = useState<any[]>([]);
  useEffect(() => {
    setConditionList(cloneDeep([...condition.filter_schema, ...condition.funnel_schema]));
  }, [JSON.stringify(condition)]);

  const onItemChange = useCallback(
    (newValue: string, index: number) => {
      const reg = /^-?\d*(\.\d*)?$/;
      if (!isNaN(+newValue) && reg.test(newValue)) {
        const newConditionList = [...conditionList];
        newConditionList[index].value = newValue;
        setConditionList(newConditionList);
      }
    },
    [conditionList],
  );

  const onSubmit = useCallback(
    (newConditionList) => {
      const valuesObj = {};
      newConditionList
        .filter((item: any) => {
          return !!item.value;
        })
        .forEach((element: any) => {
          valuesObj[element.code] = element.value;
        });
      setWidgetValue({
        searchType: type,
        ...valuesObj,
        ...event,
      });
    },
    [setWidgetOptions],
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
    <div className={styles.funnelSelectContent}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: '300px',
          overflow: 'scroll',
        }}
      >
        {conditionList.map((item, index) => (
          <div
            className={styles.conditionItem}
            key={item.code}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={styles.conditionName}>
              {item.name}
              {item.type === 'funnel' && (
                <span style={{ marginLeft: 8, color: '#aaa', fontSize: 12 }}>筛选前X%</span>
              )}
            </div>
            <Input
              value={item.value}
              addonBefore={item.relationOperator ? <span>{item.relationOperator}</span> : undefined}
              placeholder={'0'}
              onChange={(e) => onItemChange(e.target.value, index)}
              allowClear
            />
          </div>
        ))}
      </div>
      <div className={styles.btnGroup}>
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
    <Dropdown trigger={['click']} visible={visible} onVisibleChange={setVisible} overlay={content}>
      <div
        className={classnames({
          [styles.funnelSelect]: true,
          [styles.funnelSelectActive]: false, // TODO  根据选中设置
        })}
      >
        <span className={styles.funnelSelectTitle}>{condition.title}</span>
        <DownOutlined
          className={classnames({
            [styles.downIcon]: true,
            // [styles.downIconRotate]: false,
          })}
        />
      </div>
    </Dropdown>
  );
}

export default FunnelFilter;
