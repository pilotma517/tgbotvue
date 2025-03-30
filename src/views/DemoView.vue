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
              <div class="coin-selector">
                <select v-model="selectedCoin">
                  <option v-for="coin in coins" :key="coin.id" :value="coin.id">
                    {{ coin.name }}
                  </option>
                </select>
              </div>
              <div class="time-range">
                <button 
                  v-for="range in timeRanges" 
                  :key="range"
                  :class="{ active: selectedRange === range }"
                  @click="selectedRange = range"
                >
                  {{ range }}
                </button>
              </div>
            </div>
            <div class="chart">
              <!-- 这里可以集成实际的图表库，如 ECharts 或 Chart.js -->
              <div class="chart-placeholder">
                价格走势图
              </div>
            </div>
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
              <div class="alert-item" v-for="alert in activeAlerts" :key="alert.id">
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
            <button class="btn btn-primary" @click="addWallet">
              添加监控
            </button>
          </div>
          <div class="wallet-list">
            <div class="wallet-card" v-for="wallet in monitoredWallets" :key="wallet.address">
              <div class="wallet-info">
                <h4>{{ wallet.address.substring(0, 6) }}...{{ wallet.address.substring(38) }}</h4>
                <p>余额: {{ wallet.balance }} ETH</p>
              </div>
              <div class="wallet-transactions">
                <h5>最近交易</h5>
                <div class="transaction" v-for="tx in wallet.recentTx" :key="tx.hash">
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
        <h2>Telegram Bot 演示</h2>
        <div class="bot-demo">
          <div class="bot-chat">
            <div class="chat-messages">
              <div 
                v-for="message in botMessages" 
                :key="message.id"
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
                placeholder="输入命令 (例如: /price ETH)"
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
              <li v-for="command in botCommands" :key="command.cmd">
                <code>{{ command.cmd }}</code>
                <span>{{ command.description }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DemoView',
    data() {
      return {
        selectedCoin: 'ETH',
        selectedRange: '24H',
        coins: [
          { id: 'ETH', name: '以太坊' },
          { id: 'BTC', name: '比特币' },
          { id: 'BNB', name: '币安币' }
        ],
        timeRanges: ['24H', '7D', '30D', '1Y'],
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
          { id: 1, type: 'system', text: '欢迎使用 BlockAlert Bot!', time: '12:00' },
          { id: 2, type: 'user', text: '/price ETH', time: '12:01' },
          { id: 3, type: 'bot', text: 'ETH 当前价格: $1,850.45', time: '12:01' }
        ],
        botCommands: [
          { cmd: '/price <币种>', description: '查询当前价格' },
          { cmd: '/alert <币种> <价格>', description: '设置价格提醒' },
          { cmd: '/wallet <地址>', description: '查询钱包信息' }
        ]
      }
    },
    methods: {
      setAlert() {
        if (!this.alertPrice) return
        this.activeAlerts.push({
          id: Date.now(),
          coin: this.selectedCoin,
          condition: this.alertCondition === 'above' ? '高于' : '低于',
          price: this.alertPrice
        })
        this.alertPrice = ''
      },
      deleteAlert(id) {
        this.activeAlerts = this.activeAlerts.filter(alert => alert.id !== id)
      },
      addWallet() {
        if (!this.walletAddress) return
        this.monitoredWallets.push({
          address: this.walletAddress,
          balance: '0.00',
          recentTx: []
        })
        this.walletAddress = ''
      },
      sendCommand() {
        if (!this.botCommand) return
        this.botMessages.push({
          id: Date.now(),
          type: 'user',
          text: this.botCommand,
          time: new Date().toLocaleTimeString()
        })
        // 模拟机器人回复
        setTimeout(() => {
          this.botMessages.push({
            id: Date.now(),
            type: 'bot',
            text: this.generateBotResponse(this.botCommand),
            time: new Date().toLocaleTimeString()
          })
        }, 500)
        this.botCommand = ''
      },
      generateBotResponse(command) {
        if (command.startsWith('/price')) {
          return `${command.split(' ')[1]} 当前价格: $${(Math.random() * 2000 + 1000).toFixed(2)}`
        }
        return '收到命令：' + command
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
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
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
    margin-bottom: 1rem;
  }
  
  .time-range button {
    padding: 0.5rem 1rem;
    border: none;
    background: none;
    cursor: pointer;
  }
  
  .time-range button.active {
    color: #3498db;
    font-weight: 600;
  }
  
  .chart-placeholder {
    height: 300px;
    background: #f8f9fa;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
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
  </style> 