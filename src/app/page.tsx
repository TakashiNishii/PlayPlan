"use client"
import { useState } from "react";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import { Button } from "../components/ui/button";
import { Card, CardAction, CardContent, CardHeader } from "../components/ui/card";
import { Field } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [searchThemes, setSearchThemes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    setSearchThemes((prevThemes) => [...prevThemes, searchQuery]);
    setSearchQuery("");
  }

  const handleRemoveTheme = (themeToRemove: string) => {
    setSearchThemes((prevThemes) => prevThemes.filter((theme) => theme !== themeToRemove));
  }

  return (
    <div className="bg-background flex flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 py-4 px-10 flex flex-col gap-2">
        <Header />
        <div className="flex flex-row mt-6">
          <Card className="w-1/3 shadow-md border rounded-sm py-4">
            <CardHeader>
              <h3 className="text-md text-primary font-bold">1. Search videos</h3>
            </CardHeader>
            <CardContent>
              <Field orientation="horizontal">
                <Input className="h-8" type="search" placeholder="" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Button className="h-8" onClick={handleSearch}>Add</Button>
              </Field>
              <div className="flex flex-row flex-wrap mt-4">
                {searchThemes.map((theme, index) => (
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
        </div>
      </div>
    </div >
  )
}