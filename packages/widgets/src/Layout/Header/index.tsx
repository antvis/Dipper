import { Layout } from 'antd';
import React from 'react';
import styles from './index.less';
import { useConfigService } from '../../hooks';
import { LayoutContent } from '../baseLayout';
import { isDisplay } from '../utils';

interface LogoDomProps {
  value?: string;
  style?: React.CSSProperties;
  href?: string;
}

function LogoDom({ value, style, href }: LogoDomProps) {
  const imgDom = <img src={value} style={style} />;
  if (href) {
    return (
      <a href={href} target="_blank">
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

function TitleDom({ style, url, value }: TitleDomProps) {
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

export default function AppHeader() {
  const { globalConfig } = useConfigService();
  const { display, childrens, options } = globalConfig.headerbar || {};
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
          <LogoDom
            value={logo?.value || ''}
            style={logo?.style || {}}
            href={logo?.href || ''}
          />
        ) : null}
        {isDisplay(title?.display) ? (
          <TitleDom
            value={title?.value || ''}
            style={title?.style || {}}
            url={title?.url || ''}
          />
        ) : null}
        <LayoutContent
          items={childrens?.filter((c) => c.position === 'left') || []}
        />
      </div>
      <LayoutContent
        items={childrens?.filter((c) => c.position === 'center') || []}
      />
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
