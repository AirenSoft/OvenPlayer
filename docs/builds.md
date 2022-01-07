---
description: This section describes the development and builds process.
---

# Builds

## How to write code

OvenPlayer uses [npm](https://www.npmjs.com) and [webpack](https://webpack.js.org) when building. If you are using npm for the first time, please refer to [Install Node.js, npm](https://www.npmjs.com/get-npm). In addition, you need to configure the environment to keep this up-to-date and working.

### Environment

If npm works well on your system, run the following command in Terminal to install the packages needed to develop OvenPlayer, such as webpack.

```
$ npm ci
```

### Production Build

If you want to modify the source code, you need to write it manually.

> If you are cloning a project for the first time, you can find already built files in the `dist/` directories.

However, you can build your modified source code with the following command. The built source code can be found in the `dist/` directory.

```
npm run build
```

This command allows you to build the webpack automatically whenever the source code is modified.

### Development Build

It is inefficient to build code every time during development and testing. If you use the watch function, webpack detects changes in the source code and automatically builds it quickly. The development built source code can be found in the `dev/` directory.

```
npm run watch
```
