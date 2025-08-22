import './App.css';

function App() {
  return (
    <div className="page">
      <main className="card">
        <aside className="side">
          <div className="avatar-wrap">
            <img src= "/avt.jpg" alt="Avatar" className="avatar" />
          </div>
          <h1 className="name">Phạm Hoàng Huy</h1>
          <p className="role">Backend Developer</p>

          <div className="contact">
            <a href="mailto:phamhoanghuy.2000@gmail.com" className="contact-link">phamhoanghuy.2000@gmail.com</a>
            <a href="https://github.com/phamhoanghuy2004" className="contact-link" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.facebook.com/hoanghuy.pham.1422409/" className="contact-link" target="_blank" rel="noreferrer">Facebook</a>
          </div>

          <div className="side-footer">
            <p>Đam mê học hỏi, muốn tạo ra những hệ thống tốt, hiện đại.</p>
          </div>
        </aside>

        <section className="main">
          <section className="intro">
            <h2>Giới thiệu</h2>
            <p>
              Xin chào — mình là <strong>Huy</strong>. Mình chuyên về Backend, xây dựng
              ứng dụng web hiệu năng cao và giao diện trực quan. Mình thích thiết kế sạch,
              code có cấu trúc, và luôn chú ý trải nghiệm người dùng.
            </p>
          </section>

          <section className="skills">
            <h2>Kỹ năng</h2>
            <ul className="skill-list">
              <li>Java Spring Boot</li>
              <li>JavaScript</li>
              <li>Python</li>
              <li>HTML5, CSS3</li>
              <li>MySQL</li>
              <li>Responsive design, accessibility</li>
            </ul>
          </section>

          <section className="projects">
            <h2>Dự án tiêu biểu</h2>
            <div className="project-grid">
              <article className="project">
                <h3>Rental-Car</h3>
                <p>Ứng dụng di động cho phép thê và quản lý xe trược tuyến.</p>
              </article>
              <article className="project">
                <h3>RAG Chatbot</h3>
                <p>Hệ thống chatbot dùng RAG để trả lời tài liệu nội bộ.</p>
              </article>
            </div>
          </section>

          <section className="cta">
            <h2>Muốn hợp tác?</h2>
            <p>Gửi tin nhắn cho mình qua facebook — mình sẵn sàng trao đổi về dự án hoặc vị trí công việc.</p>
            <a href="https://www.facebook.com/hoanghuy.pham.1422409/" className="btn">Liên hệ ngay</a>
          </section>
        </section>
      </main>

      <footer className="page-footer">
        © {new Date().getFullYear()} Hoàng Huy — Thiết kế tối giản, sang trọng
      </footer>
    </div>
  );
}

export default App;
