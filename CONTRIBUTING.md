# Contributing Dipper

## 安装依赖

安装依赖并完成 Yarn workspace 初始化

```bash
yarn install
```

## 启动网站

```bash
yarn start
```

## 添加 package 或依赖

- 添加一个新的 package

```bash
yarn lerna create package-name -y
```

- 将 ui-lib 作为 package-name 的依赖

```bash
yarn workspace package-name add ui-lib/1.0.0
```

- 将 lodash 添加为所有 package 的依赖(不包含 root）

```bash
yarn workspaces run add lodash
```

- 将 typescript 设置为 root 的开发依赖

```bash
yarn add -W -D typescript
```

## 提交代码

提交 message 遵循 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## 发布

- 切换到发布分支

lerna 配置限定了发布的分支，需要切换到可发布的分支进行发布， [可发布分支查看](./lerna.json)。

- 生成版本号

```bash
yarn run version:pre
```

- 发布版本

```bash
yarn run release
```

## 部署

### 文档部署

- 手动本地打包部署

```bash
yarn run deploy
```
