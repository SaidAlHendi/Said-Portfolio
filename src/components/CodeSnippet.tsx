
import React from 'react';

interface CodeSnippetProps {
  code: string;
  className?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, className }) => {
  const formatCode = (code: string) => {
    // Very simple syntax highlighting
    return code
      .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
      .replace(/(const|let|var|function|if|else|return|import|export|from)/g, '<span class="keyword">$1</span>')
      .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="string">$1</span>')
      .replace(/(\w+)(?=\s*\()/g, '<span class="function">$1</span>')
      .replace(/(\w+)(?=:)/g, '<span class="variable">$1</span>')
      .replace(/(\w+)(?=\.)/g, '<span class="object">$1</span>');
  };

  return (
    <div className={`code-snippet ${className}`}>
      <pre dangerouslySetInnerHTML={{ __html: formatCode(code) }} />
    </div>
  );
};

export default CodeSnippet;
