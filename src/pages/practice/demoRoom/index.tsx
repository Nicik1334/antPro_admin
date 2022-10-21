import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import FixedSizeList from '@/components/fixedSizeList';

const Index = () => {
  const list = new Array(10000).fill(0).map((_item, i) => {
    return { title: `这是${i}`, id: i };
  });

  const tabList = [
    {
      key: 'demo1',
      tab: '虚拟滚动',
      children: (
        <div className={styles.content}>
          <div className={styles.container}>
            <FixedSizeList
              itemList={list}
              containerHeight={400}
              itemHeight={40}
              onSelect={(e) => {
                console.log(e);
              }}
              itemChildren={(item: { title: any; id: any }) => <>{item.title}</>}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'demo2',
      tab: '组件2',
      children: (
        <div className={styles.content}>
          <div className={styles.container}>组件2</div>
        </div>
      ),
    },
    {
      key: 'demo3',
      tab: '组件3',
      children: (
        <div className={styles.content}>
          <div className={styles.container}>组件3</div>
        </div>
      ),
    },
  ];
  return <PageContainer tabList={tabList} />;
};

export default Index;
