---
title: React Hook - useReducer
date: 2024-04-29
---

# useReducer

When `state` updates spread across many event handlers can get overwhelming, you can use `useReducer` to solidate all the state update logic outside your component in a single function.

## Reference

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

### Parameters

1. `reducer`: The reducer function that specifies how the state gets updated. It must be pure, should take the state and action as arguments, and should return the next state. State and action can be of any types.
2. `initialArg`: The value from which the initial state is calculated. It can be a value of any type. How the initial state is calculated from it depends on the next init argument.
3. `init` (optional): The initializer function that should return the initial state. If it’s not specified, the initial state is set to initialArg. Otherwise, the initial state is set to the result of calling `init(initialArg)`.

### Return

`useReducer` returns an array with two values:

1. The current state: it is set to `initialArg` (if `init` is not set) or `init(initialArg)`
2. The `dispatch` function that let you update the state to a different value and trigger re-render.

### Example:

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1,
      };
    case "decrement":
      return {
        count: state.count - 1,
      };
    case "reset":
      return {
        count: 0,
      };
    default:
      throw Error("Unknown action: " + action.type);
  }
}
function CountApp() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </>
  );
}
```

### Caveats

1. `reducer` function is pure, meaning it doesn't contain any side effect (like setTimeout, fetch APIs, Math.random()) and for the known parameters we can always calculate the returned value.
2. `state` in reducer function is read-only. Don't modify any objects or arrays in state. Instead, always return a new object from your `reducer`
3. In `Strict Mode`, React will call your `reducer` and `initializer` functions twice to find impurity. This shouldn’t break your code.

### Example:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "added_todo": {
      // 🚩 Mistake: mutating state
      state.todos.push({ id: nextId++, text: action.text });
      return state;
    }
    // ...
  }
}
```

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "added_todo": {
      // ✅ Correct: replacing with new state
      return {
        ...state,
        todos: [...state.todos, { id: nextId++, text: action.text }],
      };
    }
    // ...
  }
}
```
