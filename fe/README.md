# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [How to install](#how-to-install)
    - [Step 1: Install packages](#step-1-install-packages)
    - [Step 2: Run application](#step-2-run-application)
  - [How to debug test with Jest and Jest-Preview](#how-to-debug-test-with-jest-and-jest-preview)
    - [Prerequisites](#prerequisites)
    - [Step 1: Run jest-preview server](#step-1-run-jest-preview-server)
    - [Step 2: Use debug in test file](#step-2-use-debug-in-test-file)
    - [Step 3: Using F5 key in the test file](#step-3-using-f5-key-in-the-test-file)
  - [Libraries Installed](#libraries-installed)
    - [Main Libraries](#main-libraries)
    - [Typescript support](#typescript-support)
    - [Webpack loaders \& plugins](#webpack-loaders--plugins)
    - [Storybook dependencies](#storybook-dependencies)
    - [Jest dependencies](#jest-dependencies)
    - [Testing Library dependencies](#testing-library-dependencies)
    - [Babel depenencies \& plugins](#babel-depenencies--plugins)

## Introduction

This is boilerplate

**Prerequisites** <br/>
[![nodejs -  v18.18.0](https://img.shields.io/static/v1?label=nodejs&message=+v18.18.0&color=%23339933&logo=nodedotjs&logoColor=%23339933)](https://)
[![npm - 9.8.1](https://img.shields.io/static/v1?label=npm&message=9.8.1&color=%23CB3837&logo=npm&logoColor=%23CB3837)](https://)

## How to install

Run following steps

<details>
<summary>Show steps</summary>
  
### Step 1: Install packages

```bash
npm install
```

### Step 2: Run application

```bash
npm run dev
```

</details>

## How to debug test with Jest and Jest-Preview

Run following steps

<details>
<summary>Show steps</summary>
  
### Prerequisites

[![vscode -  ](https://img.shields.io/static/v1?label=vscode&message=+&color=%23007ACC&logo=visualstudiocode&logoColor=%23007ACC)](https://)

### Step 1: Run jest-preview server

Run jest-preview service first, if you're test logic only, skip this step because jest-preview only using for render component testing

```bash
npm run jest-preview
```

It will automatically open `localhost:3336`

### Step 2: Use debug in test file

```ts
import { previewDebug, render } from "@test-utils";
import UserInfoForm from "./UserInfoForm";

describe("<UserInfoForm />", () => {
  it("<UserInfoForm /> should be rendered properly", () => {
    const { getByText } = render(<UserInfoForm />);
    previewDebug(); // use this function to connect with jest-preview
    expect(getByText("Age")).toBeInTheDocument();
  });
});
```

### Step 3: Using F5 key in the test file

There is a config in folder `.vscode` named `launch.json`

If you don't want to get coverage for each runs, let's comment the `--coverage`

```json
...
"args": [
    "${fileBasenameNoExtension}",
    "--config",
    "${workspaceFolder}/settings/jest.config.js",
    // "--coverage",
    "--watch"
],
...
```

</details>

## Libraries Installed

### Main Libraries

[![react - ^18.2.0](https://img.shields.io/static/v1?label=react&message=^18.2.0&color=%2361DAFB&logo=react&logoColor=%2361DAFB)](https://)
[![react-dom - ^18.2.0](https://img.shields.io/static/v1?label=react-dom&message=^18.2.0&color=%2361DAFB)](https://)
[![axios - ^1.2.1](https://img.shields.io/static/v1?label=axios&message=^1.2.1&color=%235A29E4&logo=axios&logoColor=%235A29E4)](https://)
[![msw - ^1.3.2](https://img.shields.io/static/v1?label=msw&message=^1.3.2&color=%238DD6F9&logo=mockserviceworker&logoColor=%23FF6A33)](https://)
[![twin.macro - ^3.4.0](https://img.shields.io/static/v1?label=twin.macro&message=^3.4.0&color=%23007ec6)](https://)
[![tailwindcss - ^3.3.3](https://img.shields.io/static/v1?label=tailwindcss&message=^3.3.3&color=%23007ec6&logo=tailwindcss&logoColor=%2306B6D4)](https://)
[![sass - ^1.56.2](https://img.shields.io/static/v1?label=sass&message=^1.56.2&color=%23CC6699&logo=sass&logoColor=%23CC6699)](https://)
[![dotenv - ^5.5.0](https://img.shields.io/static/v1?label=dotenv&message=^5.5.0&color=%23ECD53F&logo=dotenv&logoColor=%23ECD53F)](https://)
[![i18next - ^23.5.1](https://img.shields.io/static/v1?label=i18next&message=^23.5.1&color=%2326A69A&logo=i18next&logoColor=%2326A69A)](https://)
[![i18next-browser-languagedetector - ^7.1.0](https://img.shields.io/static/v1?label=i18next-browser-languagedetector&message=^7.1.0&color=%2326A69A)](https://)
[![react-i18next - ^13.2.2](https://img.shields.io/static/v1?label=react-i18next&message=^13.2.2&color=%2326A69A)](https://)
[![react-hook-form - ^7.47.0](https://img.shields.io/static/v1?label=react-hook-form&message=^7.1.0&color=%23EC5990&logo=react-hook-form&logoColor=%23EC5990)](https://)
[![react-router-dom - ^6.16.0](https://img.shields.io/static/v1?label=react-router-dom&message=^6.16.0&color=%23CA4245&logo=reactrouter&logoColor=%23CA4245)](https://)
[![styled-components - ^6.0.8](https://img.shields.io/static/v1?label=styled-components&message=^6.0.8&color=%23DB7093&logo=styled-components&logoColor=%23DB7093)](https://)
[![@storybook/react - ^6.5.15](https://img.shields.io/static/v1?label=%40storybook%2Freact&message=^6.5.15&color=%23FF4785&logo=storybook&logoColor=%23FF4785)](https://)
[![jest - ^1.56.2](https://img.shields.io/static/v1?label=jest&message=^1.56.2&color=%23C21325&logo=jest&logoColor=%23C21325)](https://)
[![@testing-library/react - ^14.0.0](https://img.shields.io/static/v1?label=%40testing-library%2Freact&message=^14.0.0&color=%23E33332&logo=testinglibrary&logoColor=%23E33332)](https://)
[![webpack-bundle-analyzer - ^4.7.0](https://img.shields.io/static/v1?label=webpack-bundle-analyzer&message=^4.7.0&color=%23007ec6)](https://)
[![webpack-cli - ^5.0.1](https://img.shields.io/static/v1?label=webpack-cli&message=^5.0.1&color=%23007ec6)](https://)
[![webpack-dev-server - ^4.11.1](https://img.shields.io/static/v1?label=webpack-dev-server&message=^4.11.1&color=%23007ec6)](https://)
[![webpack-merge - ^5.8.0](https://img.shields.io/static/v1?label=webpack-merge&message=^5.8.0&color=%23007ec6)](https://)

### Typescript support

[![@types/react - ^18.0.26](https://img.shields.io/static/v1?label=%40types%2Freact&message=^18.0.26&color=%2361DAFB)](https://)<br />
[![@types/react-dom - ^18.0.9](https://img.shields.io/static/v1?label=%40types%2Freact-dom&message=^18.0.9&color=%2361DAFB)](https://)<br />
[![@types/jest - ^29.5.5](https://img.shields.io/static/v1?label=%40types%2Fjest&message=^29.5.5&color=%23C21325)](https://)<br />

### Webpack loaders & plugins

[![html-webpack-plugin - ^5.5.0](https://img.shields.io/static/v1?label=html-webpack-plugin&message=^5.5.0&color=%23007ec6)](https://)<br />
[![css-minimizer-webpack-plugin - ^5.0.1](https://img.shields.io/static/v1?label=css-minimizer-webpack-plugin&message=^5.0.1&color=%23007ec6)](https://)<br />

[![url-loader - ^4.1.1](https://img.shields.io/static/v1?label=url-loader&message=^4.1.1&color=%23007ec6)](https://)<br />
[![style-loader - ^3.3.1](https://img.shields.io/static/v1?label=style-loader&message=^3.3.1&color=%23007ec6)](https://)<br />
[![source-map-loader - ^4.0.1](https://img.shields.io/static/v1?label=source-map-loader&message=^4.0.1&color=%23007ec6)](https://)<br />
[![sass-loader - ^13.2.0](https://img.shields.io/static/v1?label=sass-loader&message=^13.2.0&color=%23007ec6)](https://)<br />
[![json-loader - ^0.5.7](https://img.shields.io/static/v1?label=json-loader&message=^0.5.7&color=%23007ec6)](https://)<br />
[![html-loader - ^4.2.0](https://img.shields.io/static/v1?label=html-loader&message=^4.2.0&color=%23007ec6)](https://)<br />
[![file-loader - ^6.2.0](https://img.shields.io/static/v1?label=file-loader&message=^6.2.0&color=%23007ec6)](https://)<br />
[![css-loader - ^6.7.2](https://img.shields.io/static/v1?label=css-loader&message=^6.7.2&color=%23007ec6)](https://)<br />
[![babel-loader - ^9.1.3](https://img.shields.io/static/v1?label=babel-loader&message=^9.1.3&color=%23007ec6)](https://)<br />

### Storybook dependencies

[![@storybook/testing-library - 0.0.13](https://img.shields.io/static/v1?label=%40storybook%2Ftesting-library&message=0.0.13&color=%23FF4785)](https://)<br />
[![@storybook/manager-webpack5 - ^6.5.15](https://img.shields.io/static/v1?label=%40storybook%2Fmanager-webpack5&message=^6.5.15&color=%23FF4785)](https://)<br />
[![@storybook/manager-webpack4 - ^6.5.15](https://img.shields.io/static/v1?label=%40storybook%2Fmanager-webpack4&message=^6.5.15&color=%23FF4785)](https://)<br />
[![@storybook/builder-webpack5 - ^6.5.15](https://img.shields.io/static/v1?label=%40storybook%2Fbuilder-webpack5&message=^6.5.15&color=%23FF4785)](https://)<br />
[![@storybook/builder-webpack4 - ^6.5.15](https://img.shields.io/static/v1?label=%40storybook%2Fbuilder-webpack4&message=^6.5.15&color=%23FF4785)](https://)<br />
[![@storybook/addon-links - ^6.5.15](https://img.shields.io/static/v1?label=%40storybook%2Faddon-links&message=^6.5.15&color=%23FF4785)](https://)<br />
[![@storybook/addon-interactions - ^6.5.15](https://img.shields.io/static/v1?label=%40storybook%2Faddon-interactions&message=^6.5.15&color=%23FF4785)](https://)<br />
[![@storybook/addon-essentials - ^6.5.15](https://img.shields.io/static/v1?label=%40storybook%2Faddon-essentials&message=^6.5.15&color=%23FF4785)](https://)<br />
[![@storybook/addon-actions - ^6.5.15](https://img.shields.io/static/v1?label=%40storybook%2Faddon-actions&message=^6.5.15&color=%23FF4785)](https://)<br />

### Jest dependencies

[![jest-environment-jsdom - ^29.7.0](https://img.shields.io/static/v1?label=jest-environment-jsdom&message=^29.7.0&color=%23C21325)](https://)<br />
[![jest-preview - ^0.3.1](https://img.shields.io/static/v1?label=jest-preview&message=^0.3.1&color=%23C21325)](https://)<br />
[![ts-jest - ^29.1.1](https://img.shields.io/static/v1?label=ts-jest&message=^29.1.1&color=%23C21325)](https://)<br />

### Testing Library dependencies

[![@testing-library/jest-dom - ^6.1.3](https://img.shields.io/static/v1?label=%40testing-library%2Fjest-dom&message=^6.1.3&color=%23E33332)](https://)<br />

### Babel depenencies & plugins

[![@babel/preset-react - ^7.22.15](https://img.shields.io/static/v1?label=%40babel%2Fpreset-react&message=^7.22.15&color=%23F9DC3E)](https://)<br />
[![@babel/preset-typescript - ^7.23.0](https://img.shields.io/static/v1?label=%40babel%2Fpreset-typescript&message=^7.23.0&color=%23F9DC3E)](https://)<br />
[![babel-plugin-macros - ^3.1.0](https://img.shields.io/static/v1?label=babel-plugin-macros&message=^3.1.0&color=%23F9DC3E)](https://)<br />
[![babel-plugin-styled-components - ^2.1.4](https://img.shields.io/static/v1?label=babel-plugin-styled-components&message=^2.1.4&color=%23F9DC3E)](https://)<br />
[![babel-plugin-twin - ^1.1.0](https://img.shields.io/static/v1?label=babel-plugin-twin&message=^1.1.0&color=%23F9DC3E)](https://)<br />

Github badge generator: [Badge Generator](<[https://](https://michaelcurrin.github.io/badge-generator/#/generic)>)
