"use client"

import { SECURITY_BENCHMARKS, CWE_TOP_25_2023, PROGRAMMING_LANGUAGES } from '@/lib/benchmark-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, Info, TrendingUp, Target } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface GapAnalysisProps {
  selectedBenchmarks: string[]
}

export function GapAnalysis({ selectedBenchmarks }: GapAnalysisProps) {
  const benchmarks = SECURITY_BENCHMARKS.filter(b => 
    selectedBenchmarks.includes(b.name)
  )

  // CWE coverage gaps
  const allCWEs = new Set(benchmarks.flatMap(b => b.cwes))
  const uncoveredTop25 = CWE_TOP_25_2023.filter(cwe => !allCWEs.has(cwe))
  const coveredTop25 = CWE_TOP_25_2023.filter(cwe => allCWEs.has(cwe))

  // Language gaps
  const coveredLanguages = new Set(benchmarks.flatMap(b => b.languages))
  const uncoveredLanguages = PROGRAMMING_LANGUAGES.filter(lang => !coveredLanguages.has(lang))

  // Validation methodology gaps
  const validationMethods = new Set(benchmarks.map(b => b.validationMethod))
  const allValidationMethods: Array<'static' | 'dynamic' | 'manual' | 'hybrid'> = ['static', 'dynamic', 'manual', 'hybrid']
  const missingValidationMethods = allValidationMethods.filter(
    method => !validationMethods.has(method)
  )

  // Scale and scope analysis
  const totalSamples = benchmarks.reduce((sum, b) => sum + b.samples, 0)
  const averageSamples = totalSamples / benchmarks.length
  const smallBenchmarks = benchmarks.filter(b => b.samples < averageSamples)
  const largeBenchmarks = benchmarks.filter(b => b.samples > averageSamples)

  // Overlap analysis - benchmarks with significant overlap
  const overlapAnalysis = benchmarks.map(benchmark => {
    const overlaps = benchmarks
      .filter(other => other.id !== benchmark.id)
      .map(other => {
        const commonCWEs = benchmark.cwes.filter(cwe => other.cwes.includes(cwe))
        return {
          benchmark: other.name,
          overlapCount: commonCWEs.length,
          overlapPercentage: (commonCWEs.length / benchmark.cweCount) * 100
        }
      })
      .filter(overlap => overlap.overlapPercentage > 50)
    
    return {
      benchmark: benchmark.name,
      significantOverlaps: overlaps
    }
  }).filter(item => item.significantOverlaps.length > 0)

  // Research insights and recommendations
  const insights = [
    {
      type: 'critical',
      title: 'CWE Top 25 Coverage Gap',
      description: `${uncoveredTop25.length} critical vulnerabilities from CWE Top 25 2023 are not covered by any benchmark`,
      recommendation: 'Focus on adding coverage for these high-priority vulnerabilities',
      affectedCWEs: uncoveredTop25
    },
    {
      type: 'warning',
      title: 'Language Diversity Limited',
      description: `Only ${coveredLanguages.size}/${PROGRAMMING_LANGUAGES.length} programming languages are covered`,
      recommendation: 'Expand language coverage, especially for emerging languages',
      affectedLanguages: uncoveredLanguages
    },
    {
      type: 'info',
      title: 'Validation Method Bias',
      description: `${benchmarks.filter(b => b.validationMethod === 'static').length} benchmarks rely primarily on static analysis`,
      recommendation: 'Balance with more dynamic and runtime testing approaches',
      details: validationMethods
    },
    {
      type: 'opportunity',
      title: 'Scale Imbalance',
      description: `${smallBenchmarks.length} benchmarks have below-average sample sizes`,
      recommendation: 'Consider expanding smaller benchmarks or creating consolidated versions',
      affectedBenchmarks: smallBenchmarks.map(b => b.name)
    }
  ]

  return (
    <div className="space-y-6">
      {/* Gap Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top 25 CWE Gaps</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{uncoveredTop25.length}</div>
            <Progress value={((25 - uncoveredTop25.length) / 25) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Critical vulnerabilities missing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Language Gaps</CardTitle>
            <Info className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{uncoveredLanguages.length}</div>
            <Progress value={((PROGRAMMING_LANGUAGES.length - uncoveredLanguages.length) / PROGRAMMING_LANGUAGES.length) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Languages not covered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Overlap</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{overlapAnalysis.length}</div>
            <p className="text-xs text-muted-foreground">
              Benchmarks with {'>'}50% CWE overlap
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique CWEs</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{allCWEs.size}</div>
            <p className="text-xs text-muted-foreground">
              Total distinct vulnerabilities
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Gaps */}
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <Alert key={index} className={
            insight.type === 'critical' ? 'border-red-200 bg-red-50' :
            insight.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
            insight.type === 'info' ? 'border-blue-200 bg-blue-50' :
            'border-green-200 bg-green-50'
          }>
            <AlertTriangle className={`h-4 w-4 ${
              insight.type === 'critical' ? 'text-red-500' :
              insight.type === 'warning' ? 'text-yellow-500' :
              insight.type === 'info' ? 'text-blue-500' :
              'text-green-500'
            }`} />
            <AlertTitle>{insight.title}</AlertTitle>
            <AlertDescription>
              <div className="mt-2">
                <p>{insight.description}</p>
                <p className="mt-2 text-sm font-medium">Recommendation: {insight.recommendation}</p>
                {insight.affectedCWEs && (
                  <div className="mt-2">
                    <p className="text-xs font-medium">Missing CWEs:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {insight.affectedCWEs.slice(0, 5).map(cwe => (
                        <Badge key={cwe} variant="destructive" className="text-xs">{cwe}</Badge>
                      ))}
                      {insight.affectedCWEs.length > 5 && (
                        <Badge variant="outline" className="text-xs">+{insight.affectedCWEs.length - 5} more</Badge>
                      )}
                    </div>
                  </div>
                )}
                {insight.affectedLanguages && (
                  <div className="mt-2">
                    <p className="text-xs font-medium">Missing Languages:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {insight.affectedLanguages.map(lang => (
                        <Badge key={lang} variant="secondary" className="text-xs">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Detailed Gap Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>CWE Coverage Gaps</CardTitle>
            <CardDescription>
              Critical vulnerabilities not covered by any benchmark
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Uncovered CWE Top 25 ({uncoveredTop25.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {uncoveredTop25.map(cwe => (
                    <Badge key={cwe} variant="destructive" className="text-xs">{cwe}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Covered CWE Top 25 ({coveredTop25.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {coveredTop25.slice(0, 10).map(cwe => (
                    <Badge key={cwe} variant="default" className="text-xs">{cwe}</Badge>
                  ))}
                  {coveredTop25.length > 10 && (
                    <Badge variant="outline" className="text-xs">+{coveredTop25.length - 10} more</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benchmark Overlap Analysis</CardTitle>
            <CardDescription>
              Significant CWE overlaps between benchmarks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overlapAnalysis.length > 0 ? (
                overlapAnalysis.map(item => (
                  <div key={item.benchmark} className="border rounded p-3">
                    <div className="font-medium text-sm mb-2">{item.benchmark}</div>
                    {item.significantOverlaps.map(overlap => (
                      <div key={overlap.benchmark} className="text-xs text-muted-foreground">
                        {overlap.overlapPercentage.toFixed(1)}% overlap with {overlap.benchmark} ({overlap.overlapCount} CWEs)
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No significant overlaps detected ({'>'}50% CWE overlap)</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Research Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Research Recommendations</CardTitle>
          <CardDescription>
            Suggested improvements for comprehensive security evaluation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-blue-600">Immediate Priorities</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Address {uncoveredTop25.length} missing CWE Top 25 vulnerabilities</li>
                <li>• Expand validation beyond static analysis</li>
                <li>• Improve cross-language coverage</li>
                <li>• Standardize evaluation metrics</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-green-600">Long-term Goals</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Create unified benchmark platform</li>
                <li>• Develop cross-validation methodology</li>
                <li>• Build real-world vulnerability database</li>
                <li>• Establish benchmark effectiveness metrics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
