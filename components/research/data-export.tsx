"use client"

import { SECURITY_BENCHMARKS } from '@/lib/benchmark-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Download, FileJson, FileText, FileSpreadsheet, FileImage } from 'lucide-react'
import { useState } from 'react'

interface DataExportProps {
  selectedBenchmarks: string[]
}

export function DataExport({ selectedBenchmarks }: DataExportProps) {
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'xlsx' | 'pdf'>('json')
  const [includeRawData, setIncludeRawData] = useState(true)
  const [includeAnalysis, setIncludeAnalysis] = useState(true)
  const [includeVisualizations, setIncludeVisualizations] = useState(false)
  const [customNotes, setCustomNotes] = useState('')

  const benchmarks = SECURITY_BENCHMARKS.filter(b => 
    selectedBenchmarks.includes(b.name)
  )

  const exportOptions = [
    {
      format: 'json' as const,
      icon: FileJson,
      name: 'JSON',
      description: 'Machine-readable data format',
      size: '~50KB'
    },
    {
      format: 'csv' as const,
      icon: FileSpreadsheet,
      name: 'CSV',
      description: 'Spreadsheet compatible format',
      size: '~30KB'
    },
    {
      format: 'xlsx' as const,
      icon: FileSpreadsheet,
      name: 'Excel',
      description: 'Microsoft Excel format',
      size: '~40KB'
    },
    {
      format: 'pdf' as const,
      icon: FileText,
      name: 'PDF Report',
      description: 'Publication-ready document',
      size: '~2MB'
    }
  ]

  const handleExport = () => {
    // Prepare export data
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        exportFormat,
        selectedBenchmarks,
        includeRawData,
        includeAnalysis,
        includeVisualizations,
        customNotes,
        totalBenchmarks: benchmarks.length,
        totalSamples: benchmarks.reduce((sum, b) => sum + b.samples, 0),
        totalCWEs: new Set(benchmarks.flatMap(b => b.cwes)).size
      },
      benchmarks: includeRawData ? benchmarks : undefined,
      analysis: includeAnalysis ? {
        cweOverlap: generateCWEOverlapMatrix(),
        languageCoverage: generateLanguageCoverage(),
        validationMethodDistribution: generateValidationDistribution(),
        gapAnalysis: generateGapAnalysis()
      } : undefined
    }

    // Simulate export (in real implementation, this would generate and download the file)
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `securebench-analysis-${new Date().toISOString().split('T')[0]}.${exportFormat}`
    link.click()
    URL.revokeObjectURL(url)
  }

  const generateCWEOverlapMatrix = () => {
    return benchmarks.map(benchmark => ({
      benchmark: benchmark.name,
      overlaps: benchmarks.map(other => ({
        with: other.name,
        commonCWEs: benchmark.cwes.filter(cwe => other.cwes.includes(cwe)).length,
        percentage: other.id === benchmark.id ? 100 : 
          (benchmark.cwes.filter(cwe => other.cwes.includes(cwe)).length / benchmark.cweCount) * 100
      }))
    }))
  }

  const generateLanguageCoverage = () => {
    const allLanguages = new Set(benchmarks.flatMap(b => b.languages))
    return Array.from(allLanguages).map(lang => ({
      language: lang,
      benchmarks: benchmarks.filter(b => b.languages.includes(lang)).map(b => b.name),
      totalSamples: benchmarks
        .filter(b => b.languages.includes(lang))
        .reduce((sum, b) => sum + b.samples, 0)
    }))
  }

  const generateValidationDistribution = () => {
    const distribution = new Map()
    benchmarks.forEach(b => {
      distribution.set(b.validationMethod, (distribution.get(b.validationMethod) || 0) + 1)
    })
    return Array.from(distribution.entries()).map(([method, count]) => ({
      method,
      count,
      percentage: (count / benchmarks.length) * 100
    }))
  }

  const generateGapAnalysis = () => {
    const allCWEs = new Set(benchmarks.flatMap(b => b.cwes))
    const allLanguages = new Set(benchmarks.flatMap(b => b.languages))
    
    return {
      totalUniqueCWEs: allCWEs.size,
      totalLanguages: allLanguages.size,
      benchmarkCount: benchmarks.length,
      averageSamplesPerBenchmark: benchmarks.reduce((sum, b) => sum + b.samples, 0) / benchmarks.length,
      validationMethodGaps: ['static', 'dynamic', 'manual', 'hybrid'].filter(
        method => !benchmarks.some(b => b.validationMethod === method)
      )
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Export Research Data</CardTitle>
          <CardDescription>
            Generate reports and datasets for your security benchmark analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export Format Selection */}
          <div>
            <Label className="text-base font-medium">Export Format</Label>
            <div className="grid gap-3 mt-3 sm:grid-cols-2 lg:grid-cols-4">
              {exportOptions.map((option) => {
                const Icon = option.icon
                return (
                  <div
                    key={option.format}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      exportFormat === option.format
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setExportFormat(option.format)}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-8 w-8 text-primary" />
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                        <div className="text-xs text-muted-foreground">{option.size}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Export Options */}
          <div>
            <Label className="text-base font-medium">Export Options</Label>
            <div className="space-y-3 mt-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="raw-data"
                  checked={includeRawData}
                  onCheckedChange={(checked) => setIncludeRawData(checked as boolean)}
                />
                <Label htmlFor="raw-data">Include raw benchmark data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="analysis"
                  checked={includeAnalysis}
                  onCheckedChange={(checked) => setIncludeAnalysis(checked as boolean)}
                />
                <Label htmlFor="analysis">Include comparative analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="visualizations"
                  checked={includeVisualizations}
                  onCheckedChange={(checked) => setIncludeVisualizations(checked as boolean)}
                />
                <Label htmlFor="visualizations">Include chart visualizations (PDF only)</Label>
              </div>
            </div>
          </div>

          {/* Custom Notes */}
          <div>
            <Label htmlFor="notes" className="text-base font-medium">Research Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any custom notes or observations about your analysis..."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="mt-2"
              rows={4}
            />
          </div>

          {/* Export Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Export Summary</h4>
            <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <div>• {benchmarks.length} benchmarks selected</div>
              <div>• {benchmarks.reduce((sum, b) => sum + b.samples, 0).toLocaleString()} total samples</div>
              <div>• {new Set(benchmarks.flatMap(b => b.cwes)).size} unique CWEs</div>
              <div>• {new Set(benchmarks.flatMap(b => b.languages)).size} programming languages</div>
            </div>
          </div>

          {/* Export Button */}
          <Button onClick={handleExport} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Export {exportFormat.toUpperCase()} Report
          </Button>
        </CardContent>
      </Card>

      {/* Quick Export Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Benchmark Data</CardTitle>
            <CardDescription className="text-sm">Raw benchmark information</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {
                setExportFormat('json')
                setIncludeRawData(true)
                setIncludeAnalysis(false)
                handleExport()
              }}
            >
              <FileJson className="h-4 w-4 mr-2" />
              Export JSON
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Analysis Report</CardTitle>
            <CardDescription className="text-sm">Comparative analysis results</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {
                setExportFormat('pdf')
                setIncludeRawData(false)
                setIncludeAnalysis(true)
                setIncludeVisualizations(true)
                handleExport()
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Research Dataset</CardTitle>
            <CardDescription className="text-sm">Complete data for further analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {
                setExportFormat('xlsx')
                setIncludeRawData(true)
                setIncludeAnalysis(true)
                handleExport()
              }}
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Citation Data</CardTitle>
            <CardDescription className="text-sm">Reference information for papers</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {
                const citationData = benchmarks.map(b => ({
                  name: b.name,
                  authors: b.authors,
                  year: b.year,
                  description: b.description,
                  keyContribution: b.keyContribution
                }))
                const dataStr = JSON.stringify(citationData, null, 2)
                const dataBlob = new Blob([dataStr], { type: 'application/json' })
                const url = URL.createObjectURL(dataBlob)
                const link = document.createElement('a')
                link.href = url
                link.download = 'benchmark-citations.json'
                link.click()
                URL.revokeObjectURL(url)
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Citations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
