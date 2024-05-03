// pages/api/index.js
import { useState } from 'react';

export default function Component() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVideoFetch = async () => {
    setLoading(true);
    setError('');

    const bvMatch = videoUrl.match(/BV[a-zA-Z0-9]+/);
    if (!bvMatch) {
      setError('无效的B站视频链接');
      setLoading(false);
      return;
    }

    const bvid = bvMatch[0];
    
    try {
      const res = await fetch(`/api/video?bvid=${bvid}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        window.open(data.downloadUrl, '_blank'); // 使用获取的直接视频下载链接
        setError('');
      }
    } catch (err) {
      setError('服务器错误或网络问题');
    }
    
    setLoading(false);
  };

  return (
    <>
      {/* 这个是新添加的部分，用来输入视频链接并触发提取逻辑 */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
        {/* 其他代码保持原样... */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-3xl pt-8">
          <div className="flex items-center gap-2 w-full">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-base"
              placeholder="请将APP/网站复制的链接粘贴到这里"
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-base font-normal"
              onClick={handleVideoFetch}
              disabled={loading}
            >
              <svg
                className="lucide lucide-arrow-down-to-line mr-2 h-4 w-4"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17V3" />
                <path d="m6 11 6 6 6-6" />
                <path d="M19 21H5" />
              </svg>
              {loading ? '解析中...' : '提取视频'}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        {/* 其他代码保持原样... */}
      </header>
      <main className="py-8">
        {/* 其他代码保持原样，不需要修改 */}
      </main>
    </>
  );
}