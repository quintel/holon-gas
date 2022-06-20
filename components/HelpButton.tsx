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
        className="inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded bg-gray-400 text-xs font-medium text-gray-100 transition after:absolute after:inset-0 hover:bg-gray-500"
      >
        ?
      </span>
    </Tippy>
  );
}
