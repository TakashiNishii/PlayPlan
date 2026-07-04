
"use client"

import { XMarkIcon } from "@heroicons/react/24/outline"
import { useSearchContext } from "@/contexts/search-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const SearchCardContent = () => {
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
    <>
      <Field orientation="horizontal">
        <Input
          className="h-8"
          type="search"
          placeholder=""
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <Button className="h-8" onClick={handleSearch}>Add</Button>
      </Field>
      <div className="flex flex-row flex-wrap mt-4 gap-1">
        {selectedThemes.map((theme, index) => (
          <Badge key={index} variant="default" className="rounded-sm hover:cursor-pointer" onClick={() => handleRemoveTheme(theme)} >
            {theme}
            <XMarkIcon className="ml-0 w-4 h-4" />
          </Badge>
        ))}
      </div>
    </>
  )
}

export default SearchCardContent