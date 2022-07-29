import { useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Input } from 'antd';
import TableForm from './form';
import { history } from 'umi';
import type { ShowInstance } from '@/utils/utils';
import type { TableListItem, TableListPagination } from '@/pages/list/table-list/data';
import { rule } from '@/pages/list/table-list/service';

const Index = () => {
  const actionRef = useRef<ActionType>(null);
  const modelRef = useRef<ShowInstance>(null);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
      tip: '规则名称是唯一的 key',
      render: (dom) => {
        return <a onClick={() => {}}>{dom}</a>;
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => `${val}万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    {
      title: '上次调度时间',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            modelRef.current?.show({
              ...{
                name: '数据',
              },
            });
          }}
        >
          配置
        </a>,
        <a
          key="subscribeAlert"
          onClick={() => {
            history.push({
              pathname: '/profile/basic',
              query: {
                id: '1',
              },
            });
          }}
        >
          跳转
        </a>,
      ],
    },
  ];
  useEffect(() => {
    console.log(' ', actionRef);
    actionRef.current?.reload();
  }, []);
  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        columns={columns}
        request={rule}
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        pagination={{
          pageSize: 10,
        }}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
      <TableForm actionRef={actionRef} modelRef={modelRef} />
    </PageContainer>
  );
};

export default Index;
