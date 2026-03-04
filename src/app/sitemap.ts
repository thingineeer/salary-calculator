import type { MetadataRoute } from 'next';
import { SALARY_AMOUNTS } from '@/lib/salary-seo-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const salaryPages = SALARY_AMOUNTS.map((amount) => ({
    url: `https://salary-calc.kr/salary/${amount}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://salary-calc.kr',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://salary-calc.kr/salary',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...salaryPages,
    {
      url: 'https://salary-calc.kr/dollar',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://salary-calc.kr/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://salary-calc.kr/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://salary-calc.kr/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
