import * as React from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

type ImagePreviewProps = {
  src: string
  children?: React.ReactNode
}

const ImagePreview = ({ src, children }: ImagePreviewProps) => {
  const [open, setOpen] = React.useState(false)

  if (!src) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogContent
        hiddenClose
        className="border-none bg-transparent p-0 shadow-none"
        onClick={() => setOpen(false)} //
      >
        {/* Image wrapper */}
        <div
          className="mx-auto max-h-[90vh] max-w-[90vw]"
          onClick={(e) => e.stopPropagation()} //
        >
          <img
            src={src}
            alt="preview"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImagePreview
