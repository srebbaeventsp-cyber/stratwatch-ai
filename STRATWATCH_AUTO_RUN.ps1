# ==========================================================
# STRATWATCH_AUTO_RUN.ps1
# Orchestrateur maître  exécution bout-en-bout
# ==========================================================
Continue = 'Stop'
Write-Host '=== STRATWATCH :: AUTO RUN START ===' -ForegroundColor Cyan

# 1. Vérifications
 = @(
  'STRATWATCH_MASTER_OFFICIAL.ps1'
)
foreach ( in ) {
  if (-not (Test-Path )) { throw " FICHIER MANQUANT : \ }
}

# 2. Exécution du pipeline officiel
powershell -NoProfile -ExecutionPolicy Bypass -File '.\STRATWATCH_MASTER_OFFICIAL.ps1'

# 3. Résumé probatoire
if (Test-Path 'proof\ROOT_HASH.txt') {
 = Get-Content 'proof\ROOT_HASH.txt'
 Write-Host \HASH RACINE : \ -ForegroundColor Green
} else {
 Write-Warning 'ROOT_HASH.txt absent'
}

Write-Host '=== STRATWATCH :: AUTO RUN COMPLETE ===' -ForegroundColor Green
