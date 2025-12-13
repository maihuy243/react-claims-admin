import { ImportPreviewState, PreviewRow } from "@/model"
const REQUIRED_FIELDS = [
  "so_hop_dong",
  "ten_kh",
  "cccd",
  "sdt",
  "email",
  "ten_dang_nhap",
  "b_mat_khau",
] as const

type RequiredField = (typeof REQUIRED_FIELDS)[number]

export function validateRow(
  row: Omit<PreviewRow, "is_valid" | "missing_fields">,
): {
  is_valid: boolean
  missing_fields: RequiredField[]
} {
  const missing: RequiredField[] = []

  REQUIRED_FIELDS.forEach((field) => {
    const value = (row as any)[field]
    if (value === undefined || value === null || value === "") {
      missing.push(field)
    }
  })

  return {
    is_valid: missing.length === 0,
    missing_fields: missing,
  }
}

import * as XLSX from "xlsx"

export async function buildImportPreview(
  file: File,
): Promise<ImportPreviewState> {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer, { type: "array" })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  const rawRows = XLSX.utils.sheet_to_json<any>(sheet, {
    defval: "",
  })

  const rows: PreviewRow[] = rawRows.map((r, index) => {
    const baseRow = {
      row_number: index + 2,
      so_hop_dong: r["so_hop_dong"] ?? r["Số hợp đồng"],
      ten_kh: r["ten_kh"] ?? r["Tên KH"],
      cccd: r["cccd"],
      sdt: r["sdt"],
      email: r["email"],
      ten_dang_nhap: r["ten_dang_nhap"],
      b_mat_khau: r["b_mat_khau"],
      require_change: Number(r["require_change"] ?? 0),
    }

    const validation = validateRow(baseRow)

    return {
      ...baseRow,
      ...validation,
    }
  })

  const valid = rows.filter((r) => r.is_valid).length
  const invalid = rows.length - valid

  return {
    name: file.name,
    size: file.size,
    total_record: rows.length,
    valid,
    invalid,
    rows,
  }
}
