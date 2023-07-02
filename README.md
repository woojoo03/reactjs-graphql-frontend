# reactjs-graphql-frontend
ReactJS and GraphQL

### Settings
```
// React, Typescript + SWC 선택

yarn create vite


// 기본 Library 세팅

yarn add react-router-dom react-error-boundary


// Prettier 세팅

yarn add -D prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react-hooks


// 디자인 관련 Library 세팅

yarn add styled-components @types/styled-components

yarn add react-icons @chakra-ui/react @emotion/react @emotion/styled framer-motion


// GraphQL Codegen 세팅

yarn add graphql @apollo/client @graphql-codegen/cli


// 디버깅 관련 세팅

yarn add vite-plugin-checker

```

### Structures
```
#### VIEW ####

components/ - react components


#### PRESENTER ####

pages/ - most of them are also containers


#### MODEL ####

interactions/ - interaction(application) logics

hooks/ - shared custom hooks


#### ETC ####

infra/ - state management and communicating with server-side

providers/ - application providers

types/ - type aliases

utils/ - shared utility functions

routes/ - routes configuration

```