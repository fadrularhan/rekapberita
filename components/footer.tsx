import Link from "next/link";
import { Newspaper } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Newspaper className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Rekap<span className="text-primary">Berita</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Portal berita terpercaya yang menyajikan rekap berita terkini dari
              berbagai sumber terpilih. Tetap update dengan informasi terbaru
              setiap hari.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=nasional"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Nasional
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=internasional"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Internasional
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=teknologi"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Teknologi
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Informasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/admin"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Admin Panel
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">Tentang Kami</span>
              </li>
              <li>
                <span className="text-muted-foreground">Kebijakan Privasi</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} RekapBerita. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
