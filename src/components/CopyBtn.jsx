import React, { useState } from "react";
import PropTypes from 'prop-types';
import { CopyIcon } from "lucide-react";

const CodeCopyBtn = ({ children, theme }) => {
  const [copyOk, setCopyOk] = useState(false);

  const isDarkTheme = theme === 'dark';

  const handleClick = () => {
    if (children[0] && 'props' in children[0] && children[0].props.children[0]) {
      navigator.clipboard.writeText(children[0].props.children[0]);
      setCopyOk(true);
      setTimeout(() => {
        setCopyOk(false);
      }, 500);
    }
  }

  return (
    <div className="text-white mr-2 text-xl cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 hover:opacity-90">
      <CopyIcon className={`${copyOk ? 'text-blue-500' : isDarkTheme ? 'text-gray-50' : 'text-slate-700'}`} width={16} height={16} onClick={handleClick} />
    </div>
  )
}

CodeCopyBtn.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
};

export default CodeCopyBtn;
