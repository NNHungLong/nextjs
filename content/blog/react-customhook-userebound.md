---
title: React Custom Hook - useRebounce
date: 2024-04-30
---

# useRebounce

`useRebounce` can be used to return a value after a set period of time, it is useful when calling an API after user updates an input and we want to wait for the user to finish updating that input.

## Usage

```jsx
const [debouncedVal, delay] = useDebounce(value, delay);
```

## Implementation

```jsx
import { useState, useEffect } from "react";

function useDebounce( value, delay = 500 ) {
  const [debouncedVal, setDebouncedVal] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);
    const cleanUp = () => clearTimeout(timeout);
    return cleanUp;
  }, [value, delay]);
  return debouncedVal;
}

function DebounceSearch() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);
  const [articles, setArticles] = useState('');
  const handleOnchangeSearch = (e) => {
    setSearch(e.target.value);
  }
  useEffect(() => {
    if (loading) return;
    const loadArticles = async () => {
      setLoading(true);
      const articlesResult = await fetch(`https://localhost:8080/article?search=${debouncedSearch}`);
      setArticles(articlesResult);
      setLoading(false);
    }
  }, [debouncedSearch])
  return (
    <div>
      <input type='text' onChange={handleOnchangeSearch} alt='search box'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```
