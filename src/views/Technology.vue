<template>
  <div class="technology">
    <h1 class="animate__animated animate__fadeIn">技术细节</h1>

    <div class="tech-grid">
      <div class="tech-card animate__animated animate__fadeInUp">
        <div class="tech-icon">
          <i class="fab fa-telegram"></i>
        </div>
        <h3>Telegram Bot API</h3>
        <p>使用 Telegram Bot API 开发自动化消息推送系统，实现实时价格提醒功能。</p>
        <ul class="tech-features">
          <li>自动化消息推送</li>
          <li>实时交互响应</li>
          <li>自定义命令处理</li>
        </ul>
      </div>

      <div class="tech-card animate__animated animate__fadeInUp">
        <div class="tech-icon">
          <i class="fab fa-ethereum"></i>
        </div>
        <h3>区块链集成</h3>
        <p>通过以太坊节点和 Web3.js 实现区块链数据的实时获取和处理。</p>
        <ul class="tech-features">
          <li>智能合约交互</li>
          <li>实时区块数据</li>
          <li>交易监控</li>
        </ul>
      </div>

      <div class="tech-card animate__animated animate__fadeInUp">
        <div class="tech-icon">
          <i class="fas fa-database"></i>
        </div>
        <h3>DeFi 数据源</h3>
        <p>整合多个 DeFi 协议的数据源，提供全面的市场信息。</p>
        <ul class="tech-features">
          <li>价格预言机</li>
          <li>流动性数据</li>
          <li>市场深度分析</li>
        </ul>
      </div>
    </div>

    <div class="tech-stack animate__animated animate__fadeInUp">
      <h2>技术栈</h2>
      <div class="stack-grid">
        <div class="stack-item">
          <i class="fab fa-node-js"></i>
          <span>Node.js</span>
        </div>
        <div class="stack-item">
          <i class="fab fa-vuejs"></i>
          <span>Vue.js</span>
        </div>
        <div class="stack-item">
          <i class="fas fa-database"></i>
          <span>MongoDB</span>
        </div>
        <div class="stack-item">
          <i class="fab fa-docker"></i>
          <span>Docker</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Technology'
}
</script>

<style scoped>
.technology {
  max-width: 1200px;
  margin: 0 auto;
}

.technology h1 {
  text-align: center;
  margin-bottom: 3rem;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.tech-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-5px);
}

.tech-icon {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.tech-features {
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;
}

.tech-features li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.tech-features li:last-child {
  border-bottom: none;
}

.tech-stack {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tech-stack h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stack-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stack-item i {
  font-size: 2.5rem;
  color: #3498db;
}

.stack-item span {
  font-weight: 500;
}
</style> 