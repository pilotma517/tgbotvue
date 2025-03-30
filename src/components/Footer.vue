<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>关于项目</h3>
        <p>基于 Telegram Bot API 的区块链价格警报系统，为用户提供实时的市场价格波动提醒服务。</p>
      </div>

      <div class="footer-section">
        <h3>快速链接</h3>
        <router-link to="/">首页</router-link>
        <router-link to="/project">项目介绍</router-link>
        <router-link to="/technology">技术细节</router-link>
        <router-link to="/contact">联系方式</router-link>
      </div>

      <div class="footer-section">
        <h3>联系我们</h3>
        <p><i class="fas fa-envelope"></i> your.email@example.com</p>
        <p><i class="fab fa-github"></i> github.com/yourusername</p>
        <p><i class="fab fa-telegram"></i> t.me/yourusername</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 区块链价格警报系统. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background: #2c3e50;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 3rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-section h3 {
  color: white;
  margin-bottom: 1rem;
}

.footer-section a {
  color: #ecf0f1;
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  margin-bottom: 0.5rem;
}

.footer-section a:hover {
  color: #3498db;
}

.footer-section p {
  color: #ecf0f1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  color: #ecf0f1;
  font-size: 0.9rem;
}
</style> 