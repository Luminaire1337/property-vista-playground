import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: 'Regulamin Serwisu',
  description: 'Regulamin korzystania z platformy PropertyVista - zasady i warunki użytkowania.',
};

export default function RegulaminPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Regulamin Serwisu</h1>
          
          <p className="text-gray-600 mb-8">
            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">§1. Postanowienia ogólne</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis 
                in faucibus orci luctus et ultrices posuere cubilia curae; Sed viverra, nulla vel 
                consequat cursus, magna libero tempor nisi, vel tincidunt ipsum tellus eu ipsum.
              </li>
              <li>
                Praesent congue erat at massa. Sed cursus turpis a purus. Aliquam erat volutpat. 
                Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin 
                lorem quis bibendum dolor.
              </li>
              <li>
                Nam vestibulum accumsan nisl. Pellentesque habitant morbi tristique senectus et netus 
                et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies 
                eget, tempor sit amet, ante.
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">§2. Definicje</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              W niniejszym Regulaminie następujące pojęcia oznaczają:
            </p>
            <dl className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="font-semibold text-gray-900">Serwis</dt>
                <dd className="text-gray-700 mt-1">
                  Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. 
                  Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
                </dd>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="font-semibold text-gray-900">Użytkownik</dt>
                <dd className="text-gray-700 mt-1">
                  Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. 
                  Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci.
                </dd>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="font-semibold text-gray-900">Treść</dt>
                <dd className="text-gray-700 mt-1">
                  Sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere 
                  consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
                </dd>
              </div>
            </dl>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">§3. Warunki korzystania</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Uwaga:</strong> Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, 
                    imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris.
                  </p>
                </div>
              </div>
            </div>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent 
                adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus.
              </li>
              <li>
                Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis 
                vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede.
              </li>
              <li>
                Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque 
                facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque.
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">§4. Rejestracja i konto użytkownika</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate 
              sem tristique cursus. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Wymagania rejestracji</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                  <li>Pełnoletność użytkownika</li>
                  <li>Podanie prawdziwych danych</li>
                  <li>Akceptacja regulaminu</li>
                  <li>Weryfikacja adresu e-mail</li>
                </ul>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Bezpieczeństwo konta</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                  <li>Bezpieczne hasło</li>
                  <li>Ochrona danych logowania</li>
                  <li>Regularna zmiana hasła</li>
                  <li>Natychmiastowe zgłaszanie naruszeń</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">§5. Zakazy i ograniczenia</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Użytkownikowi zabrania się następujących działań:
            </p>
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
              <ul className="list-disc pl-6 space-y-2 text-red-700">
                <li>Naruszania praw autorskich i własności intelektualnej</li>
                <li>Publikowania treści obraźliwych, wulgarnych lub nielegalnych</li>
                <li>Podszywania się pod inne osoby lub instytucje</li>
                <li>Próby włamania lub naruszenia bezpieczeństwa systemu</li>
                <li>Rozsyłania spam-u lub niechcianej korespondencji</li>
                <li>Używania automatycznych skryptów bez zgody</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">§6. Odpowiedzialność</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Phasellus purus. Pellentesque tristique imperdiet tortor. Nam euismod tellus id erat. 
              Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, 
              est dui fermentum leo, quis tempor ligula erat quis odio.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left">Rodzaj odpowiedzialności</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Zakres</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Ograniczenia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Za treści użytkowników</td>
                    <td className="border border-gray-300 px-4 py-2">Ograniczona</td>
                    <td className="border border-gray-300 px-4 py-2">Moderacja post factum</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Za działanie serwisu</td>
                    <td className="border border-gray-300 px-4 py-2">Najlepsze starania</td>
                    <td className="border border-gray-300 px-4 py-2">Siła wyższa</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Za straty finansowe</td>
                    <td className="border border-gray-300 px-4 py-2">Wyłączona</td>
                    <td className="border border-gray-300 px-4 py-2">Szkody bezpośrednie</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">§7. Procedury reklamacyjne</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nunc eleifend leo vitae magna. In id erat non orci commodo lobortis. Proin neque massa, 
              cursus ut, gravida ut, lobortis eget, lacus. Sed diam.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-800 mb-3">Proces składania reklamacji:</h3>
              <ol className="list-decimal pl-6 space-y-2 text-blue-700">
                <li>Przygotowanie szczegółowego opisu problemu</li>
                <li>Przesłanie reklamacji na adres: {siteConfig.contact.email}</li>
                <li>Otrzymanie potwierdzenia odbioru (48h)</li>
                <li>Rozpatrzenie reklamacji (14 dni roboczych)</li>
                <li>Otrzymanie odpowiedzi z rozstrzygnięciem</li>
              </ol>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">§8. Postanowienia końcowe</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies 
              sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, 
              euismod non, mi.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Prawo właściwe:</strong> Niniejszy regulamin podlega prawu polskiemu. 
                Wszelkie spory będą rozstrzygane przez sądy właściwe dla siedziby {siteConfig.name}.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Zmiany regulaminu:</strong> Administrator zastrzega sobie prawo do wprowadzania 
                zmian w regulaminie. O zmianach użytkownicy będą informowani z 14-dniowym wyprzedzeniem.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}