import { useEffect, useRef } from 'react';
import '@chatui/core/es/styles/index.less';
import '@chatui/core/dist/index.css';
import { PageContainer } from '@ant-design/pro-layout';

const Index = () => {
  const wrapper = useRef();
  useEffect(() => {
    const bot = new window.ChatSDK({
      root: wrapper.current,
      config: {
        loadMoreText: '点击加载更多',
        navbar: {
          title: '智能助理',
        },
        // 机器人头像
        robot: {
          avatar: '//gw.alicdn.com/tfs/TB1U7FBiAT2gK0jSZPcXXcKkpXa-108-108.jpg',
        },
        // 用户头像
        user: {
          avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg',
        },
        messages: [
          {
            type: 'text',
            content: {
              text: '智能助理为您服务，请问有什么可以帮您？',
            },
          },
        ],
        quickReplies: [
          {
            name: '发送文本',
            isHighlight: true,
          },
          {
            name: '可见文本',
            type: 'text',
            text: '实际发送的文本',
            isNew: true,
          },
          {
            name: '点击跳转',
            type: 'url',
            url: 'https://www.taobao.com/',
          },
          {
            name: '唤起卡片',
            type: 'card',
            card: { code: 'knowledge', data: {} },
          },
          {
            name: '执行指令',
            type: 'cmd',
            cmd: { code: 'agent_join' },
          },
        ],
      },
      requests: {
        send: (msg: any): any => {
          if (msg.type === 'text') {
            return {
              type: 'text',
              content: {
                text: 'my text',
              },
            };
            return {
              url: '//api.server.com/ask',
              data: {
                q: msg.content.text,
              },
            };
          }
        },
      },
      // handlers: {
      //   /* ... */
      // },
    });

    bot.run();
  }, []);

  return (
    <PageContainer>
      <div style={{ width: '100%' }} ref={wrapper} />;
    </PageContainer>
  );
};
export default Index;
