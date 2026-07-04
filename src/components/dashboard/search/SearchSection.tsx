
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import SearchCardContent from "./SearchCardContent"

const SearchSection = () => {
  return (
    <Card className="w-1/3 shadow-md border rounded-sm py-4">
      <CardHeader>
        <h3 className="text-md text-primary font-bold">1. Search videos</h3>
      </CardHeader>
      <CardContent>
        <SearchCardContent />
      </CardContent>
      <CardAction className="flex flex-row w-full items-center px-6 mt-4">
        <InformationCircleIcon className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Up to 200 videos will be considered</span>
      </CardAction>
    </Card>
  )
}

export default SearchSection