"use client"

import { SECURITY_BENCHMARKS } from '@/lib/benchmark-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface BenchmarkOverviewProps {
  selectedBenchmarks: string[]
}

export function BenchmarkOverview({ selectedBenchmarks }: BenchmarkOverviewProps) {
  const benchmarks = SECURITY_BENCHMARKS.filter(b => 
    selectedBenchmarks.includes(b.name)
  )

  // Chart data
  const samplesData = benchmarks.map(b => ({
    name: b.name,
    samples: b.samples,
    year: b.year
  }))

  const cweData = benchmarks.map(b => ({
    name: b.name,
    cwes: b.cweCount
  }))

  const validationData = benchmarks.reduce((acc, b) => {
    const existing = acc.find(item => item.method === b.validationMethod)
    if (existing) {
      existing.count += 1
    } else {
      acc.push({ method: b.validationMethod, count: 1 })
    }
    return acc
  }, [] as Array<{ method: string; count: number }>)

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Benchmarks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{benchmarks.length}</div>
            <p className="text-xs text-muted-foreground">
              Security evaluation benchmarks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Samples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {benchmarks.reduce((sum, b) => sum + b.samples, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Test cases across all benchmarks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique CWEs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(benchmarks.flatMap(b => b.cwes)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Distinct vulnerability types
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(benchmarks.flatMap(b => b.languages)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Programming languages covered
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Benchmark Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Benchmark Characteristics</CardTitle>
          <CardDescription>
            Detailed comparison of security benchmark features and scope
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Benchmark</th>
                  <th className="text-left p-2 font-medium">Year</th>
                  <th className="text-left p-2 font-medium">Samples</th>
                  <th className="text-left p-2 font-medium">CWEs</th>
                  <th className="text-left p-2 font-medium">Languages</th>
                  <th className="text-left p-2 font-medium">Validation</th>
                  <th className="text-left p-2 font-medium">Key Contribution</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((benchmark) => (
                  <tr key={benchmark.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{benchmark.name}</div>
                        <div className="text-sm text-muted-foreground">{benchmark.authors}</div>
                      </div>
                    </td>
                    <td className="p-2">{benchmark.year}</td>
                    <td className="p-2">{benchmark.samples.toLocaleString()}</td>
                    <td className="p-2">{benchmark.cweCount}</td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {benchmark.languages.map(lang => (
                          <Badge key={lang} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant="outline">{benchmark.validationMethod}</Badge>
                    </td>
                    <td className="p-2 max-w-xs">
                      <div className="text-sm">{benchmark.keyContribution}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sample Size Distribution</CardTitle>
            <CardDescription>Number of test cases per benchmark</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={samplesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="samples" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CWE Coverage</CardTitle>
            <CardDescription>Number of vulnerability types covered</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cweData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cwes" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Validation Methodology Distribution</CardTitle>
          <CardDescription>How benchmarks validate security vulnerabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={validationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ method, count }) => `${method} (${count})`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {validationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
