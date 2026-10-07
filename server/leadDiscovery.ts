import { Lead, LeadSearchParams } from '../src/types/index.ts';

export interface DiscoveryLeadCandidate {
  companyName: string;
  industry: string;
  country: string;
  city: string;
  address: string;
  website: string;
  email: string;
  phone: string;
  googleRating: number;
  reviewCount: number;
  websiteScore: number;
  digitalPresenceScore: number;
  leadScore: number;
  opportunityLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  hasWhatsapp: boolean;
  hasEmail: boolean;
  hasSocial: boolean;
  notes: string;
  tags: string[];
  estimatedValue: number;
  websiteQuality: 'weak' | 'average' | 'good';
  isDemo: boolean;
  source: string;
}

// Demo lead pool clearly labeled as DEMO DATA
const DISCOVERY_POOL: DiscoveryLeadCandidate[] = [
  {
    companyName: 'Manchester Premier Roofing Ltd',
    industry: 'Roofing',
    country: 'United Kingdom',
    city: 'Manchester',
    address: '14 Oxford Road, Manchester M1 5AN',
    website: 'https://mcr-premier-roofing-demo.co.uk',
    email: 'quotes@mcr-premier-roofing-demo.co.uk',
    phone: '+44 161 275 8890',
    googleRating: 4.8,
    reviewCount: 86,
    websiteScore: 48,
    digitalPresenceScore: 54,
    leadScore: 94,
    opportunityLevel: 'HIGH',
    hasWhatsapp: true,
    hasEmail: true,
    hasSocial: false,
    websiteQuality: 'weak',
    notes: 'Outstanding reviews (4.8★). Mobile site takes 5.8s to load, lacks instant quote calculator and emergency storm damage CTA.',
    tags: ['High Rating', 'Slow Mobile', 'High Opportunity'],
    estimatedValue: 3500,
    isDemo: true,
    source: 'DEMO DATA (Simulated Google Places API)',
  },
  {
    companyName: 'Salford Elite Roof & Chimney Care',
    industry: 'Roofing',
    country: 'United Kingdom',
    city: 'Manchester',
    address: '88 Chapel Street, Salford M3 5BZ',
    website: 'https://salford-roofs-demo.co.uk',
    email: 'info@salford-roofs-demo.co.uk',
    phone: '+44 161 834 1120',
    googleRating: 4.6,
    reviewCount: 52,
    websiteScore: 52,
    digitalPresenceScore: 59,
    leadScore: 89,
    opportunityLevel: 'HIGH',
    hasWhatsapp: true,
    hasEmail: true,
    hasSocial: true,
    websiteQuality: 'weak',
    notes: 'Strong local presence in Greater Manchester. Website is non-responsive on iOS Safari, missing WhatsApp click-to-chat.',
    tags: ['Local Rep', 'Outdated Theme', 'Roofing'],
    estimatedValue: 2800,
    isDemo: true,
    source: 'DEMO DATA (Simulated Google Places API)',
  },
  {
    companyName: 'Northern Slate & Tile Specialists',
    industry: 'Roofing',
    country: 'United Kingdom',
    city: 'Manchester',
    address: '320 Cheetham Hill Rd, Manchester M8 0SN',
    website: 'https://northernslate-demo.co.uk',
    email: 'contracts@northernslate-demo.co.uk',
    phone: '+44 161 740 4455',
    googleRating: 4.9,
    reviewCount: 110,
    websiteScore: 72,
    digitalPresenceScore: 78,
    leadScore: 75,
    opportunityLevel: 'MEDIUM',
    hasWhatsapp: false,
    hasEmail: true,
    hasSocial: true,
    websiteQuality: 'good',
    notes: 'Great site overall, but missing automated booking workflow and Google Ads conversion tracking.',
    tags: ['Established', 'PPC Opportunity'],
    estimatedValue: 2200,
    isDemo: true,
    source: 'DEMO DATA (Simulated Google Places API)',
  },
  {
    companyName: 'Harley Smiles Private Dental',
    industry: 'Dental Clinics',
    country: 'United Kingdom',
    city: 'London',
    address: '35 Harley St, Marylebone, London W1G 8QR',
    website: 'https://harleysmiles-demo.co.uk',
    email: 'appointments@harleysmiles-demo.co.uk',
    phone: '+44 20 7935 9911',
    googleRating: 4.9,
    reviewCount: 210,
    websiteScore: 46,
    digitalPresenceScore: 55,
    leadScore: 96,
    opportunityLevel: 'HIGH',
    hasWhatsapp: true,
    hasEmail: true,
    hasSocial: true,
    websiteQuality: 'weak',
    notes: 'Premium high-value Invisalign & implant clinic. Booking link leads to an unresponsive contact form; lost mobile conversions.',
    tags: ['Ultra High Ticket', 'Invisalign Funnel', 'VIP Lead'],
    estimatedValue: 6500,
    isDemo: true,
    source: 'DEMO DATA (Simulated Google Places API)',
  },
  {
    companyName: 'Canary Wharf Cosmetic Dentistry',
    industry: 'Dental Clinics',
    country: 'United Kingdom',
    city: 'London',
    address: '1 Canada Square, London E14 5AA',
    website: 'https://canarywharfdental-demo.co.uk',
    email: 'team@canarywharfdental-demo.co.uk',
    phone: '+44 20 7512 8000',
    googleRating: 4.7,
    reviewCount: 94,
    websiteScore: 68,
    digitalPresenceScore: 70,
    leadScore: 82,
    opportunityLevel: 'HIGH',
    hasWhatsapp: true,
    hasEmail: true,
    hasSocial: true,
    websiteQuality: 'average',
    notes: 'Corporate executive clientele. Looking to automate evening patient inquiries with AI WhatsApp concierge.',
    tags: ['Corporate Dental', 'WhatsApp AI'],
    estimatedValue: 4800,
    isDemo: true,
    source: 'DEMO DATA (Simulated Google Places API)',
  },
  {
    companyName: 'Midlands Structural Engineering & Build',
    industry: 'Construction',
    country: 'United Kingdom',
    city: 'Birmingham',
    address: '55 Broad Street, Birmingham B1 2HJ',
    website: 'https://midlandsstructural-demo.co.uk',
    email: 'tenders@midlandsstructural-demo.co.uk',
    phone: '+44 121 643 7700',
    googleRating: 4.5,
    reviewCount: 38,
    websiteScore: 41,
    digitalPresenceScore: 45,
    leadScore: 88,
    opportunityLevel: 'HIGH',
    hasWhatsapp: false,
    hasEmail: true,
    hasSocial: false,
    websiteQuality: 'weak',
    notes: 'Heavy commercial contractor. Website built in 2017 with no mobile optimization, missing modern project portfolios.',
    tags: ['Commercial', 'Rebuild Project', 'High Budget'],
    estimatedValue: 7000,
    isDemo: true,
    source: 'DEMO DATA (Simulated Google Places API)',
  },
  {
    companyName: 'Mayfair & Belgravia Prime Estates',
    industry: 'Real Estate',
    country: 'United Kingdom',
    city: 'London',
    address: '12 Berkeley Square, Mayfair, London W1J 6BD',
    website: 'https://mayfairbelgravia-demo.co.uk',
    email: 'privateoffice@mayfairbelgravia-demo.co.uk',
    phone: '+44 20 7493 0088',
    googleRating: 4.8,
    reviewCount: 65,
    websiteScore: 59,
    digitalPresenceScore: 66,
    leadScore: 93,
    opportunityLevel: 'HIGH',
    hasWhatsapp: true,
    hasEmail: true,
    hasSocial: true,
    websiteQuality: 'average',
    notes: 'Luxury property brokers. Lacking interactive virtual tour embeds and 24/7 lead qualification for international investors.',
    tags: ['Ultra Luxury', 'Investor Concierge', 'High Retainer'],
    estimatedValue: 8500,
    isDemo: true,
    source: 'DEMO DATA (Simulated Google Places API)',
  },
  {
    companyName: 'Caledonian Heat & Gas Engineering',
    industry: 'Plumbing',
    country: 'United Kingdom',
    city: 'Edinburgh',
    address: '45 Princes Street, Edinburgh EH2 2BY',
    website: 'https://caledonianheat-demo.co.uk',
    email: 'service@caledonianheat-demo.co.uk',
    phone: '+44 131 225 9940',
    googleRating: 4.8,
    reviewCount: 77,
    websiteScore: 49,
    digitalPresenceScore: 53,
    leadScore: 87,
    opportunityLevel: 'HIGH',
    hasWhatsapp: true,
    hasEmail: true,
    hasSocial: false,
    websiteQuality: 'weak',
    notes: '24/7 emergency boiler breakdown service. Mobile visitors face broken click-to-call link.',
    tags: ['Emergency Services', 'Call To Action Fix'],
    estimatedValue: 2900,
    isDemo: true,
    source: 'DEMO DATA (Simulated Google Places API)',
  },
  {
    companyName: 'Austin Clean Solar Solutions',
    industry: 'Construction',
    country: 'United States',
    city: 'Austin',
    address: '800 Congress Ave, Austin, TX 78701',
    website: 'https://austincleansolar-demo.com',
    email: 'sales@austincleansolar-demo.com',
    phone: '+1 512 478 9200',
    googleRating: 4.9,
    reviewCount: 142,
    websiteScore: 56,
    digitalPresenceScore: 62,
    leadScore: 91,
    opportunityLevel: 'HIGH',
    hasWhatsapp: false,
    hasEmail: true,
    hasSocial: true,
    websiteQuality: 'weak',
    notes: 'Rapidly growing solar installer. Needs automated solar savings calculator landing page and SMS/WhatsApp follow-up.',
    tags: ['US Solar', 'High Ticket', 'Lead Magnet'],
    estimatedValue: 5500,
    isDemo: true,
    source: 'DEMO DATA (Simulated Google Places API)',
  },
  {
    companyName: 'SoHo Design & Architecture Studio',
    industry: 'Digital agency',
    country: 'United States',
    city: 'New York',
    address: '450 Broadway, New York, NY 10013',
    website: 'https://sohodesignstudio-demo.com',
    email: 'hello@sohodesignstudio-demo.com',
    phone: '+1 212 925 3300',
    googleRating: 4.7,
    reviewCount: 58,
    websiteScore: 78,
    digitalPresenceScore: 82,
    leadScore: 74,
    opportunityLevel: 'MEDIUM',
    hasWhatsapp: false,
    hasEmail: true,
    hasSocial: true,
    websiteQuality: 'good',
    notes: 'Boutique interior & architectural studio. Potential for SEO expansion and client portal development.',
    tags: ['NYC Studio', 'Client Portal Candidate'],
    estimatedValue: 4000,
    isDemo: true,
    source: 'DEMO DATA (Simulated Google Places API)',
  }
];

