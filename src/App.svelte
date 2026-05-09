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

<nav class="navbar {scrolled ? 'scrolled' : ''}">
  <div class="container nav-container">
    <a href="#home" class="logo">
      IMAGE<span class="text-yellow">UNESA</span>
    </a>
    <div class="nav-links">
      <a href="#home" class="nav-link">Beranda</a>
      <a href="#about" class="nav-link">Tentang</a>
      <a href="#events" class="nav-link">Program Kerja</a>
      <a href="#team" class="nav-link">Kabinet</a>
      <button class="btn btn-yellow">Hubungi Kami</button>
    </div>
  </div>
</nav>

<main>
  <!-- Hero Section -->
  <section id="home" class="hero">
    <div class="container hero-container">
      <div class="hero-content animate-fade-up">
        <div class="badge delay-100">Ikatan Mahasiswa Gresik Universitas Negeri Surabaya</div>
        <h1 class="hero-title delay-200">
          Kabinet <span class="text-yellow">Sinergi Asa</span>
        </h1>
        <p class="hero-subtitle delay-300">
          Mari wujudkan kolaborasi progresif untuk pengembangan mahasiswa Gresik yang adaptif, inovatif, dan berdampak bagi almamater serta daerah.
        </p>
        <div class="hero-actions delay-300">
          <button class="btn btn-navy">Selengkapnya</button>
          <button class="btn btn-outline">Lihat Profil</button>
        </div>
      </div>
      
      <div class="hero-visual animate-fade-up delay-200">
        <div class="visual-circle bg-yellow"></div>
        <div class="visual-image" style="background-image: url('/hero_cutout.png');"></div>
      </div>
    </div>
    
    <!-- Decorative element -->
    <div class="curve-bottom">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#f4f5f7"></path>
      </svg>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="section bg-secondary">
    <div class="container">
      <div class="about-grid">
        <div class="about-visual animate-fade-up">
          <div class="image-wrapper">
             <div class="image-accent bg-yellow"></div>
             <img src="/event_1_bem.png" alt="Kegiatan IMAGE UNESA" class="about-img" />
          </div>
        </div>
        <div class="about-text animate-fade-up delay-200">
          <h4 class="section-kicker">Tentang Kami</h4>
          <h2 class="section-title">Membangun Karakter, Mengabdi untuk Negeri.</h2>
          <p class="section-description">
            IMAGE UNESA adalah wadah kekeluargaan bagi mahasiswa perantauan dari Gresik. Kami berkomitmen untuk menjadi inkubator kepemimpinan yang progresif, serta rumah kedua bagi setiap anggota untuk bertumbuh bersama.
          </p>
          <div class="stats-row">
            <div class="stat-item">
              <h3 class="text-navy">500+</h3>
              <p>Keluarga Mahasiswa</p>
            </div>
            <div class="stat-item">
              <h3 class="text-yellow">15+</h3>
              <p>Program Unggulan</p>
            </div>
            <div class="stat-item">
              <h3 class="text-navy">20+</h3>
              <p>Tahun Berdiri</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Events Section -->
  <section id="events" class="section">
    <div class="container">
      <div class="section-header text-center">
        <h4 class="section-kicker">Program Kerja</h4>
        <h2 class="section-title">Inisiatif & Kolaborasi</h2>
        <p class="section-description mx-auto">Kami menghadirkan program-program progresif yang berfokus pada pengembangan kualitas sumber daya mahasiswa dan pengabdian masyarakat.</p>
      </div>
      
      <div class="events-grid">
        <div class="event-card">
          <div class="event-img-wrap">
            <div class="event-image" style="background-image: url('/event_1_bem.png');"></div>
            <div class="event-tag bg-yellow">Pengembangan</div>
          </div>
          <div class="event-content">
            <h3 class="event-title">IMAGE Leadership Camp</h3>
            <p class="event-desc">Pelatihan kepemimpinan dan manajemen organisasi untuk mencetak kader pemimpin masa depan daerah.</p>
            <a href="#" class="read-more">Selengkapnya <span class="arrow">→</span></a>
          </div>
        </div>
        
        <div class="event-card">
          <div class="event-img-wrap">
            <div class="event-image" style="background-image: url('/event_2_bem.png');"></div>
            <div class="event-tag bg-navy text-white">Akademik</div>
          </div>
          <div class="event-content">
            <h3 class="event-title">Seminar Nasional Pendidikan</h3>
            <p class="event-desc">Diskusi panel mengupas isu pendidikan terkini, mengundang pakar dan praktisi nasional.</p>
            <a href="#" class="read-more">Selengkapnya <span class="arrow">→</span></a>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-4">
        <button class="btn btn-outline">Lihat Semua Program</button>
      </div>
    </div>
  </section>

  <!-- Team/Cabinet Section -->
  <section id="team" class="section bg-secondary">
    <div class="container">
      <div class="section-header text-center">
        <h4 class="section-kicker">Pengurus Inti</h4>
        <h2 class="section-title">Kabinet Sinergi Asa</h2>
      </div>
      
      <div class="team-grid">
        {#each ['Rizki Hidayat', 'Aisyah Putri', 'Bagus Prasetyo'] as member, i}
          <div class="team-member">
            <div class="member-img-wrap">
              <div class="member-bg {i === 1 ? 'bg-yellow' : 'bg-navy'}"></div>
              <div class="member-photo">{member.charAt(0)}</div>
            </div>
            <h3 class="member-name">{member}</h3>
            <p class="member-role">{i === 0 ? 'Ketua Umum' : i === 1 ? 'Sekretaris Umum' : 'Bendahara Umum'}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
</main>

<footer class="footer bg-navy">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <h2 class="footer-logo">IMAGE<span class="text-yellow">UNESA</span></h2>
        <p class="footer-desc">Ikatan Mahasiswa Gresik Universitas Negeri Surabaya. <br> Kabinet Sinergi Asa 2026.</p>
      </div>
      
      <div class="footer-links-col">
        <h4>Tautan Cepat</h4>
        <ul>
          <li><a href="#home">Beranda</a></li>
          <li><a href="#about">Profil Kami</a></li>
          <li><a href="#events">Program Kerja</a></li>
          <li><a href="#">Berita & Artikel</a></li>
        </ul>
      </div>
      
      <div class="footer-links-col">
        <h4>Kontak</h4>
        <ul>
          <li>Sekretariat IMAGE UNESA, Kampus Ketintang</li>
          <li>Surabaya, Jawa Timur</li>
          <li>halo@imageunesa.org</li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2026 IMAGE UNESA. All rights reserved.</p>
      <div class="social-links">
        <a href="#" class="social-icon">IG</a>
        <a href="#" class="social-icon">TW</a>
        <a href="#" class="social-icon">YT</a>
      </div>
    </div>
  </div>
</footer>

<style>
  /* Utility */
  .text-center { text-align: center; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .mt-4 { margin-top: 3rem; }
  .bg-secondary { background-color: var(--bg-secondary); }

  /* Navigation */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    padding: 1.5rem 0;
    transition: all 0.3s ease;
    background: transparent;
  }
  
  .navbar.scrolled {
    padding: 1rem 0;
    background: white;
    box-shadow: var(--shadow-sm);
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.75rem;
    font-weight: 800;
    font-family: 'Playfair Display', serif;
    letter-spacing: -0.5px;
    color: var(--navy);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2.5rem;
  }

  .nav-link {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--navy);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: var(--yellow);
    transition: width 0.3s ease;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  /* Hero Section */
  .hero {
    position: relative;
    padding-top: 10rem;
    padding-bottom: 8rem;
    background-color: var(--bg-primary);
    overflow: hidden;
  }

  .hero-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
  }

  .hero-content {
    flex: 1;
    max-width: 600px;
    z-index: 10;
  }

  .badge {
    display: inline-block;
    padding: 0.5rem 1.25rem;
    background: rgba(250, 204, 21, 0.15);
    color: var(--navy);
    font-weight: 700;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: var(--radius-full);
    margin-bottom: 1.5rem;
  }

  .hero-title {
    font-size: 4.5rem;
    margin-bottom: 1.5rem;
    color: var(--navy);
  }

  .hero-subtitle {
    font-size: 1.125rem;
    color: var(--text-muted);
    margin-bottom: 2.5rem;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
  }

  .hero-visual {
    flex: 1;
    position: relative;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .visual-circle {
    position: absolute;
    width: 450px;
    height: 450px;
    border-radius: 50%;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  .visual-image {
    position: absolute;
    width: 110%;
    height: 110%;
    background-size: contain;
    background-position: center bottom;
    background-repeat: no-repeat;
    z-index: 2;
    right: -5%;
    bottom: -10%;
  }

  .curve-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 0;
  }

  /* Section General */
  .section {
    padding: 6rem 0;
  }

  .section-kicker {
    color: var(--yellow-hover);
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.875rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }

  .section-description {
    color: var(--text-muted);
    font-size: 1.125rem;
    max-width: 700px;
  }

  /* About Section */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }

  .image-wrapper {
    position: relative;
    border-radius: var(--radius-xl);
  }

  .image-accent {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 20px;
    left: -20px;
    border-radius: var(--radius-xl);
    z-index: 1;
  }

  .about-img {
    position: relative;
    width: 100%;
    height: auto;
    border-radius: var(--radius-xl);
    z-index: 2;
    box-shadow: var(--shadow-lg);
    object-fit: cover;
  }

  .stats-row {
    display: flex;
    gap: 3rem;
    margin-top: 3rem;
    padding-top: 3rem;
    border-top: 1px solid var(--border-color);
  }

  .stat-item h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
  }

  .stat-item p {
    color: var(--text-muted);
    font-weight: 500;
    font-size: 0.875rem;
    text-transform: uppercase;
  }

  /* Events Section */
  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 3rem;
    margin-top: 4rem;
  }

  .event-card {
    background: white;
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
  }

  .event-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
  }

  .event-img-wrap {
    position: relative;
    height: 250px;
  }

  .event-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  .event-tag {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    padding: 0.4rem 1rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .event-content {
    padding: 2.5rem;
  }

  .event-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }

  .event-desc {
    color: var(--text-muted);
    margin-bottom: 1.5rem;
  }

  .read-more {
    display: inline-flex;
    align-items: center;
    color: var(--navy);
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 1px;
  }

  .read-more .arrow {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }

  .read-more:hover .arrow {
    transform: translateX(5px);
    color: var(--yellow-hover);
  }

  /* Team Section */
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
    margin-top: 4rem;
  }

  .team-member {
    text-align: center;
  }

  .member-img-wrap {
    position: relative;
    width: 180px;
    height: 180px;
    margin: 0 auto 2rem;
  }

  .member-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    top: 10px;
    left: -10px;
    z-index: 1;
  }

  .member-photo {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: white;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    font-family: 'Playfair Display', serif;
    color: var(--navy);
    border: 1px solid var(--border-color);
  }

  .member-name {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .member-role {
    color: var(--text-muted);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 1px;
  }

  /* Footer */
  .footer {
    padding: 6rem 0 2rem;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 4rem;
    margin-bottom: 4rem;
  }

  .footer-logo {
    font-size: 2rem;
    color: white;
    margin-bottom: 1rem;
  }

  .footer-desc {
    color: rgba(255, 255, 255, 0.7);
    max-width: 300px;
  }

  .footer-links-col h4 {
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }

  .footer-links-col ul {
    list-style: none;
  }

  .footer-links-col ul li {
    margin-bottom: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .footer-links-col ul li a:hover {
    color: var(--yellow);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.875rem;
  }

  .social-links {
    display: flex;
    gap: 1rem;
  }

  .social-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 0.75rem;
  }

  .social-icon:hover {
    background: var(--yellow);
    color: var(--navy);
  }

  /* Responsive */
  @media (max-width: 992px) {
    .hero-container, .about-grid {
      flex-direction: column;
      text-align: center;
    }
    
    .hero-visual {
      width: 100%;
      height: 400px;
    }
    
    .visual-circle {
      right: 50%;
      transform: translate(50%, -50%);
    }

    .hero-actions {
      justify-content: center;
    }

    .stats-row {
      justify-content: center;
    }

    .footer-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hero-title { font-size: 3rem; }
    .section-title { font-size: 2.5rem; }
  }
</style>
