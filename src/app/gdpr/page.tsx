import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: 'Informacja GDPR',
  description: 'Informacje o prawach użytkowników zgodnie z GDPR - Ogólne Rozporządzenie o Ochronie Danych.',
};

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Informacja GDPR</h1>
            <p className="text-xl text-gray-600 mb-8">
              Twoje prawa w zakresie ochrony danych osobowych
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 text-left">
              <p className="text-blue-700">
                <strong>GDPR (Ogólne Rozporządzenie o Ochronie Danych)</strong> to europejskie prawo, 
                które chroni Twoje dane osobowe i daje Ci kontrolę nad tym, jak są używane.
              </p>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Twoje Prawa GDPR</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                  <h3 className="text-lg font-semibold text-green-800">Prawo dostępu</h3>
                </div>
                <p className="text-green-700 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum 
                  primis in faucibus orci luctus et ultrices posuere cubilia curae.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                  <h3 className="text-lg font-semibold text-blue-800">Prawo sprostowania</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  Sed viverra, nulla vel consequat cursus, magna libero tempor nisi, vel tincidunt 
                  ipsum tellus eu ipsum. Praesent congue erat at massa.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                  <h3 className="text-lg font-semibold text-red-800">Prawo do usunięcia</h3>
                </div>
                <p className="text-red-700 text-sm">
                  Sed cursus turpis a purus. Aliquam erat volutpat. Morbi imperdiet, mauris ac 
                  auctor dictum, nisl ligula egestas nulla.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                  <h3 className="text-lg font-semibold text-purple-800">Prawo ograniczenia</h3>
                </div>
                <p className="text-purple-700 text-sm">
                  Et sollicitudin lorem quis bibendum dolor. Nam vestibulum accumsan nisl. 
                  Pellentesque habitant morbi tristique senectus.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">5</div>
                  <h3 className="text-lg font-semibold text-orange-800">Prawo przenoszenia</h3>
                </div>
                <p className="text-orange-700 text-sm">
                  Et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat 
                  vitae, ultricies eget, tempor sit amet, ante.
                </p>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">6</div>
                  <h3 className="text-lg font-semibold text-indigo-800">Prawo sprzeciwu</h3>
                </div>
                <p className="text-indigo-700 text-sm">
                  Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. 
                  Mauris placerat eleifend leo.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Szczegóły praw GDPR</h2>
            
            <div className="space-y-8">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Prawo dostępu (Art. 15 GDPR)</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum 
                  sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt 
                  condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>Informacje o celach przetwarzania danych</li>
                  <li>Kategorie przetwarzanych danych osobowych</li>
                  <li>Odbiorcy lub kategorie odbiorców danych</li>
                  <li>Planowany okres przechowywania danych</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Prawo do sprostowania (Art. 16 GDPR)</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Donec at pede. Etiam vel neque nec dui dignissim bibendum. Vivamus id enim. Phasellus 
                  neque orci, porta a, aliquet quis, semper a, massa. Phasellus purus.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-700 text-sm">
                    <strong>Jak skorzystać:</strong> Skontaktuj się z nami przez e-mail podając 
                    szczegóły danych wymagających korekty.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Prawo do usunięcia - "Prawo do bycia zapomnianym" (Art. 17 GDPR)</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Pellentesque tristique imperdiet tortor. Nam euismod tellus id erat. Nullam eu ante 
                  vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui 
                  fermentum leo, quis tempor ligula erat quis odio.
                </p>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-700 text-sm">
                    <strong>Uwaga:</strong> Usunięcie może nie być możliwe, jeśli przetwarzanie jest 
                    konieczne do wypełnienia obowiązku prawnego lub do dochodzenia roszczeń.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Prawo do ograniczenia przetwarzania (Art. 18 GDPR)</h3>
                <p className="text-gray-700 leading-relaxed">
                  Nunc eleifend leo vitae magna. In id erat non orci commodo lobortis. Proin neque massa, 
                  cursus ut, gravida ut, lobortis eget, lacus. Sed diam. Praesent fermentum tempor tellus.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Jak skorzystać z praw GDPR</h2>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Procedura składania wniosków</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">1</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Przygotuj wniosek</h4>
                  <p className="text-gray-600 text-sm">Opisz szczegółowo swoje żądanie i podaj dane kontaktowe</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">2</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Wyślij e-mail</h4>
                  <p className="text-gray-600 text-sm">Prześlij wniosek na adres: {siteConfig.contact.email}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">3</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Otrzymaj odpowiedź</h4>
                  <p className="text-gray-600 text-sm">Odpowiemy w ciągu 30 dni od otrzymania wniosku</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-700 text-sm">
                  <strong>Dane kontaktowe IOD (Inspektor Ochrony Danych):</strong><br />
                  E-mail: iod@{siteConfig.name.toLowerCase().replace(' ', '')}.pl<br />
                  Adres: ul. Przykładowa 123, 00-001 Warszawa
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prawo do wniesienia skargi</h2>
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-yellow-800 mb-2">
                    Urząd Ochrony Danych Osobowych
                  </h3>
                  <p className="text-yellow-700 mb-4">
                    Jeśli uważasz, że Twoje dane osobowe są przetwarzane niezgodnie z prawem, 
                    masz prawo wniesienia skargi do organu nadzorczego.
                  </p>
                  <div className="text-sm text-yellow-700">
                    <p><strong>UODO</strong></p>
                    <p>ul. Stawki 2, 00-193 Warszawa</p>
                    <p>Tel.: 22 531 03 00</p>
                    <p>E-mail: kancelaria@uodo.gov.pl</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Często zadawane pytania</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Czy korzystanie z praw GDPR jest płatne?</h3>
                <p className="text-gray-700">
                  Nie, korzystanie z praw GDPR jest bezpłatne. W wyjątkowych przypadkach, gdy wniosek 
                  jest wyraźnie bezzasadny lub nadmierny, możemy pobrać rozsądną opłatę.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Jak długo trwa rozpatrzenie wniosku?</h3>
                <p className="text-gray-700">
                  Standardowo odpowiadamy w ciągu 30 dni. W skomplikowanych przypadkach termin może 
                  zostać przedłużony o kolejne 60 dni.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Co jeśli nie jestem zadowolony z odpowiedzi?</h3>
                <p className="text-gray-700">
                  Możesz skontaktować się z naszym Inspektorem Ochrony Danych lub wnieść skargę do 
                  Urzędu Ochrony Danych Osobowych.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}