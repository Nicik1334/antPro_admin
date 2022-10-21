import type { FC } from 'react';
import { useState } from 'react';
import { flushSync } from 'react-dom';

interface PropsType {
  /**
   * 渲染数据
   */
  itemList: any[];
  /**
   * 容器高度
   */
  containerHeight: number;
  /**
   * item高度
   */
  itemHeight: number;
  /** item选中事件 */
  onSelect: (e: any) => void;
  itemChildren?: any;
}

const FixedSizeList: FC<PropsType> = ({
  containerHeight,
  itemHeight,
  itemList,
  onSelect,
  itemChildren = false,
}) => {
  // children 语义不好，赋值给 Component

  const itemCount = itemList.length;
  const contentHeight = itemHeight * itemCount; // 内容高度
  const [scrollTop, setScrollTop] = useState(0); // 滚动高度

  // 继续需要渲染的 item 索引有哪些
  let startIdx = Math.floor(scrollTop / itemHeight);
  let endIdx = Math.floor((scrollTop + containerHeight) / itemHeight);

  // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题
  const paddingCount = 2;
  startIdx = Math.max(startIdx - paddingCount, 0); // 处理越界情况
  endIdx = Math.min(endIdx + paddingCount, itemCount - 1);

  // 需要渲染的 items
  const items = [];
  for (let i = startIdx; i <= endIdx; i++) {
    items.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: 0,
          top: i * itemHeight,
          width: '100%',
          height: itemHeight,
        }}
        onClick={() => onSelect && onSelect(itemList[i])}
      >
        {itemChildren(itemList[i]) || i}
      </div>,
    );
  }

  return (
    <div
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative',
      }}
      onScroll={(e) => {
        flushSync(() => {
          setScrollTop(e.target.scrollTop);
        });
      }}
    >
      <div style={{ height: contentHeight }}>{items}</div>
    </div>
  );
};

export default FixedSizeList;
