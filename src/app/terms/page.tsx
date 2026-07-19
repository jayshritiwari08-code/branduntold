import Link from 'next/link';
import { Metadata } from 'next';
import { fetchStaticMeta } from '@/app/lib/api';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchStaticMeta('terms');
  if (!meta) {
    return {
      title: 'Terms of Service - Brand Untold',
      description: 'Terms of Service for Brand Untold.',
    };
  }
  return {
    title: meta.metatitle,
    description: meta.meta_description,
    keywords: meta.meta_keyword,
  };
}

export default async function TermsOfService() {
  const pageMeta = await fetchStaticMeta('terms');

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
              Terms of Service
            </h1>
            <p className="text-grey text-lg">
              Last updated: May 28, 2026
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none prose-headings:font-serif prose-headings:text-gold prose-p:text-grey">
            <div className="space-y-8">
              <section>
                <h2 className="font-serif text-3xl text-gold mb-4">1. Acceptance of Terms</h2>
                <p className="text-grey">
                  By accessing and using Brand Untold ("the Website"), you agree to be bound by these Terms of Service and
                  all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
                  using or accessing this site.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl text-gold mb-4">2. Use License</h2>
                <p className="text-grey">
                  Permission is granted to temporarily view the materials (information or software) on Brand Untold's website
                  for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title,
                  and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-grey mt-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or public display</li>
                  <li>Attempt to decompile or reverse engineer any software on the site</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-3xl text-gold mb-4">3. Disclaimer</h2>
                <p className="text-grey">
                  The materials on Brand Untold's website are provided on an "as is" basis. Brand Untold makes no warranties,
                  expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
                  implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
                  of intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl text-gold mb-4">4. Price Accuracy</h2>
                <p className="text-grey">
                  We make every effort to ensure that the prices displayed on Brand Untold are accurate and up-to-date.
                  However, prices can change frequently and we cannot guarantee the accuracy of prices at any given time.
                  The final price for any service or product will be determined by the service provider.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl text-gold mb-4">5. Revisions and Errata</h2>
                <p className="text-grey">
                  The materials appearing on Brand Untold's website could include technical, typographical, or photographic errors.
                  Brand Untold does not warrant that any of the materials on its website are accurate, complete, or current.
                  Brand Untold may make changes to the materials contained on its website at any time without notice.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl text-gold mb-4">6. Links</h2>
                <p className="text-grey">
                  Brand Untold has not reviewed all of the sites linked to its website and is not responsible for the contents
                  of any such linked site. The inclusion of any link does not imply endorsement by Brand Untold of the site.
                  Use of any such linked website is at the user's own risk.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl text-gold mb-4">7. Modifications</h2>
                <p className="text-grey">
                  Brand Untold may revise these terms of service for its website at any time without notice. By using this
                  website you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl text-gold mb-4">8. Governing Law</h2>
                <p className="text-grey">
                  These terms and conditions are governed by and construed in accordance with the laws of the United States
                  and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl text-gold mb-4">9. Contact Us</h2>
                <p className="text-grey">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-grey mt-2">
                  Email: legal@branduntold.com<br />
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
