import React, { useState } from "react";
import { Copy, Check, Menu, X } from "lucide-react";
import SideBar from "../components/docs/SideBar";
import ExtendedNavbar from "../components/elements/ExtendedNavbar";
import { docsContent } from "../utils/docsContent";
import { getLanguageColor, getSyntaxHighlighting } from "../utils/docsUtils";

function Docs() {
  const [selectedAnchor, setSelectedAnchor] = useState("anchor-0-0");
  const [copiedCode, setCopiedCode] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="bg-background">
      <div className="flex-1 flex flex-col text-white">
        <ExtendedNavbar />

        {/* Mobile sidebar toggle */}
        <div className="md:hidden sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-gray-800">
          <div className="px-4 py-2 flex items-center justify-between">
            <button
              aria-label="Open documentation menu"
              className="inline-flex items-center gap-2 text-gray-200 hover:text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
              <span className="text-sm">Menu</span>
            </button>
            <span className="text-sm text-gray-400">Docs</span>
          </div>
        </div>

        <div className="relative md:flex">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <SideBar
              selectedAnchor={selectedAnchor}
              onAnchorSelect={(id) => {
                handleAnchorSelect(id);
                setIsSidebarOpen(false);
              }}
            />
          </div>

          {/* Mobile Sidebar Drawer */}
          {isSidebarOpen && (
            <div className="md:hidden fixed inset-0 z-40">
              <button
                aria-label="Close menu backdrop"
                className="absolute inset-0 bg-black/60"
                onClick={() => setIsSidebarOpen(false)}
              />
              <div className="absolute left-0 top-0 bottom-0 w-[85vw] max-w-xs bg-black border-r border-gray-800 shadow-xl flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                  <span className="font-medium">Documentation</span>
                  <button
                    aria-label="Close documentation menu"
                    className="p-1 rounded hover:bg-gray-800"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <SideBar
                    selectedAnchor={selectedAnchor}
                    onAnchorSelect={(id) => {
                      handleAnchorSelect(id);
                      setIsSidebarOpen(false);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col gap-6 sm:gap-7 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-20 py-6 md:py-10 overflow-y-auto">
            {currentContent ? (
              <>
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {currentContent.title}
                </span>
                <span className="text-lg sm:text-xl font-light text-gray-300">
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
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold">Content Not Found</span>
                <span className="text-lg sm:text-xl font-light">
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
