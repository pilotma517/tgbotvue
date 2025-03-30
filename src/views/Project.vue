<template>
  <div class="project">
    <h1 class="animate__animated animate__fadeIn">项目介绍</h1>
    
    <div class="project-content">
      <div class="project-card animate__animated animate__fadeInLeft">
        <h2><i class="fas fa-tasks"></i> 项目概述</h2>
        <p>本项目旨在开发一个基于 Telegram Bot API 的加密货币价格监控系统，为用户提供实时的市场价格波动提醒服务。通过整合区块链数据和 DeFi 协议，我们为用户提供准确、及时的市场信息。</p>
      </div>

      <div class="project-card animate__animated animate__fadeInRight">
        <h2><i class="fas fa-bullseye"></i> 核心功能</h2>
        <ul class="feature-list">
          <li>实时价格监控和警报设置</li>
          <li>自定义价格阈值通知</li>
          <li>市场趋势分析报告</li>
          <li>多币种支持</li>
          <li>用户个性化配置</li>
        </ul>
      </div>

      <div class="project-card animate__animated animate__fadeInLeft">
        <h2><i class="fas fa-chart-bar"></i> 项目亮点</h2>
        <div class="highlights">
          <div class="highlight-item">
            <span class="highlight-number">24/7</span>
            <span class="highlight-text">全天候监控</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-number">&lt; 1s</span>
            <span class="highlight-text">响应时间</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-number">99.9%</span>
            <span class="highlight-text">系统可用性</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Project'
}
</script>

<style scoped>
.project {
  max-width: 1000px;
  margin: 0 auto;
}

.project h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.project-content {
  display: grid;
  gap: 2rem;
}

.project-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.project-card h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3498db;
  margin-bottom: 1.5rem;
}

.feature-list {
  list-style: none;
  padding-left: 1rem;
}

.feature-list li {
  margin-bottom: 0.8rem;
  position: relative;
  padding-left: 1.5rem;
}

.feature-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #3498db;
}

.highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  text-align: center;
}

.highlight-item {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.highlight-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.highlight-text {
  color: #666;
}
</style> 