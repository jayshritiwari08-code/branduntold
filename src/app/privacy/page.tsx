import Link from 'next/link';
import { Metadata } from 'next';
import { fetchStaticMeta } from '@/app/lib/api';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchStaticMeta('privacy');
  if (!meta) {
    return {
      title: 'Privacy Policy - Brand Untold',
      description: 'Privacy Policy for Brand Untold.',
    };
  }
  return {
    title: meta.metatitle,
    description: meta.meta_description,
    keywords: meta.meta_keyword,
  };
}

export default async function PrivacyPolicy() {
  const pageMeta = await fetchStaticMeta('privacy');

  return (
    <>
      {pageMeta?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: pageMeta.schema }}
        />
      )}
      <div className="min-h-screen bg-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-grey text-lg">
            Last updated: May 28, 2026
          </p>
        </div>

        <div className="prose prose-lg prose-invert max-w-none prose-headings:font-serif prose-headings:text-gold prose-p:text-grey">
          <div className="space-y-8">
            <section>
              <h2 className="font-serif text-3xl text-gold mb-4">1. Information We Collect</h2>
              <p className="text-grey">
                We collect information you provide directly to us when you visit our website, subscribe to our newsletter, 
                or contact us. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-grey mt-4">
                <li>Name and email address</li>
                <li>Phone number</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-3xl text-gold mb-4">2. Automatic Data Collection</h2>
              <p className="text-grey">
                When you visit our website, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-grey mt-4">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Pages viewed and time spent on site</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-3xl text-gold mb-4">3. How We Use Your Information</h2>
              <p className="text-grey">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-grey mt-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Send you newsletters and marketing communications</li>
                <li>Respond to your comments and questions</li>
                <li>Develop new products and services</li>
                <li>Protect the rights and safety of our company and our customers</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-3xl text-gold mb-4">4. Cookies</h2>
              <p className="text-grey">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
                Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl text-gold mb-4">5. Third-Party Services</h2>
              <p className="text-grey">
                We may use third-party services that collect information used to identify you. These services include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-grey mt-4">
                <li>Google Analytics</li>
                <li>Facebook Pixel</li>
                <li>Other marketing analytics tools</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-3xl text-gold mb-4">6. Data Security</h2>
              <p className="text-grey">
                We take the security of your personal information seriously and implement a variety of security measures 
                to maintain the safety of your personal information when you enter, submit, or access your personal information.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl text-gold mb-4">7. Your Rights</h2>
              <p className="text-grey">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-grey mt-4">
                <li>Access your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-3xl text-gold mb-4">8. Changes to This Policy</h2>
              <p className="text-grey">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new 
                privacy policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl text-gold mb-4">9. Contact Us</h2>
              <p className="text-grey">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-grey mt-2">
                Email: privacy@branduntold.com<br/>
                Phone: +1 (555) 123-4567
              </p>
            </section>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/" className="text-gold hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
