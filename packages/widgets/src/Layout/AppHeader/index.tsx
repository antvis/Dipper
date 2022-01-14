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
}

function Logo({ value, style, href }: LogoProps) {
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
}

function Title({ style, url, value }: TitleProps) {
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

export function AppHeaderContent({
  display,
  options,
  subChildren,
}: IConfig['headerbar']) {
  const { logo, title, url, headerstyle } = options;
  const logoDom = useMemo(() => {
    if (!isDisplay(logo?.display)) {
      return null;
    }
    const imgDom = <img src={logo?.value} style={logo?.style} />;
    if (logo?.href) {
      return (
        <a href={logo?.href} target="_blank">
          {imgDom}
        </a>
      );
    }
    return imgDom;
  }, [logo?.display, logo?.href, logo?.value, logo?.style]);

  const titleDom = useMemo(() => {
    return (
      <span
        style={title?.style}
        onClick={() => {
          if (url) {
            document.location.href = url as string;
          }
        }}
        className={styles.appTitle}
      >
        {title?.value}
      </span>
    );
  }, [title?.style, title?.value]);

  return isDisplay(display) ? (
    <Header
      className={styles.appHeader}
      style={{
        backgroundColor: '#fff',
        padding: '0 24px',
        height: '48px',
        lineHeight: '48px',
        ...headerstyle,
      }}
    >
      <div className={styles.appHeaderLeft}>
        {isDisplay(display) && logoDom}
        {isDisplay(title?.display) && titleDom}
        <AppContent
          items={subChildren?.filter((c) => c.position === 'left') || []}
        />
      </div>
      <div>
        <AppContent
          items={subChildren?.filter((c) => c.position === 'center') || []}
        />
      </div>
      <div className={styles.appHeaderRight}>
        <AppContent
          items={subChildren?.filter((c) => c.position === 'right') || []}
        />
      </div>
    </Header>
  ) : null;
}

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
          {props.subChildren?.map((child) => {
            if (child.subChildren && child.subChildren.length) {
              return (
                <>
                  {child.subChildren.map((sub, i) => (
                    <BaseLayoutComp {...sub} type={sub.type} key={i}>
                      {getWidget(sub.type)(sub)}
                    </BaseLayoutComp>
                  ))}
                </>
              );
            } else {
              return (
                <CustomBaseWidgets {...child} type={child.type}>
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
