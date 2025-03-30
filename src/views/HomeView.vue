<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero gradient-bg">
      <div class="hero-content">
        <h1>BlockAlert</h1>
        <p class="subtitle">区块链数据监控与实时警报系统</p>
        <p class="description">实时追踪以太坊价格波动，监控大户钱包活动，掌握市场先机</p>
        <div class="hero-buttons">
          <button class="btn btn-light" @click="showDemo">查看演示</button>
          <button class="btn btn-outline" @click="learnMore">了解更多</button>
        </div>
      </div>
      <div class="price-ticker">
        <div class="ticker-item" v-for="(coin, index) in prices" :key="index">
          <img :src="coin.icon" :alt="coin.name">
          <span class="coin-name">{{ coin.name }}</span>
          <span class="coin-price" :class="{ 'up': coin.change > 0, 'down': coin.change < 0 }">
            ${{ coin.price }}
          </span>
          <span class="coin-change" :class="{ 'up': coin.change > 0, 'down': coin.change < 0 }">
            {{ coin.change > 0 ? '+' : ''}}{{ coin.change }}%
          </span>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <h2>核心功能</h2>
      <div class="features-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.id">
          <div class="feature-icon">
            <i :class="feature.icon"></i>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats gradient-bg">
      <div class="stat-item" v-for="stat in stats" :key="stat.id">
        <h3>{{ stat.value }}</h3>
        <p>{{ stat.label }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      prices: [
        { name: 'ETH', price: '1,850.45', change: 2.5, icon: 'eth-icon.png' },
        { name: 'BTC', price: '35,420.80', change: -1.2, icon: 'btc-icon.png' },
        { name: 'BNB', price: '245.30', change: 0.8, icon: 'bnb-icon.png' }
      ],
      features: [
        {
          id: 1,
          icon: 'fas fa-bell',
          title: '价格警报',
          description: '自定义价格阈值，及时接收市场波动提醒'
        },
        {
          id: 2,
          icon: 'fas fa-wallet',
          title: '钱包监控',
          description: '追踪大户钱包活动，掌握市场动向'
        },
        {
          id: 3,
          icon: 'fas fa-chart-line',
          title: '趋势分析',
          description: '智能分析市场趋势，提供决策支持'
        },
        {
          id: 4,
          icon: 'fas fa-robot',
          title: 'Bot 自动化',
          description: '通过 Telegram Bot 实现自动化提醒'
        }
      ],
      stats: [
        { id: 1, value: '100,000+', label: '用户数量' },
        { id: 2, value: '99.9%', label: '系统可用性' },
        { id: 3, value: '<1s', label: '响应时间' },
        { id: 4, value: '24/7', label: '全天候监控' }
      ]
    }
  },
  methods: {
    showDemo() {
      this.$router.push('/demo')
    },
    learnMore() {
      this.$router.push('/features')
    }
  }
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease;
}

.subtitle {
  font-size: 2rem;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  animation: fadeInUp 1s ease 0.6s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.btn-light {
  background: white;
  color: #3498db;
}

.btn-outline {
  background: transparent;
  border: 2px solid white;
  color: white;
}

.price-ticker {
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.ticker-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.coin-price {
  font-weight: 600;
}

.coin-change {
  font-size: 0.9rem;
}

.up { color: #2ecc71; }
.down { color: #e74c3c; }

.features {
  padding: 5rem 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 5rem 2rem;
  text-align: center;
}

.stat-item h3 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 