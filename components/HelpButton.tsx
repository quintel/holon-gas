import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function TooltipContent({ text }: { text: string }) {
  return (
    <div className="tooltip prose-sm prose-invert p-3">
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
        className="-mt-1 ml-2 inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 border-gray-200 text-xs font-semibold text-gray-400 transition hover:border-gray-400 hover:text-gray-500"
      >
        ?
      </span>
    </Tippy>
  );
}
