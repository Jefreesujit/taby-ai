import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import a11yDark from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import a11yLight from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-light';
import CodeCopyBtn from './CopyBtn';
import { useSettings } from '../hooks/useSettings';

const Pre = ({ children, theme }) => <pre className={`mb-4 shadow-lg relative ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'} border border-gray-400 rounded-md pt-1 m-2 font-mono text-sm`}>
  <div className="flex justify-between items-center pb-1 border-b border-gray-400">
    <div className="ml-2 font-bold">Code</div>
    <CodeCopyBtn theme={theme} >{children}</CodeCopyBtn>
  </div>
  {children}
</pre>;

Pre.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
};

const MessageItem = ({ message }) => {
  const { role, content } = message;

  // const [theme, setTheme] = useState('light');

  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     const fetchedSettings = await useSettings();
  //     setTheme(fetchedSettings.theme);
  //   };

  //   fetchSettings();
  // }, []);

  const settings = useSettings();
  const { theme } = settings;

  const isDark = theme === 'dark';

  const isUser = role === 'user';
  const isContentString = typeof content === 'string';

  const messageClass = `rounded p-3 mb-3 messageItem ${isUser ? 'user' : 'ai'} ${theme} ${ isDark ? 'bg-blue-900': 'bg-blue-500' } text-sm text-white text-left rounded-5 self-end max-w-300 break-words`;

  if (isUser || !isContentString) {
    return <div className={messageClass}>{content}</div>;
  }

  return (
    <div className={messageClass}>
      <ReactMarkdown
        className='post-markdown'
        linkTarget='_blank'
        components={{
          pre: ({...props}) => <Pre {...props} theme={theme} />,
          code({ inline, className = "blog-code", children, ...props }) {
            // console.log('code', { inline, props });
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={isDark ? a11yDark : a11yLight}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageItem;
