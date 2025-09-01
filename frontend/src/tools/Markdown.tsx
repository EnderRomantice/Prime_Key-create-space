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

    p({ children }) {
      return (
        <p style={{ margin: '1em 0', lineHeight: '1.7' }}>
          {children}
        </p>
      );
    },
    h1: ({ children }) => <h1 style={{ fontSize: '2em', margin: '0.67em 0' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: '1.75em', margin: '0.83em 0' }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontSize: '1.5em', margin: '1em 0' }}>{children}</h3>,
    h4: ({ children }) => <h4 style={{ fontSize: '1.25em', margin: '1.33em 0' }}>{children}</h4>,
    h5: ({ children }) => <h5 style={{ fontSize: '1.1em', margin: '1.5em 0' }}>{children}</h5>,
    h6: ({ children }) => <h6 style={{ fontSize: '1em', margin: '1.67em 0' }}>{children}</h6>,

    ul({ children }) {
      return <ul style={{ margin: '1em 0', paddingLeft: '2em' }}>{children}</ul>;
    },
    ol({ children }) {
      return <ol style={{ margin: '1em 0', paddingLeft: '2em' }}>{children}</ol>;
    },
    blockquote({ children }) {
      return (
        <blockquote
          style={{
            margin: '1em 0',
            padding: '0.5em 1em',
            backgroundColor: '#f9f9f9',
            borderLeft: '4px solid #ddd',
            fontStyle: 'italic',
          }}
        >
          {children}
        </blockquote>
      );
    },
    a({ href, children }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0066cc', textDecoration: 'underline' }}
        >
          {children}
        </a>
      );
    },
    
    table({ children }) {
      return (
        <div style={{ overflowX: 'auto', margin: '1em 0' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            {children}
          </table>
        </div>
      );
    },
    th({ children }) {
      return (
        <th
          style={{
            border: '1px solid #ddd',
            padding: '8px',
            backgroundColor: '#f2f2f2',
            textAlign: 'left',
          }}
        >
          {children}
        </th>
      );
    },
    
    td({ children }) {
      return (
        <td
          style={{
            border: '1px solid #ddd',
            padding: '8px',
          }}
        >
          {children}
        </td>
      );
    },


    code({ inline, className, children }: CodeProps) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'text';

      if (inline) {
        return (
          <code
            style={{
              backgroundColor: '#fffee0',
              padding: '2px 4px',
              borderRadius: '4px',
              fontSize: '0.95em',
              fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
              fontWeight: 500,
            }}
          >
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
          language={language as any}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{
                ...style,
                padding: '1rem',
                borderRadius: '6px',
                overflowX: 'auto',
                margin: '1.2em 0',
                fontSize: '0.95em',
                lineHeight: '1.5',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} style={{ display: 'table-row' }}>
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
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1rem',
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {connect}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;