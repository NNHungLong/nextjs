### **Action**: plain javascript object that has a "type" field, and other fields to describe what happens. By convention we use "payload".

Example:

```js
const addTodo = {
    type: 'todo',
    payload: 'Buy milk'
}
```

### **Action Creators**: action creator is a function that creates and returns an action Object. We typically use this so we don't have to write the action object by hand every time.

```js
const addTodo = (text) => {
    return {
        type: 'todo',
        payload: text,
    }
}
```

### **Reducers**: a reducer is a function that receives the current state and an action object. Reducer will decide how to update the state if necessary, and return a new state. (state, action) => newState.

#### A reducer is similar to an event listener which handles events based on the received action (event) type.

#### Reducers must always follow some rules:

- New state is calculated based on "State" and "Action" arguments.
- The old "state" is immutable, new state must be copied instead of mutating the old "state".
- They must not do any asynchronous logic, calculate from random values, or cause other "side effects".

### **Store**: Redux application state lives in an object called the store.

#### The store is created by passing in a reducer, and has a method called getState that return the current state value.

```js
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({ reducer: conterReducer });
console.log(store.getState()); // {value: 0}
```

### **Dispatch**

#### The Redux store has a method called dispatch. The only way to update the state is to call store.dispatch() and pass in an action object. The store will run its reducer function and save the new state value inside, and we can call getState() to retrieve updated value:

```js
store.dispatch({ type: 'counter/increment' })
console.log(store.getState()); // {value 1}
```

#### you can think of dispatching actions as "triggering an event". Reducers act like an event listeners, and when they hear an action they are interested in (action.type), they will update the state in response.

#### We typically call action creators to dispatch the right action


```js
const increment = () => {
    return {
        type: 'counter/increment'
    }
}
store.dispatch(increment());
console.log(store.getState()); // { value: 2 }
```

### **Selectors**

#### Selectors are functions that know how to extract specific pieces of information from a store state value. As an application grows biggers, this can help avoid repeating logic as different parts of the app need to read the same data.

```js
const selectCounterValue = state => state.value
const currentValue = selectCounterValue(store.getState());
console.log(currentValue); // 2
```

#### Redux Application Data Flow: 'One-way data flow':

- State describe the condition of the app at a specific point in time.
- The UI is rendered based on that state.
- When something happens (such as a user clicking a button), the state is updated based on what occurred.
- The UI re-renders based on the new state.

#### For Redux specifically, we can break these steps into more detail:

- Initial setup:
  - A Redux store is created using a root reducer function
  - The store calls the root reducer once, and saves the returned value as its initial `state`.
  - When the UI is first rendered, UI components access the current state of Redux store, and use that data to decide what to render. They also subscribe to any future updates so that they can know if the state has changed.
- Update:
  - Something happens in the app, such as a user clicking a button.
  - The app code dispatches an action to the Redux store, like dispatch({ type: 'counter/increment' })
  - The store runs the reducer function again with the previous `state` and the current `action`, and saves the return value as the new `state`.
  - The store notifies all parts of the UI that are subscribed that the store has been updated.
    Each UI component that needs data from the store checks to see if the parts of the state they need have changed.
  - Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown on the screen.

### **Redux flow**

  ![Redux flow image](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

### **Writing Async Logic with Thunks**

#### A **Thunk** is a specific kind of Redux function that can contain asynchronous logic. Thunks are written using two functions:

- An inside function, which gets dispatch and getState as arguments.
- The outside creator function, which creates and returns the thunk function.
####

```js
const incrementByAmountAsync = (amount: number) => (dispatch: any, getState: any) => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount));
    }, 1000);
}
```