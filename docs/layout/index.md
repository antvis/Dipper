## 布局

#### 布局方式
  Dipper布局方式采用的是 ant design [layout](https://ant.design/components/layout-cn/),大致结构 可分为 上Header，中左Content，中右折叠Sider
  
  <code src="./layout.tsx"></code>

  在最外层用[Provider](https://github.com/Kukkimonsuta/inversify-react) 通过容器注入实列container 把整个Layout 嵌套在其内

  ```tsx
   import { Provider } from 'inversify-react';
   import { Layout } from 'antd';
   import React from 'react';
   const { Content } = Layout;
   <Provider container={[]}>  
    <Layout>
      {/* 导航栏 <Header />  */}
      {/* 导航栏工具条 <Sider />*/}
      {/* 地图区域   <ContainerContent<T>>{null}</ContainerContent>*/}
    </Layout>
  </Provider>
  ```
#### 
