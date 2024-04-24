---
title: React Hook - useState
date: 2024-04-23
---

# useState

`useState` is a Hook that allows you to have state variables in functional components. When the `state` changes, the component re-renders.

```jsx
const [state, setState] = useState(initialState);
```

## Caveats

- `useState` is a Hook, so you can only call it at the top level of a functional component or your own hook. It can not be called inside loops, conditions, or nested functions. If you need that, extract a new component and move the state into it.
- `setState` doesn't immediately mutate the state. It schedules an update to the component. This is to improve performance and is the reason why you can't use the value of the state immediately after calling `setState`. Instead, use `useEffect` to perform side effects after the state has been updated.
- In Strict Mode, React will call your initializer function twice in order to help you find accidental impurities. This is development-only behavior and won't affect the production build.

Two ways to update the state:

```jsx
setState(newState); // used when you don't need the previous state
```

```jsx
setState((prevState) => newState); // used when you need to compute the next state based on the previous state
```

## Example

```jsx
function CountApp() {
  const [count, setCount] = useState(0);
  function updateCount() {
    setCount((count) => count + 1);
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={updateCount}>Click me</button>
    </div>
  );
}
```

## Caveats

1. The `setState` function only updates the state variable for the next render. If you read the state variable after calling the set function, it will return the old value that was currently on the screen.
2. React will **compare** the **current value** and the **next value** of the state variable to decide whether **to re-render** the component. If you are updating the state variable with the same value, React will not re-render the component. React uses [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) for the comparison.
3. React **batches** multiple `set` function calls into a single update for better performance. React version 17 with legacy `render` will only batch the update inside an event handler and `useEffect`, but React version 18 `createRoot` will batch the update in all cases. [More info on how automatic batching behavior works](https://github.com/reactwg/react-18/discussions/21).

## Example 1: `setState` only updates the state for the next render

```jsx
function Caveats1() {
  const [count, setCount] = useState(0);
  function updateCount() {
    setCount((count) => count + 1);
    console.log('count', count); // return count = 0 instead of count = 1
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={updateCount}>Click me</button>
    </div>
  );
}
```

## Example 2: React does not re-render if the next state is the same (compare by [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is))

```jsx
function Caveats2() {
  const [count, setCount] = useState(0);
  function updateCount() {
    setCount(0); // doesn't re-render because the value is the same
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={updateCount}>Click me</button>
    </div>
  );
}
```

```jsx
const PERSON = {
  firstName: 'Nguyen',
  lastName: 'A',
};
function Caveats2() {
  const [person, setPerson] = useState(PERSON);
  function updateByValue() {
    setCount((prev) => {
      prev.fistName = 'Tran';
      prev.lastName = 'B';
      return prev;
    }); // doesn't re-render because the object reference is the same
  }
  function updateByReference() {
    setCount((prev) => {
      return {
        firstName: 'Tran',
        lastName: 'B',
      };
    }); // re-render because the object reference is different
  }
  return (
    <div>
      <p>name: {person.lastName + '' + person.firstName}</p>
      <button onClick={updateByValue}>Update Object by Value</button>
      <button onClick={updateByReference}>Update Object by Reference</button>
    </div>
  );
}
```

## Example 3: Automatic batching

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setCount((c) => c + 1); // Does not re-render yet
    setFlag((f) => !f); // Does not re-render yet
    // React will only re-render once at the end (that's batching!)
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? 'blue' : 'black' }}>{count}</h1>
    </div>
  );
}
```

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function updateFlag() {
    setFlag((f) => !f); // Does not re-render yet
    // React will only re-render once at the end (that's batching!)
  }
  useEffect(() => {
    setCount(0);
    setCount(1);
    setCount(2);
    setCount((prev) => prev + 1); // 3
    setCount((prev) => prev + 1); // 4
    // React will only re-render once at the end (that's batching!)
  }, [flag]);

  return (
    <div>
      <button onClick={updateFlag}>Next</button>
      <h1 style={{ color: flag ? 'blue' : 'black' }}>{count}</h1>
    </div>
  );
}
```

## Other use cases

1. Use State as a key to reset a component

```jsx
function ResetComponent() {
  const [key, setKey] = useState(0);
  function reset() {
    setKey((prev) => prev + 1);
  }
  return (
    <div>
      <button onClick={reset}>Reset</button>
      <Child key={key} />
    </div>
  );
}
```

2. Use State to store a previous value passed as a prop

```jsx
function Child({ value }) {
  const [prevValue, setPrevValue] = useState(0);
  let trend = 'no change';
  useEffect(() => {
    switch (value - prevValue) {
      case 0:
        trend = 'no change';
      case value > prevValue:
        trend = 'up';
      case value < prevValue:
        trend = 'down';
    }
    setPrevValue(value);
  }, [value]);
  return <p>Trend: {trend}</p>;
}
```
