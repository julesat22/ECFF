import type { SponsorTier } from '@/lib/types'

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    n: '01',
    name: 'Supporting Sponsor',
    contribution: '10,000',
    fit: ['Local Businesses', 'Mission-Aligned Brands'],
    visibility: [
      'Logo placement on website, all sponsorship materials, and prior to each screening',
      'Invitation to exclusive sponsor & filmmaker events',
    ],
  },
  {
    n: '02',
    name: 'Presenting Sponsor',
    contribution: '25,000',
    fit: ['Larger Brands', 'Regional Institutions'],
    visibility: [
      'Prominent placement on all festival materials',
      'Stronger screen acknowledgment',
      'Customized hospitality package',
    ],
  },
  {
    n: '03',
    name: 'Title Sponsor',
    contribution: '75,000',
    fit: ['Corporations'],
    visibility: ['Highest visibility placement', 'Premium hospitality'],
    feat: true,
  },
]

export const SPONSOR_CONTACT_EMAIL = 'partnerships@eaglecapfilmfest.com'
