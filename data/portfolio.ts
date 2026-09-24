export interface TechStackItem {
  name: string;
  color: string;
  iconType: string;
}

export interface Project {
  title: string;
  slug: string;
  subtitle: string;
  techs: TechStackItem[];
  image: string;
  details: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    greeting: string;
    typewriterWords: string[];
    about: string;
    email: string;
  };
  skills: TechStackItem[];
  projects: Project[];
  socials: {
    platform: string;
    url: string;
    ariaLabel: string;
  }[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Jo",
    greeting: "Hi, I'm Jo.",
    typewriterWords: ["A Fullstack Developer", "meegmog"],
    about:
      "I am currently an active CS student at State University of Jakarta. I enjoy creating web apps and I'm passionate in UI/UX design.",
    email: "immanuel13730@gmail.com",
  },
  skills: [
    { name: "HTML", color: "text-orange-600", iconType: "html" },
    { name: "CSS", color: "text-blue-600", iconType: "css" },
    { name: "Tailwind", color: "text-cyan-400", iconType: "tailwind" },
    { name: "JavaScript", color: "text-yellow-400", iconType: "javascript" },
    { name: "TypeScript", color: "text-blue-500", iconType: "typescript" },
    { name: "React", color: "text-cyan-300", iconType: "react" },
    { name: "Next.js", color: "text-white", iconType: "nextjs" },
    { name: "PHP", color: "text-indigo-400", iconType: "php" },
    { name: "Kotlin", color: "text-purple-400", iconType: "kotlin" },
    { name: "Python", color: "text-amber-400", iconType: "python" },
    { name: "FastAPI", color: "text-emerald-400", iconType: "fastapi" },
    { name: "MySQL", color: "text-blue-400", iconType: "mysql" },
  ],
  projects: [
    {
      title: "VlexRe Web",
      slug: "vlexre",
      subtitle: "Corporate Reinsurance Brokerage Portal",
      techs: [
        { name: "Laravel", color: "text-red-500", iconType: "laravel" },
        { name: "Tailwind CSS", color: "text-cyan-500", iconType: "tailwind" },
        { name: "JavaScript", color: "text-yellow-400", iconType: "javascript" },
      ],
      image: "/lp3.png",
      details: [
        "Platform portal resmi pialang reasuransi korporasi untuk memfasilitasi konsultasi dan penempatan risiko.",
        "Menyediakan katalog layanan penempatan fakultatif, treaty, rekam jejak transaksi (track record), dan discovery jaringan mitra.",
        "Dilengkapi formulir pengajuan enquiry interaktif dan sistem pelacakan status permohonan untuk klien korporasi.",
        "Dashboard admin terintegrasi untuk pengelolaan enquiry masuk, manajemen layanan, dan konfigurasi profil perusahaan.",
        "Dibangun menggunakan framework Laravel 11, arsitektur Blade components, Alpine.js, dan styling Tailwind CSS responsif.",
      ],
    },
    {
      title: "Sanjose Web",
      slug: "sanjose",
      subtitle: "Corporate Insurance Brokerage & Risk Management",
      techs: [
        { name: "Next.js", color: "text-white", iconType: "nextjs" },
        { name: "TypeScript", color: "text-blue-500", iconType: "typescript" },
        { name: "Tailwind CSS", color: "text-cyan-500", iconType: "tailwind" },
      ],
      image: "/lp4.png",
      details: [
        "Website resmi PT Sanjose Insurance Brokers untuk layanan konsultasi risiko korporasi, perancangan polis, dan advokasi klaim nasabah.",
        "Menampilkan katalog produk asuransi komprehensif: Property, Marine Cargo, Alat Berat, Kendaraan Bermotor, hingga Asuransi Kesehatan.",
        "Integrasi sistem CMS internal dengan Prisma ORM dan SQLite untuk pengelolaan artikel edukasi risiko dan data pengajuan konsultasi nasabah.",
        "Dilengkapi sistem keamanan terverifikasi, proteksi rute middleware, dan automated testing suite (unit test dan security audit test).",
        "Dioptimalkan dengan Next.js 15 App Router dan TypeScript untuk kecepatan loading tinggi dan kemudahan indexing mesin pencari.",
      ],
    },
    {
      title: "MediLink",
      slug: "medilink-claim-audit",
      subtitle: "Healthcare Claim Audit & Verification System",
      techs: [
        { name: "React", color: "text-cyan-400", iconType: "react" },
        { name: "Tailwind CSS", color: "text-cyan-500", iconType: "tailwind" },
        { name: "JavaScript", color: "text-yellow-400", iconType: "javascript" },
      ],
      image: "/medilink.png",
      details: [
        "Sistem verifikasi dan audit klaim asuransi kesehatan berbasis aturan medis dan deteksi anomali tagihan.",
        "Memvalidasi kesesuaian kode diagnosis ICD-10 dengan prosedur medis, limit plafon pertanggungan, dan deteksi klaim ganda.",
        "Antarmuka analitik interaktif dilengkapi kartu metrik audit, visualisasi chart distribusi klaim, dan workbench verifikasi klaim.",
        "Mendukung pemrosesan batch claim otomatis serta integrasi model audit lokal untuk asistensi telaah riwayat medis.",
        "Frontend responsif dibangun dengan React dan Tailwind CSS, terhubung ke backend REST API PHP berkinerja stabil.",
      ],
    },
    {
      title: "Travello",
      slug: "travello-travel-booking",
      subtitle: "Tour & Travel Booking Platform",
      techs: [
        { name: "HTML", color: "text-orange-600", iconType: "html" },
        { name: "CSS", color: "text-blue-600", iconType: "css" },
        { name: "JavaScript", color: "text-yellow-400", iconType: "javascript" },
      ],
      image: "/travel.png",
      details: [
        "Platform pemesanan paket perjalanan wisata domestik dan internasional dengan antarmuka yang bersih dan interaktif.",
        "Menampilkan etalase destinasi unggulan, filter kategori wisata, dan slider ulasan pengalaman pelanggan.",
        "Modal pemesanan interaktif dengan kalkulasi estimasi biaya paket wisata dan validasi formulir langsung.",
        "Fitur hitung mundur promo flash sale dan tata letak yang dioptimalkan untuk kenyamanan akses pada perangkat smartphone.",
        "Dibangun menggunakan struktur Vanilla JavaScript modular, sistem desain modular CSS variables, dan standar semantik HTML5.",
      ],
    },
    {
      title: "SIAKAD",
      slug: "siakad-academic-portal",
      subtitle: "Integrated Academic Information System",
      techs: [
        { name: "Python", color: "text-amber-400", iconType: "python" },
        { name: "FastAPI", color: "text-emerald-400", iconType: "fastapi" },
        { name: "MySQL", color: "text-blue-400", iconType: "mysql" },
        { name: "JavaScript", color: "text-yellow-400", iconType: "javascript" },
      ],
      image: "/siakad.png",
      details: [
        "Sistem Informasi Akademik terpadu untuk administrasi perkuliahan, data mahasiswa, dosen, dan staf perguruan tinggi.",
        "Modul manajemen Kartu Rencana Studi (KRS), penerbitan Kartu Hasil Studi (KHS), dan rekapitulasi transkrip akademik terstruktur.",
        "Sistem presensi kehadiran perkuliahan mandiri bagi dosen dan mahasiswa dengan validasi jadwal kelas real-time.",
        "Modul keuangan terintegrasi untuk pengelolaan tagihan SPP, pencatatan transaksi mahasiswa, dan verifikasi status pembayaran.",
        "Arsitektur Zero-Disk Storage dengan penyimpanan berkas langsung pada tabel MySQL LONGBLOB dan proteksi token CSRF.",
        "Backend RESTful API performa tinggi dibangun dengan Python FastAPI dan SQLAlchemy, serta antarmuka SPA JavaScript modular.",
      ],
    },
    {
      title: "LMS & CBT Platform",
      slug: "lms-cbt-platform",
      subtitle: "Dedicated Learning Hub & Computer Based Test",
      techs: [
        { name: "Python", color: "text-amber-400", iconType: "python" },
        { name: "FastAPI", color: "text-emerald-400", iconType: "fastapi" },
        { name: "MySQL", color: "text-blue-400", iconType: "mysql" },
        { name: "JavaScript", color: "text-yellow-400", iconType: "javascript" },
      ],
      image: "/lms.png",
      details: [
        "Platform pembelajaran daring terdedikasi untuk distribusi materi perkuliahan, repositori berkas, dan modul diskusi kelas.",
        "Portal Ujian CBT (Computer Based Test) anti-curang dengan proteksi fullscreen lockdown, deteksi window blur, dan timer otomatis.",
        "Pengumpulan tugas kuliah multi-lampiran dengan verifikasi keamanan format berkas dan sistem penilaian langsung bagi dosen.",
        "Forum diskusi interaktif per kelas berbasis WebSocket Manager terintegrasi pada backend FastAPI untuk kolaborasi langsung.",
        "Integrasi Single Sign-On (SSO) dan sinkronisasi sesi dengan sistem SIAKAD dalam arsitektur layanan mandiri berbasis Python.",
      ],
    },
  ],
  socials: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/johannes-immanuel-570708245/",
      ariaLabel: "LinkedIn",
    },
    {
      platform: "GitHub",
      url: "https://github.com/johannesimmanuel",
      ariaLabel: "GitHub",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/p.star007/",
      ariaLabel: "Instagram",
    },
    {
      platform: "Discord",
      url: "https://discord.com/users/667359229451042852",
      ariaLabel: "Discord",
    },
  ],
};
