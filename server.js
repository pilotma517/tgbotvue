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

const ETHERSCAN_API_KEY = 'J1H34ABAUEWU2HGPES7JDST8X2PVC6GYCM'; // 替换为你的 Etherscan API 密钥

// 获取钱包交易记录
app.get('/api/wallet/transactions', async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: '钱包地址不能为空' });
  }

  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`
    );

    if (response.data.status !== '1') {
      return res.status(500).json({ error: '获取交易记录失败' });
    }

    // 解析并返回最近 10 笔交易
    const transactions = response.data.result.slice(0, 10).map(tx => ({
      hash: tx.hash,
      timestamp: new Date(tx.timeStamp * 1000).toLocaleString(),
      from: tx.from,
      to: tx.to,
      value: `${(tx.value / Math.pow(10, tx.tokenDecimal)).toFixed(4)} ${tx.tokenSymbol}`,
      status: tx.isError === '0' ? '成功' : '失败',
    }));

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '服务器错误' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
