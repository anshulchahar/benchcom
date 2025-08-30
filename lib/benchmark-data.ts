import { SecurityBenchmark, CWEInfo } from '@/types'

// Benchmark data based on the research proposal
export const SECURITY_BENCHMARKS: SecurityBenchmark[] = [
  {
    id: 'securityeval',
    name: 'SecurityEval',
    year: 2022,
    samples: 130,
    cweCount: 75,
    cwes: [
      'CWE-79', 'CWE-89', 'CWE-78', 'CWE-22', 'CWE-434', 'CWE-94', 'CWE-352', 'CWE-611',
      'CWE-798', 'CWE-306', 'CWE-287', 'CWE-269', 'CWE-276', 'CWE-502', 'CWE-521',
      // ... additional CWEs would be listed here
    ],
    languages: ['Python'],
    validationMethod: 'manual',
    description: 'A Python-only dataset of 130 code snippets covering 75 CWEs, manually curated from sources like CodeQL examples and CWE descriptions.',
    authors: 'Siddiq & Santos',
    keyContribution: 'Foundational Python security dataset',
    strengths: [
      'Diverse Python vulnerabilities',
      'Manual curation ensuring quality',
      'Based on real-world examples from CodeQL'
    ],
    limitations: [
      'Python-only limits generalizability',
      'No automated test suites',
      'No correct solutions provided'
    ],
    datasetSource: 'CodeQL examples, CWE descriptions',
    hasTestSuite: false,
    hasSecureExamples: false,
    automatedEvaluation: false
  },
  {
    id: 'codeguard',
    name: 'CODEGUARD+',
    year: 2024,
    samples: 91,
    cweCount: 34,
    cwes: [
      'CWE-119', 'CWE-120', 'CWE-476', 'CWE-787', 'CWE-416', 'CWE-415', 'CWE-79', 'CWE-89',
      'CWE-78', 'CWE-22', 'CWE-434', 'CWE-502', 'CWE-798', 'CWE-306'
      // ... additional CWEs
    ],
    languages: ['Python', 'C', 'C++'],
    validationMethod: 'hybrid',
    description: 'A benchmark combining security and correctness with 91 prompts spanning 34 CWEs for Python and C/C++.',
    authors: 'Fu et al.',
    keyContribution: 'First to emphasize functional correctness alongside security',
    strengths: [
      'Unit tests for functional correctness',
      'Multi-language support (Python, C/C++)',
      'Combines security with correctness evaluation'
    ],
    limitations: [
      'Smaller sample size',
      'Limited to 2-3 programming languages',
      'Adapted from prior benchmarks'
    ],
    datasetSource: 'Adapted from prior benchmarks (Pearce et al.)',
    hasTestSuite: true,
    hasSecureExamples: true,
    automatedEvaluation: true
  },
  {
    id: 'codeseceval',
    name: 'CodeSecEval',
    year: 2024,
    samples: 180,
    cweCount: 44,
    cwes: [
      'CWE-79', 'CWE-89', 'CWE-78', 'CWE-22', 'CWE-434', 'CWE-94', 'CWE-352', 'CWE-611',
      'CWE-798', 'CWE-306', 'CWE-287', 'CWE-269', 'CWE-276', 'CWE-502', 'CWE-521',
      'CWE-918', 'CWE-476', 'CWE-787', 'CWE-119', 'CWE-120', 'CWE-416', 'CWE-415',
      'CWE-125', 'CWE-131', 'CWE-134', 'CWE-190', 'CWE-200', 'CWE-250', 'CWE-252',
      'CWE-295', 'CWE-297', 'CWE-326', 'CWE-327', 'CWE-330', 'CWE-331', 'CWE-335',
      'CWE-338', 'CWE-340', 'CWE-362', 'CWE-400', 'CWE-426', 'CWE-427', 'CWE-428'
      // Includes 14 CWE types from CWE Top 25 2023
    ],
    languages: ['Python'],
    validationMethod: 'hybrid',
    description: 'A carefully curated Python benchmark with 180 samples covering 44 critical CWEs. Split into SecEvalBase (67 examples, 37 CWEs, refined from SecurityEval) and SecEvalPlus (113 examples, 14 CWE types from CWE Top 25 2023).',
    authors: 'Wang et al.',
    keyContribution: 'Refinement of SecurityEval with focus on critical CWEs and CWE Top 25',
    strengths: [
      'Systematic coverage of CWE Top 25 2023',
      'All code is executable and testable',
      'Graduate student validation for quality',
      'Both insecure and secure code examples',
      'Two-part structure: broad coverage + critical focus'
    ],
    limitations: [
      'Python-only limits cross-language insights',
      'Smaller scale compared to automated benchmarks',
      'Builds upon existing SecurityEval foundation',
      'Manual curation limits scalability'
    ],
    datasetSource: 'SecurityEval refinement + CWE Top 25 2023',
    hasTestSuite: true,
    hasSecureExamples: true,
    automatedEvaluation: true
  },
  {
    id: 'seccodeplt',
    name: 'SecCodePLT',
    year: 2024,
    samples: 1345,
    cweCount: 27, // Updated to reflect 27 seed CWEs as mentioned in thesis
    cwes: [
      'CWE-79', 'CWE-89', 'CWE-78', 'CWE-22', 'CWE-434', 'CWE-94', 'CWE-352', 'CWE-611',
      'CWE-798', 'CWE-306', 'CWE-287', 'CWE-269', 'CWE-276', 'CWE-502', 'CWE-521',
      'CWE-918', 'CWE-476', 'CWE-787', 'CWE-119', 'CWE-120', 'CWE-416', 'CWE-415',
      'CWE-190', 'CWE-863', 'CWE-862', 'CWE-732', 'CWE-829'
      // 27 critical Python CWEs from seed tasks
    ],
    languages: ['Python'],
    validationMethod: 'dynamic',
    description: 'A Python-only platform starting from 27 seed tasks covering 27 critical Python CWEs. Using LLM-based mutation, expanded to 1,345 samples total (about 50 samples per CWE with 5 test cases each).',
    authors: 'Yang et al.',
    keyContribution: 'Leverages LLMs for scalable benchmark creation',
    strengths: [
      'Large scale (1,345 samples from 27 seeds)',
      'Dynamic test oracles for each sample',
      'LLM-based generation for scale and variety',
      'Expert-curated seeds with automated expansion',
      'Combines quality (expert seeds) with quantity (LLM mutation)'
    ],
    limitations: [
      'Python-only limits cross-language applicability',
      'Dependent on LLM generation quality',
      'May have less diversity in generation patterns',
      'Mutation-based approach may introduce biases'
    ],
    datasetSource: '27 expert-curated seed tasks + LLM-based mutation',
    hasTestSuite: true,
    hasSecureExamples: true,
    automatedEvaluation: true
  },
  {
    id: 'cweval',
    name: 'CWEval-Bench',
    year: 2025,
    samples: 119,
    cweCount: 31,
    cwes: [
      // 11 C-specific memory vulnerabilities
      'CWE-119', 'CWE-120', 'CWE-476', 'CWE-787', 'CWE-416', 'CWE-415', 'CWE-190', 'CWE-131',
      'CWE-122', 'CWE-125', 'CWE-134', 
      // Cross-language vulnerabilities
      'CWE-79', 'CWE-89', 'CWE-78', 'CWE-22', 'CWE-434',
      'CWE-94', 'CWE-352', 'CWE-611', 'CWE-798', 'CWE-306', 'CWE-287', 'CWE-269', 'CWE-276',
      'CWE-502', 'CWE-521', 'CWE-918', 'CWE-863', 'CWE-862', 'CWE-732', 'CWE-829'
    ],
    languages: ['Python', 'Java', 'JavaScript', 'C', 'C++'],
    validationMethod: 'dynamic',
    description: 'A multilingual benchmark with 119 security-critical tasks spanning 31 CWEs across 5 programming languages. Includes 11 C-specific memory vulnerabilities and emphasizes dynamic analysis with reduced third-party dependencies.',
    authors: 'Peng et al.',
    keyContribution: 'Focus on dynamic analysis for runtime vulnerabilities with multilingual support',
    strengths: [
      'Multilingual support (5 languages)',
      'Dynamic analysis with runtime vulnerability detection',
      'Reduced third-party dependencies for easier setup',
      'Rigorous evaluation with test oracles and reference implementations',
      'Outcome-driven evaluation (CWEval framework)',
      'Special focus on C/C++ memory vulnerabilities'
    ],
    limitations: [
      'Smaller sample size per language (119 total)',
      'Newer benchmark with less community validation',
      'Complex setup across multiple programming languages',
      'May require language-specific compilation environments'
    ],
    datasetSource: 'Multi-language security-critical tasks with clear specifications',
    hasTestSuite: true,
    hasSecureExamples: true,
    automatedEvaluation: true
  },
  {
    id: 'cyberseceval',
    name: 'CyberSecEval',
    year: 2023,
    samples: 1920,
    cweCount: 50,
    cwes: [
      'CWE-79', 'CWE-89', 'CWE-78', 'CWE-22', 'CWE-434', 'CWE-94', 'CWE-352', 'CWE-611',
      'CWE-798', 'CWE-306', 'CWE-287', 'CWE-269', 'CWE-276', 'CWE-502', 'CWE-521',
      'CWE-918', 'CWE-476', 'CWE-787', 'CWE-119', 'CWE-120', 'CWE-416', 'CWE-415',
      'CWE-190', 'CWE-863', 'CWE-862', 'CWE-732', 'CWE-829', 'CWE-20', 'CWE-200',
      'CWE-134', 'CWE-122', 'CWE-125', 'CWE-131', 'CWE-426', 'CWE-427', 'CWE-428',
      'CWE-829', 'CWE-732', 'CWE-276', 'CWE-269', 'CWE-250', 'CWE-252', 'CWE-295',
      'CWE-297', 'CWE-326', 'CWE-327', 'CWE-330', 'CWE-331', 'CWE-335', 'CWE-338', 'CWE-340'
    ],
    languages: ['Python', 'Java', 'JavaScript', 'C', 'C++', 'Go', 'Rust', 'PHP'],
    validationMethod: 'static',
    description: 'A comprehensive automated benchmark from Meta with 189 static analysis rules capturing 50 CWEs across 8 programming languages.',
    authors: 'Bhatt et al. (Meta - Purple Llama Team)',
    keyContribution: 'Large scale, broad language coverage, proactive security',
    strengths: [
      'Largest scale (1,920 samples)',
      'Broad language coverage (8 languages)',
      'Real code examples from open-source repos',
      'Automated static analysis rules'
    ],
    limitations: [
      'Relies on static analysis only',
      'No code execution validation',
      'May miss runtime vulnerabilities',
      'Static rules may have false positives'
    ],
    datasetSource: 'Open-source repository scanning',
    hasTestSuite: false,
    hasSecureExamples: false,
    automatedEvaluation: true
  }
]

// CWE Top 25 2023 for reference
export const CWE_TOP_25_2023 = [
  'CWE-787', 'CWE-79', 'CWE-89', 'CWE-416', 'CWE-78', 'CWE-20', 'CWE-125', 'CWE-22',
  'CWE-352', 'CWE-434', 'CWE-476', 'CWE-502', 'CWE-190', 'CWE-287', 'CWE-798', 'CWE-862',
  'CWE-77', 'CWE-306', 'CWE-119', 'CWE-276', 'CWE-918', 'CWE-362', 'CWE-400', 'CWE-611', 'CWE-94'
]

// Programming languages supported across benchmarks
export const PROGRAMMING_LANGUAGES = [
  'Python', 'C', 'C++', 'Java', 'JavaScript', 'Go', 'Rust', 'PHP'
]

// Validation methodologies
export const VALIDATION_METHODS = [
  { id: 'static', name: 'Static Analysis', description: 'Code analysis without execution' },
  { id: 'dynamic', name: 'Dynamic Analysis', description: 'Runtime testing and execution' },
  { id: 'manual', name: 'Manual Review', description: 'Human expert validation' },
  { id: 'hybrid', name: 'Hybrid Approach', description: 'Combination of methods' }
]
