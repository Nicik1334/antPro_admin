import type { FC, RefObject } from 'react';
import { useState, useEffect } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { Modal } from 'antd';
import type { ShowInstance } from '@/utils/utils';
import useShow from '@/utils/utils';

interface PropsType {
  actionRef: RefObject<ActionType>;
  modelRef: RefObject<ShowInstance>;
}
const TableForm: FC<PropsType> = ({ actionRef, modelRef }) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { record } = useShow(modelRef, {
    onShow: () => setVisible(true),
  });
  useEffect(() => {
    console.log('record', record);
  }, [record]);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      actionRef.current?.reload();
      console.log('actionRef', actionRef);
    }, 2000);
  };
  return (
    <div>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <p>{'描述描述，这是一个model异步弹框,使用自定义hook，使父子组件逻辑分离'}</p>
      </Modal>
    </div>
  );
};
export default TableForm;
