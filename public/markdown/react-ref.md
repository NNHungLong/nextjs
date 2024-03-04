# React Ref in React 18

When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref.

## Adding a ref to your component

```jsx
import { useRef } from 'react';
```

Inside your component, call the `useRef` Hook and pass the initial value that you want to reference as the only argument. For example, here is a ref to the value `0`:

```jsx
const myRef = useRef(0);
```

## Accessing a ref

When you want to access the value of a ref, you read the `.current` property. For example, here is how you can log the value of a ref to the console:

```jsx
console.log(myRef.current);
```
