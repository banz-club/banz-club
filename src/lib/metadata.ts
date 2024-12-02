import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://banz.club',
      images: 'https://banz.club/og.png',
      siteName: 'banz.club',
      ...override.openGraph
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@ogeperc',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: 'https://banz.club/og.png',
      ...override.twitter
    }
  };
}

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_URL!}`);

export const githubProfileUrl = 'https://github.com/kWAYTV';
export const githubRepoUrl = 'https://github.com/banz-club/banz-club';
