// pages/api/bilivideo.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { bvid, p } = req.query;
    if (!bvid) {
        return res.status(400).json({ error: 'BVID parameter is required' });
    }

    try {
        // 获取视频信息，包括封面和标题
        const infoResponse = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        });
        const infoData = await infoResponse.json();
        if (infoData.code !== 0 || !infoData.data) {
            return res.status(404).json({ error: 'Failed to retrieve video info' });
        }
        const title = infoData.data.title; // 视频标题
        const pic = infoData.data.pic;     // 视频封面
        let part = '';                     // 视频分P标题（如果有）

        // 如果有分P，获取对应P的标题
        if (p) {
            const pageIndex = parseInt(p, 10) - 1;
            const page = infoData.data.pages.find(page => page.page === parseInt(p, 10));
            if (page) {
                part = page.part;
            }
        }

        // 获取CID
        const cid = infoData.data.cid;

        // 请求视频播放链接
        const videoResponse = await fetch(`https://api.bilibili.com/x/player/playurl?bvid=${bvid}&cid=${cid}&qn=64&type=mp4&platform=html5&high_quality=1`, {
            headers: {
                'Referer': 'https://www.bilibili.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        });
        const videoData = await videoResponse.json();
        if (videoData.code !== 0 || !videoData.data || !videoData.data.durl || !videoData.data.durl.length) {
            return res.status(404).json({ error: 'Failed to retrieve video download URL' });
        }

        // 返回视频URL和其他信息
        const downloadUrl = videoData.data.durl[0].url;
        res.status(200).json({ downloadUrl, title, pic, part });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video info', details: error.toString() });
    }
}