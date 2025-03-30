<template>
    <div class="demo-page">
      <!-- 演示页面头部 -->
      <section class="demo-hero gradient-bg">
        <h1>实时演示</h1>
        <p>体验我们的区块链监控系统</p>
      </section>
  
      <!-- 价格监控演示 -->
      <section class="demo-section">
        <h2>价格监控演示</h2>
        <div class="price-monitor">
          <div class="chart-container">
            <div class="chart-header">
              <select v-model="selectedSymbol">
                <option value="BTCUSDT">BTC/USDT</option>
                <option value="ETHUSDT">ETH/USDT</option>
                <option value="BNBUSDT">BNB/USDT</option>
              </select>
              <div class="time-range">
                <button 
                  v-for="interval in intervals" 
                  :key="interval"
                  :class="{ active: selectedInterval === interval }"
                  @click="changeInterval(interval)"
                >
                  {{ interval }}
                </button>
              </div>
            </div>
            <div id="chart" ref="chartContainer"></div>
          </div>
          <div class="price-alerts">
            <h3>价格提醒</h3>
            <div class="alert-form">
              <div class="form-group">
                <label>价格阈值</label>
                <input type="number" v-model="alertPrice" placeholder="输入价格">
              </div>
              <div class="form-group">
                <label>条件</label>
                <select v-model="alertCondition">
                  <option value="above">高于</option>
                  <option value="below">低于</option>
                </select>
              </div>
              <button class="btn btn-primary" @click="setAlert">
                设置提醒
              </button>
            </div>
            <div class="active-alerts">
              <div class="alert-item" v-for="(alert, index) in activeAlerts" :key="index">
                <span>{{ alert.coin }} {{ alert.condition }} ${{ alert.price }}</span>
                <button class="btn-delete" @click="deleteAlert(alert.id)">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- 钱包监控演示 -->
      <section class="demo-section">
        <h2>钱包监控演示</h2>
        <div class="wallet-monitor">
          <div class="wallet-input">
            <input 
              type="text" 
              v-model="walletAddress" 
              placeholder="输入钱包地址"
            >
            <button class="btn btn-primary" @click="fetchTransactions">
              查询交易记录
            </button>
          </div>
          <div class="wallet-list">
            <div class="wallet-card" v-for="(wallet, index) in monitoredWallets" :key="index">
              <div class="wallet-info">
                <h4>{{ wallet.address.substring(0, 6) }}...{{ wallet.address.substring(38) }}</h4>
                <p>余额: {{ wallet.balance }} ETH</p>
              </div>
              <div class="wallet-transactions">
                <h5>最近交易</h5>
                <div class="transaction" v-for="(tx, txIndex) in wallet.recentTx" :key="txIndex">
                  <span :class="tx.type">{{ tx.type === 'in' ? '收入' : '支出' }}</span>
                  <span>{{ tx.amount }} ETH</span>
                  <span class="tx-time">{{ tx.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Bot 演示 -->
      <section class="demo-section">
        <h2>价格查询演示</h2>
        <div class="bot-demo">
          <div class="bot-chat">
            <div class="chat-messages" ref="chatMessages">
              <div 
                v-for="(message, index) in botMessages" 
                :key="index"
                :class="['message', message.type]"
              >
                {{ message.text }}
                <span class="message-time">{{ message.time }}</span>
              </div>
            </div>
            <div class="chat-input">
              <input 
                type="text" 
                v-model="botCommand" 
                placeholder="输入命令 (例如: /price BTC)"
                @keyup.enter="sendCommand"
              >
              <button class="btn btn-primary" @click="sendCommand">
                发送
              </button>
            </div>
          </div>
          <div class="bot-commands">
            <h3>可用命令</h3>
            <ul>
              <li>
                <code>/price 币种</code>
                <span>查询当前价格 (例如: /price BTC)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div v-if="loading">加载中...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <table v-if="transactions.length > 0">
        <thead>
          <tr>
            <th>交易哈希</th>
            <th>时间</th>
            <th>发送方</th>
            <th>接收方</th>
            <th>金额</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tx in transactions" :key="tx.hash">
            <td>{{ tx.hash }}</td>
            <td>{{ tx.timestamp }}</td>
            <td>{{ tx.from }}</td>
            <td>{{ tx.to }}</td>
            <td>{{ tx.value }}</td>
            <td>{{ tx.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  // eslint-disable-next-line no-undef
  const LightweightCharts = window.LightweightCharts;
  
  export default {
    name: 'DemoView',
    data() {
      return {
        wsUrl: 'wss://stream.binance.com:9443/ws',
        selectedSymbol: 'BTCUSDT',
        selectedInterval: '1m',
        intervals: ['1m', '5m', '15m', '1h', '4h', '1d'],
        chart: null,
        series: null,
        ws: null,
        alertPrice: '',
        alertCondition: 'above',
        activeAlerts: [
          { id: 1, coin: 'ETH', condition: '高于', price: '2000' },
          { id: 2, coin: 'BTC', condition: '低于', price: '35000' }
        ],
        walletAddress: '',
        monitoredWallets: [
          {
            address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            balance: '125.45',
            recentTx: [
              { hash: '0x123...', type: 'in', amount: '10.5', time: '10分钟前' },
              { hash: '0x456...', type: 'out', amount: '5.2', time: '1小时前' }
            ]
          }
        ],
        botCommand: '',
        botMessages: [
          {
            id: 1,
            type: 'system',
            text: '欢迎使用价格查询功能！',
            time: new Date().toLocaleTimeString()
          }
        ],
        transactions: [],
        loading: false,
        error: '',
      }
    },
    mounted() {
      this.initChart()
      this.fetchHistoricalData()
      this.setupWebSocket()
    },
    beforeUnmount() {
      if (this.ws) {
        this.ws.close();
      }
    },
    methods: {
      initChart() {
        try {
          // eslint-disable-next-line no-undef
          const chart = LightweightCharts.createChart(this.$refs.chartContainer, {
            width: this.$refs.chartContainer.clientWidth,
            height: 400,
            layout: {
              backgroundColor: '#ffffff',
              textColor: '#000',
            },
            grid: {
              vertLines: {
                color: '#f0f0f0',
              },
              horzLines: {
                color: '#f0f0f0',
              },
            },
            crosshair: {
              mode: LightweightCharts.CrosshairMode.Normal,
            },
            timeScale: {
              borderColor: '#f0f0f0',
            },
          })
          console.log('图表初始化成功:', chart)
          this.chart = chart
          this.series = chart.addCandlestickSeries()
        } catch (error) {
          console.error('图表初始化失败:', error)
        }
      },

      async fetchHistoricalData() {
        try {
          if (!this.series) {
            await this.initChart()
          }
          const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${this.selectedSymbol}&interval=${this.selectedInterval}&limit=100`)
          const data = response.data.map(item => ({
            time: item[0] / 1000,
            open: parseFloat(item[1]),
            high: parseFloat(item[2]),
            low: parseFloat(item[3]),
            close: parseFloat(item[4]),
          }))
          this.series.setData(data)
        } catch (error) {
          console.error('获取历史数据失败:', error)
        }
      },

      setupWebSocket() {
        // eslint-disable-next-line no-undef
        const ws = new window.WebSocket(this.wsUrl)
        
        ws.onopen = () => {
          console.log('WebSocket 连接成功')
          // 订阅 K 线数据
          const msg = {
            method: 'SUBSCRIBE',
            params: [`${this.selectedSymbol.toLowerCase()}@kline_${this.selectedInterval}`],
            id: 1
          }
          ws.send(JSON.stringify(msg))
        }

        ws.onerror = (error) => {
          console.error('WebSocket 连接错误:', error)
        }

        ws.onclose = () => {
          console.warn('WebSocket 连接关闭')
        }

        ws.onmessage = (event) => {
          // eslint-disable-next-line no-unused-vars
          const data = JSON.parse(event.data)
          console.log('收到 WebSocket 数据:', data)
          // ... 处理数据 ...
        }
      },

      changeInterval(interval) {
        this.selectedInterval = interval;
        this.fetchHistoricalData();
        this.setupWebSocket();
      },
      setAlert() {
        if (!this.alertPrice) return
        this.activeAlerts.push({
          id: Date.now(),
          coin: this.selectedSymbol,
          condition: this.alertCondition === 'above' ? '高于' : '低于',
          price: this.alertPrice
        })
        this.alertPrice = ''
      },
      deleteAlert(id) {
        this.activeAlerts = this.activeAlerts.filter(alert => alert.id !== id)
      },
      async fetchTransactions() {
        if (!this.walletAddress) {
          this.error = '请输入钱包地址';
          return;
        }

        this.loading = true;
        this.error = '';

        try {
          const response = await axios.get(`http://localhost:3000/api/wallet/transactions?address=${this.walletAddress}`);
          console.log('API 响应数据:', response.data); // 添加日志
          this.transactions = response.data;
        } catch (err) {
          this.error = '获取交易记录失败，请稍后重试';
          console.error('API 请求失败:', err);
        } finally {
          this.loading = false;
        }
      },
      async sendCommand() {
        if (!this.botCommand) return;

        this.addMessage('user', this.botCommand);

        if (this.botCommand.startsWith('/price')) {
          const symbol = this.botCommand.split(' ')[1];
          if (!symbol) {
            this.addMessage('bot', '请输入币种符号，例如: /price BTC');
          } else {
            try {
              this.addMessage('bot', `正在查询 ${symbol} 的价格...`);
              const response = await axios.get(`http://localhost:3000/api/price/${symbol}`);
              this.addMessage('bot', `${symbol} 当前价格: $${response.data.price}`);
            } catch (error) {
              const errorMessage = error.response?.data?.message || '获取价格失败，请稍后重试';
              this.addMessage('bot', errorMessage);
            }
          }
        } else {
          this.addMessage('bot', '未知命令，请使用 /price 币种 查询价格');
        }

        this.botCommand = '';
        
        this.$nextTick(() => {
          const chatMessages = this.$refs.chatMessages;
          chatMessages.scrollTop = chatMessages.scrollHeight;
        });
      },
      addMessage(type, text) {
        this.botMessages.push({
          id: Date.now(),
          type,
          text,
          time: new Date().toLocaleTimeString()
        });
      }
    },
    watch: {
      selectedSymbol() {
        this.fetchHistoricalData();
        this.setupWebSocket();
      }
    }
  }
  </script>
  
  <style scoped>
  .demo-page {
    padding-top: 60px;
  }
  
  .demo-hero {
    padding: 100px 5%;
    text-align: center;
    color: white;
  }
  
  .demo-hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .demo-section {
    padding: 3rem 5%;
  }
  
  .demo-section h2 {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  /* 价格监控样式 */
  .price-monitor {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .chart-container {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  select {
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ddd;
  }
  
  .time-range {
    display: flex;
    gap: 10px;
  }
  
  .time-range button {
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .time-range button.active {
    background: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  #chart {
    border-radius: 8px;
    overflow: hidden;
  }
  
  .price-alerts {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .alert-form {
    margin: 1rem 0;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .alert-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background: #f8f9fa;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }
  
  /* 钱包监控样式 */
  .wallet-monitor {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .wallet-input {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .wallet-input input {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .wallet-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
  
  .wallet-transactions {
    margin-top: 1rem;
  }
  
  .transaction {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }
  
  .transaction .in {
    color: #2ecc71;
  }
  
  .transaction .out {
    color: #e74c3c;
  }
  
  /* Bot 演示样式 */
  .bot-demo {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .bot-chat {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .chat-messages {
    height: 400px;
    padding: 1rem;
    overflow-y: auto;
  }
  
  .message {
    margin-bottom: 1rem;
    padding: 0.8rem;
    border-radius: 8px;
    max-width: 80%;
  }
  
  .message.system {
    background: #f8f9fa;
    text-align: center;
    max-width: 100%;
  }
  
  .message.user {
    background: #3498db;
    color: white;
    margin-left: auto;
  }
  
  .message.bot {
    background: #f8f9fa;
  }
  
  .message-time {
    font-size: 0.8rem;
    opacity: 0.7;
    display: block;
    margin-top: 0.5rem;
  }
  
  .chat-input {
    padding: 1rem;
    border-top: 1px solid #eee;
    display: flex;
    gap: 1rem;
  }
  
  .chat-input input {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .bot-commands {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .bot-commands h3 {
    margin-bottom: 1rem;
  }
  
  .bot-commands ul {
    list-style: none;
  }
  
  .bot-commands li {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .bot-commands code {
    background: #f8f9fa;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-family: monospace;
  }
  
  /* 响应式设计 */
  @media (max-width: 1024px) {
    .price-monitor {
      grid-template-columns: 1fr;
    }
    
    .bot-demo {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .demo-hero h1 {
      font-size: 2rem;
    }
    
    .chart-header {
      flex-direction: column;
      gap: 1rem;
    }
    
    .wallet-input {
      flex-direction: column;
    }
  }
  
  /* 动画效果 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  
  /* 通用样式美化 */
  input,
  select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
  }
  
  input:focus,
  select:focus {
    outline: none;
    border-color: #3498db;
  }
  
  .btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s;
  }
  
  .btn-primary {
    background: #3498db;
    color: white;
  }
  
  .btn-primary:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
  
  .btn-delete {
    background: none;
    border: none;
    color: #e74c3c;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .btn-delete:hover {
    color: #c0392b;
  }

  .error {
    color: red;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
  </style> 