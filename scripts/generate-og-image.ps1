$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

function New-RoundedRectanglePath {
  param(
    [float]$X,
    [float]$Y,
    [float]$Width,
    [float]$Height,
    [float]$Radius
  )

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = $Radius * 2

  $path.AddArc($X, $Y, $diameter, $diameter, 180, 90)
  $path.AddArc($X + $Width - $diameter, $Y, $diameter, $diameter, 270, 90)
  $path.AddArc($X + $Width - $diameter, $Y + $Height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($X, $Y + $Height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()

  return $path
}

function Get-Color([string]$Hex) {
  return [System.Drawing.ColorTranslator]::FromHtml($Hex)
}

$width = 1200
$height = 630
$outputPath = Join-Path $PSScriptRoot '..\public\images\og-card.png'
$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

try {
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $backgroundBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    ([System.Drawing.Point]::new(0, 0)),
    ([System.Drawing.Point]::new($width, $height)),
    (Get-Color '#fff7ed'),
    (Get-Color '#eff6ff')
  )
  $graphics.FillRectangle($backgroundBrush, 0, 0, $width, $height)

  $leftGlowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(90, 251, 191, 36))
  $graphics.FillEllipse($leftGlowBrush, -80, -40, 340, 340)
  $leftGlowBrush.Dispose()

  $rightGlowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(90, 59, 130, 246))
  $graphics.FillEllipse($rightGlowBrush, 860, -60, 360, 360)
  $rightGlowBrush.Dispose()

  $panelPath = New-RoundedRectanglePath -X 56 -Y 52 -Width 1088 -Height 526 -Radius 34
  $panelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(236, 255, 255, 255))
  $panelPen = New-Object System.Drawing.Pen((Get-Color '#e2e8f0'), 2)
  $graphics.FillPath($panelBrush, $panelPath)
  $graphics.DrawPath($panelPen, $panelPath)

  $chipPath = New-RoundedRectanglePath -X 104 -Y 96 -Width 244 -Height 44 -Radius 22
  $chipBrush = New-Object System.Drawing.SolidBrush((Get-Color '#dbeafe'))
  $chipTextBrush = New-Object System.Drawing.SolidBrush((Get-Color '#1d4ed8'))
  $graphics.FillPath($chipBrush, $chipPath)
  $graphics.DrawString(
    'Kyoto-based operations team',
    (New-Object System.Drawing.Font('Segoe UI', 14, [System.Drawing.FontStyle]::Bold)),
    $chipTextBrush,
    124,
    108
  )

  $titleBrush = New-Object System.Drawing.SolidBrush((Get-Color '#0f172a'))
  $accentBrush = New-Object System.Drawing.SolidBrush((Get-Color '#0f766e'))
  $bodyBrush = New-Object System.Drawing.SolidBrush((Get-Color '#475569'))
  $titleFont = New-Object System.Drawing.Font('Segoe UI', 34, [System.Drawing.FontStyle]::Bold)
  $bodyFont = New-Object System.Drawing.Font('Segoe UI', 18, [System.Drawing.FontStyle]::Regular)
  $smallFont = New-Object System.Drawing.Font('Segoe UI', 14, [System.Drawing.FontStyle]::Bold)
  $statFont = New-Object System.Drawing.Font('Segoe UI', 16, [System.Drawing.FontStyle]::Regular)

  $graphics.DrawString('Operational systems', $titleFont, $titleBrush, 104, 170)
  $graphics.DrawString('that keep moving', $titleFont, $accentBrush, 104, 222)
  $graphics.DrawString(
    'SNS operations, music rights handling, and workflow design. Regalo supports the full path from intake to steady execution.',
    $bodyFont,
    $bodyBrush,
    [System.Drawing.RectangleF]::new(106, 296, 660, 72)
  )

  $cards = @(
    @{ X = 792; Y = 118; W = 274; H = 132; Fill = '#fff1f2'; Stroke = '#fecdd3'; Label = 'SNS'; Value = 'Calendar, KPI, queue'; Text = '#9f1239' },
    @{ X = 792; Y = 270; W = 274; H = 132; Fill = '#fffbeb'; Stroke = '#fde68a'; Label = 'Rights'; Value = 'Ledger, cue sheet'; Text = '#a16207' },
    @{ X = 792; Y = 422; W = 274; H = 132; Fill = '#ecfeff'; Stroke = '#a5f3fc'; Label = 'Workflow'; Value = 'Routing, reporting'; Text = '#0f766e' }
  )

  foreach ($card in $cards) {
    $cardPath = New-RoundedRectanglePath -X $card.X -Y $card.Y -Width $card.W -Height $card.H -Radius 26
    $cardBrush = New-Object System.Drawing.SolidBrush((Get-Color $card.Fill))
    $cardPen = New-Object System.Drawing.Pen((Get-Color $card.Stroke), 2)
    $cardTextBrush = New-Object System.Drawing.SolidBrush((Get-Color $card.Text))
    $graphics.FillPath($cardBrush, $cardPath)
    $graphics.DrawPath($cardPen, $cardPath)
    $graphics.DrawString($card.Label, $smallFont, $cardTextBrush, $card.X + 26, $card.Y + 28)
    $graphics.DrawString(
      $card.Value,
      $statFont,
      $titleBrush,
      [System.Drawing.RectangleF]::new($card.X + 26, $card.Y + 62, $card.W - 52, 46)
    )
    $cardBrush.Dispose()
    $cardPen.Dispose()
    $cardTextBrush.Dispose()
    $cardPath.Dispose()
  }

  $footerBrush = New-Object System.Drawing.SolidBrush((Get-Color '#ffffff'))
  $footerPath = New-RoundedRectanglePath -X 104 -Y 434 -Width 616 -Height 96 -Radius 28
  $footerPen = New-Object System.Drawing.Pen((Get-Color '#e2e8f0'), 2)
  $graphics.FillPath($footerBrush, $footerPath)
  $graphics.DrawPath($footerPen, $footerPath)
  $graphics.DrawString('Regalo', (New-Object System.Drawing.Font('Segoe UI', 24, [System.Drawing.FontStyle]::Bold)), $titleBrush, 138, 462)
  $graphics.DrawString('Built for steady operations, not one-off launches.', $statFont, $bodyBrush, 138, 500)

  $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
}
finally {
  $graphics.Dispose()
  $bitmap.Dispose()
}
