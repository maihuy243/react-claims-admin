import { ReactNode } from "react"

interface SectionProps {
  title: string
  children: ReactNode
  extra?: ReactNode
}

export function Section({ title, children, extra }: SectionProps) {
  return (
    <div className="p-4 md:p-5 space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="font-bold text-base md:text-lg text-gray-700">
          {title}
        </h3>

        {extra && (
          <div className="w-full md:w-auto flex md:block">
            {extra}
          </div>
        )}
      </div>

      {children}
    </div>
  )
}
