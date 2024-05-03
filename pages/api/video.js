// pages/api/video.js
import fetch from 'node-fetch';  // 确保正确引入node-fetch

export default async function handler(req, res) {
    const { bvid } = req.query;
    if (!bvid) {
        return res.status(400).json({ error: 'BVID parameter is required' });
    }

    try {
        // 获取CID
        const cidResponse = await fetch(`https://api.bilibili.com/x/player/pagelist?bvid=${bvid}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        });
        const cidData = await cidResponse.json();
        if (cidData.code !== 0 || !cidData.data.length) {
            return res.status(404).json({ error: 'Failed to retrieve CID' });
        }
        const cid = cidData.data[0].cid;

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

        // 返回第一个视频URL
        const downloadUrl = videoData.data.durl[0].url;
        res.status(200).json({ downloadUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video info', details: error.toString() });
    }
}
