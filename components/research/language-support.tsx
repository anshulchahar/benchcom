"use client"

import { SECURITY_BENCHMARKS, PROGRAMMING_LANGUAGES } from '@/lib/benchmark-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface LanguageSupportProps {
  selectedBenchmarks: string[]
}

export function LanguageSupport({ selectedBenchmarks }: LanguageSupportProps) {
  const benchmarks = SECURITY_BENCHMARKS.filter(b => 
    selectedBenchmarks.includes(b.name)
  )

  // Language coverage analysis
  const languageCoverage = PROGRAMMING_LANGUAGES.map(lang => {
    const supportingBenchmarks = benchmarks.filter(b => b.languages.includes(lang))
    return {
      language: lang,
      benchmarkCount: supportingBenchmarks.length,
      benchmarks: supportingBenchmarks.map(b => b.name),
      totalSamples: supportingBenchmarks.reduce((sum, b) => sum + b.samples, 0)
    }
  }).filter(item => item.benchmarkCount > 0)

  // Benchmark language distribution
  const benchmarkLanguageData = benchmarks.map(b => ({
    name: b.name,
    languageCount: b.languages.length,
    languages: b.languages.join(', ')
  }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#8DD1E1']

  return (
    <div className="space-y-6">
      {/* Language Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{languageCoverage.length}</div>
            <p className="text-xs text-muted-foreground">
              Programming languages covered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Python Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {languageCoverage.find(l => l.language === 'Python')?.benchmarkCount || 0}/{benchmarks.length}
            </div>
            <Progress 
              value={((languageCoverage.find(l => l.language === 'Python')?.benchmarkCount || 0) / benchmarks.length) * 100} 
              className="mt-2" 
            />
            <p className="text-xs text-muted-foreground mt-1">
              Most covered language
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Multi-language</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {benchmarks.filter(b => b.languages.length > 1).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Benchmarks supporting multiple languages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">C/C++ Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {languageCoverage.filter(l => ['C', 'C++'].includes(l.language)).reduce((sum, l) => sum + l.benchmarkCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Memory-safety focused benchmarks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Language Coverage Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Language Coverage Analysis</CardTitle>
          <CardDescription>
            Which programming languages are supported by each benchmark
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Language</th>
                  <th className="text-left p-2 font-medium">Benchmark Coverage</th>
                  <th className="text-left p-2 font-medium">Total Samples</th>
                  <th className="text-left p-2 font-medium">Supporting Benchmarks</th>
                </tr>
              </thead>
              <tbody>
                {languageCoverage
                  .sort((a, b) => b.benchmarkCount - a.benchmarkCount)
                  .map((item) => (
                  <tr key={item.language} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <Badge variant={item.language === 'Python' ? 'default' : 'secondary'}>
                        {item.language}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.benchmarkCount}/{benchmarks.length}</span>
                        <Progress value={(item.benchmarkCount / benchmarks.length) * 100} className="w-20" />
                      </div>
                    </td>
                    <td className="p-2">{item.totalSamples.toLocaleString()}</td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {item.benchmarks.map(benchmark => (
                          <Badge key={benchmark} variant="outline" className="text-xs">
                            {benchmark}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Benchmark Language Focus */}
      <Card>
        <CardHeader>
          <CardTitle>Benchmark Language Focus</CardTitle>
          <CardDescription>
            Number of languages supported per benchmark
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={benchmarkLanguageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value, name, props) => [
                `${value} languages`,
                props.payload.languages
              ]} />
              <Bar dataKey="languageCount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
