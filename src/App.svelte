<script>
  import { onMount } from 'svelte';

  let scrolled = false;

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav class="navbar {scrolled ? 'scrolled glass-panel' : ''}">
  <div class="container nav-container">
    <a href="#home" class="logo">
      <span class="text-orange">IMAGE</span> UNESA
    </a>
    <div class="nav-links">
      <a href="#home" class="nav-link">Beranda</a>
      <a href="#about" class="nav-link">Tentang</a>
      <a href="#events" class="nav-link">Program Kerja</a>
      <a href="#team" class="nav-link">Pengurus</a>
      <button class="btn btn-accent">Gabung Kami</button>
    </div>
  </div>
</nav>

<main>
  <section id="home" class="hero">
    <div class="hero-bg" style="background-image: url('/hero_bg.png');"></div>
    <div class="hero-overlay"></div>
    <div class="container hero-content animate-fade-in">
      <div class="badge delay-100">Ikatan Mahasiswa Gresik - UNESA</div>
      <h1 class="hero-title delay-200">
        Bersinergi Membangun <span class="text-orange">Gresik</span> dari Kampus
      </h1>
      <p class="hero-subtitle delay-300">
        Wadah silaturahmi, kolaborasi, dan pengembangan diri bagi seluruh mahasiswa asal Gresik yang menempuh pendidikan di Universitas Negeri Surabaya.
      </p>
      <div class="hero-actions delay-300">
        <button class="btn btn-primary">Lihat Program</button>
        <button class="btn btn-outline" style="background-color: white;">Selengkapnya</button>
      </div>
    </div>
  </section>

  <section id="about" class="section about-section">
    <div class="container">
      <div class="about-grid">
        <div class="about-text">
          <h2 class="section-title">Tentang IMAGE UNESA</h2>
          <p class="section-description">
            IMAGE (Ikatan Mahasiswa Gresik) UNESA adalah organisasi daerah (Orda) yang menaungi mahasiswa asal Gresik di Universitas Negeri Surabaya. Kami berkomitmen untuk mempererat tali persaudaraan dan berkontribusi bagi kemajuan daerah.
          </p>
          <ul class="feature-list">
            <li>
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div>
                <h3 style="color: var(--accent-primary)">Kekeluargaan</h3>
                <p>Membangun ikatan solidaritas yang kuat antar mahasiswa perantauan.</p>
              </div>
            </li>
            <li>
              <div class="feature-icon" style="color: var(--accent-highlight); background: rgba(234, 88, 12, 0.1);">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div>
                <h3 style="color: var(--accent-primary)">Pengabdian</h3>
                <p>Mengabdi kembali kepada masyarakat Gresik melalui berbagai program kerja.</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="about-visual animate-float">
          <div class="glass-panel stat-card" style="background: white;">
            <h3 class="text-orange">500+</h3>
            <p style="color: var(--text-secondary)">Anggota Aktif</p>
          </div>
          <div class="glass-panel stat-card" style="background: var(--accent-primary); color: white;">
            <h3 style="color: white;">10+</h3>
            <p style="color: rgba(255,255,255,0.8)">Program Tahunan</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="events" class="section events-section" style="background-color: var(--bg-secondary);">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Program Kerja Kami</h2>
        <p class="section-description">Berbagai kegiatan yang kami selenggarakan untuk meningkatkan kualitas mahasiswa dan mengabdi pada masyarakat.</p>
      </div>
      
      <div class="events-grid">
        <div class="event-card glass-panel" style="background: white;">
          <div class="event-image" style="background-image: url('/event_hackathon.png');"></div>
          <div class="event-content">
            <div class="event-date">Program Rutin</div>
            <h3 class="event-title">Kajian & Diskusi Daerah</h3>
            <p class="event-desc">Ruang diskusi bagi mahasiswa Gresik untuk membahas isu-isu terkini dan mencari solusi bersama.</p>
            <button class="event-link">Pelajari Lebih Lanjut →</button>
          </div>
        </div>
        
        <div class="event-card glass-panel" style="background: white;">
          <div class="event-image" style="background-image: url('/event_seminar.png');"></div>
          <div class="event-content">
            <div class="event-date">Program Tahunan</div>
            <h3 class="event-title">Seminar Nasional Pendidikan</h3>
            <p class="event-desc">Menghadirkan tokoh-tokoh inspiratif untuk memberikan wawasan baru kepada mahasiswa dan masyarakat umum.</p>
            <button class="event-link">Lihat Dokumentasi →</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="team" class="section team-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Badan Pengurus Harian</h2>
        <p class="section-description">Mengenal lebih dekat pengurus inti IMAGE UNESA periode 2026/2027.</p>
      </div>
      
      <div class="team-grid">
        {#each ['Budi Santoso', 'Siti Aminah', 'Rizky Fadillah'] as member, i}
          <div class="team-member glass-panel" style="background: white;">
            <div class="avatar-placeholder" style={i === 1 ? 'background: var(--accent-highlight);' : ''}>
              {member.charAt(0)}
            </div>
            <h3 class="member-name" style="color: var(--accent-primary)">{member}</h3>
            <p class="member-role">{i === 0 ? 'Ketua Umum' : i === 1 ? 'Sekretaris Jenderal' : 'Bendahara Umum'}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
</main>

<footer class="footer">
  <div class="container footer-container">
    <div class="footer-brand">
      <a href="#home" class="logo">
        <span class="text-orange">IMAGE</span> UNESA
      </a>
      <p class="footer-text">Ikatan Mahasiswa Gresik Universitas Negeri Surabaya. Mengabdi dengan sepenuh hati.</p>
    </div>
    <div class="footer-links">
      <div class="link-group">
        <h4>Navigasi</h4>
        <a href="#home">Beranda</a>
        <a href="#about">Tentang Kami</a>
        <a href="#events">Program Kerja</a>
      </div>
      <div class="link-group">
        <h4>Kontak & Sosial</h4>
        <a href="#">Instagram @imageunesa</a>
        <a href="#">Email: info@imageunesa.org</a>
        <a href="#">Sekretariat IMAGE</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 IMAGE (Ikatan Mahasiswa Gresik) UNESA. All rights reserved.</p>
  </div>
</footer>

<style>
  /* Navigation */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    padding: 1.5rem 0;
    transition: all 0.3s ease;
    color: white; /* default transparent text color */
  }
  
  .navbar.scrolled {
    padding: 1rem 0;
    border-radius: 0;
    border-top: none;
    border-left: none;
    border-right: none;
    background: rgba(255, 255, 255, 0.95);
    color: var(--accent-primary);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 800;
    font-family: 'Outfit', sans-serif;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    font-weight: 600;
    color: inherit;
    opacity: 0.9;
  }

  .navbar.scrolled .nav-link {
    color: var(--text-secondary);
  }

  .nav-link:hover, .navbar.scrolled .nav-link:hover {
    color: var(--accent-highlight);
    opacity: 1;
  }

  /* Hero Section */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 5rem;
  }

  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: -2;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Gradient from dark blue to transparent */
    background: linear-gradient(to right, rgba(0, 66, 138, 0.9) 0%, rgba(0, 66, 138, 0.4) 100%);
    z-index: -1;
  }

  .hero-content {
    max-width: 800px;
    color: white;
  }

  .hero-title {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    color: white;
  }

  .badge {
    display: inline-block;
    padding: 0.5rem 1.2rem;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 9999px;
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 2rem;
    backdrop-filter: blur(4px);
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2.5rem;
    max-width: 600px;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
  }

  /* Sections General */
  .section {
    padding: 8rem 0;
  }

  .section-header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 4rem;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--accent-primary);
  }

  .section-description {
    color: var(--text-secondary);
    font-size: 1.125rem;
  }

  /* About Section */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .feature-list {
    list-style: none;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .feature-list li {
    display: flex;
    gap: 1.2rem;
  }

  .feature-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    background: rgba(0, 66, 138, 0.1);
    color: var(--accent-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .about-visual {
    position: relative;
    height: 400px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
  }

  .stat-card {
    padding: 2rem;
    text-align: center;
    width: 250px;
    border: none;
    box-shadow: var(--shadow-lg);
  }

  .stat-card h3 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }

  .stat-card:nth-child(2) {
    transform: translateX(50px);
  }

  /* Events Section */
  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .event-card {
    overflow: hidden;
    transition: transform 0.3s ease;
    border: none;
    box-shadow: var(--shadow-md);
  }

  .event-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
  }

  .event-image {
    height: 220px;
    background-size: cover;
    background-position: center;
  }

  .event-content {
    padding: 2.5rem 2rem;
  }

  .event-date {
    color: var(--accent-highlight);
    font-weight: 700;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .event-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--accent-primary);
  }

  .event-desc {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }

  .event-link {
    background: none;
    border: none;
    color: var(--accent-primary);
    font-weight: 700;
    font-size: 1rem;
    padding: 0;
    transition: color 0.3s ease;
  }

  .event-link:hover {
    color: var(--accent-highlight);
  }

  /* Team Section */
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .team-member {
    padding: 3rem 2rem;
    text-align: center;
    transition: transform 0.3s ease;
    border: none;
    box-shadow: var(--shadow-md);
  }

  .team-member:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
  }

  .avatar-placeholder {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: var(--accent-primary);
    color: white;
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: 800;
    font-family: 'Outfit', sans-serif;
  }

  .member-name {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  .member-role {
    color: var(--accent-highlight);
    font-weight: 600;
  }

  /* Footer */
  .footer {
    background-color: var(--accent-primary);
    color: white;
    padding: 5rem 0 2rem;
  }

  .footer-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 3rem;
    margin-bottom: 4rem;
  }

  .footer-brand {
    max-width: 350px;
  }

  .footer-brand .logo {
    color: white;
  }

  .footer-text {
    color: rgba(255, 255, 255, 0.8);
    margin-top: 1.5rem;
  }

  .footer-links {
    display: flex;
    gap: 5rem;
  }

  .link-group {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .link-group h4 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: white;
    font-family: 'Outfit', sans-serif;
  }

  .link-group a {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }

  .link-group a:hover {
    color: var(--accent-highlight);
  }

  .footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }
    
    .nav-links {
      display: none;
    }

    .about-grid {
      grid-template-columns: 1fr;
    }
    
    .about-visual {
      height: auto;
      margin-top: 2rem;
    }
    
    .stat-card:nth-child(2) {
      transform: translateX(0);
    }
    
    .hero-actions {
      flex-direction: column;
    }
  }
</style>
