import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'

interface InfoMessageProps {
  message: string
}

const InfoMessage = ({ message }: InfoMessageProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <InformationCircleIcon className="w-4 h-4 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">{message}</span>
    </div>
  )
}

export default InfoMessage