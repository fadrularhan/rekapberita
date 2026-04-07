-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author TEXT NOT NULL DEFAULT 'Admin',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policies for categories (public read)
CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);

-- Create policies for news (public read published only)
CREATE POLICY "Allow public read published news" ON news FOR SELECT USING (published = true);

-- Insert default categories
INSERT INTO categories (name, slug) VALUES
  ('Politik', 'politik'),
  ('Ekonomi', 'ekonomi'),
  ('Teknologi', 'teknologi'),
  ('Olahraga', 'olahraga'),
  ('Hiburan', 'hiburan'),
  ('Kesehatan', 'kesehatan')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample news
INSERT INTO news (title, slug, excerpt, content, image_url, category_id, author, published, published_at) VALUES
  (
    'Pemerintah Luncurkan Program Digitalisasi UMKM Nasional',
    'pemerintah-luncurkan-program-digitalisasi-umkm-nasional',
    'Program ini bertujuan untuk membantu 10 juta UMKM go digital dalam 2 tahun ke depan.',
    'Pemerintah Indonesia resmi meluncurkan program digitalisasi UMKM nasional yang bertujuan untuk membantu 10 juta pelaku usaha mikro, kecil, dan menengah (UMKM) untuk go digital dalam kurun waktu 2 tahun ke depan. Program ini merupakan bagian dari upaya pemerintah untuk mempercepat transformasi digital di sektor ekonomi riil.

Menteri Koperasi dan UKM menjelaskan bahwa program ini akan memberikan pelatihan digital, akses ke platform e-commerce, serta bantuan modal usaha bagi UMKM yang berpartisipasi. "Kami ingin memastikan bahwa UMKM Indonesia tidak tertinggal dalam era digital ini," ujarnya.

Program ini juga akan melibatkan berbagai mitra teknologi dan platform digital untuk membantu UMKM dalam proses transformasi digital mereka.',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop',
    (SELECT id FROM categories WHERE slug = 'ekonomi'),
    'Redaksi',
    true,
    NOW() - INTERVAL '2 hours'
  ),
  (
    'Tim Nasional Indonesia Raih Kemenangan Bersejarah',
    'tim-nasional-indonesia-raih-kemenangan-bersejarah',
    'Timnas Indonesia berhasil mengalahkan lawan dengan skor 3-1 dalam pertandingan kualifikasi.',
    'Tim Nasional Indonesia berhasil meraih kemenangan bersejarah dengan mengalahkan lawannya dengan skor 3-1 dalam pertandingan kualifikasi yang berlangsung semalam. Pertandingan yang berlangsung di Stadion Utama Gelora Bung Karno ini disaksikan oleh puluhan ribu suporter yang memenuhi tribun stadion.

Gol-gol Indonesia dicetak oleh tiga pemain berbeda, menunjukkan kekompakan dan kualitas permainan tim yang terus meningkat. Pelatih timnas mengapresiasi kerja keras para pemain dan dukungan luar biasa dari suporter.

"Ini adalah hasil dari kerja keras selama berbulan-bulan. Pemain-pemain telah menunjukkan karakter juara dan saya bangga dengan pencapaian ini," kata pelatih dalam konferensi pers setelah pertandingan.',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop',
    (SELECT id FROM categories WHERE slug = 'olahraga'),
    'Redaksi',
    true,
    NOW() - INTERVAL '5 hours'
  ),
  (
    'Startup Indonesia Raih Pendanaan Seri B Senilai $50 Juta',
    'startup-indonesia-raih-pendanaan-seri-b',
    'Startup teknologi asal Jakarta ini akan gunakan dana untuk ekspansi ke Asia Tenggara.',
    'Sebuah startup teknologi asal Jakarta berhasil meraih pendanaan Seri B senilai $50 juta dari konsorsium investor internasional. Pendanaan ini dipimpin oleh venture capital terkemuka dari Silicon Valley dengan partisipasi dari beberapa investor regional.

CEO startup tersebut mengatakan bahwa dana ini akan digunakan untuk mempercepat ekspansi ke pasar Asia Tenggara dan meningkatkan kapabilitas teknologi platform mereka. "Kami sangat bersyukur atas kepercayaan yang diberikan oleh investor. Ini membuktikan bahwa ekosistem startup Indonesia semakin matang dan menarik perhatian investor global," ujarnya.

Startup ini bergerak di bidang fintech dan telah melayani lebih dari 5 juta pengguna di Indonesia.',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop',
    (SELECT id FROM categories WHERE slug = 'teknologi'),
    'Redaksi',
    true,
    NOW() - INTERVAL '8 hours'
  ),
  (
    'Kemenkes Kampanyekan Gaya Hidup Sehat untuk Cegah Penyakit',
    'kemenkes-kampanyekan-gaya-hidup-sehat',
    'Kampanye ini fokus pada pola makan seimbang dan olahraga teratur untuk masyarakat Indonesia.',
    'Kementerian Kesehatan meluncurkan kampanye nasional tentang gaya hidup sehat sebagai upaya pencegahan penyakit tidak menular. Kampanye ini menekankan pentingnya pola makan seimbang, olahraga teratur, dan pemeriksaan kesehatan berkala.

Menteri Kesehatan menjelaskan bahwa penyakit tidak menular seperti diabetes, hipertensi, dan penyakit jantung masih menjadi penyebab kematian tertinggi di Indonesia. "Pencegahan adalah kunci. Dengan mengubah gaya hidup menjadi lebih sehat, kita bisa mengurangi risiko terkena penyakit-penyakit ini," katanya.

Kampanye ini akan berlangsung selama satu tahun dengan berbagai kegiatan edukasi di seluruh Indonesia.',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop',
    (SELECT id FROM categories WHERE slug = 'kesehatan'),
    'Redaksi',
    true,
    NOW() - INTERVAL '12 hours'
  ),
  (
    'Film Indonesia Raih Penghargaan di Festival Film Internasional',
    'film-indonesia-raih-penghargaan-internasional',
    'Film karya sutradara muda Indonesia ini dinobatkan sebagai Film Terbaik Asia.',
    'Sebuah film Indonesia karya sutradara muda berbakat berhasil meraih penghargaan bergengsi di festival film internasional yang baru saja berakhir. Film ini dinobatkan sebagai Film Terbaik Asia, mengalahkan puluhan film dari negara-negara lain.

Sutradara film tersebut mengungkapkan rasa syukurnya atas pencapaian ini. "Ini adalah mimpi yang menjadi kenyataan. Kami ingin menunjukkan bahwa film Indonesia bisa bersaing di kancah internasional," ujarnya.

Film ini mengangkat tema tentang kehidupan masyarakat urban di Jakarta dengan pendekatan sinematik yang unik dan cerita yang menyentuh.',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop',
    (SELECT id FROM categories WHERE slug = 'hiburan'),
    'Redaksi',
    true,
    NOW() - INTERVAL '1 day'
  ),
  (
    'DPR Sahkan RUU Perlindungan Data Pribadi',
    'dpr-sahkan-ruu-perlindungan-data-pribadi',
    'Undang-undang baru ini akan memberikan perlindungan lebih baik bagi data pribadi warga negara.',
    'Dewan Perwakilan Rakyat (DPR) resmi mengesahkan Rancangan Undang-Undang Perlindungan Data Pribadi menjadi undang-undang. Pengesahan ini dilakukan dalam rapat paripurna yang dihadiri oleh mayoritas anggota dewan.

Ketua DPR menyatakan bahwa UU ini merupakan langkah penting dalam melindungi hak privasi warga negara di era digital. "Dengan undang-undang ini, pengelolaan data pribadi oleh berbagai pihak akan diatur dengan lebih ketat dan ada sanksi yang jelas bagi pelanggar," jelasnya.

UU ini akan mulai berlaku dalam waktu dua tahun untuk memberikan waktu bagi berbagai pihak untuk menyesuaikan sistem mereka.',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop',
    (SELECT id FROM categories WHERE slug = 'politik'),
    'Redaksi',
    true,
    NOW() - INTERVAL '2 days'
  )
ON CONFLICT (slug) DO NOTHING;
