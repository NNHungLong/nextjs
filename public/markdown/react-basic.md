### **React Component**: React Component is an unit that control the flow of fetching data, transform data and represent data on the UI.

### **React flow**

  ![React flow image](https://redux.js.org/assets/images/one-way-data-flow-04fe46332c1ccb3497ecb04b94e55b97.png)

### **React Component Structure**

- Components accept inputs called **props** and return React Elements describing what should appear on the screen.

```jsx
function Welcome(props) { // child component
  return <h1>Hello, {props.name}</h1>;
}

function Display() { // parent component
  return <Welcome name='World'> // <h1>Hello, World</h1>
}
```

- To control the condition to display View on the UI, we use **state**

```jsx
import { useState } from 'react';

function Count() {
  const [count, setCount]  = useState(0); // initial count is 0
  function increaseCount() {
    setCount((prev) => prev + 1)
  }
  return (
    <button onClick={handleCLick}>
      Count: {count}
    </button>
  )
}
```
This **Count** component displays a button (***VIEW***) with a number of *count* in it. Whenever the button is clicked (***ACTION***), the *count* (***STATE***) will increase by one and update into the screen.

- Another way to display View on the UI conditionally is by using **Conditional Rendering**

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li>{name} ✔</li>;
  }
  return <li>{name}</li>;
}
function PackingList() {
  return (
    <section>
      <h1>Packing list</h1>
      <Item name='Suit' isPacked={true}>
      <Item name='Helmet' isPacked={true}>
      <Item name='Sunscreen lotion' isPacked={false}>
    </section>
  )
}
```

![Conditional rendering](../images/conditional-rendering.png)

- Beside **Conditional Rendering**, we can use Javascript function **8*Array.prototype.map()*** or ***Array.prototype.filter()*** to display a transformed/filtered list. [Filter and Map list](https://react.dev/learn/rendering-lists)

- Node: Keeping component ***PURE*** to prevent side effect. [Keeping component pure](https://react.dev/learn/keeping-components-pure)