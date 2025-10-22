import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(140% 140% at 30% 20%, #7C3AED 0%, #0B1220 60%)',
          borderRadius: 12,
          boxShadow: 'inset 0 0 24px rgba(56,189,248,0.24)',
        }}
      >
        <span
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: '#E6EAF2',
            letterSpacing: '0.08em',
          }}
        >
          溯
        </span>
      </div>
    ),
    { width: size.width, height: size.height }
  );
}