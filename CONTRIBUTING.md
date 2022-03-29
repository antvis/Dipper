## 新增加 LIB

packages 目录下新建目录名,在新建目录下执行创建项目

`yarn create @umijs/dumi-lib`

## 发布

- 切换到发布分支

  lerna 配置限定了发布的分支，需要切换到可发布的分支进行发布， [可发布分支查看](./lerna.json)

- 生成版本号
  执行版本生成命令，选择版本号

```bash
yarn run version:prerelease
```

- 发布版本

```bash
yarn  run release
```
