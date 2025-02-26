import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Highlight, themes } from 'prism-react-renderer';

export default function Markdown({ connect }) {
  return (
    <div
      style={{
        all: "unset",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#333",
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "text";
            
            // 内联代码处理
            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }

            // 代码块高亮处理
            return (
              <Highlight
                theme={themes.github}
                code={String(children).replace(/\n$/, "")}
                language={language}
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre 
                    className={className} 
                    style={{ 
                      ...style, 
                      padding: "1rem",
                      borderRadius: "4px",
                      overflowX: "auto" 
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
          }
        }}
      >
        {connect}
      </ReactMarkdown>
    </div>
  );
}