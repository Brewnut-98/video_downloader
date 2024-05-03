import React, { useState, useRef } from 'react';
import '../styles/globals.css'; // 引入全局样式文件

export default function Component() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const handleVideoFetch = async () => {
    if (!videoUrl.trim()) {
      setError('请先将链接粘贴到上面的输入框');
      return;
    }

    setLoading(true);
    setError('');

    const bvMatch = videoUrl.match(/BV[a-zA-Z0-9]+/);
    if (!bvMatch) {
      setError('Invalid Bilibili video URL');
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
        window.open(data.downloadUrl, '_blank');
      }
    } catch (err) {
      setError('Server error or network issues');
    }

    setLoading(false);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setVideoUrl(text);
    } catch (err) {
      setError('Failed to paste content');
    }
  };

  // 更新: 修改toggleFAQ逻辑以确保每次只打开一个FAQ
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: '电脑上部分浏览器点下载视频按钮后，跳转到视频播放页面，如何下载到本地呢？',
      answer: '电脑上少数浏览器不支持直接下载，但可以在下载视频按钮上点击右键，然后选择"目标另存为"或"链接存储为"来下载视频；或者到跳转后的视频页面，在视频画面上点击右键，然后选择"视频另存为"来下载视频。推荐使用Chrome、Firefox、QQ浏览器等主流浏览器。'
    },
    {
      question: 'Android手机可以下载保存视频吗？',
      answer: 'Android手机在常用的Chrome、Firefox、Edge、QQ等浏览器上都可以很方便的使用本站。推荐使用Chrome浏览器获得最佳下载体验。'
    },
    {
      question: 'iOS设备（iPhone、iPad）上点击下载视频按钮后，跳转到视频页面，并没有直接下载，怎么办？',
      answer: '我们可以用到iOS系统手机自带Safari浏览器点击解析视频后，长按视频下载按钮会弹出一个列表，然后点击下载文件链接，右上角然后把刚下载的视频储存视频到手机相册即可，也可以借助第三方App来完成下载，iOS用户在App Store下载免费的Documents ，然后在Documents右下角按钮的内置浏览器中使用本站，可以完美下载视频。'
    },
    {
      question: '下载后的文件打不开怎么办？',
      answer: '这种情况出现的比较少。一般是文件后缀问题，如果是视频文件，把下载后的文件后缀名改为".mp4"即可播放；如果是图片，把文件后缀名改为".jpg"即可查看。'
    }
  ];
  const [faqOpen, setFaqOpen] = useState(new Array(faqs.length).fill(false));


  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-300 bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 h-14 max-w-screen-xl">
          <a href="/zh" className="font-bold flex items-center -ml-30">SnapAny</a>
          <div className="grow hidden md:flex items-center px-2 text-sm h-14">
            <nav className="flex gap-x-6 ml-5">
              <a href="/zh/bilibili" className="text-gray-500 hover:text-black">哔哩哔哩</a>
              <a href="/zh/tiktok" className="text-gray-500 hover:text-black">TikTok</a>
              <a href="/zh/pinterest" className="text-gray-500 hover:text-black">Pinterest</a>
              <a href="/zh/facebook" className="text-gray-500 hover:text-black">Facebook</a>
              <a href="/zh/vk" className="text-gray-500 hover:text-black">VK</a>
              <a href="/zh/snapchat" className="text-gray-500 hover:text-black">Snapchat</a>
              <a href="/zh/threads" className="text-gray-500 hover:text-black">Threads</a>
              <a href="/zh/suno" className="text-gray-500 hover:text-black">Suno</a>
            </nav>
          </div>
          <div className="flex items-center md:hidden">
            <button aria-label="Open menu" type="button">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center cursor-pointer text-sm">
            <svg className="me-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
              <path d="M2 12h20"></path>
            </svg>
            <span>简体中文</span>
          </div>
        </div>
      </header>
      <main className="py-8 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center py-12 sm:py-16 gap-4 -mt-10">
            <h1 className="text-4xl font-bold">哔哩哔哩视频下载</h1>
            <div className="flex flex-col w-full max-w-3xl">
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-8">
                <div className="relative w-full">
                  <input
                    ref={inputRef}
                    className="flex-1 h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-base"
                    placeholder="请将APP/网站复制的链接粘贴到这里"
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                  <svg onClick={videoUrl ? () => setVideoUrl('') : handlePaste} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="absolute h-6 w-6 right-2 top-2 cursor-pointer z-10">
                    {videoUrl ? (
                      <g>
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m15 9-6 6"></path>
                        <path d="m9 9 6 6"></path>
                      </g>
                    ) : (
                      <g>
                        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <path d="M9 12v-1h6v1"></path>
                        <path d="M11 17h2"></path>
                        <path d="M12 11v6"></path>
                      </g>
                    )}
                  </svg>
                </div>
                <button
                  onClick={handleVideoFetch}
                  disabled={loading}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-black text-white px-4 py-2 hover:bg-opacity-90 w-full sm:w-auto mt-2 sm:mt-0 text-base font-normal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-down-to-line mr-2 h-4 w-4">
                    <path d="M12 17V3"></path>
                    <path d="m6 11 6 6 6-6"></path>
                    <path d="M19 21H5"></path>
                  </svg>
                  {loading ? '加载中...' : '提取视频图片'}
                </button>
              </div>
              {error && (
                <div role="alert" className="relative rounded-lg border p-4 border-red-500/50 text-red-500 dark:border-red-500 w-full mt-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-alert-circle h-4 w-4 absolute left-4 top-4">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" x2="12" y1="8" y2="12"></line>
                    <line x1="12" x2="12.01" y1="16" y2="16"></line>
                  </svg>
                  <h5 className="leading-none tracking-tight font-normal mb-0 ml-7">{error}</h5>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-5xl mx-auto bg-white py-8 px-4 mb-10">
          <div className="absolute left-0 top-0" style={{ transform: 'translateX(-7rem)' }}>
            <h2 className="text-sm font-medium pb-1">如何下载保存bilibili视频？</h2>
            <ol className="list-decimal list-inside text-sm my-2">
              <li>在哔哩哔哩(bilibili、B站) APP或网站上，找到想要下载的视频，复制视频页面链接</li>
              <li>回到SnapAny，将刚才复制的链接粘贴到上面的输入框，点击解析按钮，稍等几秒，解析成功后会返回高清视频和图片，点击下载即可</li>
            </ol>
          </div>
        </div>
        <div className="container mx-auto px-2">
          <div className="w-full mt-4 bg-white">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b py-2 px-2 mb-2 bg-white">
                <h3 className="flex justify-between items-center">
                  <button
                    type="button"
                    aria-expanded={openIndex === index}
                    className={`flex flex-1 items-center justify-between text-sm font-medium ${openIndex === index ? 'underline' : ''}`}
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`h-3 w-3 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                </h3>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-screen' : 'max-h-0'}`}
                  aria-hidden={openIndex !== index}
                >
                  <div className="pt-2 pb-1 text-sm">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main >

      <footer className="border-t border-gray-200 mt-8 pt-8 bg-white">
        <div className="container mx-auto max-w-screen-xl grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold pb-3">在线工具</h3>
            <ul className="space-y-2">
              <li><a href="/zh/tiktok" className="text-gray-800 hover:underline">抖音/TikTok视频图片下载</a></li>
              {/* Other links omitted for brevity */}
            </ul>
          </div>
          {/* Other footer content omitted for brevity */}
        </div>
      </footer>
    </>
  );
}
