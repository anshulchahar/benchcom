// Research-focused types for benchmark analysis
export interface SecurityBenchmark {
  id: string
  name: string
  year: number
  samples: number
  cweCount: number
  cwes: string[] // List of CWE IDs covered
  languages: string[]
  validationMethod: 'static' | 'dynamic' | 'manual' | 'hybrid'
  description: string
  authors: string
  keyContribution: string
  strengths: string[]
  limitations: string[]
  datasetSource: string
  hasTestSuite: boolean
  hasSecureExamples: boolean
  automatedEvaluation: boolean
}

// CWE (Common Weakness Enumeration) types
export interface CWEInfo {
  id: string
  name: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: string
  isTop25: boolean // CWE Top 25 2023
  coveredByBenchmarks: string[] // Which benchmarks cover this CWE
}

// Analysis results
export interface CoverageAnalysis {
  totalCWEs: number
  uniqueCWEs: string[]
  overlapMatrix: Record<string, Record<string, number>>
  gapsCWEs: string[] // CWEs not covered by any benchmark
  languageCoverage: Record<string, string[]> // language -> benchmarks
  validationCoverage: Record<string, string[]> // method -> benchmarks
}

// Comparison metrics
export interface BenchmarkComparison {
  metric: string
  benchmarks: Record<string, number | string>
}

// Research insights
export interface ResearchInsight {
  type: 'coverage_gap' | 'overlap' | 'methodology' | 'language_bias'
  title: string
  description: string
  affectedBenchmarks: string[]
  recommendation: string
  severity: 'low' | 'medium' | 'high'
}

// Chart data for visualizations
export interface ComparisonChartData {
  name: string
  [key: string]: string | number
}

export interface HeatmapCell {
  benchmark1: string
  benchmark2: string
  overlapCount: number
  overlapPercentage: number
}

// Export configuration
export interface ResearchExportConfig {
  includeRawData: boolean
  includeAnalysis: boolean
  includeVisualizations: boolean
  format: 'json' | 'csv' | 'xlsx' | 'pdf'
  sections: string[]
}
