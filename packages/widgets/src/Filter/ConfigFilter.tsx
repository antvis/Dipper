import React from 'react';
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Select,
} from 'antd';
import { FormLayout } from 'antd/es/form/Form';

const { RangePicker } = DatePicker;

export enum RelationFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  RANGE_DATE = 'range-date',
  NUMBE_RANGE = 'num-range',
  SELECT = 'select',
  MULTI_SELECT = 'multi-select',
  CHECK_BOX = 'checkbox',
  RADIO = 'radio',
}

export interface FilterItemConfig {
  id: string;
  label: string;
  name: string;
  type: RelationFieldType;
  addOnBefore?: string;
  addonAfter?: string;
  defaultValue?: string;
  filters?: string[];
}

interface FilterSelect {
  label: string;
  value: string;
}

interface FilterUProps<T = any> {
  form: FormInstance<T>;
  onFinish: (val: any) => void;
  filterConfig: FilterItemConfig[];
  filterSelects: FilterSelect[][];
  layout?: FormLayout;
  bottomClass?: string;
  onReset?: (val: any) => void;
  showBottomBtn?: boolean;
}

export function FilterUI({
  form,
  onFinish,
  onReset,
  filterConfig,
  filterSelects,
  layout = 'inline',
  bottomClass,
  showBottomBtn = false,
}: FilterUProps) {
  return (
    <Form
      layout={layout}
      form={form}
      style={{ backgroundColor: '#fff' }}
      onFieldsChange={onFinish}
    >
      {filterConfig.map((filter, index) =>
        filter.type === RelationFieldType.NUMBER ? (
          <Form.Item name={filter.name} label={filter.label} key={filter.name}>
            <InputNumber />
          </Form.Item>
        ) : filter.type === RelationFieldType.TEXT ? (
          <Form.Item name={filter.name} label={filter.label} key={filter.name}>
            <Input
              addonBefore={filter.addOnBefore}
              addonAfter={filter.addonAfter}
            />
          </Form.Item>
        ) : filter.type === RelationFieldType.SELECT ? (
          <Form.Item name={filter.name} label={filter.label} key={filter.name}>
            <Select options={filterSelects[index]} />
          </Form.Item>
        ) : filter.type === RelationFieldType.MULTI_SELECT ? (
          <Form.Item name={filter.name} label={filter.label} key={filter.name}>
            <Select mode="multiple" options={filterSelects[index]} />
          </Form.Item>
        ) : filter.type === RelationFieldType.DATE ? (
          <Form.Item name={filter.name} label={filter.label} key={filter.name}>
            <DatePicker />
          </Form.Item>
        ) : filter.type === RelationFieldType.RANGE_DATE ? (
          <Form.Item name={filter.name} label={filter.label} key={filter.name}>
            <RangePicker />
          </Form.Item>
        ) : filter.type === RelationFieldType.CHECK_BOX ? (
          <Form.Item name={filter.name} label={filter.label} key={filter.name}>
            <Checkbox.Group options={filterSelects[index]} />
          </Form.Item>
        ) : filter.type === RelationFieldType.RADIO ? (
          <Form.Item name={filter.name} label={filter.label} key={filter.name}>
            <Radio.Group options={filterSelects[index]} />
          </Form.Item>
        ) : null,
      )}
      {showBottomBtn ? (
        <div className={bottomClass}>
          <Form.Item>
            <a onClick={onReset} style={{ marginRight: 10 }}>
              一键清除
            </a>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </div>
      ) : null}
    </Form>
  );
}
