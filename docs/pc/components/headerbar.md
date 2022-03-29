---
title: Headerbar
order: 1
toc: content
mobile: false
group:
  title: 组件
  order: 5
---

## Headerbar

<Badge>布局组件</Badge>

头部导航配置、支持设置 Logo、Title、子组件

![导航条](https://gw.alipayobjects.com/mdn/rms_23a451/afts/img/A*xs_VQpVoDWgAAAAAAAAAAAAAARQnAQ)

```ts
 {
    display?: boolean;
    headerstyle?: React.CSSProperties;
    url:string; // 点击导航回到首页

    logo: Partial<{
      display: boolean;
      value: string;
      style: React.CSSProperties;
      href: string;
    }>;
    title: Partial<{
      value: string;
      display: boolean;
      style: React.CSSProperties;
    }>;
    childrens?: IWidgetProps[];
 }
```

<API hideTitle src='../../../packages/pc/src/layout/Header/index.tsx'></API>
