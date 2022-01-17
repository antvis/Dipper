import React, { useCallback, useEffect, useState } from 'react';
import {
  DipperContainer,
  registerWidget,
  useConfigService,
  IWidgetProps,
} from '@antv/dipper';
import { Select, Button, Form, Cascader, Avatar } from 'antd';
import { useLocalStorageState } from 'ahooks';
import { SettingOutlined } from '@ant-design/icons';
import styles from './styles.less';
const { Option } = Select;

const demo = (props: IWidgetProps) => {
  // 状态维护
  return <Button value="测试">测试</Button>;
};

const ControlPosition = () => {
  const { updateControl } = useConfigService();
  return (
    <Select
      defaultValue="topleft"
      style={{ width: 120 }}
      onChange={(e) => {
        updateControl('mapStyle', {
          position: e,
        });
      }}
    >
      {[
        'bottomleft',
        'bottomright',
        'topleft',
        'topright',
        'topcenter',
        'bottomcenter',
        'leftcenter',
        'rightcenter',
      ].map((value: string) => {
        return (
          <Option key={value} value={value}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
};

registerWidget('controlPosition', ControlPosition);
registerWidget('demo', demo);

interface Option {
  label: string;
  value: string;
}

function fakePromise<T>(data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

const MOCK: Record<string, Option[]> = {
  1: [
    { label: '方案1', value: '方案1' },
    { label: '方案2', value: '方案2' },
    { label: '方案3', value: '方案3' },
  ],
  2: [
    { label: '全国', value: '86' },
    { label: '浙江', value: '186' },
    { label: '湖南', value: '286' },
  ],
  3: [
    { label: '全部行业', value: 'all' },
    { label: '行业1', value: '行业1' },
    { label: '行业2', value: '行业2' },
    { label: '行业3', value: '行业3' },
  ],
  4: [
    { label: '城市经理', value: 'cityManager' },
    { label: '技术', value: 'dev' },
    { label: '测试', value: 'test' },
  ],
};

function useGetFilters(type) {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    [],
  );

  useEffect(() => {
    (async () => {
      const res = await fakePromise(MOCK[type]);
      setOptions(res);
    })();
  }, [type]);

  return options;
}

function Filters() {
  const { updateControl } = useConfigService();
  const options1 = useGetFilters(1);
  const options2 = useGetFilters(2);
  const options3 = useGetFilters(3);
  const [form] = Form.useForm();
  const [map, setMap] = useLocalStorageState('aoi-selected-map', '');

  useEffect(() => {
    if (!options1.length || !options2.length || !options3.length) {
      return;
    }

    form.setFieldsValue({
      map: map || options1[0].value,
      area: [options2[0].value],
      industry: options3[0].value,
    });
  }, [options1, options2, options3]);

  const onFieldsChange = useCallback(() => {
    const filterVal = form.getFieldsValue(true);
    setMap(filterVal.map);
  }, []);

  return (
    <Form form={form} layout="inline" onFieldsChange={onFieldsChange}>
      <Form.Item name="map">
        <Select options={options1} bordered={false} />
      </Form.Item>
      <Form.Item name="area">
        <Cascader options={options2} bordered={false} />
      </Form.Item>
      <Form.Item name="industry">
        <Select
          options={options3}
          showSearch={options3.length > 30}
          bordered={false}
        />
      </Form.Item>
    </Form>
  );
}

function Title() {
  return (
    <>
      <div className={styles['main-title']}>万象台</div>
      <div className={styles['sub-title']}> · 城市洞察</div>
      <div className={styles['split-line']}></div>
      <Filters />
    </>
  );
}

registerWidget('myTitle', Title);

function Person() {
  const [avatar, setAvatar] = useState();
  const [post, setPost] = useState('');
  const options = useGetFilters(4);

  useEffect(() => {
    if (options.length) {
      setPost(options[0].value);
    }
  }, [options]);

  const onPostChange = useCallback((val: string) => {
    setPost(val);
  }, []);

  const onSettingClick = useCallback(() => {}, []);
  return (
    <>
      <Avatar src={avatar} />
      <Select
        options={options}
        value={post}
        onChange={onPostChange}
        bordered={false}
      />
      <SettingOutlined onClick={onSettingClick} />
    </>
  );
}
registerWidget('perosn', Person);

export default function RumbMap() {
  return (
    <div style={{ height: '500px' }}>
      <DipperContainer
        cfg={{
          headerbar: {
            display: false,
          },
          toolbar: {
            display: true,
            childrens: [
              {
                type: 'logo',
                position: 'left',
                value:
                  'https://gw.alipayobjects.com/zos/bmw-prod/16d55406-0875-495c-9216-0fb998e2eecd.svg',
              },
              {
                type: 'myTitle',
                position: 'left',
              },
              {
                type: 'perosn',
                position: 'right',
              },
            ],
          },
        }}
      />
    </div>
  );
}
