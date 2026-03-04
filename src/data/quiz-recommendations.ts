export interface QuizRecommendation {
  peptides: {
    slug: string
    whyRecommended: string
  }[]
  note?: string
}

const recommendations: Record<string, QuizRecommendation> = {
  // ========== WEIGHT LOSS ==========

  // Beginner + Yes injection
  'weight-loss|beginner|yes|under-20': {
    peptides: [
      { slug: 'semaglutide', whyRecommended: 'FDA-approved with the largest clinical trial program. Start at 0.25mg/week and titrate slowly — a low dose may be all you need for modest goals.' },
    ],
    note: 'For under 20 lbs, lifestyle changes (diet + resistance training) may be enough on their own. A low-dose GLP-1 can accelerate results, but it isn\'t always necessary for modest goals.',
  },
  'weight-loss|beginner|yes|20-50': {
    peptides: [
      { slug: 'semaglutide', whyRecommended: 'Gold standard for weight loss. 14.9% average body weight reduction in clinical trials with a well-established safety profile.' },
      { slug: 'bpc-157', whyRecommended: 'Supports gut health during GLP-1 therapy. May reduce the nausea and GI discomfort common during dose escalation.' },
    ],
  },
  'weight-loss|beginner|yes|over-50': {
    peptides: [
      { slug: 'tirzepatide', whyRecommended: 'Dual GIP/GLP-1 agonist — the most effective FDA-approved option. 22.5% average weight loss in the SURMOUNT-1 trial.' },
      { slug: 'semaglutide', whyRecommended: 'Well-established alternative if tirzepatide isn\'t accessible. 14.9% average weight loss across 10,000+ trial participants.' },
    ],
  },

  // Beginner + No injection
  'weight-loss|beginner|no|under-20': {
    peptides: [
      { slug: 'semaglutide', whyRecommended: 'Available in oral form (Rybelsus/oral Wegovy). No needles required, though slightly less effective than injectable.' },
      { slug: 'tesofensine', whyRecommended: 'Oral compound working through dopamine/norepinephrine/serotonin reuptake. Different mechanism than GLP-1s.' },
    ],
    note: 'For under 20 lbs without injections, oral options combined with lifestyle changes can work well. Most effective weight loss peptides are injectable.',
  },
  'weight-loss|beginner|no|20-50': {
    peptides: [
      { slug: 'semaglutide', whyRecommended: 'Available in oral form (Rybelsus/oral Wegovy). Proven weight loss without needles, though injectable versions produce better results.' },
      { slug: 'tesofensine', whyRecommended: 'Oral weight loss compound. Works through a completely different mechanism than GLP-1 agonists.' },
    ],
    note: 'Injectable GLP-1s produce significantly better results than oral forms. If you change your mind about injections, the process is simpler than most people expect.',
  },
  'weight-loss|beginner|no|over-50': {
    peptides: [
      { slug: 'semaglutide', whyRecommended: 'Oral semaglutide is the strongest non-injectable option. For 50+ lbs, consider starting here and switching to injectable if needed.' },
      { slug: 'tesofensine', whyRecommended: 'Oral compound that can complement GLP-1 therapy through a different mechanism.' },
    ],
    note: 'For weight loss goals over 50 lbs, injectable GLP-1 agonists are strongly recommended. Oral options exist but produce roughly 30-40% less weight loss than injectable versions.',
  },

  // Intermediate + Yes injection
  'weight-loss|intermediate|yes|under-20': {
    peptides: [
      { slug: 'semaglutide', whyRecommended: 'A low maintenance dose may be all you need. Proven track record with years of real-world data.' },
      { slug: 'mots-c', whyRecommended: 'Mitochondrial peptide that improves metabolic flexibility and exercise capacity. Complements GLP-1 therapy for body composition.' },
    ],
    note: 'For modest goals with experience, consider whether a metabolic optimizer like MOTS-c might be sufficient without a GLP-1.',
  },
  'weight-loss|intermediate|yes|20-50': {
    peptides: [
      { slug: 'tirzepatide', whyRecommended: 'Dual GIP/GLP-1 agonist with 22.5% average weight loss. The most effective single compound for this weight range.' },
      { slug: 'tesamorelin', whyRecommended: 'FDA-approved for reducing visceral fat. Targets stubborn belly fat specifically when added to a GLP-1.' },
    ],
  },
  'weight-loss|intermediate|yes|over-50': {
    peptides: [
      { slug: 'tirzepatide', whyRecommended: 'Most effective FDA-approved option for significant weight loss. Dual mechanism hits both GIP and GLP-1 receptors.' },
      { slug: 'semaglutide', whyRecommended: 'Alternative if tirzepatide isn\'t tolerated. Can be combined with other compounds for enhanced results.' },
      { slug: 'tesamorelin', whyRecommended: 'Add-on for visceral fat reduction. FDA-approved and well-studied for abdominal fat loss.' },
    ],
  },

  // Intermediate + No injection
  'weight-loss|intermediate|no|under-20': {
    peptides: [
      { slug: 'tesofensine', whyRecommended: 'Oral weight loss compound. Works through neurotransmitter reuptake, a different pathway than GLP-1s.' },
      { slug: 'aod-9604', whyRecommended: 'Fragment of growth hormone that targets fat metabolism. Some oral/sublingual formulations available.' },
    ],
    note: 'Injectable GLP-1 agonists would produce better results. Check out our reconstitution calculator to understand the injection process — it\'s simpler than you might think.',
  },
  'weight-loss|intermediate|no|20-50': {
    peptides: [
      { slug: 'semaglutide', whyRecommended: 'Oral semaglutide is your best non-injectable option for this weight range. Available as Rybelsus or oral Wegovy.' },
      { slug: 'tesofensine', whyRecommended: 'Oral compound that can be combined with oral semaglutide for enhanced results through a different mechanism.' },
    ],
    note: 'For 20-50 lbs without injections, oral semaglutide is the strongest option — but injectable tirzepatide would produce roughly 50% better results.',
  },
  'weight-loss|intermediate|no|over-50': {
    peptides: [
      { slug: 'semaglutide', whyRecommended: 'Oral semaglutide is the maximum non-injectable option. For 50+ lbs, this should be paired with structured diet and exercise.' },
      { slug: 'tesofensine', whyRecommended: 'Oral complement to boost results through neurotransmitter pathways.' },
    ],
    note: 'For weight loss goals over 50 lbs, injectable peptides are strongly recommended. Oral options alone are unlikely to produce the results you\'re looking for.',
  },

  // Advanced + Yes injection
  'weight-loss|advanced|yes|under-20': {
    peptides: [
      { slug: 'mots-c', whyRecommended: 'Mitochondrial peptide for metabolic optimization. Enhances exercise capacity and fat oxidation without appetite suppression.' },
      { slug: 'aod-9604', whyRecommended: 'GH fragment targeting fat cells without the muscle/bone effects of full growth hormone.' },
      { slug: 'tesamorelin', whyRecommended: 'Specifically targets visceral fat. Good choice when you\'re close to goal weight but fighting stubborn belly fat.' },
    ],
    note: 'For advanced users with modest goals, a metabolic optimization stack may be more appropriate than high-dose GLP-1 therapy.',
  },
  'weight-loss|advanced|yes|20-50': {
    peptides: [
      { slug: 'retatrutide', whyRecommended: 'Triple agonist (GIP/GLP-1/glucagon). 24.2% average weight loss in Phase 2 trials — the most potent weight loss peptide in development.' },
      { slug: 'tirzepatide', whyRecommended: 'FDA-approved dual agonist. Proven 22.5% weight loss with extensive safety data. Solid alternative to retatrutide.' },
    ],
  },
  'weight-loss|advanced|yes|over-50': {
    peptides: [
      { slug: 'retatrutide', whyRecommended: 'Triple agonist with the highest weight loss in clinical trials (24.2%). Phase 3 trials ongoing.' },
      { slug: 'tirzepatide', whyRecommended: 'FDA-approved dual agonist. 22.5% weight loss with the strongest regulatory backing among newer agents.' },
      { slug: 'tesamorelin', whyRecommended: 'Layer on top of GLP-1 therapy to specifically target visceral fat. FDA-approved with a clean safety profile.' },
    ],
  },

  // Advanced + No injection
  'weight-loss|advanced|no|under-20': {
    peptides: [
      { slug: 'tesofensine', whyRecommended: 'Strongest oral weight loss compound. Triple monoamine reuptake inhibitor.' },
      { slug: 'semaglutide', whyRecommended: 'Oral semaglutide for GLP-1 pathway activation without injection.' },
    ],
    note: 'As an advanced user, you likely know that injectable peptides dramatically outperform oral options. For under 20 lbs, oral compounds can still get the job done.',
  },
  'weight-loss|advanced|no|20-50': {
    peptides: [
      { slug: 'semaglutide', whyRecommended: 'Oral semaglutide is the strongest non-injectable GLP-1 option. Proven but less effective than injectable forms.' },
      { slug: 'tesofensine', whyRecommended: 'Oral compound working through neurotransmitter pathways. Can complement oral semaglutide.' },
    ],
    note: 'For 20-50 lbs, injectable retatrutide or tirzepatide would produce dramatically better results. Most experienced users find injections easier than expected.',
  },
  'weight-loss|advanced|no|over-50': {
    peptides: [
      { slug: 'semaglutide', whyRecommended: 'Oral semaglutide is the best non-injectable option, but for 50+ lbs this is a significant limitation.' },
      { slug: 'tesofensine', whyRecommended: 'Oral complement through neurotransmitter pathways.' },
    ],
    note: 'Oral peptides alone are unlikely to produce 50+ lbs of weight loss. Injectable GLP-1 agonists (tirzepatide, retatrutide) are the clinical standard for this range.',
  },

  // ========== HEALING & RECOVERY ==========

  'healing|beginner|yes': {
    peptides: [
      { slug: 'bpc-157', whyRecommended: 'The most researched healing peptide. Accelerates recovery of tendons, ligaments, gut tissue, and soft tissue injuries.' },
      { slug: 'tb-500', whyRecommended: 'Promotes new blood vessel formation and reduces inflammation at injury sites. Pairs naturally with BPC-157.' },
    ],
  },
  'healing|beginner|no': {
    peptides: [
      { slug: 'bpc-157', whyRecommended: 'Available in oral capsule form. Best for gut healing and systemic inflammation — oral form is well-suited to GI repair.' },
      { slug: 'ghk-cu', whyRecommended: 'Copper peptide available as a topical cream or serum. Accelerates skin healing and reduces surface inflammation.' },
    ],
    note: 'Injectable BPC-157 and TB-500 have stronger research support for internal injuries (tendons, ligaments, joints). Oral and topical forms work best for gut and skin issues respectively.',
  },
  'healing|intermediate|yes': {
    peptides: [
      { slug: 'bpc-157', whyRecommended: 'Foundational healing peptide. Effective for tendons, ligaments, gut, and soft tissue repair.' },
      { slug: 'tb-500', whyRecommended: 'Complements BPC-157 by promoting angiogenesis (new blood vessel growth) and reducing fibrosis at injury sites.' },
      { slug: 'kpv', whyRecommended: 'Anti-inflammatory peptide derived from alpha-MSH. Particularly effective for gut inflammation and autoimmune-related conditions.' },
    ],
  },
  'healing|intermediate|no': {
    peptides: [
      { slug: 'bpc-157', whyRecommended: 'Oral BPC-157 capsules support gut healing and systemic inflammation reduction without injection.' },
      { slug: 'ghk-cu', whyRecommended: 'Topical copper peptide for skin repair, wound healing, and anti-inflammatory effects.' },
    ],
    note: 'For internal injuries (tendons, ligaments, joints), injectable BPC-157 + TB-500 is the standard protocol. Oral and topical options are effective but more limited in scope.',
  },
  'healing|advanced|yes': {
    peptides: [
      { slug: 'bpc-157', whyRecommended: 'Core healing peptide. Pair with TB-500 for the gold standard tissue repair stack.' },
      { slug: 'tb-500', whyRecommended: 'Tissue repair through angiogenesis and anti-fibrotic action. Synergistic with BPC-157.' },
      { slug: 'thymosin-beta-4', whyRecommended: 'Full-length protein with broader immune and healing effects than its fragment TB-500. More comprehensive but less targeted.' },
    ],
  },
  'healing|advanced|no': {
    peptides: [
      { slug: 'bpc-157', whyRecommended: 'Oral form for systemic healing support. Best results for gut and GI tract issues.' },
      { slug: 'ghk-cu', whyRecommended: 'Topical application for skin, hair, and surface tissue repair.' },
    ],
    note: 'Advanced healing protocols (BPC-157 + TB-500 + Thymosin Beta-4) require injection. For serious injuries, injectable options are significantly more effective.',
  },

  // ========== MUSCLE GROWTH ==========

  'muscle-growth|beginner|yes': {
    peptides: [
      { slug: 'ipamorelin', whyRecommended: 'Cleanest GH secretagogue with minimal side effects. Stimulates natural growth hormone release without cortisol or prolactin elevation.' },
      { slug: 'cjc-1295', whyRecommended: 'Extends growth hormone release window when combined with Ipamorelin. The gold standard GH peptide stack for beginners.' },
    ],
  },
  'muscle-growth|beginner|no': {
    peptides: [
      { slug: 'follistatin', whyRecommended: 'Myostatin inhibitor that promotes muscle growth. One of the few muscle-growth peptides with non-injectable delivery research.' },
    ],
    note: 'Nearly all effective muscle-growth peptides require subcutaneous injection. The Ipamorelin + CJC-1295 stack uses small, painless subcutaneous injections and is the standard starting point.',
  },
  'muscle-growth|intermediate|yes': {
    peptides: [
      { slug: 'ipamorelin', whyRecommended: 'Base GH stimulation for muscle growth and improved recovery between training sessions.' },
      { slug: 'cjc-1295', whyRecommended: 'Extends the GH pulse for sustained anabolic signaling. Best results dosed before bed.' },
      { slug: 'follistatin', whyRecommended: 'Myostatin inhibitor — removes the body\'s natural brake on muscle growth. Layer on top of GH peptides for enhanced results.' },
    ],
  },
  'muscle-growth|intermediate|no': {
    peptides: [
      { slug: 'follistatin', whyRecommended: 'Myostatin inhibitor with some non-injectable delivery research. Limited but the best non-injectable muscle growth option.' },
    ],
    note: 'Muscle growth peptides are predominantly injectable. The Ipamorelin + CJC-1295 stack (subcutaneous injection) is the proven path for peptide-enhanced muscle growth.',
  },
  'muscle-growth|advanced|yes': {
    peptides: [
      { slug: 'igf-1-lr3', whyRecommended: 'Extended-acting IGF-1 analog. Directly stimulates muscle cell hyperplasia (new muscle cell growth), not just hypertrophy.' },
      { slug: 'ipamorelin', whyRecommended: 'GH secretagogue for natural GH pulsation. Complements direct IGF-1 by maintaining the full GH cascade.' },
      { slug: 'cjc-1295', whyRecommended: 'Sustains GH release for synergistic muscle growth when stacked with Ipamorelin and IGF-1.' },
    ],
  },
  'muscle-growth|advanced|no': {
    peptides: [
      { slug: 'follistatin', whyRecommended: 'Myostatin inhibitor. The strongest non-injectable option for muscle growth, though research on non-injectable delivery is limited.' },
    ],
    note: 'For advanced muscle growth goals, injection-based peptides (IGF-1 LR3, Ipamorelin + CJC-1295) are the standard. Consider that subcutaneous injection is straightforward and virtually painless.',
  },

  // ========== ANTI-AGING ==========

  'anti-aging|beginner|yes': {
    peptides: [
      { slug: 'ghk-cu', whyRecommended: 'Copper peptide that promotes collagen synthesis, skin repair, and has broad anti-inflammatory and regenerative properties.' },
      { slug: 'epitalon', whyRecommended: 'Telomere-supporting peptide studied for 20+ years. May slow cellular aging by activating telomerase.' },
    ],
  },
  'anti-aging|beginner|no': {
    peptides: [
      { slug: 'ghk-cu', whyRecommended: 'Available as topical serum or cream. Clinically shown to improve skin elasticity, reduce wrinkles, and promote collagen production.' },
      { slug: 'nad-plus', whyRecommended: 'NAD+ precursors available sublingually. Supports cellular energy production, DNA repair, and sirtuin activation.' },
    ],
  },
  'anti-aging|intermediate|yes': {
    peptides: [
      { slug: 'ghk-cu', whyRecommended: 'Broad-spectrum anti-aging peptide effective for skin, hair, tissue repair, and systemic inflammation reduction.' },
      { slug: 'epitalon', whyRecommended: 'Pineal peptide supporting telomere maintenance and healthy circadian rhythm. One of the most studied anti-aging peptides.' },
      { slug: 'sermorelin', whyRecommended: 'Restores youthful growth hormone levels. Improves sleep quality, skin texture, and body composition as GH declines with age.' },
    ],
  },
  'anti-aging|intermediate|no': {
    peptides: [
      { slug: 'ghk-cu', whyRecommended: 'Topical application directly targets skin aging. One of the few peptides where topical delivery is well-supported.' },
      { slug: 'nad-plus', whyRecommended: 'Sublingual NAD+ for systemic cellular rejuvenation. Supports mitochondrial function and energy production.' },
      { slug: 'pinealon', whyRecommended: 'Nasal peptide that supports pineal gland function and melatonin production for better sleep and circadian health.' },
    ],
  },
  'anti-aging|advanced|yes': {
    peptides: [
      { slug: 'epitalon', whyRecommended: 'Telomere maintenance and pineal gland restoration. The cornerstone of advanced anti-aging peptide protocols.' },
      { slug: 'foxo4-dri', whyRecommended: 'Experimental senolytic peptide that targets and clears senescent (zombie) cells. Cutting-edge longevity research.' },
      { slug: 'ss-31', whyRecommended: 'Mitochondrial-targeted peptide that protects against oxidative damage at the cellular level. In clinical trials for age-related conditions.' },
    ],
  },
  'anti-aging|advanced|no': {
    peptides: [
      { slug: 'ghk-cu', whyRecommended: 'Topical delivery for skin and tissue rejuvenation. Among the most effective non-injectable anti-aging peptides.' },
      { slug: 'nad-plus', whyRecommended: 'Sublingual NAD+ for cellular energy and repair pathways.' },
      { slug: 'pinealon', whyRecommended: 'Nasal peptide supporting pineal function, melatonin production, and overall brain health.' },
    ],
    note: 'The most powerful anti-aging peptides (Epitalon, FOXO4-DRI, SS-31) require injection. Non-injectable options focus mainly on skin health and cellular energy.',
  },

  // ========== SLEEP ==========

  'sleep|beginner|yes': {
    peptides: [
      { slug: 'dsip', whyRecommended: 'Delta Sleep Inducing Peptide. Promotes deep, restorative delta-wave sleep without next-day grogginess.' },
      { slug: 'ipamorelin', whyRecommended: 'GH secretagogue that enhances natural nighttime growth hormone release, improving overall sleep architecture.' },
    ],
  },
  'sleep|beginner|no': {
    peptides: [
      { slug: 'pinealon', whyRecommended: 'Nasal peptide supporting pineal gland function and natural melatonin production. The primary non-injectable sleep peptide.' },
    ],
    note: 'Most sleep-targeted peptides (DSIP, Epitalon) require injection. Pinealon nasal spray is the main non-injectable option for peptide-based sleep improvement.',
  },
  'sleep|intermediate|yes': {
    peptides: [
      { slug: 'dsip', whyRecommended: 'Directly promotes delta-wave sleep patterns for deeper, more restorative rest.' },
      { slug: 'epitalon', whyRecommended: 'Regulates pineal gland function and normalizes melatonin production. Improves circadian rhythm over time.' },
      { slug: 'ipamorelin', whyRecommended: 'Enhances the natural GH surge during deep sleep. Dose before bed for best results.' },
    ],
  },
  'sleep|intermediate|no': {
    peptides: [
      { slug: 'pinealon', whyRecommended: 'Nasal peptide supporting pineal function and melatonin production.' },
    ],
    note: 'For significant sleep improvement, DSIP and Epitalon (both injectable) are the most effective peptide options available.',
  },
  'sleep|advanced|yes': {
    peptides: [
      { slug: 'dsip', whyRecommended: 'Primary sleep peptide. Promotes deep delta-wave sleep and normalizes disrupted sleep patterns.' },
      { slug: 'epitalon', whyRecommended: 'Pineal peptide for circadian rhythm optimization and restored melatonin production.' },
      { slug: 'cjc-1295', whyRecommended: 'Extended GH release amplifies sleep-phase growth hormone production. Pairs with DSIP for comprehensive sleep optimization.' },
    ],
  },
  'sleep|advanced|no': {
    peptides: [
      { slug: 'pinealon', whyRecommended: 'Best non-injectable sleep peptide. Supports pineal function and melatonin production via nasal delivery.' },
    ],
    note: 'Advanced sleep optimization through peptides largely requires injection. DSIP + Epitalon is the gold standard injectable sleep stack.',
  },

  // ========== COGNITIVE ENHANCEMENT ==========

  'cognitive|beginner|yes': {
    peptides: [
      { slug: 'semax', whyRecommended: 'Well-studied nootropic peptide that enhances BDNF production, focus, and cognitive function. 20+ years of clinical use in Russia.' },
      { slug: 'selank', whyRecommended: 'Anti-anxiety peptide that improves focus and memory without sedation. Complementary to Semax.' },
    ],
  },
  'cognitive|beginner|no': {
    peptides: [
      { slug: 'semax', whyRecommended: 'Available as nasal spray. Enhances focus, memory, and mental clarity without injection.' },
      { slug: 'selank', whyRecommended: 'Nasal spray that reduces anxiety while improving cognitive performance. Works well alongside Semax.' },
    ],
    note: 'Good news — the top nootropic peptides (Semax and Selank) are both available as nasal sprays with well-documented efficacy.',
  },
  'cognitive|intermediate|yes': {
    peptides: [
      { slug: 'semax', whyRecommended: 'BDNF-boosting nootropic for sustained focus and cognitive clarity. Well-established safety profile.' },
      { slug: 'selank', whyRecommended: 'Anxiolytic peptide for calm, focused cognition. Reduces stress-related cognitive impairment.' },
      { slug: 'dihexa', whyRecommended: 'Potent nootropic reported to be orders of magnitude more potent than BDNF at promoting synaptogenesis. Preliminary but promising research.' },
    ],
  },
  'cognitive|intermediate|no': {
    peptides: [
      { slug: 'semax', whyRecommended: 'Nasal nootropic for enhanced cognitive performance. Proven in clinical settings.' },
      { slug: 'selank', whyRecommended: 'Nasal anti-anxiety nootropic. Improves working memory and stress resilience.' },
      { slug: 'pinealon', whyRecommended: 'Nasal peptide supporting overall brain health and neuroprotection.' },
    ],
  },
  'cognitive|advanced|yes': {
    peptides: [
      { slug: 'dihexa', whyRecommended: 'Experimental nootropic with extraordinary potency in preclinical models. Promotes synaptogenesis and neural connectivity.' },
      { slug: 'cerebrolysin', whyRecommended: 'Neurotrophic peptide mixture used clinically for neurodegenerative conditions. Broad neuroprotective and cognitive-enhancing effects.' },
      { slug: 'semax', whyRecommended: 'Proven nootropic with decades of clinical use. Anchors any advanced cognitive stack with reliable BDNF enhancement.' },
    ],
  },
  'cognitive|advanced|no': {
    peptides: [
      { slug: 'semax', whyRecommended: 'Nasal delivery with decades of clinical backing. The strongest non-injectable nootropic peptide.' },
      { slug: 'selank', whyRecommended: 'Nasal anxiolytic nootropic. Pairs with Semax for comprehensive cognitive enhancement.' },
      { slug: 'pinealon', whyRecommended: 'Nasal neuroprotective peptide supporting long-term brain health.' },
    ],
    note: 'Cerebrolysin and Dihexa require injection, but Semax and Selank nasal sprays provide strong nootropic effects. The nasal cognitive stack is one of the best non-injectable options across all categories.',
  },
}

export function getRecommendation(
  goal: string,
  level: string,
  injection: string,
  weight?: string
): QuizRecommendation | undefined {
  // Build the lookup key
  const key = weight
    ? `${goal}|${level}|${injection}|${weight}`
    : `${goal}|${level}|${injection}`

  // Direct match
  if (recommendations[key]) {
    return recommendations[key]
  }

  // "Not sure" on injection falls back to "yes" recommendations with an added note
  if (injection === 'not-sure') {
    const yesKey = weight
      ? `${goal}|${level}|yes|${weight}`
      : `${goal}|${level}|yes`

    const rec = recommendations[yesKey]
    if (rec) {
      return {
        ...rec,
        note: (rec.note ? rec.note + ' ' : '') +
          'Not sure about injections? Most people find subcutaneous injections easier than expected — a tiny needle just under the skin. Check out our reconstitution calculator to learn more about the process.',
      }
    }
  }

  return undefined
}
