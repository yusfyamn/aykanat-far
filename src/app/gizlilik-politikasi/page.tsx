import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <SmoothScroll>
      <main>
        <Navbar />
        <section className="bg-white pt-28 pb-12 text-[#101010] sm:pt-32 md:pt-36">
          <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 md:px-8">
            <h1 className="text-3xl font-semibold tracking-tight text-[#101010] sm:text-4xl md:text-5xl">
              Gizlilik Politikası
            </h1>
            <p className="mt-5 max-w-[80ch] text-[0.95rem] leading-relaxed text-black/62 sm:text-base">
              Son güncelleme: 7 Mart 2026
            </p>

            <div className="mt-10 space-y-8 text-[0.98rem] leading-relaxed text-black/74 sm:text-base md:text-lg">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">1. Veri Sorumlusu</h2>
                <p className="mt-3">
                  Bu politika, AYKANAT FAR tarafından işletilen web sitesi ve iletişim kanalları
                  üzerinden toplanan kişisel verilere ilişkin bilgilendirme amacı taşır. Sitemizi
                  ziyaret ederek veya bizimle iletişime geçerek paylaştığınız veriler, yürürlükteki
                  mevzuata uygun şekilde işlenir.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">2. Toplanan Veriler</h2>
                <p className="mt-3">
                  Hizmet taleplerini yönetebilmek için ad-soyad, telefon numarası, e-posta adresi,
                  araç bilgisi ve talep açıklaması gibi bilgileri toplayabiliriz. Ayrıca teknik
                  güvenlik ve performans amaçlarıyla cihaz türü, tarayıcı bilgisi, sayfa görüntüleme
                  verileri ve çerez bilgileri işlenebilir.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">3. Verilerin İşlenme Amaçları</h2>
                <p className="mt-3">
                  Verileriniz; iletişim taleplerine dönüş yapmak, teklif ve randevu süreçlerini
                  yürütmek, operasyonel planlama yapmak, müşteri deneyimini geliştirmek, teknik hata
                  analizleri gerçekleştirmek ve yasal yükümlülükleri yerine getirmek amacıyla
                  işlenir.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">4. Hukuki Sebep ve Saklama Süresi</h2>
                <p className="mt-3">
                  Kişisel verileriniz, açık rıza, sözleşmenin kurulması/ifası, meşru menfaat ve
                  ilgili mevzuattan doğan yükümlülükler kapsamında işlenir. İşleme amacı ortadan
                  kalktığında veya yasal saklama süresi dolduğunda veriler silinir, yok edilir ya da
                  anonim hale getirilir.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">5. Üçüncü Taraflarla Paylaşım</h2>
                <p className="mt-3">
                  Verileriniz, hizmetin gerektirdiği teknik sağlayıcılar (ör. barındırma, e-posta,
                  harita/analitik altyapısı) ile sınırlı ve gerekli ölçüde paylaşılabilir. Yasal
                  zorunluluk bulunmadıkça verileriniz ticari amaçla üçüncü kişilere devredilmez.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">6. Veri Güvenliği</h2>
                <p className="mt-3">
                  Yetkisiz erişim, değiştirme, ifşa veya kayıp riskini azaltmak için teknik ve idari
                  güvenlik önlemleri uygularız. Erişim yetkileri sınırlandırılır, sistemler düzenli
                  olarak gözden geçirilir ve gerekli iyileştirmeler yapılır.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">7. Haklarınız</h2>
                <p className="mt-3">
                  Kişisel verilerinizle ilgili bilgi talep etme, düzeltme, silme, işleme amacını ve
                  kapsamını öğrenme, itiraz etme ve mevzuat kapsamında diğer haklarınızı kullanma
                  hakkına sahipsiniz. Taleplerinizi iletişim kanallarımız üzerinden bize iletebilirsiniz.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">8. İletişim</h2>
                <p className="mt-3">
                  Politika hakkında sorularınız için <span className="font-medium">info@restore.com</span> adresine
                  e-posta gönderebilir veya telefon üzerinden bizimle iletişime geçebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-white pt-0 md:pt-2">
          <div className="pt-4 px-2.5 pb-2 sm:pt-5 sm:px-6 md:pt-16 md:px-4 md:pb-3">
            <Footer />
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
