import { Layout } from 'antd';
import React from 'react';
import styles from './index.less';
import { CustomBaseLayout } from '@antv/dipper-layout';
import type { IWidgetProps} from '@antv/dipper-core';
import { getWidgetChildren, isDisplay } from '@antv/dipper-core';

interface LogoDomProps {
  value?: string;
  style?: React.CSSProperties;
  href?: string;
}

export function LogoDom({ value, style, href }: LogoDomProps) {
  const imgDom = <img src={value} style={style} />;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {imgDom}
      </a>
    );
  }

  return imgDom;
}

interface TitleDomProps {
  style?: React.CSSProperties;
  url?: string;
  value?: string;
}

export function TitleDom({ style, url, value }: TitleDomProps) {
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

const { Header } = Layout;

export interface IHeaderProps {
  display?: boolean;
  options: {
    headerstyle?: React.CSSProperties;
    logo?: Partial<{
      display: boolean;
      value: string;
      style: React.CSSProperties;
      href: string;
    }>;
    title: Partial<{
      url?: string;
      value: string;
      display: boolean;
      style: React.CSSProperties;
    }>;
  };
  components?: IWidgetProps[];
  children?: React.ReactNode;
}

export default function AppHeader(props: IHeaderProps) {
  const { display, options } = props || {};
  const components = getWidgetChildren(props);
  const { headerstyle, logo, title } = options || {};

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
        {isDisplay(logo?.display) ? (
          <LogoDom value={logo?.value || ''} style={logo?.style || {}} href={logo?.href || ''} />
        ) : null}
        {isDisplay(title?.display) ? (
          <TitleDom value={title?.value || ''} style={title?.style || {}} url={title?.url || ''} />
        ) : null}
        <CustomBaseLayout
          type="header-left"
          components={components?.filter((c) => c.position === 'left' || !c.position) || []}
        />
      </div>
      <CustomBaseLayout
        type="header-center"
        components={components?.filter((c) => c.position === 'center') || []}
      />
      <div className={styles.appHeaderRight}>
        <CustomBaseLayout
          type="header-right"
          components={components?.filter((c) => c.position === 'right') || []}
        />
      </div>
    </Header>
  ) : (
    <></>
  );
}
