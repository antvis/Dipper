import React, { useCallback, useEffect, useState } from 'react';
import {
  DipperContainer,
  registerWidget,
  useConfigService,
  PanelTabcontent,
} from '@antv/dipper';
import {
  Select,
  Form,
  Cascader,
  Avatar,
  Tabs,
  Collapse,
  Row,
  Col,
  Checkbox,
  Popover,
  Radio,
  InputNumber,
  Input,
  Button,
  DatePicker,
} from 'antd';
import { useLocalStorageState } from 'ahooks';
import {
  DownOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-card';
import styles from './styles.less';

const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

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

interface StaticCard {
  title: string;
  value: number;
  unit?: '' | '%';
}

const MOCK_STATIC: StaticCard[] = [
  { title: '商户数量(个)', value: 1623 },
  { title: '0-9天商户动销数(个)', value: 774 },
  { title: '10-19天商户动销数(个)', value: 90 },
  { title: '20-31天商户动销数(个)', value: 767 },
  { title: '7天日均交易笔数(笔)', value: 956 },
  { title: '30天日均交易笔数(笔)', value: 772 },
  { title: '商户密度', value: 0.7, unit: '%' },
  { title: '支付商家占比', value: 0.45, unit: '%' },
];

interface ScreenType {
  label: string;
  value: string;
}

const MOCK_SCREENRODI: ScreenType[] = [
  { label: '普通筛选', value: '普通筛选' },
  { label: '漏斗筛选', value: '漏斗筛选' },
];

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

  const onSettingClick = useCallback(() => { }, []);
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

function Tab1() {
  const [staticCards, setStaticCards] = useState<StaticCard[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fakePromise(MOCK_STATIC);
      setStaticCards(res);
    })();
  }, []);
  return (
    <Collapse ghost>
      <Panel header={<div className={styles['overview']}>概况</div>} key="1">
        <Row>
          {staticCards.map((staticCard, index) => (
            <Col key={index} span={!index ? 24 : 12}>
              <StatisticCard
                statistic={{
                  title: staticCard.title,
                  value: staticCard.value,
                }}
              />
            </Col>
          ))}
        </Row>
      </Panel>
      <Panel
        header={<div className={styles['overview']}>覆盖行业情况</div>}
        key="2"
      ></Panel>
    </Collapse>
  );
}

function MyPanel() {
  return (
    <>
      <div className={styles['panel-title']}>杭州</div>
      <div className={styles['panel-sub-title']}>已选择</div>
      <Tabs type="card">
        <TabPane tab="商户画像" key="1">
          <Tab1 />
        </TabPane>
        <TabPane tab="消费者画像" key="2"></TabPane>
        <TabPane tab="服务商概况" key="3"></TabPane>
        <TabPane tab="分层统计" key="4"></TabPane>
      </Tabs>
    </>
  );
}

registerWidget('myPanel', MyPanel);

const MockLayers: Option[] = [
  { label: 'AOI 图层', value: '1' },
  { label: 'xxx图层', value: '2' },
];

function Layers() {
  const [layers, setLayers] = useState<Option[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fakePromise(MockLayers);
      setLayers(res);
    })();
  }, []);

  return (
    <>
      <div>
        叠加数据图层
        <QuestionCircleOutlined />
      </div>
      <Checkbox.Group>
        <Row>
          {layers.map((layer) => (
            <Col span={24} key={layer.value}>
              <Checkbox>
                {layer.value}
                {layer.label}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </>
  );
}

function CustomLegend(url) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className={styles['aoi-filter']}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          AOI 筛选
          {visible ? <UpOutlined /> : <DownOutlined />}
        </div>
        <div className={`${styles['aoi-filter']} ${styles['select']}`}>
          <Select placeholder="搜索网格名称/人员名称" showSearch />
        </div>
        <Popover trigger="click" content={Layers} placement="bottom">
          <div className={`${styles['aoi-filter']} ${styles['icon']}`}>
            <img
              src="https://gw.alipayobjects.com/zos/bmw-prod/1bd3ce6f-3c52-431d-8578-bd21baec0836.svg"
              height="13"
              width="13"
            />
          </div>
        </Popover>
      </div>
      {visible !== false ? (
        <div className={styles['aoi-screen']}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="screenType" label="筛选类型">
              <Radio.Group options={MOCK_SCREENRODI} />
            </Form.Item>
            <Form.Item name="ChenckBox" label="多选标题">
              <Checkbox.Group options={MOCK_SCREENRODI} />
            </Form.Item>
            <Form.Item name="NumberInout" label="数值标题">
              <InputNumber placeholder="0" />
            </Form.Item>
            <Form.Item name="RangeTime" label="时间标题">
              <RangePicker />
            </Form.Item>
            <Form.Item label="时间标题" style={{ display: 'flex' }}>
              <Form.Item name="year" style={{ display: 'inline-block' }}>
                <Input placeholder="最小值" />
              </Form.Item>
              ～
              <Form.Item name="month" style={{ display: 'inline-block' }}>
                <Input placeholder="最大值" />
              </Form.Item>
            </Form.Item>
            <div className={styles['aoi-buttonflex']}>
              <Form.Item>
                <a onClick={onReset} style={{ marginRight: 10 }}>
                  一键清除
                </a>
                <Button type="primary" htmlType="submit">
                  确认
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      ) : null}
    </>
  );
}

registerWidget('customLegend', CustomLegend);

registerWidget('PanelTabcontent', PanelTabcontent);

export default function RumbMap() {
  return (
    <div style={{ height: '800px' }}>
      <DipperContainer
        cfg={{
          headerbar: {
            options: {
              logo: {
                value:
                  'https://gw.alipayobjects.com/zos/bmw-prod/16d55406-0875-495c-9216-0fb998e2eecd.svg',
              },
              title: {
                display: false,
              },
            },
            childrens: [
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
          panel: {
            display: true,
            options: {
              opened: true,
              enableToggle: true,
            },
            childrens: [
              {
                type: '',
              },
              {
                type: 'PanelTabcontent',
                childrens: [
                  {
                    type: 'tab-panel-1',
                    // options: {
                    //   title: '商户画像',
                    //   childrens: [
                    //     {
                    //       type: 'collapse',
                    //       childrens: [
                    //         {
                    //           type: 'statisticCards',
                    //           display: true,
                    //           childrens: [

                    //           ]
                    //         },
                    //       ]
                    //     },
                    //   ]
                    // }
                  },
                  {
                    type: 'tab-panel-2',
                    options: {
                      title: '消费者画像',
                    },
                  },
                  {
                    type: 'tab-panel-3',
                    options: {
                      title: '服务商概况',
                    },
                  },
                ],
              },
            ],
          },
          controls: [],
          legends: [
            {
              type: 'customLegend',
              position: 'topleft',
            },
          ],
        }}
      />
    </div>
  );
}
