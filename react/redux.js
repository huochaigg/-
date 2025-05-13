function createStore(reducer, preloadedState, enhancer) {
  // 如果第二个参数是函数，说明它是 enhancer
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  
  if (enhancer) {
    return enhancer(createStore)(reducer, preloadedState)
  }

  let currentState = preloadedState
  const listeners = []

  function getState() {
    return currentState
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    listeners.forEach(listener => listener())
    return action
  }

  function subscribe(listener) {
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      if (index !== -1) listeners.splice(index, 1)
    }
  }

  // 初始化 state
  dispatch({ type: '@@redux/INIT' })

  return { getState, dispatch, subscribe }
}

function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function combineReducers(reducers) {
  return (state = {}, action) => {
    const nextState = {}
    for (const key in reducers) {
      nextState[key] = reducers[key](state[key], action)
    }
    return nextState
  }
}

const applyMiddleware = (...middlewares) => createStore => (...args) => {
  const store = createStore(...args)
  let dispatch = store.dispatch
  const middlewareAPI = {
    getState: store.getState,
    dispatch: (action) => dispatch(action)
  }
  const chain = middlewares.map(middleware => middleware(middlewareAPI))
  dispatch = compose(...chain)(store.dispatch)
  return { ...store, dispatch }
}