<template>
  <div class="tech-page">
    <!-- 技术概览 -->
    <section class="tech-hero gradient-bg">
      <h1>先进的技术架构</h1>
      <p>基于最新区块链技术，打造高性能监控系统</p>
    </section>

    <!-- 技术架构图 -->
    <section class="tech-architecture">
      <h2>系统架构</h2>
      <div class="architecture-diagram">
        <div class="arch-layer" v-for="layer in architectureLayers" :key="layer.id">
          <h3>{{ layer.name }}</h3>
          <div class="layer-items">
            <div class="arch-item" v-for="item in layer.items" :key="item.name">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心技术 -->
    <section class="core-tech">
      <h2>核心技术</h2>
      <div class="tech-grid">
        <div class="tech-card" v-for="tech in coreTechnologies" :key="tech.id">
          <div class="tech-icon">
            <i :class="tech.icon"></i>
          </div>
          <h3>{{ tech.name }}</h3>
          <p>{{ tech.description }}</p>
          <div class="tech-details">
            <h4>主要特点：</h4>
            <ul>
              <li v-for="(feature, index) in tech.features" :key="index">
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 性能指标 -->
    <section class="performance gradient-bg">
      <h2>系统性能</h2>
      <div class="performance-grid">
        <div class="performance-card" v-for="metric in performanceMetrics" :key="metric.id">
          <div class="metric-value">{{ metric.value }}</div>
          <div class="metric-name">{{ metric.name }}</div>
          <div class="metric-description">{{ metric.description }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TechView',
  data() {
    return {
      architectureLayers: [
        {
          id: 1,
          name: '数据采集层',
          items: [
            { name: '区块链节点', icon: 'fas fa-cube' },
            { name: '交易所API', icon: 'fas fa-exchange-alt' },
            { name: '价格预言机', icon: 'fas fa-broadcast-tower' }
          ]
        },
        {
          id: 2,
          name: '数据处理层',
          items: [
            { name: '实时处理', icon: 'fas fa-bolt' },
            { name: '数据清洗', icon: 'fas fa-filter' },
            { name: '智能分析', icon: 'fas fa-brain' }
          ]
        },
        {
          id: 3,
          name: '应用服务层',
          items: [
            { name: 'API服务', icon: 'fas fa-code' },
            { name: '消息推送', icon: 'fas fa-bell' },
            { name: '用户界面', icon: 'fas fa-desktop' }
          ]
        }
      ],
      coreTechnologies: [
        {
          id: 1,
          name: '区块链数据同步',
          icon: 'fas fa-link',
          description: '高效的区块链数据同步和解析系统',
          features: [
            '实时区块同步',
            '智能合约事件监听',
            '交易记录追踪',
            '地址余额监控'
          ]
        },
        {
          id: 2,
          name: '数据分析引擎',
          icon: 'fas fa-chart-bar',
          description: '强大的数据分析和处理能力',
          features: [
            '实时数据处理',
            '历史数据分析',
            '趋势预测',
            '异常检测'
          ]
        },
        {
          id: 3,
          name: '消息推送系统',
          icon: 'fas fa-paper-plane',
          description: '可靠的消息推送和通知服务',
          features: [
            'Telegram Bot集成',
            '多渠道推送',
            '消息优先级',
            '自定义通知规则'
          ]
        }
      ],
      performanceMetrics: [
        {
          id: 1,
          value: '< 100ms',
          name: '数据延迟',
          description: '从数据采集到处理的平均延迟时间'
        },
        {
          id: 2,
          value: '99.99%',
          name: '系统可用性',
          description: '系统服务的可用性保证'
        },
        {
          id: 3,
          value: '10000+',
          name: '并发处理',
          description: '系统每秒可处理的并发请求数'
        },
        {
          id: 4,
          value: '1TB+',
          name: '数据处理',
          description: '每日处理的区块链数据量'
        }
      ]
    }
  }
}
</script>

<style scoped>
.tech-page {
  padding-top: 60px;
}

.tech-hero {
  padding: 100px 5%;
  text-align: center;
}

.tech-hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.tech-architecture {
  padding: 5rem 5%;
}

.tech-architecture h2 {
  text-align: center;
  margin-bottom: 3rem;
}

.architecture-diagram {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.arch-layer {
  margin-bottom: 2rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.layer-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.arch-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.core-tech {
  padding: 5rem 5%;
  background: #f8f9fa;
}

.core-tech h2 {
  text-align: center;
  margin-bottom: 3rem;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.tech-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tech-icon {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.tech-details {
  margin-top: 1rem;
}

.tech-details ul {
  list-style: none;
  margin-top: 0.5rem;
}

.tech-details li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.tech-details li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #3498db;
}

.performance {
  padding: 5rem 5%;
  color: white;
}

.performance h2 {
  text-align: center;
  margin-bottom: 3rem;
}

.performance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.performance-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.metric-name {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.metric-description {
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .tech-hero h1 {
    font-size: 2rem;
  }
  
  .architecture-diagram {
    padding: 1rem;
  }
  
  .layer-items {
    grid-template-columns: 1fr;
  }
}
</style> 