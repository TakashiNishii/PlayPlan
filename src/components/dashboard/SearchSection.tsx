"use client"

import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardAction, CardContent, CardHeader } from "../ui/card"
import { Field } from "../ui/field"
import { Input } from "../ui/input"
import { useSearchContext } from "../../contexts/search-context"

const SearchSection = () => {
  const { searchTerm, setSearchTerm, selectedThemes, setSelectedThemes } = useSearchContext();

  const handleSearch = () => {
    if (searchTerm.trim() !== "" && !selectedThemes.includes(searchTerm)) {
      setSelectedThemes([...selectedThemes, searchTerm]);
    }
    setSearchTerm("");
  }

  const handleRemoveTheme = (theme: string) => {
    setSelectedThemes(selectedThemes.filter(t => t !== theme));
  }
  return (
    <Card className="w-1/3 shadow-md border rounded-sm py-4">
      <CardHeader>
        <h3 className="text-md text-primary font-bold">1. Search videos</h3>
      </CardHeader>
      <CardContent>
        <Field orientation="horizontal">
          <Input className="h-8" type="search" placeholder="" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <Button className="h-8" onClick={handleSearch}>Add</Button>
        </Field>
        <div className="flex flex-row flex-wrap mt-4">
          {selectedThemes.map((theme, index) => (
            <Badge key={index} variant="default" className="rounded-sm hover:cursor-pointer" onClick={() => handleRemoveTheme(theme)} >
              {theme}
              <XMarkIcon className="ml-0 w-4 h-4" />
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardAction className="flex flex-row w-full items-center px-6 mt-4">
        <InformationCircleIcon className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Up to 200 videos will be considered</span>
      </CardAction>
    </Card>
  )
}

export default SearchSection