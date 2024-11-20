import { User, ChevronDown, Menu, Package, CreditCard, MapPin } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "../../components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"
import Search from '../search/Search'
import Cart from '../cart/Cart'
import { Link, useNavigate} from 'react-router-dom'

const categories = [
  {
    name: 'Electronics',
    subcategories: ['Smartphones', 'Laptops', 'Accessories'],
  },
  {
    name: 'Clothing',
    subcategories: ['Men', 'Women', 'Kids'],
  },
  {
    name: 'Home & Garden',
    subcategories: ['Furniture', 'Decor', 'Kitchen'],
  },
  {
    name: 'Books',
    subcategories: ['Fiction', 'Non-fiction', 'Educational'],
  },
]

export default function Header() {
 const redirect = useNavigate()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/category/${category.name.toLowerCase()}`}
                    className="text-lg font-medium"
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center space-x-2 ml-10">
            <span className="text-xl font-bold">NOTHING.</span>
           </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {categories.map((category) => (
            <DropdownMenu key={category.name}>
              <DropdownMenuTrigger className="flex items-center">
                {category.name} <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {category.subcategories.map((subcategory) => (
                  <DropdownMenuItem key={subcategory}>
                    <Link to={`/category/${subcategory.toLowerCase()}`}>
                      {subcategory}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Search />
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=> redirect('/profile')} >
              <User className="mr-2 h-4 w-4"  />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem >
              <Package className="mr-2 h-4 w-4" />
              <span>Orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem >
              <MapPin className="mr-2 h-4 w-4" />
              <span>Addresses</span>
            </DropdownMenuItem>
            <DropdownMenuItem >
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Payment Methods</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          <Cart  />
          <Button variant="ghost" onClick={() => redirect('/signin')}>
            Log in
          </Button>
          <Button onClick={() => redirect('/register')}>
            Sign up
          </Button>
        </div>
        
      </div>
    </header>
  )
}