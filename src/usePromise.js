//// For Typescript

// function usePromise<I, T>(promise: (arg: I) => Promise<T>, arg: I) {
//   const [_promise, _setPromise] = useState<Promise<void>>()
//   const [_status, _setStatus] = useState<"pending" | "fulfilled" | "error">("pending")
//   const [_result, _setResult] = useState<T>()
//   const [_error, _setError] = useState<Error>()

//   function resolvePromise(result: T) {
//       _setStatus("fulfilled")
//       _setResult(result)
//   }
//   function rejectPromise(error: Error) {
//       _setStatus("error")
//       _setError(error)
//   }

//   useEffect(() => {
//       _setStatus("pending")
//       _setPromise(promise(arg).then(resolvePromise, rejectPromise))
//   }, [arg])

//   if (_status === "pending" && _promise) {
//       throw _promise
//   }
//   if (_error) {
//       throw _error
//   }
//   return _result
// }

// export default usePromise;

////  For javascript

import { useEffect, useState } from "react";

function usePromise(promise, arg) {
  console.log("promise(arg): ", promise, arg);
  const [_promise, _setPromise] = useState();
  const [_status, _setStatus] = useState("pending");
  const [_result, _setResult] = useState();
  const [_error, _setError] = useState();

  function resolvePromise(result) {
    _setStatus("fulfilled");
    _setResult(result);
  }
  function rejectPromise(error) {
    _setStatus("error");
    _setError(error);
  }

  useEffect(() => {
    console.log("promise(arg): ", promise(arg));
    _setStatus("pending");
    _setPromise(promise(arg).then(resolvePromise, rejectPromise));
  }, [arg, promise]);

  if (_status === "pending" && _promise) {
    throw _promise;
  }
  if (_error) {
    throw _error;
  }
  console.log("_state, _result: ", _status, _result);
  return _result;
}

export default usePromise;
