import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Highlight, themes } from 'prism-react-renderer';

interface MarkdownProps {
  connect: string;
}

// 定义 code 组件的 props 类型
interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Markdown: React.FC<MarkdownProps> = ({ connect }) => {
  const components: Components = {
    code({ inline, className, children }: CodeProps) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'text';

      // 内联代码
      if (inline) {
        return (
          <code className={className} style={{ backgroundColor: '#fffee0', padding: '2px 4px', borderRadius: '4px', fontSize: '0.95em' }}>
            {children}
          </code>
        );
      }

      // 处理 children 为字符串
      let childrenString = '';
      if (typeof children === 'string') {
        childrenString = children;
      } else if (Array.isArray(children)) {
        childrenString = children.join('');
      } else if (children == null) {
        childrenString = '';
      } else {
        childrenString = String(children);
      }

      return (
        <Highlight
          theme={themes.github}
          code={childrenString.replace(/\n$/, '')}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{
                ...style,
                padding: '1rem',
                borderRadius: '4px',
                overflowX: 'auto',
                margin: '1rem 0',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      );
    },
  };

  return (
    <div
      style={{
        all: 'unset',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {connect}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;