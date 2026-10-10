$root = Split-Path -Parent $PSScriptRoot
$files = @(
  'src/App.jsx',
  'src/index.css',
  'src/components/CTAButton.jsx',
  'src/components/Experience.jsx',
  'src/components/Hero.jsx',
  'src/components/Nav.jsx',
  'src/components/Projects.jsx',
  'src/components/Reveal.jsx'
)

foreach ($file in $files) {
  Copy-Item -LiteralPath (Join-Path $PSScriptRoot $file) -Destination (Join-Path $root $file) -Force
}

Write-Output 'Animation preview restored to the state before this pass.'
