// import { useModel } from '@alipay/bigfish';
import { Layout } from 'antd';
import { useMemo } from 'react';
import React from 'react';
import styles from './index.less';

import { useConfigService } from '../../hooks';
import { LayoutContent } from '../baseLayout';

export const isDisplay = (display?: any) => display !== false;
const { Header } = Layout;

export default function AppHeader() {
  const { globalConfig } = useConfigService();
  const { display, childrens, options } = globalConfig.headerbar || {};
  const { headerstyle, logo, url, title } = options || {};

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
        {isDisplay(logo?.display) && logoDom}
        {isDisplay(title?.display) && titleDom}
        <LayoutContent
          items={childrens?.filter((c) => c.position === 'left') || []}
        />
      </div>
      <div>
        <LayoutContent
          items={childrens?.filter((c) => c.position === 'center') || []}
        />
      </div>
      <div className={styles.appHeaderRight}>
        <LayoutContent
          items={childrens?.filter((c) => c.position === 'right') || []}
        />
      </div>
    </Header>
  ) : (
    <></>
  );
}
