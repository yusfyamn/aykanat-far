import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <SmoothScroll>
      <main>
        <Navbar />
        <section className="bg-white pt-28 pb-12 text-[#101010] sm:pt-32 md:pt-36">
          <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 md:px-8">
            <h1 className="text-3xl font-semibold tracking-tight text-[#101010] sm:text-4xl md:text-5xl">
              Kullanım Koşulları
            </h1>
            <p className="mt-5 max-w-[80ch] text-[0.95rem] leading-relaxed text-black/62 sm:text-base">
              Son güncelleme: 7 Mart 2026
            </p>

            <div className="mt-10 space-y-8 text-[0.98rem] leading-relaxed text-black/74 sm:text-base md:text-lg">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">1. Kapsam ve Kabul</h2>
                <p className="mt-3">
                  Bu web sitesini ziyaret eden tüm kullanıcılar, burada yer alan kullanım
                  koşullarını kabul etmiş sayılır. Koşullar, önceden bildirim yapılmaksızın
                  güncellenebilir; güncel metin bu sayfada yayımlanır.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">2. Hizmet Bilgileri</h2>
                <p className="mt-3">
                  Sitede yer alan içerikler genel bilgilendirme amaçlıdır. Araç üzerinde yapılacak
                  teknik inceleme sonucunda işlem kapsamı, süre ve uygulanabilirlik değişebilir.
                  Nihai değerlendirme fiziksel kontrol sonrası paylaşılır.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">3. Kullanıcı Yükümlülükleri</h2>
                <p className="mt-3">
                  Kullanıcılar, siteyi hukuka ve dürüstlük kurallarına uygun biçimde kullanmayı;
                  sistemi aksatacak, kötüye kullanacak veya üçüncü kişilerin haklarını ihlal edecek
                  eylemlerden kaçınmayı kabul eder.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">4. Fikri Mülkiyet</h2>
                <p className="mt-3">
                  Site tasarımı, metinler, görseller, marka unsurları ve diğer içerikler AYKANAT FAR
                  veya ilgili hak sahiplerine aittir. Yazılı izin olmadan çoğaltılamaz, dağıtılamaz
                  ya da ticari amaçla kullanılamaz.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">5. Sorumluluğun Sınırlandırılması</h2>
                <p className="mt-3">
                  Web sitesindeki bilgi ve duyuruların güncel tutulması için azami özen gösterilir.
                  Bununla birlikte içerikteki olası eksiklik, kesinti, teknik arıza veya üçüncü taraf
                  hizmet kaynaklı aksaklıklardan doğabilecek dolaylı zararlardan sorumluluk kabul edilmez.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">6. Dış Bağlantılar</h2>
                <p className="mt-3">
                  Site üzerinde üçüncü taraf platformlara yönlendiren bağlantılar bulunabilir. Bu
                  platformların içerik, güvenlik ve gizlilik uygulamalarından ilgili platformlar
                  sorumludur.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">7. Uyuşmazlık ve Yetki</h2>
                <p className="mt-3">
                  Kullanım koşullarından doğabilecek uyuşmazlıklarda Türkiye Cumhuriyeti mevzuatı
                  uygulanır. Yetkili mahkeme ve icra daireleri, ilgili yasal düzenlemeler
                  çerçevesinde belirlenir.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">8. İletişim</h2>
                <p className="mt-3">
                  Bu koşullar hakkında sorularınız için <span className="font-medium">info@restore.com</span>
                  üzerinden bizimle iletişime geçebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-white pt-0 md:pt-2">
          <div className="mt-12 max-[1024px]:mt-6 max-md:-mt-px px-2.5 pb-2 sm:mt-14 sm:px-6 md:mt-16 md:px-4 md:pb-3">
            <Footer />
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
