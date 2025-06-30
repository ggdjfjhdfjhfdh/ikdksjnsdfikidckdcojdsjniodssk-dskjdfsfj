import PrivacyPolicy from './privacy/page';
import Terms from './terms/page';
import CookiesPolicy from './cookies/page';

export default function LegalIndex() {
  return (
    <div>
      <PrivacyPolicy />
      <Terms />
      <CookiesPolicy />
    </div>
  );
}
