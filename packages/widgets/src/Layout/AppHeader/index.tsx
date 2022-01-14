import React, { useMemo } from 'react';
import { Layout } from 'antd';
import { getWidget, IConfig, registerWidget } from '@antv/dipper-core';
import styles from './index.less';
import { isDisplay } from '../utils/ui';
import { AppContent } from '../AppTemplate/Content';
import { BaseLayoutComp } from '../BaseLayoutComp';
import { CustomBaseWidgets } from '../../BaseWidget/widget';

const { Header } = Layout;

interface LogoProps {
  value?: string;
  style?: React.CSSProperties;
  href?: string;
  display?: boolean;
}

function Logo({ value, style, href, display = true }: LogoProps) {
  if (!display) {
    return null;
  }

  if (href) {
    return (
      <a href={href} target="_blank">
        <img src={value} style={style} />
      </a>
    );
  }
  return <img src={value} style={style} />;
}

interface TitleProps {
  style?: React.CSSProperties;
  url?: string;
  value?: string;
  display?: boolean;
}

function Title({ style, url, value, display = true }: TitleProps) {
  if (!display) {
    return null;
  }

  return (
    <span
      style={style}
      onClick={() => {
        if (url) {
          document.location.href = url as string;
        }
      }}
      className={styles.appTitle}
    >
      {value}
    </span>
  );
}

registerWidget('logo', Logo);
registerWidget('title', Title);

export default function AppHeader(props: IConfig['headerbar']) {
  return (
    <BaseLayoutComp {...props} type="header">
      <Header
        // className={styles.appHeader}
        style={{
          backgroundColor: '#fff',
          padding: '0 24px',
          height: '48px',
          lineHeight: '48px',
        }}
      >
        <>
          {props.options && props.options.logo && (
            <CustomBaseWidgets {...props.options.logo} type="logo">
              {getWidget('logo')(props.options.logo)}
            </CustomBaseWidgets>
          )}
          {props.options && props.options.title && (
            <CustomBaseWidgets {...props.options.title} type="title">
              {getWidget('title')(props.options.title)}
            </CustomBaseWidgets>
          )}
          {props.subChildren?.map((child, index) => {
            if (child.subChildren && child.subChildren.length) {
              return (
                <React.Fragment key={index}>
                  {child.subChildren.map((sub, i) => (
                    <BaseLayoutComp {...sub} type={sub.type} key={i}>
                      {getWidget(sub.type)(sub)}
                    </BaseLayoutComp>
                  ))}
                </React.Fragment>
              );
            } else {
              return (
                <CustomBaseWidgets {...child} type={child.type} key={index}>
                  {getWidget(child.type)(child)}
                </CustomBaseWidgets>
              );
            }
          })}
        </>
      </Header>
    </BaseLayoutComp>
  );
}
