// Estimated monthly cost ranges from compounding pharmacies (as of early 2026)
// Brand pricing is listed separately where applicable
// These are estimates for educational purposes only — actual costs vary by source

export interface PeptideCost {
  slug: string
  name: string
  category: string
  compoundedLow: number   // $/month low end
  compoundedHigh: number  // $/month high end
  brandLow?: number       // $/month brand name low
  brandHigh?: number      // $/month brand name high
  brandName?: string
  typicalDose: string
  notes?: string
}

export const peptideCosts: PeptideCost[] = [
  // GLP-1 Weight Loss
  { slug: 'semaglutide', name: 'Semaglutide', category: 'GLP-1 Weight Loss', compoundedLow: 150, compoundedHigh: 500, brandLow: 935, brandHigh: 1350, brandName: 'Ozempic/Wegovy', typicalDose: '0.25-2.4mg/week', notes: 'Compounded availability varies by state' },
  { slug: 'tirzepatide', name: 'Tirzepatide', category: 'GLP-1 Weight Loss', compoundedLow: 200, compoundedHigh: 600, brandLow: 1023, brandHigh: 1060, brandName: 'Mounjaro/Zepbound', typicalDose: '2.5-15mg/week', notes: 'Compounded availability varies by state' },
  { slug: 'retatrutide', name: 'Retatrutide', category: 'GLP-1 Weight Loss', compoundedLow: 250, compoundedHigh: 700, typicalDose: '1-12mg/week', notes: 'Not yet FDA-approved; research compound pricing' },
  { slug: 'survodutide', name: 'Survodutide', category: 'GLP-1 Weight Loss', compoundedLow: 300, compoundedHigh: 800, typicalDose: '0.6-4.8mg/week', notes: 'Not yet FDA-approved; limited availability' },

  // Healing & Recovery
  { slug: 'bpc-157', name: 'BPC-157', category: 'Healing & Recovery', compoundedLow: 40, compoundedHigh: 100, typicalDose: '250-500mcg/day' },
  { slug: 'tb-500', name: 'TB-500', category: 'Healing & Recovery', compoundedLow: 50, compoundedHigh: 120, typicalDose: '2-5mg 2x/week' },
  { slug: 'ghk-cu', name: 'GHK-Cu', category: 'Healing & Recovery', compoundedLow: 40, compoundedHigh: 100, typicalDose: '1-2mg/day or topical', notes: 'Topical serums available for $30-60' },
  { slug: 'll-37', name: 'LL-37', category: 'Healing & Recovery', compoundedLow: 50, compoundedHigh: 150, typicalDose: '50-100mcg/day' },

  // GH Secretagogues
  { slug: 'ipamorelin', name: 'Ipamorelin', category: 'GH Secretagogue', compoundedLow: 50, compoundedHigh: 150, typicalDose: '200-300mcg 2-3x/day' },
  { slug: 'cjc-1295', name: 'CJC-1295', category: 'GH Secretagogue', compoundedLow: 50, compoundedHigh: 150, typicalDose: '100-200mcg 2-3x/day', notes: 'Often sold as combo with ipamorelin ($200-400/mo)' },
  { slug: 'sermorelin', name: 'Sermorelin', category: 'GH Secretagogue', compoundedLow: 100, compoundedHigh: 300, typicalDose: '200-500mcg/day' },
  { slug: 'tesamorelin', name: 'Tesamorelin', category: 'GH Secretagogue', compoundedLow: 200, compoundedHigh: 500, brandLow: 1000, brandHigh: 1500, brandName: 'Egrifta', typicalDose: '2mg/day' },

  // Anti-Aging
  { slug: 'epithalon', name: 'Epithalon', category: 'Anti-Aging', compoundedLow: 60, compoundedHigh: 150, typicalDose: '5-10mg/day (10-20 day cycle)', notes: 'Cost per cycle, not monthly' },
  { slug: 'mots-c', name: 'MOTS-c', category: 'Anti-Aging', compoundedLow: 80, compoundedHigh: 200, typicalDose: '10mg 3x/week' },
  { slug: 'thymosin-alpha-1', name: 'Thymosin Alpha-1', category: 'Immune/Anti-Aging', compoundedLow: 80, compoundedHigh: 200, typicalDose: '1.6mg 2-3x/week' },

  // Nootropic
  { slug: 'semax', name: 'Semax', category: 'Nootropic', compoundedLow: 30, compoundedHigh: 80, typicalDose: '200-600mcg 1-2x/day (nasal)', notes: 'Intranasal administration' },
  { slug: 'selank', name: 'Selank', category: 'Nootropic', compoundedLow: 30, compoundedHigh: 80, typicalDose: '250-500mcg 1-2x/day (nasal)', notes: 'Intranasal administration' },

  // Sleep
  { slug: 'dsip', name: 'DSIP', category: 'Sleep', compoundedLow: 30, compoundedHigh: 80, typicalDose: '100-200mcg before bed' },
]

export function getPeptideCost(slug: string): PeptideCost | undefined {
  return peptideCosts.find(p => p.slug === slug)
}
