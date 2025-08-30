"use client"

import { SECURITY_BENCHMARKS, VALIDATION_METHODS } from '@/lib/benchmark-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

interface ValidationMethodologyProps {
  selectedBenchmarks: string[]
}

export function ValidationMethodology({ selectedBenchmarks }: ValidationMethodologyProps) {
  const benchmarks = SECURITY_BENCHMARKS.filter(b => 
    selectedBenchmarks.includes(b.name)
  )

  // Validation method distribution
  const validationDistribution = VALIDATION_METHODS.map(method => {
    const usingMethod = benchmarks.filter(b => b.validationMethod === method.id)
    return {
      method: method.name,
      id: method.id,
      description: method.description,
      count: usingMethod.length,
      benchmarks: usingMethod.map(b => b.name),
      totalSamples: usingMethod.reduce((sum, b) => sum + b.samples, 0)
    }
  }).filter(item => item.count > 0)

  // Feature analysis
  const featureAnalysis = [
    {
      feature: 'Has Test Suite',
      benchmarks: benchmarks.map(b => ({
        name: b.name,
        hasFeature: b.hasTestSuite
      }))
    },
    {
      feature: 'Has Secure Examples',
      benchmarks: benchmarks.map(b => ({
        name: b.name,
        hasFeature: b.hasSecureExamples
      }))
    },
    {
      feature: 'Automated Evaluation',
      benchmarks: benchmarks.map(b => ({
        name: b.name,
        hasFeature: b.automatedEvaluation
      }))
    }
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div className="space-y-6">
      {/* Validation Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Static Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {benchmarks.filter(b => b.validationMethod === 'static').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Benchmarks using static analysis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dynamic Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {benchmarks.filter(b => b.validationMethod === 'dynamic').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Benchmarks using dynamic testing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {benchmarks.filter(b => b.automatedEvaluation).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Fully automated benchmarks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Test Suites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {benchmarks.filter(b => b.hasTestSuite).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Benchmarks with executable tests
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Validation Method Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Validation Methodology Comparison</CardTitle>
          <CardDescription>
            How each benchmark validates security vulnerabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Benchmark</th>
                  <th className="text-left p-2 font-medium">Validation Method</th>
                  <th className="text-left p-2 font-medium">Test Suite</th>
                  <th className="text-left p-2 font-medium">Secure Examples</th>
                  <th className="text-left p-2 font-medium">Automated</th>
                  <th className="text-left p-2 font-medium">Key Strengths</th>
                  <th className="text-left p-2 font-medium">Limitations</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((benchmark) => (
                  <tr key={benchmark.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div className="font-medium">{benchmark.name}</div>
                    </td>
                    <td className="p-2">
                      <Badge variant={
                        benchmark.validationMethod === 'static' ? 'secondary' :
                        benchmark.validationMethod === 'dynamic' ? 'default' :
                        benchmark.validationMethod === 'hybrid' ? 'destructive' : 'outline'
                      }>
                        {benchmark.validationMethod}
                      </Badge>
                    </td>
                    <td className="p-2 text-center">
                      {benchmark.hasTestSuite ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="p-2 text-center">
                      {benchmark.hasSecureExamples ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="p-2 text-center">
                      {benchmark.automatedEvaluation ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500 mx-auto" />
                      )}
                    </td>
                    <td className="p-2 max-w-xs">
                      <ul className="text-xs text-muted-foreground">
                        {benchmark.strengths.slice(0, 2).map((strength, index) => (
                          <li key={index}>• {strength}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-2 max-w-xs">
                      <ul className="text-xs text-muted-foreground">
                        {benchmark.limitations.slice(0, 2).map((limitation, index) => (
                          <li key={index}>• {limitation}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Feature Analysis Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Analysis Matrix</CardTitle>
          <CardDescription>
            Evaluation capabilities across benchmarks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {featureAnalysis.map((feature) => (
              <div key={feature.feature} className="space-y-3">
                <h4 className="font-medium text-sm">{feature.feature}</h4>
                <div className="space-y-2">
                  {feature.benchmarks.map((benchmark) => (
                    <div key={benchmark.name} className="flex items-center justify-between">
                      <span className="text-sm">{benchmark.name}</span>
                      {benchmark.hasFeature ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Validation Method Distribution</CardTitle>
            <CardDescription>Approaches used to validate security</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={validationDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ method, count }) => `${method} (${count})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {validationDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Samples by Validation Method</CardTitle>
            <CardDescription>Total test cases for each validation approach</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={validationDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalSamples" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Methodology Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Methodology Insights</CardTitle>
          <CardDescription>
            Key observations about validation approaches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-green-600">Strengths</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {validationDistribution.find(v => v.id === 'dynamic')?.count || 0} benchmarks use dynamic analysis for runtime validation</li>
                <li>• {benchmarks.filter(b => b.hasTestSuite).length} benchmarks provide executable test suites</li>
                <li>• {benchmarks.filter(b => b.hasSecureExamples).length} benchmarks include correct/secure code examples</li>
                <li>• Hybrid approaches combine multiple validation methods</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-red-600">Limitations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Static analysis may miss runtime vulnerabilities</li>
                <li>• Manual validation doesn't scale effectively</li>
                <li>• {benchmarks.filter(b => !b.hasTestSuite).length} benchmarks lack executable validation</li>
                <li>• Limited cross-validation between different approaches</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
