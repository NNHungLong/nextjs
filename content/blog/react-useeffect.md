---
title: React Hook - useEffect
date: 2024-04-29
---

# useReducer

`useEffect` is a React Hook that lets you synchronize a component with an external system, or perform an action in React lifecycle.

```jsx
useEffect(setup, dependencies?)
```

## What is React Lifecycle?

Every React component goes through the same lifecycle:

1. A component mounts when it’s added to the screen.
2. A component updates when it receives new props or state, usually in response to an interaction.
3. A component unmounts when it’s removed from the screen.

For Example: A `ChatRoom` component which will connect to the chatroom server when the component is added to the screen, and disconnect to the chatroom server when it's removed from the screen, and will update to a new chatroom (disconnect to the old chatroom and connect to a new chatroom) when the `roomId` gets updated and passed to `ChatRoom` component as a prop.

```jsx
import { useEffect } from "react";
const serverUrl = "https://localhost:8080";

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(userUrl, roomId);
    connection.connect();
    function cleanUp() {
      connection.disconnect();
    }
    return cleanUp; // the cleanUp function will be executed when ChatRoom component unmounts
  }, [roomId]); // dependencies - this useEffect when the ChatRoom component mounts, or when roomId gets updated
  // ...
}
```

## Usage

1. Connecting to an external system (example above)
2. Wrapping Effects in custom Hooks
3.
