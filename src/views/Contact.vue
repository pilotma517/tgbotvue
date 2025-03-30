<template>
  <div class="contact">
    <h1 class="animate__animated animate__fadeIn">联系方式</h1>

    <div class="contact-container">
      <div class="contact-info animate__animated animate__fadeInLeft">
        <div class="info-card">
          <i class="fas fa-envelope"></i>
          <h3>电子邮件</h3>
          <p>your.email@example.com</p>
        </div>

        <div class="info-card">
          <i class="fab fa-github"></i>
          <h3>GitHub</h3>
          <p>github.com/yourusername</p>
        </div>

        <div class="info-card">
          <i class="fab fa-telegram"></i>
          <h3>Telegram</h3>
          <p>t.me/yourusername</p>
        </div>
      </div>

      <div class="contact-form animate__animated animate__fadeInRight">
        <h2>发送消息</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" id="name" v-model="form.name" required>
          </div>

          <div class="form-group">
            <label for="email">邮箱</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>

          <div class="form-group">
            <label for="message">消息</label>
            <textarea id="message" v-model="form.message" required></textarea>
          </div>

          <button type="submit" class="btn btn-primary">
            发送消息 <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // 处理表单提交
      console.log('Form submitted:', this.form)
      // 这里可以添加实际的表单提交逻辑
    }
  }
}
</script>

<style scoped>
.contact {
  max-width: 1200px;
  margin: 0 auto;
}

.contact h1 {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-info {
  display: grid;
  gap: 1.5rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.info-card i {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
}

textarea {
  height: 150px;
  resize: vertical;
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
}
</style> 