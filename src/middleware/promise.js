const promiseMiddleware = store => next => action => {
  if (action.promise && typeof action.promise.then == 'function') {
    const {type, promise, ...rest} = action

    next({type, ...rest})

    return promise.then(res => {
      next({type: type + 'Success', ...res})
    }, error => {
      next({type: type + 'Failure', ...error})
    })
  }
  next(action)
}

export default promiseMiddleware