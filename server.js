const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 简单的内存缓存
const cache = new Map();
const CACHE_DURATION = 10000; // 缓存10秒

// 使用 Binance API
app.get('/api/price/:symbol', async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase();
        
        // 检查缓存
        const cachedData = cache.get(symbol);
        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
            return res.json(cachedData.data);
        }

        const response = await axios.get(
            `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
        );
        
        const price = parseFloat(response.data.price).toFixed(2);
        const result = { symbol, price };

        // 更新缓存
        cache.set(symbol, {
            data: result,
            timestamp: Date.now()
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ 
            error: '获取价格失败',
            message: '请检查币种符号是否正确'
        });
    }
});

// 定期清理缓存
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
        if (now - value.timestamp > CACHE_DURATION) {
            cache.delete(key);
        }
    }
}, CACHE_DURATION);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
