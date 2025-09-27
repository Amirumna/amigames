"use client"

import React, { useEffect, useState, useRef } from "react"
import { X, Folder, MoreVertical, LayoutGrid, List as ListIcon } from "lucide-react"
import ReactMarkdown from "react-markdown"

async function fetchFileContent(fileId: string): Promise<string> {
  const res = await fetch(`/api/gdrive-file?fileId=${fileId}`);
  if (!res.ok) return "";
  return await res.text();
}

function FileModal({ open, onClose, file }: { open: boolean; onClose: () => void; file: any }) {
  const [copyStatus, setCopyStatus] = React.useState<string>("");
  if (!open || !file) return null;
  const encodedId = encodeURIComponent(file.id);
  let content;
  if (file.mimeType.startsWith("image/")) {
    content = <img src={`/api/gdrive-file?fileId=${encodedId}`} alt={file.name} className="max-w-full max-h-[70vh] rounded" />;
  } else if (file.mimeType.startsWith("video/")) {

    content = (
      <div className="w-full flex justify-center items-center">
        <iframe
          src={`https://drive.google.com/file/d/${file.id}/preview`}
          allow="autoplay; fullscreen"
          allowFullScreen
          title={file.name}
          className="aspect-video w-full max-w-2xl rounded border bg-black"
          style={{ minHeight: 240, maxHeight: '70vh' }}
        />
      </div>
    );
  } else if (file.mimeType === "application/pdf") {
    content = (
      <iframe
        src={`/api/gdrive-file?fileId=${encodedId}&preview=1`}
        className="w-full h-[70vh] border rounded"
        title={file.name}
        allow="autoplay"
      />
    );
  } else {
    content = <div className="text-center py-8">No preview available.</div>;
  }
  function handleDirectDownload() {
    const link = document.createElement('a');
    link.href = `/api/gdrive-file?fileId=${encodedId}&download=1`;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const appOrigin = typeof window !== "undefined" ? window.location.origin : "";
  const shareLink = file.mimeType === "application/vnd.google-apps.folder"
    ? `${appOrigin}/app/kertas?folderId=${file.id}`
    : `${appOrigin}/api/gdrive-file?fileId=${file.id}`;

  function handleCopyShareLink() {
    const input = document.getElementById(`share-link-input-${file.id}`) as HTMLInputElement | null;
    let copied = false;
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareLink)
        .then(() => {
          setCopyStatus("Link copied!");
          copied = true;
        })
        .catch(() => {
          setCopyStatus("Failed to copy. Select and copy manually.");
        });
    }
    if (input) {
      input.focus();
      input.select();
      try {
        if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
          document.execCommand('copy');
          if (!copied) setCopyStatus("Link copied!");
        }
      } catch {
      }
    }
    setTimeout(() => setCopyStatus(""), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-[#23242A] rounded-xl shadow-lg p-6 max-w-2xl w-full relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={onClose}><X size={24} /></button>
        <div className="mb-4 text-lg font-semibold text-white truncate">{file.name}</div>
        <div className="flex justify-center items-center mb-4">{content}</div>
        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleDirectDownload}
          >
            Download
          </button>
          <input
            id={`share-link-input-${file.id}`}
            type="text"
            value={shareLink}
            readOnly
            className="px-4 py-2 bg-gray-700 text-white rounded border border-gray-800 w-full sm:w-auto cursor-pointer"
            onFocus={e => e.target.select()}
            title="Copy link manually"
          />
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            onClick={handleCopyShareLink}
            title="Copy share link"
          >
            Copy Link
          </button>
        </div>
        {copyStatus && (
          <div className="mt-2 text-center text-xs text-yellow-400">{copyStatus}</div>
        )}
      </div>
    </div>
  );
}
export default function GDriveList() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [folderStack, setFolderStack] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [readmeId, setReadmeId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewFile, setPreviewFile] = useState<any | null>(null);

  useEffect(() => {
    async function fetchFiles() {
      setLoading(true);
      setError(null);
      try {
        const folderId = folderStack[folderStack.length - 1];
        const res = await fetch(`/api/gdrive-list${folderId ? `?folderId=${folderId}` : ""}`);
        if (!res.ok) throw new Error("Failed to fetch files");
        const data = await res.json() as { files: any[] };
        setFiles(data.files || []);
        const readme = (data.files || []).find((f: any) => f.name.toLowerCase().startsWith("readme"));
        setReadmeId(readme ? readme.id : null);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    }
    fetchFiles();
  }, [folderStack]);

  function handleFolderClick(id: string) {
    setFolderStack([...folderStack, id]);
  }
  function handleBackClick() {
    setFolderStack(folderStack.slice(0, -1));
  }

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center py-8">Loading files...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <>
      <section className="w-full max-w-6xl mx-auto bg-[#181A20] rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Browse files</h2>
          <div className="flex flex-wrap items-center gap-2">
            <button
              className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg border border-gray-700 flex items-center gap-2 ${viewMode === 'grid' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-gray-400'}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} className="mr-1" /> <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg border border-gray-700 flex items-center gap-2 ${viewMode === 'list' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-gray-400'}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <ListIcon size={18} className="mr-1" /> <span className="hidden sm:inline">List</span>
            </button>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="px-2 py-1 sm:px-3 sm:py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none"
              style={{ minWidth: 100, maxWidth: 180 }}
            />
          </div>
        </div>
        {folderStack.length > 0 && (
          <button
            onClick={handleBackClick}
            className="mb-4 px-3 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 w-full sm:w-auto"
          >
            ← Back
          </button>
        )}
        {readmeId && (
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-bold mb-2">Folder Description</h3>
            <MarkdownPreview fileId={readmeId} />
          </div>
        )}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredFiles.map((file) => {
              const isFolder = file.mimeType === "application/vnd.google-apps.folder";
              function handleFileClick() {
                setPreviewFile(file);
              }
              const appOrigin = typeof window !== "undefined" ? window.location.origin : "";
              const shareLink = isFolder
                ? `${appOrigin}/app/kertas?folderId=${file.id}`
                : `${appOrigin}/api/gdrive-file?fileId=${file.id}`;
              if (isFolder) {
                return (
                  <div
                    key={file.id}
                    className="relative bg-[#23242A] rounded-xl shadow flex flex-col justify-between h-40 sm:h-48 cursor-pointer transition hover:ring-2 hover:ring-yellow-400"
                    onClick={() => handleFolderClick(file.id)}
                  >
                    <div className="flex flex-col items-center justify-center flex-1 pt-4 sm:pt-6">
                      <Folder size={40} color="#B5B5B5" strokeWidth={1.5} className="sm:w-12 sm:h-12 w-10 h-10" />
                    </div>
                    <div className="px-2 sm:px-4 pb-2 sm:pb-3">
                      <div className="font-semibold text-sm sm:text-base text-white truncate">{file.name}</div>
                      <div className="text-xs text-gray-400">Folder</div>
                      {file.modifiedTime && (
                        <div className="text-xs text-gray-500 mt-1">{new Date(file.modifiedTime).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                      )}
                    </div>
                  </div>
                );
              } else {
                let preview;
                if (file.mimeType.startsWith("image/") && file.thumbnailLink) {
                  preview = <img src={file.thumbnailLink} alt={file.name} className="max-w-[48px] sm:max-w-[64px] max-h-[48px] sm:max-h-[64px] rounded mx-auto" />;
                } else if (file.mimeType.startsWith("video/")) {
                  preview = <div className="flex items-center justify-center h-12 sm:h-16"><span className="text-gray-400">🎬</span></div>;
                } else if (file.mimeType === "application/pdf") {
                  preview = <div className="flex items-center justify-center h-12 sm:h-16"><span className="text-gray-400">📄</span></div>;
                } else {
                  preview = <div className="flex items-center justify-center h-12 sm:h-16"><span className="text-gray-400">📁</span></div>;
                }
                return (
                  <div
                    key={file.id}
                    className="relative bg-[#23242A] rounded-xl shadow flex flex-col justify-between h-40 sm:h-48 cursor-pointer transition hover:ring-2 hover:ring-yellow-400"
                    onClick={handleFileClick}
                  >
                    <div className="flex flex-col items-center justify-center flex-1 pt-4 sm:pt-6">
                      {preview}
                    </div>
                    <div className="px-2 sm:px-4 pb-2 sm:pb-3">
                      <div className="font-semibold text-sm sm:text-base text-white truncate">{file.name}</div>
                      <div className="text-xs text-gray-400">{file.mimeType.split("/")[0].toUpperCase()}</div>
                      {file.modifiedTime && (
                        <div className="text-xs text-gray-500 mt-1">{new Date(file.modifiedTime).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                      )}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <ul className="divide-y divide-gray-800">
            {filteredFiles.map((file) => {
              const isFolder = file.mimeType === "application/vnd.google-apps.folder";
              return (
                <li
                  key={file.id}
                  className="flex items-center px-2 sm:px-4 py-2 sm:py-3 hover:bg-gray-800 cursor-pointer"
                  onClick={isFolder ? () => handleFolderClick(file.id) : undefined}
                >
                  <Folder size={28} color="#B5B5B5" strokeWidth={1.5} className="sm:w-8 sm:h-8 w-7 h-7" />
                  <div className="ml-2 sm:ml-4 flex-1">
                    <div className="font-semibold text-sm sm:text-base text-white truncate">{file.name}</div>
                    <div className="text-xs text-gray-400">Folder</div>
                    {file.modifiedTime && (
                      <div className="text-xs text-gray-500 mt-1">{new Date(file.modifiedTime).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    )}
                  </div>
                  <button className="text-gray-400 hover:text-white"><MoreVertical size={20} /></button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
      <FileModal open={!!previewFile} onClose={() => setPreviewFile(null)} file={previewFile} />
    </>
  );
}

function TextPreview({ fileId, fileName }: { fileId: string; fileName: string }) {
  const [content, setContent] = React.useState<string>("");
  React.useEffect(() => {
    fetchFileContent(fileId).then(setContent);
  }, [fileId]);
  return (
    <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-x-auto max-h-40 mt-2 text-xs">
      {content ? content : `Loading ${fileName}...`}
    </pre>
  );
}

function MarkdownPreview({ fileId }: { fileId: string }) {
  const [content, setContent] = React.useState<string>("");
  React.useEffect(() => {
    fetchFileContent(fileId).then(setContent);
  }, [fileId]);
  return (
    <div className="prose dark:prose-invert max-w-none mt-2">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
