"use client"

import React, { useEffect, useState, useRef, useMemo, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { X, Folder, MoreVertical, LayoutGrid, List as ListIcon, FileText, File, Image, Video, FileJson, FileCode, Archive, Music } from "lucide-react"
import ReactMarkdown from "react-markdown"

/**
 * Fetches the raw text content of a Google Drive file by its file ID.
 *
 * @param fileId - The Google Drive file ID to fetch
 * @returns The file content as text; an empty string if the network response is not OK
 */
async function fetchFileContent(fileId: string): Promise<string> {
  const res = await fetch(`/api/gdrive-file?fileId=${fileId}`);
  if (!res.ok) return "";
  return await res.text();
}

/**
 * Selects an appropriate file-type icon element based on the file's MIME type and filename extension.
 *
 * @param mimeType - The file's MIME type (e.g., `image/png`, `application/pdf`) used as the primary indicator.
 * @param fileName - The file name used as a fallback to detect type from its extension.
 * @returns A JSX icon element sized and colorized to represent the detected file type.
 */
function getFileIcon(mimeType: string, fileName: string) {
  const lowerName = fileName.toLowerCase();
  
  if (mimeType.startsWith('image/')) {
    return <Image size={32} className="text-blue-400" />;
  }
  
  if (mimeType.startsWith('video/')) {
    return <Video size={32} className="text-purple-400" />;
  }
  
  if (mimeType.startsWith('audio/')) {
    return <Music size={32} className="text-green-400" />;
  }
  
  if (mimeType === 'application/pdf') {
    return <FileText size={32} className="text-red-400" />;
  }
  
  if (mimeType === 'text/plain' || lowerName.endsWith('.txt')) {
    return <FileText size={32} className="text-gray-400" />;
  }
  
  if (mimeType === 'application/json' || lowerName.endsWith('.json')) {
    return <FileJson size={32} className="text-yellow-400" />;
  }
  if (mimeType === 'text/javascript' || mimeType === 'application/javascript' || lowerName.endsWith('.js')) {
    return <FileCode size={32} className="text-yellow-500" />;
  }
  if (mimeType === 'text/typescript' || lowerName.endsWith('.ts') || lowerName.endsWith('.tsx')) {
    return <FileCode size={32} className="text-blue-500" />;
  }
  if (mimeType === 'text/css' || lowerName.endsWith('.css')) {
    return <FileCode size={32} className="text-pink-400" />;
  }
  if (mimeType === 'text/html' || lowerName.endsWith('.html') || lowerName.endsWith('.htm')) {
    return <FileCode size={32} className="text-orange-400" />;
  }
  
  if (mimeType === 'application/zip' || mimeType === 'application/x-rar-compressed' || 
      lowerName.endsWith('.zip') || lowerName.endsWith('.rar') || lowerName.endsWith('.7z')) {
    return <Archive size={32} className="text-orange-500" />;
  }
  
  return <File size={32} className="text-gray-400" />;
}

/**
 * Maps a MIME type and filename to a concise file type label.
 *
 * @param mimeType - The file's MIME type.
 * @param fileName - The file's name (used to infer type from extension when MIME is generic or missing).
 * @returns The file type label such as `IMAGE`, `VIDEO`, `AUDIO`, `PDF`, `TEXT`, `JSON`, `JS`, `TS`, `CSS`, `HTML`, `ZIP`, `RAR`, or the primary MIME type segment uppercased.
 */
function getFileTypeLabel(mimeType: string, fileName: string) {
  const lowerName = fileName.toLowerCase();
  
  if (mimeType.startsWith('image/')) return 'IMAGE';
  if (mimeType.startsWith('video/')) return 'VIDEO';
  if (mimeType.startsWith('audio/')) return 'AUDIO';
  if (mimeType === 'application/pdf') return 'PDF';
  if (mimeType === 'text/plain' || lowerName.endsWith('.txt')) return 'TEXT';
  if (mimeType === 'application/json' || lowerName.endsWith('.json')) return 'JSON';
  if (mimeType === 'text/javascript' || lowerName.endsWith('.js')) return 'JS';
  if (mimeType === 'text/typescript' || lowerName.endsWith('.ts') || lowerName.endsWith('.tsx')) return 'TS';
  if (mimeType === 'text/css' || lowerName.endsWith('.css')) return 'CSS';
  if (mimeType === 'text/html' || lowerName.endsWith('.html')) return 'HTML';
  if (mimeType === 'application/zip' || lowerName.endsWith('.zip')) return 'ZIP';
  if (mimeType === 'application/x-rar-compressed' || lowerName.endsWith('.rar')) return 'RAR';
  
  return mimeType.split('/')[0].toUpperCase();
}

/**
 * Renders a file preview modal with controls for downloading and copying a share link.
 *
 * Supports inline previews for images, videos, PDFs, plain text, JSON, and audio; shows a "No preview available" message for other types.
 *
 * @param open - Whether the modal is visible.
 * @param onClose - Callback invoked when the modal should be closed.
 * @param file - File object to preview. Expected to include at least `id`, `name`, and `mimeType`.
 * @returns The modal element when `open` is true and `file` is provided, or `null` otherwise.
 */
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
  } else if (file.mimeType === "text/plain" || file.name.toLowerCase().endsWith('.txt')) {
    content = <TextPreview fileId={file.id} fileName={file.name} />;
  } else if (file.mimeType === "application/json" || file.name.toLowerCase().endsWith('.json')) {
    content = <JsonPreview fileId={file.id} fileName={file.name} />;
  } else if (file.mimeType.startsWith("audio/")) {
    content = <AudioPreview fileId={file.id} fileName={file.name} />;
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
    ? `${appOrigin}/kertas?folderId=${file.id}`
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
/**
 * Renders a Google Drive–style file browser with folder navigation, search, switchable grid/list views, and file previews.
 *
 * Fetches file lists from /api/gdrive-list (optionally scoped by folderId), shows loading and error states, detects a folder README to render as Markdown, and provides per-file previews (images, video, PDF, text, JSON, audio) and direct download/share actions.
 *
 * @returns The React element for the file browser UI.
 */
export default function GDriveList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [folderStack, setFolderStack] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [readmeId, setReadmeId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewFile, setPreviewFile] = useState<any | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const initial = searchParams?.get('folderId');
    if (initial && folderStack.length === 0) {
      setFolderStack([initial]);
    }
  }, []);

  useEffect(() => {
    async function fetchFiles() {
      setLoading(true);
      setError(null);
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      const controller = new AbortController();
      controllerRef.current = controller;
      try {
        const folderId = folderStack[folderStack.length - 1];
        const res = await fetch(`/api/gdrive-list${folderId ? `?folderId=${folderId}` : ""}`, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch files");
        const data = await res.json() as { files: any[] };
        setFiles(data.files || []);
        const readme = (data.files || []).find((f: any) => f.name.toLowerCase().startsWith("readme"));
        setReadmeId(readme ? readme.id : null);
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          setError(e.message);
        }
      }
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
    fetchFiles();
  }, [folderStack]);

  function handleFolderClick(id: string) {
    startTransition(() => setFolderStack([...folderStack, id]));
    const folder = files.find((f: any) => f.id === id);
    if (folder && folder.name) {
      const slug = encodeURIComponent(folder.name);
      router.push(`/kertas/${slug}?folderId=${id}`);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  function handleBackClick() {
    setFolderStack(folderStack.slice(0, -1));
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    }
  }

  const filteredFiles = useMemo(() => {
    if (!search) return files;
    const q = search.toLowerCase();
    return files.filter((file) => file.name.toLowerCase().includes(q));
  }, [files, search]);

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
              onChange={(e) => {
                const v = e.target.value;
                window.clearTimeout((window as any)._kertasDbT);
                (window as any)._kertasDbT = window.setTimeout(() => setSearch(v), 200);
              }}
              placeholder="Search..."
              className="px-2 py-1 sm:px-3 sm:py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none"
              style={{ minWidth: 100, maxWidth: 180 }}
            />
          </div>
        </div>
        {loading && (
          <p className="text-center text-lg sm:text-xl text-gray-300 my-6">Loading…</p>
        )}
        {folderStack.length > 0 && !loading && (
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
        {(viewMode === 'grid' ? (
          <div className={`relative grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 ${loading ? 'opacity-60 pointer-events-none' : ''}`}>
            {filteredFiles.map((file) => {
              const isFolder = file.mimeType === "application/vnd.google-apps.folder";
              function handleFileClick() {
                setPreviewFile(file);
              }
              const appOrigin = typeof window !== "undefined" ? window.location.origin : "";
              const shareLink = isFolder
                ? `${appOrigin}/kertas?folderId=${file.id}`
                : `${appOrigin}/api/gdrive-file?fileId=${file.id}`;
              if (isFolder) {
                return (
                  <div
                    key={file.id}
                    className="relative bg-[#23242A] rounded-xl shadow flex flex-col justify-between h-40 sm:h-48 cursor-pointer transition hover:ring-2 hover:ring-yellow-400"
                    onClick={() => handleFolderClick(file.id)}
                  >
                    <div className="flex flex-col items-center justify-center flex-1 pt-4 sm:pt-6">
                      <Folder size={56} color="#B5B5B5" strokeWidth={1.5} className="sm:w-16 sm:h-16 w-14 h-14" />
                    </div>
                    <div className="px-2 sm:px-4 pb-2 sm:pb-3">
                      <div className="font-semibold text-sm sm:text-base text-white truncate">{file.name}</div>
                      <div className="text-xs text-gray-400">FOLDER</div>
                      {file.modifiedTime && (
                        <div className="text-xs text-gray-500 mt-1">{new Date(file.modifiedTime).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                      )}
                    </div>
                  </div>
                );
              } else {
                let preview;
                if (file.mimeType.startsWith("image/") && file.thumbnailLink) {
                  preview = <img src={file.thumbnailLink} alt={file.name} className="max-w-[64px] sm:max-w-[80px] max-h-[64px] sm:max-h-[80px] rounded mx-auto" />;
                } else {
                  preview = (
                    <div className="flex items-center justify-center h-16 sm:h-20">
                      {getFileIcon(file.mimeType, file.name)}
                    </div>
                  );
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
                      <div className="text-xs text-gray-400">{getFileTypeLabel(file.mimeType, file.name)}</div>
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
          <ul className={`relative divide-y divide-gray-800 ${loading ? 'opacity-60 pointer-events-none' : ''}`}>
            {filteredFiles.map((file) => {
              const isFolder = file.mimeType === "application/vnd.google-apps.folder";
              return (
                <li
                  key={file.id}
                  className="flex items-center px-2 sm:px-4 py-2 sm:py-3 hover:bg-gray-800 cursor-pointer"
                  onClick={isFolder ? () => handleFolderClick(file.id) : undefined}
                >
                  {isFolder ? (
                    <Folder size={28} color="#B5B5B5" strokeWidth={1.5} className="sm:w-8 sm:h-8 w-7 h-7" />
                  ) : (
                    <div className="sm:w-8 sm:h-8 w-7 h-7 flex items-center justify-center">
                      {getFileIcon(file.mimeType, file.name)}
                    </div>
                  )}
                  <div className="ml-2 sm:ml-4 flex-1">
                    <div className="font-semibold text-sm sm:text-base text-white truncate">{file.name}</div>
                    <div className="text-xs text-gray-400">{isFolder ? 'FOLDER' : getFileTypeLabel(file.mimeType, file.name)}</div>
                    {file.modifiedTime && (
                      <div className="text-xs text-gray-500 mt-1">{new Date(file.modifiedTime).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    )}
                  </div>
                  <button className="text-gray-400 hover:text-white"><MoreVertical size={20} /></button>
                </li>
              );
            })}
          </ul>
        ))}
      </section>
      <FileModal open={!!previewFile} onClose={() => setPreviewFile(null)} file={previewFile} />
    </>
  );
}

/**
 * Renders a scrollable preformatted preview of a plain-text file identified by `fileId`.
 *
 * Fetches the file content and displays it inside a styled <pre> block; while fetching, shows a loading placeholder that includes `fileName`.
 *
 * @param fileId - The identifier of the file to load and preview.
 * @param fileName - The display name of the file used in the loading placeholder.
 * @returns A JSX element containing a scrollable, syntax-neutral text preview or a loading message.
 */
function TextPreview({ fileId, fileName }: { fileId: string; fileName: string }) {
  const [content, setContent] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchFileContent(fileId).then((text) => {
      setContent(text);
      setLoading(false);
    });
  }, [fileId]);
  return (
    <div className="w-full max-h-[70vh] overflow-auto">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm whitespace-pre-wrap font-mono">
        {loading ? `Loading ${fileName}...` : content}
      </pre>
    </div>
  );
}

/**
 * Render a scrollable, pretty-printed preview of a JSON file.
 *
 * Fetches the file content for the given `fileId`, attempts to parse and
 * pretty-print it as JSON, and displays the result in a scrollable preformatted
 * block. If parsing fails, an inline error banner "Invalid JSON format" is
 * shown and the raw file content is displayed instead. While fetching, a
 * loading message that includes `fileName` is shown.
 *
 * @param fileId - The ID of the file to fetch and preview
 * @param fileName - The file name used in the loading message
 * @returns The React element that renders the JSON preview UI
 */
function JsonPreview({ fileId, fileName }: { fileId: string; fileName: string }) {
  const [content, setContent] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  
  React.useEffect(() => {
    fetchFileContent(fileId).then((text) => {
      try {
        const parsed = JSON.parse(text);
        setContent(JSON.stringify(parsed, null, 2));
        setError("");
      } catch (e) {
        setError("Invalid JSON format");
        setContent(text);
      }
      setLoading(false);
    });
  }, [fileId]);
  
  return (
    <div className="w-full max-h-[70vh] overflow-auto">
      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-300 px-3 py-2 rounded mb-2 text-sm">
          {error}
        </div>
      )}
      <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm whitespace-pre-wrap font-mono">
        {loading ? `Loading ${fileName}...` : content}
      </pre>
    </div>
  );
}

/**
 * Renders an audio preview UI that streams the file from the server, shows download progress, and plays the downloaded blob.
 *
 * Downloads the file from /api/gdrive-file, streams it to build a Blob and object URL, displays progress while downloading, handles playback errors with user-friendly messages, and revokes the object URL on unmount or file change.
 *
 * @param fileId - The Google Drive file ID used to fetch the audio content
 * @param fileName - The display name shown in the preview header
 * @returns A React element containing the audio download/progress UI and an HTML5 audio player for the downloaded file
 */
function AudioPreview({ fileId, fileName }: { fileId: string; fileName: string }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const [blobUrl, setBlobUrl] = React.useState<string>("");
  const [progress, setProgress] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  
  React.useEffect(() => {
    setLoading(true);
    setError("");
    setBlobUrl("");
    setProgress(0);
    
    const downloadAudio = async () => {
      try {
        const response = await fetch(`/api/gdrive-file?fileId=${encodeURIComponent(fileId)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const contentLength = response.headers.get('content-length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;
        let loaded = 0;
        
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }
        
        const chunks: Uint8Array[] = [];
        
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          chunks.push(value);
          loaded += value.length;
          
          if (total > 0) {
            setProgress(Math.round((loaded / total) * 100));
          }
        }
        
        const blob = new Blob(chunks as BlobPart[], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
        setLoading(false);
        
      } catch (err) {
        console.error('Failed to download audio:', err);
        setError(`Failed to load audio file: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setLoading(false);
      }
    };
    
    downloadAudio();
    
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [fileId]);
  
  const handleError = (e: any) => {
    setLoading(false);
    console.error('Audio error:', e);
    const audio = e.target;
    let errorMsg = "Failed to play audio file.";
    
    if (audio.error) {
      switch (audio.error.code) {
        case audio.error.MEDIA_ERR_ABORTED:
          errorMsg = "Audio playback was aborted.";
          break;
        case audio.error.MEDIA_ERR_NETWORK:
          errorMsg = "Network error during playback.";
          break;
        case audio.error.MEDIA_ERR_DECODE:
          errorMsg = "Audio file is corrupted or in an unsupported format.";
          break;
        case audio.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMsg = "Audio format is not supported by your browser.";
          break;
      }
    }
    
    setError(errorMsg);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Music size={24} className="text-green-400" />
          <h3 className="text-white font-medium truncate">{fileName}</h3>
        </div>
        
        {loading && (
          <div className="py-8">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
              <span className="ml-3 text-gray-300">Downloading audio...</span>
            </div>
            {progress > 0 && (
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
            <p className="text-center text-sm text-gray-400 mt-2">
              {progress > 0 ? `${progress}% downloaded` : 'Preparing download...'}
            </p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded text-center mb-4">
            {error}
          </div>
        )}
        
        {blobUrl && !loading && (
          <audio
            ref={audioRef}
            controls
            className="w-full h-12"
            onError={handleError}
            preload="metadata"
          >
            <source src={blobUrl} type="audio/mpeg" />
            <source src={blobUrl} type="audio/wav" />
            <source src={blobUrl} type="audio/ogg" />
            <source src={blobUrl} type="audio/mp4" />
            <source src={blobUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        )}
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            {blobUrl ? "Click play to listen to the audio file" : "Downloading audio file..."}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Audio is downloaded locally for smooth playback
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders Markdown fetched from the given file ID.
 *
 * Fetches the file content for `fileId` and renders it as Markdown inside a styled container.
 *
 * @param fileId - The ID of the file whose Markdown content should be fetched and displayed.
 * @returns A React element containing the rendered Markdown.
 */
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
