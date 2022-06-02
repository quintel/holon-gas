import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function TooltipContent({ text }: { text: string }) {
  return (
    <div className="tooltip p-3 prose-sm prose-invert">
      <ReactMarkdown remarkPlugins={[remarkGfm]} linkTarget="_blank">
        {text}
      </ReactMarkdown>
    </div>
  );
}

export default function HelpButton({ text }: { text: string }) {
  return (
    <Tippy
      content={<TooltipContent text={text} />}
      interactive={true}
      trigger="click"
      placement="auto"
      maxWidth={600}
    >
      <span
        role="button"
        className="-mt-1 inline-flex ml-2 h-5 w-5 items-center justify-center text-xs font-semibold text-gray-500 cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 transition"
      >
        ?
      </span>
    </Tippy>
  );
}
