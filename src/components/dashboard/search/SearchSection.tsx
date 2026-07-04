
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import SearchCardContent from "./SearchCardContent"
import InfoMessage from "@/components/common/InfoMessage"

const SearchSection = () => {
  return (
    <Card className="w-1/3 justify-between shadow-md border rounded-sm py-4">
      <CardHeader>
        <h3 className="text-md text-primary font-bold">1. Search videos</h3>
      </CardHeader>
      <CardContent>
        <SearchCardContent />
      </CardContent>
      <CardAction className="flex flex-row w-full items-center px-6">
        <InfoMessage message="Up to 200 videos will be considered" />
      </CardAction>
    </Card>
  )
}

export default SearchSection