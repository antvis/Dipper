import React, { useCallback, useEffect, useState } from 'react';
import {
  DipperContainer,
  registerWidget,
  PanelTabcontent,
  StatisticCards,
  useWidget,
  useLayerGroup,
} from '@antv/dipper';
import {
  Select,
  Form,
  Cascader,
  Avatar,
  Row,
  Col,
  Checkbox,
  Popover,
  Radio,
  InputNumber,
  Input,
  Button,
  Spin,
  DatePicker,
} from 'antd';
import { useLocalStorageState } from 'ahooks';
import {
  DownOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UpOutlined,
} from '@ant-design/icons';
import styles from './styles.less';
import type {
  StaticCard,
  Option} from './util';
import {
  fakePromise,
  MOCK_STATIC,
  MOCK_SCREENRODI,
  MOCK,
  MockLayers,
} from './util';
import * as mock from './util/mock';

const { RangePicker } = DatePicker;

function useGetFilters(type) {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fakePromise(MOCK[type]);
      setOptions(res);
    })();
  }, [type]);

  return options;
}

function Filters() {
  const { widget } = useWidget('headetFilter');
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
    widget.setValue({
      map: map || options1[0].value,
      area: [options2[0].value],
      industry: options3[0].value,
    });
  }, [options1, options2, options3, widget]);

  const onFieldsChange = useCallback(() => {
    const filterVal = form.getFieldsValue(true);
    setMap(filterVal.map);
    widget.setValue(filterVal);
  }, [widget]);

  return (
    <Form form={form} layout="inline" onFieldsChange={onFieldsChange}>
      <Form.Item name="map">
        <Select options={options1} bordered={false} />
      </Form.Item>
      <Form.Item name="area">
        <Cascader options={options2} bordered={false} />
      </Form.Item>
      <Form.Item name="industry">
        <Select options={options3} showSearch={options3.length > 30} bordered={false} />
      </Form.Item>
    </Form>
  );
}

registerWidget('headetFilter', Filters);

function Title() {
  return (
    <>
      <div className={styles['main-title']}>?????????</div>
      <div className={styles['sub-title']}> ?? ????????????</div>
      <div className={styles['split-line']} />
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
      <Select options={options} value={post} onChange={onPostChange} bordered={false} />
      <SettingOutlined onClick={onSettingClick} />
    </>
  );
}
registerWidget('perosn', Person);

function StatisticCardsGroup(props) {
  const { widgetsValue } = useWidget('headetFilter');
  const [staticCards, setStaticCards] = useState<StaticCard[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!widgetsValue) {
      return;
    }

    console.log(widgetsValue);

    (async () => {
      setLoading(true);
      const res = await mock[props.options.url](MOCK_STATIC);
      setLoading(false);
      setStaticCards(res);
    })();
  }, [props.options.url, widgetsValue]);
  return (
    <Spin spinning={loading}>
      <StatisticCards childrens={staticCards} />
    </Spin>
  );
}

registerWidget('statisticCards', StatisticCardsGroup);

// function PieCharts() {
//   const config: PieConfig = {
//     originalData: [
//       { type: '?????? 1', value: 10 },
//       { type: '?????? 2', value: 13 },
//     ],
//     formattedData: [
//       { type: '?????? 1', value: 10 },
//       { type: '?????? 2', value: 13 },
//     ],
//     dimensions: ['type'],
//     measures: ['value'],
//     label: {
//       type: 'spider',
//       content: '{name}\n{value}',
//       showLabelPercent: true,
//     }
//   };
//   return (
//     <div style={{ width: 300, height: 250 }}>
//       <Pie config={config} />
//     </div>
//   );
// }

// registerWidget('pieCharts', PieCharts);

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
        ??????????????????
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

function CustomLegend() {
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
          AOI ??????
          {visible ? <UpOutlined /> : <DownOutlined />}
        </div>
        <div className={`${styles['aoi-filter']} ${styles.select}`}>
          <Select placeholder="??????????????????/????????????" showSearch />
        </div>
        <Popover trigger="click" content={Layers} placement="bottom">
          <div className={`${styles['aoi-filter']} ${styles.icon}`}>
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
            <Form.Item name="screenType" label="????????????">
              <Radio.Group options={MOCK_SCREENRODI} />
            </Form.Item>
            <Form.Item name="ChenckBox" label="????????????">
              <Checkbox.Group options={MOCK_SCREENRODI} />
            </Form.Item>
            <Form.Item name="NumberInout" label="????????????">
              <InputNumber placeholder="0" />
            </Form.Item>
            <Form.Item name="RangeTime" label="????????????">
              <RangePicker />
            </Form.Item>
            <Form.Item label="????????????" style={{ display: 'flex' }}>
              <Form.Item name="year" style={{ display: 'inline-block' }}>
                <Input placeholder="?????????" />
              </Form.Item>
              ???
              <Form.Item name="month" style={{ display: 'inline-block' }}>
                <Input placeholder="?????????" />
              </Form.Item>
            </Form.Item>
            <div className={styles['aoi-buttonflex']}>
              <Form.Item>
                <a onClick={onReset} style={{ marginRight: 10 }}>
                  ????????????
                </a>
                <Button type="primary" htmlType="submit">
                  ??????
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

function SidePanelTitle() {
  const [area, setArea] = useState('??????');
  const [areaNumber, setAreaNumber] = useState(0);
  const { selectFeatures } = useLayerGroup('grid');

  useEffect(() => {
    console.log(selectFeatures);
  }, [selectFeatures]);
  return (
    <>
      <div className={styles['panel-title']}>{area}</div>
      <div className={styles['panel-sub-title']}>?????????{areaNumber}???</div>
    </>
  );
}

registerWidget('sidePanelTitle', SidePanelTitle);

export default function RumbMap() {
  initWidgets();
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
            components: [
              {
                type: 'myTitle',
                position: 'left',
              },
              {
                type: 'headetFilter',
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
                type: 'sidePanelTitle',
              },
              {
                type: 'PanelTabcontent',
                childrens: [
                  {
                    type: 'tab-panel-1',
                    options: {
                      title: '????????????',
                      childrens: [
                        {
                          type: 'collapse',
                          title: '??????',
                          childrens: [
                            {
                              type: 'statisticCards',
                              options: {
                                url: 'fakePromise',
                              },
                            },
                          ],
                        },
                        {
                          type: 'collapse',
                          title: '??????????????????',
                          childrens: [
                            {
                              type: 'pieCharts',
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    type: 'tab-panel-2',
                    options: {
                      title: '???????????????',
                    },
                  },
                  {
                    type: 'tab-panel-3',
                    options: {
                      title: '???????????????',
                    },
                  },
                ],
              },
            ],
          },
          controls: [
            {
              type: 'customLegend',
              position: 'topleft',
            },
          ],
          legends: [
            {
              type: 'multiClassifyColor',
              position: 'bottomleft',
              options: {
                items: [
                  {
                    colors: ['red', 'green', 'yellow'],
                    title: '?????????',
                  },
                  {
                    colors: ['green', 'blue', 'gray'],

                    title: '?????????',
                  },
                ],
                values: [300, 400, 500],
                title: '??????',
              },
            },
          ],
          layers: [
            {
              type: 'gridLayer',
              options: {},
            },
          ],
        }}
      />
    </div>
  );
}
