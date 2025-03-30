<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">
        <i class="fas fa-cube"></i>
        BlockChain Project
      </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link">
          <i class="fas fa-home"></i> 首页
        </router-link>
        <router-link to="/project" class="nav-link">
          <i class="fas fa-project-diagram"></i> 项目介绍
        </router-link>
        <router-link to="/technology" class="nav-link">
          <i class="fas fa-microchip"></i> 技术细节
        </router-link>
        <router-link to="/contact" class="nav-link">
          <i class="fas fa-envelope"></i> 联系方式
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3498db;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #3498db;
}

.router-link-active {
  color: #3498db;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
}
</style> 