# Style cleanup notes

This version keeps Redux slices closer to the old task-manager project style.

## Redux slice style

Reducers now use explicit returned state objects:

```js
createItemRequest(state, action) {
  return {
    ...state,
    loading: true,
    error: null,
  };
}
```

Instead of Immer mutation style:

```js
state.loading = true;
```

Actions are split by module and paired with their own slice files.