export class LeadDiscoveryService {
  /**
   * Search for leads using the configured discovery provider.
   * If third-party API credentials (Google Places, Outscraper, Apollo, Hunter) are absent,
   * cleanly serves labeled DEMO DATA matching filters.
   */
  static searchLeads(params: LeadSearchParams): DiscoveryLeadCandidate[] {
    let results = [...DISCOVERY_POOL];

    if (params.country && params.country.trim() !== '') {
      const c = params.country.toLowerCase().trim();
      results = results.filter(item => item.country.toLowerCase().includes(c));
    }

    if (params.city && params.city.trim() !== '') {
      const city = params.city.toLowerCase().trim();
      results = results.filter(item => item.city.toLowerCase().includes(city));
    }

    if (params.industry && params.industry !== 'all' && params.industry.trim() !== '') {
      const ind = params.industry.toLowerCase().trim();
      results = results.filter(item => item.industry.toLowerCase().includes(ind));
    }

    if (params.minRating && params.minRating > 0) {
      results = results.filter(item => item.googleRating >= params.minRating!);
    }

    if (params.websiteQuality && params.websiteQuality !== 'all') {
      results = results.filter(item => item.websiteQuality === params.websiteQuality);
    }

    if (params.hasWhatsapp !== undefined && params.hasWhatsapp === true) {
      results = results.filter(item => item.hasWhatsapp);
    }

    if (params.hasEmail !== undefined && params.hasEmail === true) {
      results = results.filter(item => item.hasEmail);
    }

    if (params.hasSocial !== undefined && params.hasSocial === true) {
      results = results.filter(item => item.hasSocial);
    }

    if (params.minLeadScore && params.minLeadScore > 0) {
      results = results.filter(item => item.leadScore >= params.minLeadScore!);
    }

    if (params.query && params.query.trim() !== '') {
      const q = params.query.toLowerCase().trim();
      results = results.filter(item => 
        item.companyName.toLowerCase().includes(q) ||
        item.industry.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.notes.toLowerCase().includes(q)
      );
    }

    // Always sort highest lead score first
    return results.sort((a, b) => b.leadScore - a.leadScore);
  }
}
