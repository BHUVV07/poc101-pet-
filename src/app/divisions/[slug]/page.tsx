import { divisionsData } from '../../../data/divisions';
import DivisionPageClient from './DivisionPageClient';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const division = divisionsData.find(d => d.slug === slug);
  if (!division) return {};
  return {
    title: `${division.name} | Manasa Vet Pharma`,
    description: division.overview,
    openGraph: {
      title: `${division.name} | Manasa Vet Pharma`,
      description: division.overview,
      images: [division.heroImage],
    }
  };
}

export default async function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  return <DivisionPageClient params={params} />;
}
