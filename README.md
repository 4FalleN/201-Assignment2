# 201asg2 – 公司主页 (Node.js + React)

本项目使用 **Node.js** 作为运行环境，并用 **React.js** 构建单页公司主页，满足作业要求：

- 公司基本信息：公司名称、产品/服务、详细信息
- 背景介绍：Mission / Vision / 团队介绍
- 团队成员：**每位成员都有照片**与职位描述
- 多媒体：文本 + 图片 + 视频
- 响应式：桌面与手机均可良好显示

## 快速开始

1. 安装依赖

```bash
npm install
```

> 如果你运行 `npm`/`node` 时出现：
>
> `snap-confine has elevated permissions and is not confined...`
>
> 说明你当前使用的是 **Snap 版 Node.js**，但系统/环境里 `snapd.apparmor` 不可用，导致项目无法启动。
>
> 临时解决（推荐先试这个）：
>
> ```bash
> export PATH=/snap/node/current/bin:$PATH
> ```
>
> 然后再执行 `npm install` / `npm run dev`。

2. 本地开发启动

```bash
npm run dev
```

如果 `npm` 仍然不可用，也可以直接用脚本启动（前提：已安装依赖生成 `node_modules`）：

```bash
bash scripts/dev.sh
```

> 如果你看到类似 `Invalid package config .../node_modules/vite/package.json`，通常是 `node_modules` 依赖已损坏/不完整：删除 `node_modules` 后重新 `npm install`。

3. 打包与预览

```bash
npm run build
npm run preview
```

对应的脚本方式：

```bash
bash scripts/build.sh
bash scripts/preview.sh
```

## 修改团队信息

在 `src/data/team.js` 中替换每位成员的 `name / role / bio / photoUrl` 即可。
