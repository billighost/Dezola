// src/utils/generateLegalPDF.js
//
// Generates a branded, print-ready PDF of a legal document (Terms or
// Privacy) using jsPDF. Requires the `jspdf` package:
//   npm install jspdf
//
// Design notes — this mirrors the site's identity, translated to print:
//   - Cover page: ink background, gold rule, tracked-out kicker,
//     serif-style display title (Times, the closest core jsPDF font to
//     Playfair Display), cream body text.
//   - Content pages: cream background, gold section numerals,
//     hairline rules between sections, footer with page numbers + brand.

import { jsPDF } from 'jspdf'

// Brand palette (RGB) — matches src/index.css custom properties
const INK = [13, 13, 13]
const CREAM = [245, 240, 232]
const GOLD = [200, 169, 126]
const SLATE = [61, 61, 61]
const PARCHMENT = [232, 227, 217]

const PAGE_W = 210 // A4 mm
const PAGE_H = 297
const MARGIN_X = 22
const CONTENT_W = PAGE_W - MARGIN_X * 2

export async function generateLegalPDF(content) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })

  drawCoverPage(doc, content)
  drawContentPages(doc, content)

  doc.save(`Dezola-Studio-${content.label.replace(/[^a-z0-9]+/gi, '-')}.pdf`)
}

function setFill(doc, rgb) { doc.setFillColor(rgb[0], rgb[1], rgb[2]) }
function setText(doc, rgb) { doc.setTextColor(rgb[0], rgb[1], rgb[2]) }
function setDraw(doc, rgb) { doc.setDrawColor(rgb[0], rgb[1], rgb[2]) }

function drawCoverPage(doc, content) {
  setFill(doc, INK)
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F')

  // Dot-grid texture echo (sparse gold dots)
  doc.setGState(new doc.GState({ opacity: 0.10 }))
  setFill(doc, GOLD)
  for (let y = 16; y < PAGE_H - 16; y += 10) {
    for (let x = 16; x < PAGE_W - 16; x += 10) {
      doc.circle(x, y, 0.25, 'F')
    }
  }
  doc.setGState(new doc.GState({ opacity: 1 }))

  // Kicker
  setText(doc, GOLD)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('D E Z O L A   S T U D I O', MARGIN_X, 50)

  // Gold rule
  setDraw(doc, GOLD)
  doc.setLineWidth(0.6)
  doc.line(MARGIN_X, 58, MARGIN_X + 16, 58)

  // Title
  setText(doc, CREAM)
  doc.setFont('times', 'bold')
  doc.setFontSize(40)
  const titleLines = doc.splitTextToSize(`${content.title} ${content.titleEm}`, CONTENT_W - 10)
  let ty = 90
  titleLines.forEach((line) => {
    doc.text(line, MARGIN_X, ty)
    ty += 14
  })

  // Subtitle
  setText(doc, [220, 213, 200])
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  const subLines = doc.splitTextToSize(content.subtitle, CONTENT_W - 60)
  let sy = ty + 8
  subLines.forEach((line) => {
    doc.text(line, MARGIN_X, sy)
    sy += 6
  })

  // Meta block near bottom
  setDraw(doc, [80, 80, 80])
  doc.setLineWidth(0.3)
  doc.line(MARGIN_X, PAGE_H - 56, PAGE_W - MARGIN_X, PAGE_H - 56)

  setText(doc, GOLD)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.text(`EFFECTIVE ${content.effectiveDate.toUpperCase()}`, MARGIN_X, PAGE_H - 46)

  setText(doc, [200, 195, 185])
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.text(content.meta, MARGIN_X, PAGE_H - 38)

  setText(doc, [150, 145, 135])
  doc.setFontSize(8.5)
  doc.text('Ibadan, Nigeria — Creative Studio', MARGIN_X, PAGE_H - 28)
  doc.text('dezolastudio.name.ng  ·  bb2010ng@gmail.com', MARGIN_X, PAGE_H - 23)
}

function drawFooter(doc, pageNum, content) {
  setDraw(doc, [200, 195, 185])
  doc.setLineWidth(0.2)
  doc.line(MARGIN_X, PAGE_H - 16, PAGE_W - MARGIN_X, PAGE_H - 16)

  setText(doc, SLATE)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text('Dezola Studio', MARGIN_X, PAGE_H - 10)
  doc.text(content.label, PAGE_W / 2, PAGE_H - 10, { align: 'center' })
  doc.text(String(pageNum), PAGE_W - MARGIN_X, PAGE_H - 10, { align: 'right' })
}

function newContentPage(doc, content, pageNum) {
  doc.addPage()
  setFill(doc, CREAM)
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F')
  drawFooter(doc, pageNum, content)
  return MARGIN_X + 14 // starting y
}

function drawContentPages(doc, content) {
  let pageNum = 1
  let y = newContentPage(doc, content, pageNum)

  const lineHeight = 5.1
  const paraGap = 3.5
  const bottomLimit = PAGE_H - 26

  const ensureSpace = (needed) => {
    if (y + needed > bottomLimit) {
      pageNum += 1
      y = newContentPage(doc, content, pageNum)
    }
  }

  const writeParagraph = (text, fontSize = 10.2) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(fontSize)
    setText(doc, SLATE)
    const lines = doc.splitTextToSize(text, CONTENT_W)
    lines.forEach((line) => {
      ensureSpace(lineHeight)
      doc.text(line, MARGIN_X, y)
      y += lineHeight
    })
    y += paraGap
  }

  content.sections.forEach((section) => {
    ensureSpace(22)

    setText(doc, GOLD)
    doc.setFont('times', 'bold')
    doc.setFontSize(11)
    doc.text(section.num, MARGIN_X, y)

    setText(doc, INK)
    doc.setFont('times', 'bold')
    doc.setFontSize(16)
    doc.text(section.title, MARGIN_X + 12, y)
    y += 9

    if (section.paragraphs) {
      section.paragraphs.forEach((p) => writeParagraph(p))
    }

    if (section.subsections) {
      section.subsections.forEach((sub) => {
        ensureSpace(10)
        setText(doc, INK)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10.5)
        doc.text(sub.heading, MARGIN_X, y)
        y += 6.5
        sub.paragraphs.forEach((p) => writeParagraph(p))
      })
    }

    ensureSpace(8)
    setDraw(doc, [210, 204, 192])
    doc.setLineWidth(0.2)
    doc.line(MARGIN_X, y, PAGE_W - MARGIN_X, y)
    y += 9
  })

  if (content.footnote) {
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8.5)
    const lines = doc.splitTextToSize(content.footnote, CONTENT_W - 14)
    const blockHeight = lines.length * 4.6 + 10
    ensureSpace(blockHeight)

    setFill(doc, PARCHMENT)
    doc.rect(MARGIN_X, y, CONTENT_W, blockHeight, 'F')
    setDraw(doc, GOLD)
    doc.setLineWidth(1)
    doc.line(MARGIN_X, y, MARGIN_X, y + blockHeight)

    setText(doc, SLATE)
    let fy = y + 7
    lines.forEach((line) => {
      doc.text(line, MARGIN_X + 7, fy)
      fy += 4.6
    })
    y += blockHeight + 6
  }
}
