"use client"

import { Shield, FileText, Github, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <span className="text-xl font-bold text-foreground">SecureBench</span>
              <span className="text-sm text-muted-foreground ml-2">Research Dashboard</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com/anshulchahar/benchcom" target="_blank">
                <Github className="h-4 w-4 mr-2" />
                Repository
              </Link>
            </Button>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Analysis
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
