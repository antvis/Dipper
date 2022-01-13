// import { useModel } from '@alipay/bigfish';
import React, { FC, useMemo } from 'react';
import { Layout } from 'antd';
import { IConfig } from '@antv/dipper-core';
import styles from './index.less';
import { isDisplay } from '../utils/ui';
import { CustomBaseWidgets } from '../../BaseWidget/widget';
import { AppContent } from '../AppTemplate/Content';

const { Header } = Layout;

function AppHeaderContent({
  headerstyle,
  display,
  logo,
  url,
  title,
  children,
}: IConfig['headerbar']) {
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
          items={children?.filter((c) => c.position === 'left') || []}
        />
      </div>
      <div>
        <AppContent
          items={children?.filter((c) => c.position === 'center') || []}
        />
      </div>
      <div className={styles.appHeaderRight}>
        <AppContent
          items={children?.filter((c) => c.position === 'right') || []}
        />
      </div>
    </Header>
  ) : null;
}

export default function AppHeader(props: IConfig['headerbar']) {
  return (
    <CustomBaseWidgets {...props} type="header">
      {/* @ts-ignore */}
      <AppHeaderContent {...props} />
    </CustomBaseWidgets>
  );
}
