import jsPDF from 'jspdf'
import 'jspdf-autotable'
import type { InvoiceDetails } from '@/types/invoice'
import { formatCurrency } from './format'

export function generateInvoicePDF(invoice: InvoiceDetails): Blob {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const margin = 20

  // Add logo
  // doc.addImage('/images/logo.png', 'PNG', margin, margin, 40, 40)

  // Title and Invoice Number
  doc.setFontSize(24)
  doc.text('INVOICE', pageWidth / 2, margin, { align: 'center' })
  doc.setFontSize(12)
  doc.text(invoice.invoiceNumber, pageWidth / 2, margin + 10, { align: 'center' })

  // Dates
  doc.setFontSize(10)
  doc.text(`Date: ${invoice.date}`, pageWidth - margin, margin + 20, { align: 'right' })
  doc.text(`Due Date: ${invoice.dueDate}`, pageWidth - margin, margin + 25, { align: 'right' })

  // Company Details (From)
  doc.setFontSize(11)
  doc.text('From:', margin, margin + 40)
  doc.setFontSize(10)
  doc.text([
    invoice.companyName,
    invoice.companyAddress,
    invoice.companyEmail,
    `VAT: ${invoice.companyVAT}`,
  ], margin, margin + 50)

  // Client Details (To)
  doc.setFontSize(11)
  doc.text('To:', pageWidth / 2, margin + 40)
  doc.setFontSize(10)
  doc.text([
    invoice.clientName,
    invoice.clientAddress,
    invoice.clientEmail || '',
    invoice.clientVAT ? `VAT: ${invoice.clientVAT}` : '',
  ], pageWidth / 2, margin + 50)

  // Time Entries Table
  const tableData = invoice.timeEntries.map(entry => [
    entry.date,
    entry.description,
    entry.hours.toString(),
    formatCurrency(entry.hourlyRate, invoice.currency),
    formatCurrency(entry.hours * entry.hourlyRate, invoice.currency),
  ])

  doc.autoTable({
    startY: margin + 80,
    head: [['Date', 'Description', 'Hours', 'Rate', 'Amount']],
    body: tableData,
    foot: [
      ['', '', '', 'Subtotal:', formatCurrency(invoice.subtotal, invoice.currency)],
      ['', '', '', `Tax (${invoice.taxRate}%):`, formatCurrency(invoice.taxAmount, invoice.currency)],
      ['', '', '', 'Total:', formatCurrency(invoice.total, invoice.currency)],
    ],
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185] },
    footStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
  })

  // Notes
  if (invoice.notes) {
    doc.setFontSize(11)
    doc.text('Notes:', margin, doc.lastAutoTable.finalY + 20)
    doc.setFontSize(10)
    doc.text(invoice.notes, margin, doc.lastAutoTable.finalY + 30)
  }

  // Bank Details
  doc.setFontSize(11)
  doc.text('Bank Details:', margin, doc.lastAutoTable.finalY + 50)
  doc.setFontSize(10)
  doc.text([
    `Bank Name: ${invoice.bankName}`,
    `Account: ${invoice.bankAccount}`,
  ], margin, doc.lastAutoTable.finalY + 60)

  return doc.output('blob')
} 