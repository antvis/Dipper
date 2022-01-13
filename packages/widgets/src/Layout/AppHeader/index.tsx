import React, { useMemo } from 'react';
import { Layout } from 'antd';
import { IConfig } from '@antv/dipper-core';
import styles from './index.less';
import { isDisplay } from '../utils/ui';
import { AppContent } from '../AppTemplate/Content';
import { BaseLayoutComp } from '../BaseLayoutComp';

const { Header } = Layout;

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

  console.log(111111);
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
    <>
      <Header
        className={styles.appHeader}
        style={{
          backgroundColor: '#fff',
          padding: '0 24px',
          height: '48px',
          lineHeight: '48px',
        }}
      >
        <div className={styles.appHeaderLeft}>
          <BaseLayoutComp {...props} type="header" />
        </div>
      </Header>
    </>
  );
}
