"use client"

import { useState } from 'react'
import { Header } from '@/components/research/header'
import { BenchmarkOverview } from '@/components/research/benchmark-overview'
import { CWECoverageAnalysis } from '@/components/research/cwe-coverage-analysis'
import { LanguageSupport } from '@/components/research/language-support'
import { ValidationMethodology } from '@/components/research/validation-methodology'
import { GapAnalysis } from '@/components/research/gap-analysis'
import { DataExport } from '@/components/research/data-export'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ResearchDashboard() {
  const [selectedBenchmarks, setSelectedBenchmarks] = useState<string[]>([
    'SecurityEval',
    'CODEGUARD+',
    'CodeSecEval',
    'SecCodePLT',
    'CWEval-Bench',
    'CyberSecEval'
  ])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Secure Code Generation Benchmark Analysis
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Comparative analysis of six security benchmarks: SecurityEval, CODEGUARD+, 
            CodeSecEval, SecCodePLT, CWEval-Bench, and CyberSecEval. Explore coverage patterns, 
            identify gaps, and generate insights for research.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
                      <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cwe-coverage">CWE Coverage</TabsTrigger>
              <TabsTrigger value="languages">Languages</TabsTrigger>
              <TabsTrigger value="validation">Validation</TabsTrigger>
              <TabsTrigger value="gap-analysis">Gap Analysis</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <BenchmarkOverview selectedBenchmarks={selectedBenchmarks} />
          </TabsContent>

          <TabsContent value="cwe-coverage" className="space-y-6">
            <CWECoverageAnalysis selectedBenchmarks={selectedBenchmarks} />
          </TabsContent>

          <TabsContent value="languages">
            <LanguageSupport selectedBenchmarks={selectedBenchmarks} />
          </TabsContent>
          
          <TabsContent value="validation">
            <ValidationMethodology selectedBenchmarks={selectedBenchmarks} />
          </TabsContent>
          
          <TabsContent value="gap-analysis">
            <GapAnalysis selectedBenchmarks={selectedBenchmarks} />
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <DataExport selectedBenchmarks={selectedBenchmarks} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
