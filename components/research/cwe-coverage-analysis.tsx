"use client"

import { SECURITY_BENCHMARKS, CWE_TOP_25_2023 } from '@/lib/benchmark-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface CWECoverageAnalysisProps {
  selectedBenchmarks: string[]
}

export function CWECoverageAnalysis({ selectedBenchmarks }: CWECoverageAnalysisProps) {
  const [showOnlyTop25, setShowOnlyTop25] = useState(false)
  
  const benchmarks = SECURITY_BENCHMARKS.filter(b => 
    selectedBenchmarks.includes(b.name)
  )

  // Get all unique CWEs
  const allCWEs = new Set(benchmarks.flatMap(b => b.cwes))
  const cwesToAnalyze = showOnlyTop25 ? 
    Array.from(allCWEs).filter(cwe => CWE_TOP_25_2023.includes(cwe)) :
    Array.from(allCWEs)

  // Create coverage matrix
  const coverageMatrix = cwesToAnalyze.map(cwe => {
    const coverage = benchmarks.reduce((acc, benchmark) => {
      acc[benchmark.name] = benchmark.cwes.includes(cwe) ? 1 : 0
      return acc
    }, {} as Record<string, number>)
    
    const totalCoverage = Object.values(coverage).reduce((sum, val) => sum + val, 0)
    
    return {
      cwe,
      ...coverage,
      total: totalCoverage,
      isTop25: CWE_TOP_25_2023.includes(cwe)
    }
  })

  // Sort by coverage (most covered first)
  const sortedCoverage = coverageMatrix.sort((a, b) => b.total - a.total)

  // Coverage statistics
  const totalCWEs = cwesToAnalyze.length
  const coveredByAll = sortedCoverage.filter(item => item.total === benchmarks.length).length
  const coveredByNone = sortedCoverage.filter(item => item.total === 0).length
  const top25Coverage = CWE_TOP_25_2023.filter(cwe => allCWEs.has(cwe)).length

  // Benchmark overlap analysis
  const benchmarkOverlap = benchmarks.map(benchmark => {
    const overlapData = benchmarks.map(otherBenchmark => {
      if (benchmark.id === otherBenchmark.id) return { name: otherBenchmark.name, overlap: benchmark.cweCount }
      
      const overlap = benchmark.cwes.filter(cwe => otherBenchmark.cwes.includes(cwe)).length
      return { name: otherBenchmark.name, overlap }
    })
    
    return {
      benchmark: benchmark.name,
      data: overlapData
    }
  })

  return (
    <div className="space-y-6">
      {/* Coverage Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total CWEs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCWEs}</div>
            <p className="text-xs text-muted-foreground">
              Unique vulnerability types
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CWE Top 25 Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{top25Coverage}/25</div>
            <Progress value={(top25Coverage / 25) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Critical vulnerabilities covered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Universal Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coveredByAll}</div>
            <p className="text-xs text-muted-foreground">
              CWEs covered by all benchmarks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coverage Gaps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coveredByNone}</div>
            <p className="text-xs text-muted-foreground">
              CWEs with no coverage
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle>CWE Coverage Analysis</CardTitle>
          <CardDescription>
            Analyze which vulnerability types are covered by each benchmark
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant={showOnlyTop25 ? "default" : "outline"}
              onClick={() => setShowOnlyTop25(!showOnlyTop25)}
            >
              {showOnlyTop25 ? "Show All CWEs" : "Show CWE Top 25 Only"}
            </Button>
            <div className="text-sm text-muted-foreground">
              {showOnlyTop25 ? `Showing ${cwesToAnalyze.length} critical CWEs` : `Showing all ${cwesToAnalyze.length} CWEs`}
            </div>
          </div>

          {/* Coverage Matrix */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">CWE</th>
                  <th className="text-left p-2 font-medium">Coverage</th>
                  {benchmarks.map(benchmark => (
                    <th key={benchmark.id} className="text-center p-2 font-medium">
                      {benchmark.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedCoverage.slice(0, 20).map((item) => (
                  <tr key={item.cwe} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono">{item.cwe}</span>
                        {item.isTop25 && (
                          <Badge variant="destructive" className="text-xs">Top 25</Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.total}/{benchmarks.length}</span>
                        <Progress value={(item.total / benchmarks.length) * 100} className="w-20" />
                      </div>
                    </td>
                    {benchmarks.map(benchmark => (
                      <td key={benchmark.id} className="text-center p-2">
                        {(item as any)[benchmark.name] ? (
                          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
                        ) : (
                          <div className="w-4 h-4 bg-gray-300 rounded-full mx-auto"></div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedCoverage.length > 20 && (
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Showing top 20 CWEs. Total: {sortedCoverage.length}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Benchmark Overlap Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Benchmark Overlap Analysis</CardTitle>
          <CardDescription>
            How many CWEs are shared between different benchmarks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Benchmark</th>
                  {benchmarks.map(benchmark => (
                    <th key={benchmark.id} className="text-center p-2 font-medium">
                      {benchmark.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {benchmarkOverlap.map((row) => (
                  <tr key={row.benchmark} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{row.benchmark}</td>
                    {row.data.map((cell, index) => (
                      <td key={index} className="text-center p-2">
                        <div className={`px-2 py-1 rounded text-xs ${
                          cell.name === row.benchmark 
                            ? 'bg-primary text-primary-foreground font-bold' 
                            : cell.overlap > 20 
                            ? 'bg-green-100 text-green-800' 
                            : cell.overlap > 10 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {cell.overlap}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            Diagonal shows total CWE count for each benchmark. Colors indicate overlap intensity.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
