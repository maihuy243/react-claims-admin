
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function Topbar() {
  const [dark, setDark] = useState(false)
  useEffect(()=>{
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])
  return (
    <header className="flex items-center justify-between border-b bg-card/30 px-4 py-2">
      <div className="text-sm text-muted-foreground">Admin Console</div>
      <Button variant="ghost" size="icon" onClick={()=>setDark(v=>!v)} aria-label="Toggle theme">
        {dark ? <Sun/> : <Moon/>}
      </Button>
    </header>
  )
}
