# SecureBench Research Dashboard

A research-focused dashboard for comparative analysis of secure code generation benchmarks. This tool supports thesis research on evaluating the effectiveness of existing security benchmarks for LLMs.

## 🎯 Research Focus

This dashboard enables systematic comparison of six security benchmarks:
- **SecurityEval** (Siddiq & Santos, 2022) - 130 Python samples, 75 CWEs
- **CODEGUARD+** (Fu et al., 2024) - 91 samples, 34 CWEs, C/C++/Python 
- **CodeSecEval** (Wang et al., 2024) - 180 samples, 44 CWEs including Top 25
- **SecCodePLT** (Yang et al., 2024) - 1,345 samples, 27 CWEs, Python-only
- **CWEval-Bench** (Peng et al., 2025) - 119 samples, 31 CWEs, 5 languages
- **CyberSecEval** (Meta, 2023) - 1,920 samples, 50 CWEs, 8 languages

## 🔬 Research Questions

- What is the spectrum of vulnerabilities covered by these benchmarks?
- How effective are they at identifying and categorizing insecure code?
- What are the gaps in CWE coverage and language support?
- How do validation methodologies differ and impact effectiveness?

## 🚀 Features

### Benchmark Overview
- Comparative table of all 6 benchmarks
- Key metrics: samples, CWEs, languages, methodology
- Timeline visualization showing benchmark evolution

### CWE Coverage Analysis
- Heatmap showing CWE coverage across benchmarks
- Gap analysis highlighting uncovered vulnerabilities
- Focus on CWE Top 25 critical weaknesses

### Language Support Analysis
- Multi-language coverage comparison
- Language-specific vulnerability patterns
- Bias analysis toward specific programming languages

### Validation Methodology Comparison
- Static vs Dynamic analysis approaches
- Test suite availability and quality
- Automation levels and manual review processes

### Interactive Visualizations
- Radar charts for multi-dimensional comparison
- Overlap matrices between benchmarks
- Gap identification and recommendations

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: TailwindCSS with ShadCN UI
- **Visualization**: Recharts for interactive charts
- **Data**: Static analysis of published benchmark data

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/anshulchahar/benchcom.git
cd benchcom
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Fill in your environment variables:
- Supabase project URL and anon key
- OpenAI API key
- Other LLM provider API keys (optional)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
benchcom/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # ShadCN UI components
│   ├── features.tsx      # Features section
│   ├── footer.tsx        # Footer component
│   ├── hero.tsx          # Hero section
│   ├── navbar.tsx        # Navigation bar
│   └── theme-provider.tsx # Theme provider
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🎯 Supported Benchmarks

| Benchmark | Description | Status |
|-----------|-------------|--------|
| SecurityEval | Comprehensive security evaluation framework | ✅ Supported |
| CODEGUARD+ | Advanced code security assessment | ✅ Supported |
| CodeSecEval | Code security evaluation benchmark | ✅ Supported |
| SecCodePLT | Security-focused code generation testing | ✅ Supported |
| CWEval-Bench | Common Weakness Enumeration evaluation | ✅ Supported |
| CyberSecEval | Cybersecurity evaluation framework | ✅ Supported |

## 🤖 Supported LLMs

- OpenAI GPT-3.5 Turbo
- OpenAI GPT-4
- OpenAI GPT-4 Turbo
- (More providers coming soon via MCP integration)

## 🛣 Roadmap

- [ ] Complete dashboard implementation
- [ ] Add real-time benchmark execution
- [ ] Implement collaborative features
- [ ] Add more LLM providers
- [ ] Create plugin system for custom benchmarks
- [ ] Add cost optimization features
- [ ] Implement CI/CD integration

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to the security research community for developing these benchmarks
- Built with amazing open-source tools and libraries

## 📞 Support

For support, email contact@securebench.com or join our [Discord community](https://discord.gg/securebench).

---

**SecureBench** - Making security benchmark evaluation accessible and collaborative.