# Contributing

The OvenPlayer project is open to everyone. We are very grateful for your contribution to the OvenPlayer.

## What you can contribute

- Bug reports
- Feature requests
- Improving documentation
- Writing code

And any other contributions that make our project better!

## First step

All contributions start with the Issue. Please join the Issue if it is an unresolved Issue or create an Issue if it does not already exist. We will contact you to find the best solution without getting lost. We hope all conversations are done through the Issue for history purposes.

### Bug reports

Please make sure you have tested with the latest stable version. It is helpful to give as much detail as possible to the reproduction path when registering an Issue.

### Feature requests

Suggest new features that you and others would find useful. When you register it as an Issue, please provide a description of the function, why it is needed, and how it should work. We will organize these features and provide milestones and implement them in the near future.

### Improving documentation and Writing code

We are still discussing the commit guidelines, style guides, testing methods, and Pull request processes. It is similar to the way many other projects use it. However, if you want to contribute immediately, please create it as an Issue or mail to rock@airensoft.com or underdog@airensoft.com. Please don't worry! We're here to help you.

## How to code

This section describes the setup, development, and build process.

###  Environment

OvenPlayer uses npm and webpack when building. If you are new to npm, please refer to [Install Node.js, npm, stay up-to-date](https://www.npmjs.com/get-npm) and configure your environment to make it work.

If npm works well, run the following command on the terminal to install the packages needed to develop OvenPlayer, such as webpack.

```bash
npm install -D
```

### Build

If you modify the source code, you have to build it manually.

> If you are cloning a project for the first time,  you can find already built files in the `dist/development` and `dist/production` directories.

You can build your modified source code with the following command. The built source code can be found in the `dist/development/openplayer` directory.

```bash
npm run watch
```
This command will allow webpack to automatically build each time the source code is modified.


### Directory structure

Here is a list of important directory structures for OvenPlayer

```bash
├── dist
│   ├── development
│   └── production
├── docs
├── node_modules
├── src
│   ├── assets
│   ├── css
│   └── js
│       ├── api
│       ├── utils
│       ├── view
│       ├── ovenplayer.js
│       └── ovenplayer.skd.js
├── .gitignore
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── webpack.config.development.js
└── webpack.config.production.js
```
An overview of what each of these do:

|Path|Description
| --- | --- |
|`dist/development`|Files built during development can be found in this directory.|
|`dist/production`|This is the directory that contains the files provided to end users using OvenPlayer. You do not need to worry about the development process.|
|`docs`|The directory that document files exist.|
|`node_modules`|This is the directory where the packages are installed using npm.|
|`src`|The directory where the source code exists.|
|`src/assets`|Images and fonts.|
|`src/css`|This is the directory where the css file used by View is located.|
|`src/js`|This is the directory where the JavaScript files are located.|
|`src/js/api`|Contains SDK source code.|
|`src/js/utils`|Contains Third party libraries.|
|`src/js/view`|Contains VIEW source code.|
|`src/js/ovenplayer.js`|The webpack entry file containing the View.|
|`src/js/ovenplayer.sdk.js`|The webpack entry file of SDK section.|
|`package.json`|The npm file|
|`webpack.config.developments.js`|Webpack configuration file for development environment.|
|`webpack.config.production.js`|Webpack configuration file for production.|

## Further Readings 

Describes the know-how we have accumulated in implementing OvenPlayer and the concept of each module.

- What is a provider and how to add a new provider
- How to add a new UI

> We will update this section little by little.
