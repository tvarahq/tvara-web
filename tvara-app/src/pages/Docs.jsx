import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import SideBar from "../components/docs/SideBar";
import ExtendedNavbar from "../components/elements/ExtendedNavbar";
import { docsContent } from "../utils/docsContent";
import { getLanguageColor, getSyntaxHighlighting } from "../utils/docsUtils";

function Docs() {
  const [selectedAnchor, setSelectedAnchor] = useState("anchor-0-0");
  const [copiedCode, setCopiedCode] = useState(null);

  const handleAnchorSelect = (anchorId) => {
    setSelectedAnchor(anchorId);
  };

  const copyToClipboard = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(index);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const currentContent = docsContent[selectedAnchor];

  const renderContent = (contentItem, index) => {
    switch (contentItem.type) {
      case "text":
        return (
          <p className="text-md font-light leading-relaxed mb-4">
            {contentItem.content}
          </p>
        );
      case "list":
        return (
          <ul className="list-disc list-inside text-md font-light mb-4 space-y-1">
            {contentItem.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      case "code": {
        const languageColor = getLanguageColor(contentItem.language);
        const highlightedCode = getSyntaxHighlighting(
          contentItem.content,
          contentItem.language
        );

        return (
          <div className="mb-6 bg-black">
            <div className="bg-gray-900 rounded-t-lg border-b border-gray-700">
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: languageColor }}
                  ></div>
                  <span className="text-sm text-gray-300 capitalize">
                    {contentItem.language}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(contentItem.content, index)}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded transition-colors"
                  title="Copy code"
                >
                  {copiedCode === index ? (
                    <>
                      <Check
                        size={14}
                        style={{
                          color: "green",
                        }}
                      />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="bg-gray-900 rounded-b-lg p-4 overflow-x-auto">
              <pre className="text-sm">
                <code
                  className={`language-${contentItem.language}`}
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </pre>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="bg-background flex">
      <div className="flex-1 flex flex-col text-white">
        <ExtendedNavbar />

        <div className="flex">
          <SideBar
            selectedAnchor={selectedAnchor}
            onAnchorSelect={handleAnchorSelect}
          />

          <div className="flex-1 flex flex-col gap-8 px-20 py-10 overflow-y-auto">
            {currentContent ? (
              <>
                <span className="text-4xl font-bold">
                  {currentContent.title}
                </span>
                <span className="text-xl font-light text-gray-300">
                  {currentContent.subtitle}
                </span>

                <div className="space-y-4">
                  {currentContent.content.map((contentItem, index) => (
                    <div key={index}>{renderContent(contentItem, index)}</div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <span className="text-4xl font-bold">Content Not Found</span>
                <span className="text-xl font-light">
                  Please select a valid section from the sidebar.
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Docs;
