## **React Lifecycle**
Every React Component goes through the same lifecycle:
- A component mounts when it's added to the screen.
- A component updates when it receives a new prop or a new state, usually in response to an interaction.
- A component unmounts when it's removed from the screen.

Here is an example:
```jsx
import { useState, useEffect } from 'react';

function CountButton() {
  const [count, setCount] = useState(0); // initial state count = 0;

  useEffect(() => {
    console.log('Component is added to the screen');
    function componentWillUnMount() {
      console.log('Component is removed from the screen');
    }
    return componentWillUnMount;  // clean up function, will be executed when component is removed
  }, []); // the empty dependency array indicates that the function inside this useEffect will be executed only once when component is added to the screen.

  useEffect(() => {
    console.log('count', count);
  }, [count]) // the function inside useEffect will be executed when count is initiated and updated

  const increaseCount = () => {
    setCount(prev => prev + 1);
  }

  return (
    <button onClick={increaseCount}>Count: {count}</button>
  )
}
```

## **useEffect**
Accordinging to react.dev documentation: **useEffect** is a React Hook that lets you synchronize a component with an external system. Ex: event listener, connect and disconnect to a chat room, fetching data.
```jsx
useEffect(setup, dependencyArray?);
```

### use **useEffect** to connect to a chat room
```jsx
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    }
  }, [serverUrl, roomId]);
  //
}
```
Steps to write a **useEffect** to connect a component to a chat room:
- Create a **setup** function to connect to the chat room.
- **setup** function return a clean up function to disconnect when **ChatRoom** component is removed from screen.
- Pass in a list of dependency in **dependencyArray** so useEffect will re-run, in this case, they are **serverUrl** and **roomId**.

React calls setup and clean up multiple times whenever it's necessary.
1. **setup** function will be call when **ChatRoom** component is added to the screen.
2. After every re-render, React will check if the dependencies have changed,
    - First, the clean up function will be called with the old props and states in the **dependencyArray**.
    - Second, the **setup** function will be called with the new props and states.
3. The **cleanup** function will be called when **ChatRoom** component is removed from the screen.

### **useEffect** with *window.addEventListener* to check if user is online.
```jsx
import { useState, useEffect } from 'react';

export default function StatusBar() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
}
```

### Fetching data with **useEffect**
If you're using a framework, using your framework's data fetching mechanism will be alot affective than writing Effects manually.
But if you want to fetch data from an Effect manually, the code will look like this:

```jsx
// Page.js
import { useState, useEffect } from 'react';
import { personAPI } from './api.js';

function RenderBio({ personId }) {
  const [person, setperson] = useState(null);
  useEffect(() => {
    let active = true;
    setperson(null);
    const url = `https://localhost:1234/person?personId=${personId}`;
    personAPI.get(url).then((response) => {
      if (active) {
        setperson(response.data);
      }
    });
    return () => {
      active = false;
    };
  }, [personId]);
  if (!person) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>{person?.[0]?.person}</h1>
      <p>{person?.[0]?.bio}</p>
    </>
  );
}

export default function Page() {
  const [bio, setBio] = useState(null);
  const [personId, setPersonId] = useState('1');
  const changePersonId = (e) => {
    setPersonId(e.target.value);
  };
  return (
    <>
      <select value={personId} onChange={changePersonId}>
        <option value='1'>Alice</option>
        <option value='2'>Bob</option>
        <option value='3'>Taylor</option>
        <hr />
      </select>
      <RenderBio personId={personId} />
    </>
  );
}
```

```jsx
// api.js
const dummyData = [
  { id: '1', person: 'Alice', bio: "This is Alice's Bio" },
  { id: '2', person: 'Bob', bio: "This is Bob's Bio" },
  { id: '3', person: 'Taylor', bio: "This is Taylor's Bio" },
];
export const personAPI = {
  // get: (url) => fetch(url).then((response) => response.json()),
  get: (url) => {
    const personId = new URL(url).searchParams.get('personId');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: dummyData.filter((item) => item.id === personId),
        });
      }, 1000);
    });
  },
};
```
in Page.js, we use **useEffect** to fetch person data from API and assign it to **person state** to be rendered in **<RenderBio />** component.
- If a component renders multiple times (as they typically do as we select a person), we need to clean up the previous effect before executing the next effect.
- In this case, we set a flag **active** in **useEffect** to indicate that the component is not yet removed after receiving personBio from API. Therefore, if we change person before the previous bio sent from API, only the latest person will be rendered.
- If we don't have to support users on older browsers (like Internet Explorer), we can use **AbortController**. - More information can be found here [useEffect Race Condition](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect)

### Update state from a previous state from an Effect
```jsx
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return <p>count: {count}</p>
}
```

You might think of putting **count** state into **dependencyArray**, but the **setup** function inside **useEffect** doesn't depend on **count** state. If **count** is put in the **dependencyArray**, it will cause an infinite loop when each **useEffect** call will update **count**, and updating **count** will trigger **useEffect** to re-run.

What if you want to stop the timer, reset count, or reset the timer? We will use **useRef** - **useRef** is a React Hook that lets you reference a value that's not needed for rendering, and is consistent between re-rendering.

```jsx
import { useRef } from 'react';
...
function useRefExample() {
  const ref = useRef(initialValue);
}
```

Now, we apply useRef to timer.

```jsx
import { useState, useEffect, useRef } from 'react';

funciton Counter() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(0);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000)
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);
  const resetCount = () => {
    setCount(0);
  }
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }
  const resetTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setCount(c => c + 1);
    })
  }

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={resetCount}>reset count</button>
      <button onClick={stopTimer}>stop timer</button>
      <button onClick={resetTimer}>reset timer</button>
    </>
  )
}
```

There is something you should keep in mind when using **useRef**
- **useRef** stores a value that's not needed for render, and is consistent between re-render. So you can mutate useRef (unlike state which is immutable).
- Updating **useRef** doesn't trigger a re-render.
- The information is local, meaning each component <Counter /> called will have a different timerRef.
- Do not write or read **ref.current** during rendering, except for initialization. Writing or Reading **ref.current** during redering will make your component's behavior unpredictable.