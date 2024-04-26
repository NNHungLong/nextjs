---
title: React Hook - useCallback
date: 2024-04-25
---

# useCallback

`useCallback` is a Hook that lets you cache a function definition between re-renders.

```jsx
const cachedFn = useCallback(fn, dependencies);
```

## Usage

1. Skipping re-render of components
2. Updating state from a memoized callback
3. Preventing an Effect from firing too often
4. Optimizing a custom Hook

## 1. Skipping re-render of components

Sometimes you will need to pass a function as a prop to a child component. If the function is re-created on every render, the child component will re-render even if the props haven't changed. `useCallback` will cache the function definition and only re-create it when the dependencies change.

```jsx
import { memo, useCallback } from 'react';

function ProductPage({ productId, referrer }) {
  const handleSubmit = useCallback(
    (orderDetails) => {
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails,
      });
    },
    [productId, referrer]
  );

  return (
    <div>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
const ProductForm = memo(({ onSubmit }) => {
  return <form onSubmit={onSubmit}>{/* form fields */}</form>;
});
```

**By default, when a component re-renders, React re-renders all of its children recursively**. However, we can use `React.memo` to prevent a component from re-rendering if its props haven't changed. In the example above, `ProductForm` is wrapped in `memo` to prevent it from re-rendering when ProductPage re-renders.
Since `handleSubmit` is memoized with `useCallback` and will only re-create when `productId` or `referrer` changes (compared by [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), `ProductForm` will only re-render when `productId` or `referrer` changes.

## 2. Updating state from a memoized callback

Sometimes, you might need to update state based on previous state from a memoized callback.

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos([...todos, newTodo]);  // not recommended
  }, [todos]);
  // ...
```

This is equal to

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos(todos => [...todos, newTodo]); // use updater function to get the previous state
  }, []); // ✅ No need for the todos dependency
  // ...
```

## 3. Preventing an `useEffect` from firing too often

Sometimes you will need to pass a function to an `useEffect`. If the function is re-created on every render, the effect will fire every time the component re-renders. `useCallback` will cache the function definition and only re-create it when the dependencies change.

```jsx
function ChatRom({ roomId }) {
  const createOptions = useCallback(() => {
    return {
      serverUrl: 'https://localhost:8080',
      roomId,
    };
  }, [roomId]); // ✅ Only re-create when roomId changes
  useEffect(() => {
    const options = createOptions();
    const connection = new ChatConnection(options);
    connection.connect();
    return () => {
      connection.close();
    };
  }, [createOptions]); // ✅ Only re-run the effect when createOptions changes
  // ...
}
```

This is equal to:

```jsx
function ChatRom({ roomId }) {
  useEffect(() => {
    function createOptions() {
      return {
        serverUrl: 'https://localhost:8080',
        roomId,
      };
    }
    const options = createOptions();
    const connection = new ChatConnection(options);
    connection.connect();
    return () => {
      connection.close();
    };
  }, [roomId]); // ✅ Only re-run the effect when roomId changes
  // ...
}
```

## 4. Optimizing a custom Hook

If you’re writing a custom Hook, it’s recommended to wrap any functions that it returns into useCallback:

```jsx
function useDebouncedValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const debouncedSetter = useCallback(
    (newValue) => {
      setTimeout(() => {
        setDebouncedValue(newValue);
      }, delay);
    },
    [delay]
  ); // ✅ Only re-create when delay changes
  return [debouncedValue, debouncedSetter];
}
```

This ensures that the consumers of your Hook can optimize their own code when needed.
