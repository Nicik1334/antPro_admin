import { useState, useRef, useEffect } from 'react';
import { history } from 'umi';

/**
 * useState的回调获取最新的state
 * @export
 * @template T
 * @param {T} state
 * @return {*}  { [T, Function]}
 */
function useCallbackState<T>(state: T): [T, Function] {
  const callBackRef = useRef<Function | null>(null);
  const [data, setData] = useState<T>(state);
  useEffect(() => {
    callBackRef?.current?.(data);
  }, [data]);

  return [
    data,
    (newState: T, cb: Function) => {
      callBackRef.current = cb;
      if (typeof newState === 'function') {
        setData((prevState: T) => {
          const ret = newState?.(prevState);
          return ret;
        });
      } else {
        setData(newState);
      }
    },
  ];
}

/**
 * 用于实时获取当前路由locusPage信息
 * @param pathname 当前路由pathname
 * @returns
 *  useEffect(() => {
      * const unlisten = useChangeLocation('/xxx', async () => {
         
        });
        return () => unlisten();
  }, []);
 */

function useShowLocation(pathname: string, callBack: (location: any) => void) {
  const unlisten = history.listen(async (location: { pathname: string }) => {
    // 指定路由
    if (location.pathname === pathname) {
      callBack(location);
    }
  });
  return unlisten;
}

export { useCallbackState, useShowLocation };
