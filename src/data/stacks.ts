import type { Stack } from '@/lib/types'

export const stacks: Stack[] = [
  {
    name: 'GLP-1 Weight Loss Stack',
    slug: 'glp1-weight-loss-stack',
    description: 'The foundational weight loss protocol using GLP-1 receptor agonists with muscle preservation support. The most evidence-backed approach to significant weight loss.',
    metaDescription: 'GLP-1 weight loss peptide stack: semaglutide or tirzepatide with BPC-157 gut support. Dosing, timing, and muscle preservation protocol.',
    peptides: [
      { peptide: 'semaglutide', dose: '0.25-2.4mg', frequency: 'Once weekly', timing: 'Same day each week, any time', role: 'Primary appetite suppression and metabolic improvement' },
      { peptide: 'bpc-157', dose: '250-500mcg', frequency: 'Once daily', timing: 'Morning, empty stomach', role: 'Gut lining support to mitigate GI side effects' },
    ],
    goals: ['weight-loss', 'fat-loss', 'gut-health'],
    difficulty: 'beginner',
    estimatedMonthlyCost: '$200-600 (compounded) or $1,000+ (brand)',
    duration: '6-12+ months',
    notes: 'Start semaglutide at 0.25mg and titrate up every 4 weeks. BPC-157 is optional but helps with the nausea and GI issues common during dose escalation. Protein intake should be 1g per pound of body weight minimum to preserve lean mass. Resistance train 3-4x per week.',
  },
  {
    name: 'Dual Agonist Fat Loss Stack',
    slug: 'dual-agonist-fat-loss-stack',
    description: 'Tirzepatide-based protocol leveraging dual GLP-1/GIP receptor activation for maximum weight loss with metabolic support.',
    metaDescription: 'Tirzepatide dual agonist weight loss stack with MOTS-c metabolic support. Protocol, dosing, and expected results.',
    peptides: [
      { peptide: 'tirzepatide', dose: '2.5-15mg', frequency: 'Once weekly', timing: 'Same day each week', role: 'Primary dual-agonist appetite suppression and metabolic improvement' },
      { peptide: 'mots-c', dose: '10mg', frequency: '3x per week', timing: 'Morning before exercise', role: 'Mitochondrial function and exercise mimetic support' },
    ],
    goals: ['weight-loss', 'fat-loss'],
    difficulty: 'intermediate',
    estimatedMonthlyCost: '$300-800',
    duration: '6-12 months',
    notes: 'Tirzepatide titration: start 2.5mg for 4 weeks, then 5mg, then 7.5mg, etc. MOTS-c amplifies metabolic benefits and acts as an exercise mimetic. This stack is for people who want maximum fat loss with metabolic optimization. Maintain high protein diet and resistance training.',
  },
  {
    name: 'Healing & Recovery Stack',
    slug: 'healing-recovery-stack',
    description: 'The go-to protocol for injury recovery, combining the two most popular healing peptides through complementary mechanisms.',
    metaDescription: 'BPC-157 + TB-500 healing stack for injury recovery. Complete dosing protocol, timing, cycle length, and what to expect.',
    peptides: [
      { peptide: 'bpc-157', dose: '250-500mcg', frequency: 'Twice daily', timing: 'Morning and evening', role: 'Localized tissue repair, angiogenesis, gut protection' },
      { peptide: 'tb-500', dose: '2-5mg', frequency: '2x per week (loading) then 1x per week', timing: 'Any time', role: 'Systemic tissue repair, cell migration, inflammation reduction' },
    ],
    goals: ['injury-recovery', 'joint-health'],
    difficulty: 'beginner',
    estimatedMonthlyCost: '$80-180',
    duration: '4-8 weeks',
    notes: 'TB-500 loading phase: 2x per week for first 2-3 weeks, then reduce to weekly maintenance. BPC-157 can be injected near the injury site (SubQ) or taken orally for gut issues. This is the most commonly recommended healing peptide stack in the community. Rest and proper rehabilitation should accompany peptide use.',
  },
  {
    name: 'GH Optimization Stack',
    slug: 'gh-optimization-stack',
    description: 'Growth hormone secretagogue stack combining GHRP and GHRH for synergistic GH release without exogenous HGH.',
    metaDescription: 'Ipamorelin + CJC-1295 growth hormone stack: the most popular GH peptide protocol. Dosing, timing, and what to expect.',
    peptides: [
      { peptide: 'ipamorelin', dose: '200-300mcg', frequency: '2-3x daily', timing: 'Morning, post-workout, and before bed', role: 'GHRP — stimulates clean GH pulse via ghrelin receptor' },
      { peptide: 'cjc-1295', dose: '100-200mcg (no DAC) or 2mg (with DAC)', frequency: '2-3x daily (no DAC) or 2x/week (with DAC)', timing: 'Same timing as ipamorelin', role: 'GHRH analog — amplifies and extends GH release' },
    ],
    goals: ['muscle-growth', 'fat-loss', 'sleep-quality', 'anti-aging'],
    difficulty: 'intermediate',
    estimatedMonthlyCost: '$100-250',
    duration: '3-6 months',
    notes: 'Take on empty stomach (no food 2 hours before, 30 min after). The pre-bed dose is most important — aligns with natural GH pulse during deep sleep. CJC-1295 with DAC is more convenient (less frequent dosing) but some prefer without DAC for more natural pulsing. Avoid taking with carbs or fats as they blunt GH release.',
  },
  {
    name: 'Anti-Aging Longevity Stack',
    slug: 'anti-aging-longevity-stack',
    description: 'Multi-pathway anti-aging protocol targeting telomeres, mitochondrial function, skin health, and immune modulation.',
    metaDescription: 'Anti-aging peptide stack: epithalon, GHK-Cu, MOTS-c, and thymosin alpha-1 for longevity and healthspan optimization.',
    peptides: [
      { peptide: 'epithalon', dose: '5-10mg', frequency: 'Once daily for 10-20 days', timing: 'Morning or evening', role: 'Telomerase activation for telomere extension' },
      { peptide: 'ghk-cu', dose: '1-2mg SubQ or topical', frequency: 'Once daily', timing: 'Morning', role: 'Gene modulation, collagen synthesis, skin rejuvenation' },
      { peptide: 'mots-c', dose: '10mg', frequency: '3x per week', timing: 'Morning', role: 'Mitochondrial function and metabolic optimization' },
      { peptide: 'thymosin-alpha-1', dose: '1.6mg', frequency: '2x per week', timing: 'Any time', role: 'Immune system modulation and optimization' },
    ],
    goals: ['anti-aging', 'skin-health', 'immune-support'],
    difficulty: 'advanced',
    estimatedMonthlyCost: '$300-600',
    duration: '3-6 months (epithalon cycled 10-20 days on, 4-6 months off)',
    notes: 'This is an advanced stack targeting multiple aging pathways simultaneously. Epithalon is cycled short-term. GHK-Cu can be used topically for skin-specific benefits or SubQ for systemic effects. MOTS-c acts as an exercise mimetic at the mitochondrial level. Thymosin Alpha-1 is FDA-approved in 35+ countries for immune modulation. Blood work recommended before and during protocol.',
  },
  {
    name: 'Cognitive Performance Stack',
    slug: 'cognitive-performance-stack',
    description: 'Nootropic peptide protocol for focus, memory, and neuroprotection using the most researched brain-targeting peptides.',
    metaDescription: 'Nootropic peptide stack: Semax + Selank for focus, memory, anxiety reduction, and cognitive performance.',
    peptides: [
      { peptide: 'semax', dose: '200-600mcg', frequency: '1-2x daily', timing: 'Morning and early afternoon', role: 'BDNF upregulation, focus enhancement, neuroprotection' },
      { peptide: 'selank', dose: '250-500mcg', frequency: '1-2x daily', timing: 'Morning and early afternoon', role: 'Anxiolytic effects with cognitive enhancement, GABA modulation' },
    ],
    goals: ['cognitive-enhancement'],
    difficulty: 'beginner',
    estimatedMonthlyCost: '$60-120',
    duration: '2-4 weeks on, 2 weeks off',
    notes: 'Both administered intranasally for direct brain targeting. Semax enhances focus and BDNF. Selank reduces anxiety while improving cognition — useful for high-pressure work. Cycle to prevent tolerance. N-Acetyl Semax Amidate (NASA) is a more potent, longer-lasting version. Start with standard Semax before trying enhanced variants.',
  },
  {
    name: 'Gut Restoration Stack',
    slug: 'gut-restoration-stack',
    description: 'Targeted gut healing protocol for leaky gut, IBS, GERD, or post-antibiotic gut repair using oral and injectable peptides.',
    metaDescription: 'Gut healing peptide stack: BPC-157 oral + LL-37 for gut lining repair, inflammation reduction, and microbiome support.',
    peptides: [
      { peptide: 'bpc-157', dose: '500mcg', frequency: 'Twice daily', timing: 'Morning empty stomach and before bed', role: 'Gut lining repair, anti-inflammatory, mucosal protection' },
      { peptide: 'll-37', dose: '50-100mcg', frequency: 'Once daily', timing: 'Morning', role: 'Antimicrobial defense, gut immune modulation' },
    ],
    goals: ['gut-health', 'immune-support'],
    difficulty: 'beginner',
    estimatedMonthlyCost: '$80-160',
    duration: '4-8 weeks',
    notes: 'Oral BPC-157 is preferred for gut-specific issues — taken as a capsule or dissolved under the tongue. LL-37 provides antimicrobial support without disrupting beneficial bacteria. Combine with elimination diet, probiotics, and stress management for best results. If GI issues are side effects from GLP-1 medications, BPC-157 alone may be sufficient.',
  },
  {
    name: 'Body Recomposition Stack',
    slug: 'body-recomposition-stack',
    description: 'Simultaneous fat loss and muscle preservation/growth protocol combining GH optimization with targeted fat metabolism.',
    metaDescription: 'Body recomposition peptide stack: GH secretagogues + fat-targeting peptides for losing fat while building muscle.',
    peptides: [
      { peptide: 'ipamorelin', dose: '200-300mcg', frequency: '2x daily', timing: 'Post-workout and before bed', role: 'GH release for recovery and lean tissue support' },
      { peptide: 'cjc-1295', dose: '100mcg', frequency: '2x daily', timing: 'Same as ipamorelin', role: 'Amplify and extend GH release' },
      { peptide: 'tesamorelin', dose: '2mg', frequency: 'Once daily', timing: 'Morning, empty stomach', role: 'Targeted visceral fat reduction' },
    ],
    goals: ['fat-loss', 'muscle-growth'],
    difficulty: 'intermediate',
    estimatedMonthlyCost: '$250-500',
    duration: '3-6 months',
    notes: 'This stack targets body composition from multiple angles: GH optimization for muscle preservation and fat mobilization, plus tesamorelin for targeted visceral fat. Requires disciplined training (resistance 4x/week minimum) and nutrition (high protein, moderate caloric deficit). Sleep optimization is essential — most GH is released during deep sleep.',
  },
  {
    name: 'Weight Loss + Healing Combo',
    slug: 'weight-loss-healing-combo',
    description: 'For people who need to lose weight but also have injuries or joint pain that limit exercise. Addresses both simultaneously.',
    metaDescription: 'Weight loss + healing peptide stack: GLP-1 for appetite control with BPC-157/TB-500 for injury recovery and joint support.',
    peptides: [
      { peptide: 'semaglutide', dose: '0.25-2.4mg', frequency: 'Once weekly', timing: 'Same day each week', role: 'Appetite suppression and metabolic improvement' },
      { peptide: 'bpc-157', dose: '250-500mcg', frequency: 'Twice daily', timing: 'Morning and evening', role: 'Dual purpose: gut support for GLP-1 side effects + injury healing' },
      { peptide: 'tb-500', dose: '2-5mg', frequency: '2x per week', timing: 'Any time', role: 'Systemic tissue repair for joints and injuries' },
    ],
    goals: ['weight-loss', 'injury-recovery', 'joint-health'],
    difficulty: 'intermediate',
    estimatedMonthlyCost: '$300-700',
    duration: '8-16 weeks',
    notes: 'Common scenario: overweight person with knee/back pain who cannot exercise effectively. GLP-1 handles the weight loss while healing peptides address the injuries that keep you sedentary. As weight drops and injuries heal, gradually increase activity. BPC-157 does double duty here — helps with GLP-1 GI side effects AND supports healing.',
  },
  {
    name: 'Sleep & Recovery Stack',
    slug: 'sleep-recovery-stack',
    description: 'Optimize deep sleep and overnight recovery using GH peptides timed to amplify the natural nighttime growth hormone surge.',
    metaDescription: 'Sleep optimization peptide stack: ipamorelin + DSIP for deeper sleep, better recovery, and enhanced growth hormone release overnight.',
    peptides: [
      { peptide: 'ipamorelin', dose: '200-300mcg', frequency: 'Once daily', timing: '30-60 minutes before bed, empty stomach', role: 'Amplify natural sleep-time GH pulse for deeper sleep and recovery' },
      { peptide: 'dsip', dose: '100-200mcg', frequency: 'Once daily', timing: '30 minutes before bed', role: 'Delta sleep-inducing peptide — targets sleep architecture directly' },
    ],
    goals: ['sleep-quality', 'muscle-growth'],
    difficulty: 'beginner',
    estimatedMonthlyCost: '$60-120',
    duration: '4-8 weeks on, 2-4 weeks off',
    notes: 'Take both on completely empty stomach — food blunts GH release. No carbs or fats for 2 hours before dosing. This stack targets the most anabolic window of the day (deep sleep). Users commonly report vivid dreams, deeper sleep, and waking feeling significantly more recovered. Cycle DSIP to prevent tolerance.',
  },
  {
    name: 'Immune Defense Stack',
    slug: 'immune-defense-stack',
    description: 'Short-term immune system protocol for illness prevention, post-illness recovery, or pre-travel immune preparation.',
    metaDescription: 'Immune peptide stack: thymosin alpha-1 + LL-37 for immune system support, illness prevention, and recovery.',
    peptides: [
      { peptide: 'thymosin-alpha-1', dose: '1.6mg', frequency: '2-3x per week', timing: 'Morning', role: 'T-cell maturation, NK cell activation, immune system modulation' },
      { peptide: 'll-37', dose: '50-100mcg', frequency: 'Once daily', timing: 'Morning', role: 'Broad-spectrum antimicrobial defense' },
    ],
    goals: ['immune-support'],
    difficulty: 'beginner',
    estimatedMonthlyCost: '$100-200',
    duration: '2-4 weeks (acute) or cycled long-term',
    notes: 'Thymosin Alpha-1 is the most evidence-backed immune peptide — approved in 35+ countries. Good for pre-travel immune prep, post-illness recovery, or chronic immune support. LL-37 adds antimicrobial coverage. This stack modulates (not just boosts) immunity — important distinction for people with autoimmune tendencies. Consult a physician if you have autoimmune conditions.',
  },
  {
    name: 'Skin Rejuvenation Stack',
    slug: 'skin-rejuvenation-stack',
    description: 'Targeted skin health protocol combining topical and systemic peptides for collagen production, wrinkle reduction, and skin repair.',
    metaDescription: 'Skin rejuvenation peptide stack: GHK-Cu topical + BPC-157 for collagen synthesis, anti-aging, and skin health.',
    peptides: [
      { peptide: 'ghk-cu', dose: 'Topical serum (2-3%) or 1mg SubQ', frequency: 'Topical 2x daily, SubQ once daily', timing: 'Morning and evening (topical), morning (SubQ)', role: 'Collagen and elastin synthesis, gene modulation for skin renewal' },
      { peptide: 'bpc-157', dose: '250mcg', frequency: 'Once daily', timing: 'Morning', role: 'Wound healing support, angiogenesis for skin nourishment' },
    ],
    goals: ['skin-health', 'anti-aging'],
    difficulty: 'beginner',
    estimatedMonthlyCost: '$80-200',
    duration: '2-3 months',
    notes: 'GHK-Cu topical is the easiest entry point — apply morning and night to clean skin before moisturizer. For more dramatic results, combine topical with SubQ injection. BPC-157 supports from the inside out. Pair with tretinoin (vitamin A), vitamin C serum, and daily sunscreen for the complete evidence-based skin protocol. Microneedling with GHK-Cu serum can enhance absorption.',
  },
]

export function getStack(slug: string): Stack | undefined {
  return stacks.find((s) => s.slug === slug)
}

export function getStacksByGoal(goalSlug: string): Stack[] {
  return stacks.filter((s) => s.goals.includes(goalSlug))
}

export function getStacksByPeptide(peptideSlug: string): Stack[] {
  return stacks.filter((s) => s.peptides.some((p) => p.peptide === peptideSlug))
}

export function getStacksByDifficulty(difficulty: Stack['difficulty']): Stack[] {
  return stacks.filter((s) => s.difficulty === difficulty)
}

export function getAllStackSlugs(): string[] {
  return stacks.map((s) => s.slug)
}
