import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: 'Polityka Prywatności',
  description: 'Polityka prywatności platformy PropertyVista - informacje o przetwarzaniu danych osobowych.',
};

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Polityka Prywatności</h1>
          
          <p className="text-gray-600 mb-8">
            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Informacje ogólne</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in 
              faucibus orci luctus et ultrices posuere cubilia curae; Sed viverra, nulla vel consequat 
              cursus, magna libero tempor nisi, vel tincidunt ipsum tellus eu ipsum. Praesent congue 
              erat at massa. Sed cursus turpis a purus.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, 
              et sollicitudin lorem quis bibendum dolor. Nam vestibulum accumsan nisl. Pellentesque 
              habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Administrator danych</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Administratorem danych osobowych jest {siteConfig.name}, z siedzibą w Warszawie, 
              ul. Przykładowa 123, 00-001 Warszawa, wpisana do rejestru przedsiębiorców Krajowego 
              Rejestru Sądowego pod numerem KRS 0000000000.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Dane kontaktowe:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>Adres: ul. Przykładowa 123, 00-001 Warszawa</li>
                <li>E-mail: {siteConfig.contact.email}</li>
                <li>Telefon: {siteConfig.contact.phone}</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Zakres przetwarzania danych</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu 
              libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat 
              eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Dane identyfikacyjne (imię, nazwisko, adres e-mail)</li>
              <li>Dane kontaktowe (numer telefonu, adres korespondencyjny)</li>
              <li>Dane dotyczące korzystania z serwisu (logi, cookies)</li>
              <li>Dane dotyczące preferencji użytkownika</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cele przetwarzania</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet 
              iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer 
              eget, posuere ut, mauris.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Świadczenie usług</h3>
                <p className="text-green-700 text-sm">
                  Przetwarzanie danych w celu świadczenia usług platformy nieruchomości.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Komunikacja</h3>
                <p className="text-blue-700 text-sm">
                  Kontakt z użytkownikami w sprawach związanych z obsługą konta.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Podstawy prawne</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Praesent blandit blandit mauris. Praesent lectus tellus, aliquet aliquam, luctus a, 
              egestas a, turpis. Mauris lacinia lorem sit amet ipsum. Nunc quis urna dictum turpis 
              accumsan semper. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Cel przetwarzania</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Podstawa prawna</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Świadczenie usług</td>
                    <td className="border border-gray-300 px-4 py-2">Art. 6 ust. 1 lit. b RODO</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Marketing</td>
                    <td className="border border-gray-300 px-4 py-2">Art. 6 ust. 1 lit. f RODO</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Wypełnianie obowiązków prawnych</td>
                    <td className="border border-gray-300 px-4 py-2">Art. 6 ust. 1 lit. c RODO</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Prawa użytkowników</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam 
              ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing 
              velit. Suspendisse potenti.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Prawo dostępu do danych (art. 15 RODO)</li>
              <li>Prawo do sprostowania danych (art. 16 RODO)</li>
              <li>Prawo do usunięcia danych (art. 17 RODO)</li>
              <li>Prawo do ograniczenia przetwarzania (art. 18 RODO)</li>
              <li>Prawo do przenoszenia danych (art. 20 RODO)</li>
              <li>Prawo sprzeciwu (art. 21 RODO)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum 
              primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed aliquam, nisi quis 
              porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, 
              mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque 
              posuere. Praesent turpis.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Kontakt</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                W sprawach związanych z ochroną danych osobowych można się kontaktować:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>E-mail: {siteConfig.contact.email}</li>
                <li>Adres: ul. Przykładowa 123, 00-001 Warszawa</li>
                <li>Telefon: {siteConfig.contact.phone}</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}