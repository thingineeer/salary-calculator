import type { MetadataRoute } from 'next';
import { SALARY_AMOUNTS } from '@/lib/salary-seo-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const salaryPages = SALARY_AMOUNTS.map((amount) => ({
    url: `https://www.salary-calc.kr/salary/${amount}`,
    lastModified: new Date('2026-03-18'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://www.salary-calc.kr',
      lastModified: new Date('2026-03-18'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.salary-calc.kr/salary',
      lastModified: new Date('2026-03-18'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...salaryPages,
    {
      url: 'https://www.salary-calc.kr/dollar',
      lastModified: new Date('2026-03-18'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.salary-calc.kr/hourly',
      lastModified: new Date('2026-03-20'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.salary-calc.kr/minimum-wage',
      lastModified: new Date('2026-03-20'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://www.salary-calc.kr/guide',
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.salary-calc.kr/guide/income-tax',
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://www.salary-calc.kr/guide/social-insurance',
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://www.salary-calc.kr/guide/tax-saving',
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://www.salary-calc.kr/guide/salary-negotiation',
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://www.salary-calc.kr/guide/retirement',
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://www.salary-calc.kr/about',
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.salary-calc.kr/privacy',
      lastModified: new Date('2026-03-18'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://www.salary-calc.kr/terms',
      lastModified: new Date('2026-03-18'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
