<template>
  <div class="features-page">
    <!-- 功能介绍头部 -->
    <section class="features-hero gradient-bg">
      <h1>强大的区块链监控功能</h1>
      <p>全方位的数据监控，智能的预警系统，让您掌握市场先机</p>
    </section>

    <!-- 主要功能展示 -->
    <section class="main-features">
      <div class="feature-block" v-for="feature in mainFeatures" :key="feature.id">
        <div class="feature-content" :class="{ 'reverse': feature.id % 2 === 0 }">
          <div class="feature-text">
            <h2>{{ feature.title }}</h2>
            <p>{{ feature.description }}</p>
            <ul class="feature-list">
              <li v-for="(item, index) in feature.items" :key="index">
                <i class="fas fa-check"></i>
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="feature-image">
            <img :src="feature.image" :alt="feature.title">
          </div>
        </div>
      </div>
    </section>

    <!-- 价格套餐 -->
    <section class="pricing">
      <h2>选择适合您的套餐</h2>
      <div class="pricing-grid">
        <div class="price-card" v-for="plan in pricingPlans" :key="plan.id">
          <h3>{{ plan.name }}</h3>
          <div class="price">
            <span class="currency">￥</span>
            <span class="amount">{{ plan.price }}</span>
            <span class="period">/月</span>
          </div>
          <ul class="plan-features">
            <li v-for="(feature, index) in plan.features" :key="index">
              <i class="fas fa-check"></i> {{ feature }}
            </li>
          </ul>
          <button class="btn btn-primary">选择方案</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'FeaturesView',
  data() {
    return {
      mainFeatures: [
        {
          id: 1,
          title: '实时价格监控',
          description: '全天候监控加密货币价格波动，及时捕捉市场机会。',
          items: [
            '自定义价格阈值提醒',
            '多币种同时监控',
            '价格趋势分析',
            '历史数据回溯'
          ],
          image: '/images/price-monitor.png'
        },
        {
          id: 2,
          title: '智能钱包追踪',
          description: '追踪大户钱包活动，洞察市场动向。',
          items: [
            '大额转账监控',
            '钱包行为分析',
            '智能异常提醒',
            '资金流向追踪'
          ],
          image: '/images/wallet-track.png'
        },
        {
          id: 3,
          title: 'Telegram Bot 集成',
          description: '便捷的消息推送系统，随时随地接收重要通知。',
          items: [
            '自定义通知模板',
            '多级别警报设置',
            '交互式命令支持',
            '群组消息推送'
          ],
          image: '/images/telegram-bot.png'
        }
      ],
      pricingPlans: [
        {
          id: 1,
          name: '基础版',
          price: '99',
          features: [
            '基础价格监控',
            '单币种追踪',
            '每日报告',
            '基础技术支持'
          ]
        },
        {
          id: 2,
          name: '专业版',
          price: '299',
          features: [
            '多币种监控',
            '大户钱包追踪',
            '实时预警',
            '7*24技术支持',
            'API接口访问'
          ]
        },
        {
          id: 3,
          name: '企业版',
          price: '999',
          features: [
            '无限币种监控',
            '自定义分析模型',
            '专属客户经理',
            '优先技术支持',
            '定制化开发支持'
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.features-page {
  padding-top: 60px;
}

.features-hero {
  padding: 100px 5%;
  text-align: center;
}

.features-hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.main-features {
  padding: 5rem 5%;
}

.feature-block {
  margin-bottom: 5rem;
}

.feature-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.feature-content.reverse {
  direction: rtl;
}

.feature-content.reverse .feature-text {
  direction: ltr;
}

.feature-text h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.feature-list {
  list-style: none;
  margin-top: 2rem;
}

.feature-list li {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.feature-list i {
  color: #2ecc71;
}

.feature-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.pricing {
  padding: 5rem 5%;
  background: #f8f9fa;
}

.pricing h2 {
  text-align: center;
  margin-bottom: 3rem;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.price-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;
}

.price-card:hover {
  transform: translateY(-5px);
}

.price {
  margin: 2rem 0;
}

.currency {
  font-size: 1.5rem;
  vertical-align: top;
}

.amount {
  font-size: 3rem;
  font-weight: 700;
}

.period {
  color: #666;
}

.plan-features {
  list-style: none;
  margin: 2rem 0;
  text-align: left;
}

.plan-features li {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.plan-features i {
  color: #2ecc71;
}

@media (max-width: 768px) {
  .feature-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .feature-image {
    order: -1;
  }
}
</style> 