---
title: "React + TypeScript Container Component 만드는법"
excerpt: "React.js에서 TypeScript를 사용할 때 다른 컴포넌트를 감싸는 컴포넌트는 어떻게 선언할 수 있을까요?"
date: "2022-08-02"
---

> `React.js`에서 TypeScript를 사용할 때 다른 컴포넌트를 감싸는 컴포넌트는 어떻게 선언할 수 있을까요?

# TIL

TypeScript에서 prop으로 children Component를 받을 수 있게 하면 됩니다.

이 때, prop의 타입은 아래와 같이 지정해줬습니다.

```tsx
type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => <Parent>{children}</Parent>;
```

## 사용

```tsx
const Page = () => (
  <Layout>
    <Children />
  </Layout>
);
```

아주 간단하죠!😃
