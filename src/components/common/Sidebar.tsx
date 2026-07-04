import { Button } from '../ui/button'
import { HomeIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-foreground w-1/7 min-w-60 h-screen p-2">
      <div className="flex flex-row items-center gap-2 h-12 w-full">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={50}
          height={50}
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-muted">PlayPlan</h1>
          <span className="text-xs text-muted-foreground">YouTube Watch Planner</span>
        </div>
      </div>

      {/* Sidebar content */}
      <div className="flex flex-col gap-2 mt-10">
        <Button variant="secondary" className="w-full bg-primary-500 rounded-sm text-muted hover:bg-primary-600 hover:cursor-pointer">
          <HomeIcon className="w-5 h-5" />
          Dashboard
        </Button>
      </div>
    </div>
  )
}

export default Sidebar