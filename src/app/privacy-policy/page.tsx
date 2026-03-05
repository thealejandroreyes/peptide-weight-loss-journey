import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for Peptide Nerds. How we collect, use, and protect your information.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy-policy' },
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Privacy Policy', href: '/privacy-policy' }]} />

        <h1 className="text-3xl font-light text-foreground">Privacy Policy</h1>

        <div className="prose-custom mt-8">
          <p>
            <strong>Last updated:</strong> March 2026
          </p>

          <p>
            Peptide Nerds (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates peptidenerds.com (the &quot;Site&quot;).
            This Privacy Policy explains how we collect, use, and protect your information when you visit the Site.
          </p>

          <h2>Information we collect</h2>

          <h3>Information you provide</h3>
          <ul>
            <li><strong>Contact form:</strong> When you submit a message through our contact form, we collect your name, email address, and message content.</li>
            <li><strong>Newsletter:</strong> When you subscribe to our newsletter, we collect your email address.</li>
          </ul>

          <h3>Information collected automatically</h3>
          <ul>
            <li><strong>Analytics data:</strong> We use Vercel Analytics to understand how visitors use the Site. This includes page views, referral sources, device type, and general geographic location. This data is aggregated and does not personally identify you.</li>
            <li><strong>Cookies:</strong> The Site uses essential cookies for functionality (such as remembering your disclaimer acknowledgment). We do not use tracking cookies for advertising.</li>
          </ul>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to your contact form submissions</li>
            <li>To send newsletter updates if you have subscribed</li>
            <li>To understand how visitors use the Site and improve our content</li>
            <li>To maintain the security and functionality of the Site</li>
          </ul>

          <h2>Third-party services</h2>
          <p>We use the following third-party services that may process your data:</p>
          <ul>
            <li><strong>Vercel:</strong> Site hosting and analytics</li>
            <li><strong>Beehiiv:</strong> Newsletter delivery</li>
            <li><strong>Formspree:</strong> Contact form processing</li>
          </ul>
          <p>
            Each of these services has their own privacy policies. We encourage you to review them.
          </p>

          <h2>Affiliate links</h2>
          <p>
            Some pages on the Site contain affiliate links. When you click an affiliate link and make a purchase,
            we may earn a commission. Affiliate partners may use cookies to track referrals. See our{' '}
            <Link href="/affiliate-disclosure" className="text-accent hover:text-accent-hover">
              affiliate disclosure
            </Link>{' '}
            for details.
          </p>

          <h2>Data retention</h2>
          <p>
            Contact form submissions are retained for as long as needed to respond to your inquiry.
            Newsletter subscriptions are active until you unsubscribe.
            Analytics data is aggregated and retained indefinitely.
          </p>

          <h2>Your rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Unsubscribe from our newsletter at any time using the link in any email</li>
            <li>Request deletion of any personal data we hold about you</li>
            <li>Request a copy of your personal data</li>
          </ul>
          <p>
            To exercise these rights, contact us through our{' '}
            <Link href="/contact" className="text-accent hover:text-accent-hover">
              contact form
            </Link>
            .
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            The Site is not directed at children under 18. We do not knowingly collect personal
            information from children. If you believe a child has provided us with personal information,
            please contact us and we will delete it.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated revision date.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this Privacy Policy? Use our{' '}
            <Link href="/contact" className="text-accent hover:text-accent-hover">
              contact form
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  )
}
