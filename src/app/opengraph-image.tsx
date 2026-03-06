import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Peptide Nerds — Evidence-Based Peptide Guide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #0A0A0A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            display: 'flex',
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, transparent, #22D3EE, #06B6D4, #22D3EE, transparent)',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          {/* Logo text */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-2px',
              display: 'flex',
            }}
          >
            Peptide Nerds
          </div>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 3,
              background: '#22D3EE',
              borderRadius: 2,
              display: 'flex',
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              color: '#94A3B8',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Evidence-Based Peptide Guide
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: 48,
              marginTop: 24,
            }}
          >
            {[
              { num: '44+', label: 'Compounds' },
              { num: '200+', label: 'Citations' },
              { num: 'Free', label: 'Tools' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <div style={{ fontSize: 36, fontWeight: 700, color: '#22D3EE', display: 'flex' }}>
                  {stat.num}
                </div>
                <div style={{ fontSize: 16, color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            fontSize: 18,
            color: '#475569',
            letterSpacing: '1px',
            display: 'flex',
          }}
        >
          peptidenerds.com
        </div>
      </div>
    ),
    { ...size }
  )
}
