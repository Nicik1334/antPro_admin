import _cloneDeep from 'lodash/cloneDeep';
import type { RefObject } from 'react';
import { useImperativeHandle, useRef } from 'react';

export declare type ShowInstance<T = any> = {
  show: (record: T) => void;
  hide: (data?: any) => void;
  getData: () => any;
};

export declare type Options<T> = {
  /** show触发事件 */
  onShow: (record: T) => void;
  /** 格式化record */
  onFormart?: (record: T) => T;
  /** hide触发事件 */
  onHide?: (data?: any) => void;
};

interface UseShowCallBackType<T> {
  /** 父组件传入参数 */
  record: T;
  /** 向父组件ref写入data数据 */
  onCallback: (e: any) => any;
}
/**
 * 父调用子组件方法，并传值
 * @param funcRef ref对象
 * @param options { onShow, onFormart, onHide }
 * @returns T 传输的数据
 * -- deprecated
 */

export default function useShow<T = any>(
  funcRef: RefObject<ShowInstance<T>>,
  options: Options<T>,
): UseShowCallBackType<T> {
  const ref = useRef({});
  const callBackRef = useRef();
  const onShow = options.onShow,
    onFormart = options.onFormart,
    onHide = options.onHide;

  const onCallback = function onCallback(e: any) {
    callBackRef.current = e;
  };

  useImperativeHandle(funcRef, function () {
    return {
      show: function show(record) {
        ref.current = _cloneDeep(record); // 深拷贝，避免值被修改，造成异常

        onShow(ref.current);
      },
      hide: function hide(data) {
        if (onHide) onHide(data);
      },
      getData: function getData() {
        return callBackRef.current;
      },
    };
  });
  return {
    record: onFormart ? onFormart(ref.current) : ref.current,
    onCallback: onCallback,
  };
}
