import { ThemeToggle } from './ThemeToggle'

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">Plan your YouTube watch time</h2>
        <p className="text-muted-foreground text-xs">
          Search for videos and create a personalized schedule based on your daily availability.
        </p>
      </div>
      {/* Theme button */}
      <ThemeToggle />
    </div>
  )
}

export default Header