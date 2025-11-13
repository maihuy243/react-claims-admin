import { ReactNode } from "react"

interface SectionProps {
  title: string
  children: ReactNode
  extra?: ReactNode
}

export function Section({ title, children, extra }: SectionProps) {
  return (
    <div className="p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-gray-700">{title}</h3>
        {extra}
      </div>
      {children}
    </div>
  )
}
