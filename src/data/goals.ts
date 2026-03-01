import type { Goal } from '@/lib/types'

export const goals: Goal[] = [
  {
    name: 'Weight Loss',
    slug: 'weight-loss',
    description: 'Peptides that suppress appetite, increase metabolic rate, or enhance fat oxidation to support significant weight loss.',
    metaDescription: 'Best peptides for weight loss in 2026: GLP-1 agonists, metabolic peptides, and fat-burning compounds ranked by research evidence and real-world results.',
    topPeptides: ['semaglutide', 'tirzepatide', 'retatrutide', 'aod-9604', 'mots-c', 'tesamorelin'],
    considerations: 'GLP-1 receptor agonists (semaglutide, tirzepatide) have the strongest clinical evidence for weight loss. FDA-approved options exist. Expect GI side effects during dose titration. Muscle preservation requires concurrent resistance training and adequate protein intake (1g/lb). Consider metabolic peptides like MOTS-c as adjuncts for those already on GLP-1 therapy.',
  },
  {
    name: 'Muscle Growth',
    slug: 'muscle-growth',
    description: 'Peptides that stimulate growth hormone release, enhance recovery, or support lean tissue development for building muscle.',
    metaDescription: 'Best peptides for muscle growth: growth hormone secretagogues, recovery peptides, and anabolic support compounds ranked by evidence.',
    topPeptides: ['ipamorelin', 'cjc-1295', 'mk-677', 'bpc-157', 'tb-500', 'tesamorelin'],
    considerations: 'GH secretagogues (ipamorelin, CJC-1295) promote muscle growth indirectly through elevated growth hormone and IGF-1. They work best combined with proper training, nutrition, and sleep. MK-677 is oral but watch for appetite increase and water retention. BPC-157 and TB-500 support recovery between sessions. None of these are anabolic steroids — expect subtle, gradual improvements over 3-6 months.',
  },
  {
    name: 'Fat Loss',
    slug: 'fat-loss',
    description: 'Peptides that target fat metabolism specifically, including visceral fat reduction and improved body composition without necessarily lowering scale weight.',
    metaDescription: 'Best peptides for fat loss and body recomposition: targeted fat-burning peptides, metabolic enhancers, and visceral fat reducers.',
    topPeptides: ['tesamorelin', 'aod-9604', 'mots-c', 'semaglutide', 'tirzepatide', 'ipamorelin'],
    considerations: 'Tesamorelin has the strongest evidence for visceral fat reduction specifically (FDA-approved for HIV lipodystrophy). AOD-9604 targets lipolysis without the full GH effects. For overall fat loss (not just body recomp), GLP-1 agonists remain most effective. Stack GH peptides with consistent training for best body composition changes.',
  },
  {
    name: 'Injury Recovery',
    slug: 'injury-recovery',
    description: 'Peptides that accelerate tissue repair, reduce inflammation, and support healing from injuries, surgery, or chronic conditions.',
    metaDescription: 'Best peptides for injury recovery and healing: BPC-157, TB-500, and other recovery peptides compared by injury type and research evidence.',
    topPeptides: ['bpc-157', 'tb-500', 'ghk-cu', 'pentadecapeptide', 'thymosin-alpha-1'],
    considerations: 'BPC-157 and TB-500 are the most popular healing peptides, often stacked together for complementary mechanisms. BPC-157 excels at gut and tendon injuries with oral bioavailability. TB-500 is better for systemic tissue repair and cardiac healing. GHK-Cu supports wound healing and collagen synthesis topically. Most healing peptide evidence comes from animal studies — human clinical trials are limited.',
  },
  {
    name: 'Anti-Aging',
    slug: 'anti-aging',
    description: 'Peptides that support longevity markers, skin health, cognitive function, and overall healthspan extension.',
    metaDescription: 'Best anti-aging peptides: skin rejuvenation, longevity, cognitive support, and cellular health compounds ranked by research.',
    topPeptides: ['ghk-cu', 'epithalon', 'bpc-157', 'ss-31', 'mots-c', 'thymosin-alpha-1'],
    considerations: 'GHK-Cu has the strongest topical anti-aging evidence (collagen synthesis, wound healing, gene modulation). Epithalon targets telomere extension through telomerase activation — research is promising but early. MOTS-c and SS-31 target mitochondrial function, which declines with age. Anti-aging peptide protocols tend to be longer-term (6+ months) and stack multiple compounds targeting different aging pathways.',
  },
  {
    name: 'Sleep Quality',
    slug: 'sleep-quality',
    description: 'Peptides that improve sleep onset, depth, and overall sleep architecture through growth hormone and neurological pathways.',
    metaDescription: 'Best peptides for better sleep: GH secretagogues and neurological peptides that improve deep sleep, recovery, and sleep quality.',
    topPeptides: ['ipamorelin', 'cjc-1295', 'mk-677', 'dsip', 'bpc-157'],
    considerations: 'GH secretagogues taken before bed enhance deep sleep through natural GH pulsing. Ipamorelin is the most popular for sleep improvement — minimal side effects and clean GH release. DSIP (Delta Sleep-Inducing Peptide) directly targets sleep architecture but has limited research. MK-677 improves sleep but may cause next-morning grogginess and appetite increase. Timing matters: take GH peptides 30-60 minutes before bed on an empty stomach.',
  },
  {
    name: 'Gut Health',
    slug: 'gut-health',
    description: 'Peptides that support gut lining repair, reduce intestinal inflammation, and improve digestive function.',
    metaDescription: 'Best peptides for gut health: BPC-157 and other gut-healing peptides for leaky gut, IBS, GERD, and intestinal inflammation.',
    topPeptides: ['bpc-157', 'larazotide', 'll-37', 'thymosin-alpha-1'],
    considerations: 'BPC-157 is the standout peptide for gut health — originally isolated from gastric juice, it has extensive animal data showing gut lining repair, anti-inflammatory effects, and protection against NSAID-induced damage. Oral BPC-157 may be most effective for gut-specific issues. Larazotide targets tight junction integrity (relevant for celiac and leaky gut). LL-37 has antimicrobial properties. Most gut peptide protocols run 4-8 weeks.',
  },
  {
    name: 'Cognitive Enhancement',
    slug: 'cognitive-enhancement',
    description: 'Peptides that support brain function, memory, focus, and neuroprotection for cognitive performance.',
    metaDescription: 'Best nootropic peptides for cognitive enhancement: brain-boosting peptides for focus, memory, and neuroprotection.',
    topPeptides: ['semax', 'selank', 'dihexa', 'bpc-157', 'ghk-cu'],
    considerations: 'Semax and Selank are the most researched nootropic peptides — both developed in Russia with clinical use history. Semax enhances BDNF and focus. Selank reduces anxiety while improving cognition. Dihexa is extremely potent (active at picomolar concentrations) but has very limited safety data. BPC-157 shows neuroprotective properties in animal models. Nasal administration is common for brain-targeting peptides. Start with Semax or Selank for the strongest risk/reward profile.',
  },
  {
    name: 'Immune Support',
    slug: 'immune-support',
    description: 'Peptides that modulate immune function, support immune defense, and help regulate inflammatory responses.',
    metaDescription: 'Best peptides for immune system support: thymosin alpha-1, LL-37, and other immune-modulating peptides ranked by evidence.',
    topPeptides: ['thymosin-alpha-1', 'll-37', 'bpc-157', 'selank', 'thymosin-beta-4'],
    considerations: 'Thymosin Alpha-1 is the gold standard immune peptide — FDA-approved in 35+ countries for hepatitis B/C and as an immune adjunct. LL-37 is a natural antimicrobial peptide with broad-spectrum activity. These peptides modulate rather than simply boost immunity, which is an important distinction for autoimmune considerations. Immune peptide protocols are typically used short-term (2-4 weeks) or cyclically.',
  },
  {
    name: 'Skin Health',
    slug: 'skin-health',
    description: 'Peptides that improve skin elasticity, reduce wrinkles, support collagen production, and enhance wound healing.',
    metaDescription: 'Best peptides for skin health and rejuvenation: GHK-Cu, collagen peptides, and skin-repairing compounds for anti-aging skin care.',
    topPeptides: ['ghk-cu', 'bpc-157', 'epithalon', 'tb-500', 'collagen-peptides'],
    considerations: 'GHK-Cu is the premier skin peptide — modulates 4,000+ genes related to collagen, elastin, and skin repair. Available as topical serums (most practical for skin), SubQ injection, or microneedling serum. BPC-157 supports wound healing and may improve skin recovery. Epithalon targets cellular aging. For purely cosmetic goals, topical GHK-Cu combined with retinoids and sunscreen is the evidence-based starting point.',
  },
  {
    name: 'Sexual Health',
    slug: 'sexual-health',
    description: 'Peptides that support libido, erectile function, and sexual performance through neurological and vascular pathways.',
    metaDescription: 'Best peptides for sexual health: PT-141 (bremelanotide) and other peptides for libido, erectile function, and sexual wellness.',
    topPeptides: ['pt-141', 'kisspeptin', 'ipamorelin', 'cjc-1295'],
    considerations: 'PT-141 (bremelanotide/Vyleesi) is FDA-approved for hypoactive sexual desire disorder in women and used off-label for male sexual dysfunction. It works through melanocortin receptors in the brain — a fundamentally different mechanism than PDE5 inhibitors (Viagra/Cialis). Nausea is the main side effect. GH peptides indirectly support sexual health through improved hormone balance and energy. Kisspeptin is emerging as a research peptide for sexual arousal.',
  },
  {
    name: 'Joint Health',
    slug: 'joint-health',
    description: 'Peptides that support joint repair, reduce joint inflammation, and improve mobility for chronic joint conditions.',
    metaDescription: 'Best peptides for joint health and arthritis: BPC-157, TB-500, and other joint-supporting peptides for pain, inflammation, and mobility.',
    topPeptides: ['bpc-157', 'tb-500', 'ghk-cu', 'pentadecapeptide', 'aod-9604'],
    considerations: 'BPC-157 and TB-500 are the most used peptides for joint issues — BPC-157 for tendon and ligament repair, TB-500 for broader connective tissue healing. Both are typically cycled 4-8 weeks. GHK-Cu may support cartilage through collagen synthesis. AOD-9604 has some research for osteoarthritis. For chronic joint conditions, peptides are best combined with physical therapy, joint-friendly exercise, and addressing root causes (body weight, biomechanics).',
  },
]

export function getGoal(slug: string): Goal | undefined {
  return goals.find((g) => g.slug === slug)
}

export function getGoalsByPeptide(peptideSlug: string): Goal[] {
  return goals.filter((g) => g.topPeptides.includes(peptideSlug))
}

export function getAllGoalSlugs(): string[] {
  return goals.map((g) => g.slug)
}
