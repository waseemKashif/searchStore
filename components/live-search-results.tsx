"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface Product {
  id: number
  name: string
  price: string
  image: string
  rating: number
  category: string
  description: string
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: "$199",
    image: "/premium-wireless-headphones.png",
    rating: 4.8,
    category: "Electronics",
    description: "High-quality sound with noise cancellation",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: "$299",
    image: "/smart-fitness-watch.png",
    rating: 4.6,
    category: "Wearables",
    description: "Track your health and fitness goals",
  },
  {
    id: 3,
    name: "Ultra-thin Laptop",
    price: "$1299",
    image: "/placeholder-6e48b.png",
    rating: 4.9,
    category: "Computers",
    description: "Powerful performance in a sleek design",
  },
  {
    id: 4,
    name: "Professional Camera",
    price: "$899",
    image: "/professional-camera.png",
    rating: 4.7,
    category: "Photography",
    description: "Capture stunning photos and videos",
  },
  {
    id: 5,
    name: "Running Sneakers",
    price: "$149",
    image: "/running-sneakers.png",
    rating: 4.5,
    category: "Footwear",
    description: "Comfortable and durable for daily runs",
  },
  {
    id: 6,
    name: "Designer Sunglasses",
    price: "$199",
    image: "/designer-sunglasses.png",
    rating: 4.4,
    category: "Accessories",
    description: "Stylish protection for your eyes",
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: "$79",
    image: "/placeholder-1dhp3.png",
    rating: 4.3,
    category: "Electronics",
    description: "Portable sound for any occasion",
  },
  {
    id: 8,
    name: "Gaming Mouse",
    price: "$59",
    image: "/placeholder-yzyat.png",
    rating: 4.6,
    category: "Gaming",
    description: "Precision gaming at your fingertips",
  },
  {
    id: 9,
    name: "Wireless Earbuds",
    price: "$129",
    image: "/wireless-earbuds.png",
    rating: 4.5,
    category: "Electronics",
    description: "Compact and crystal clear sound",
  },
  {
    id: 10,
    name: "Smart TV",
    price: "$599",
    image: "/smart-tv-living-room.png",
    rating: 4.7,
    category: "Electronics",
    description: "4K Ultra HD with smart features",
  },
  {
    id: 11,
    name: "Mechanical Keyboard",
    price: "$149",
    image: "/mechanical-keyboard.png",
    rating: 4.8,
    category: "Gaming",
    description: "Tactile switches for gaming precision",
  },
]

interface LiveSearchResultsProps {
  query: string
  onProductSelect: () => void
}

export default function LiveSearchResults({ query, onProductSelect }: LiveSearchResultsProps) {
  const directMatches = sampleProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  )

  // Get categories of direct matches to find related items
  const matchedCategories = [...new Set(directMatches.map((product) => product.category))]

  // Find related items from the same categories
  const relatedItems = sampleProducts.filter(
    (product) =>
      matchedCategories.includes(product.category) && !directMatches.some((match) => match.id === product.id),
  )

  // Combine direct matches first, then related items, limit to 8 total
  const allResults = [...directMatches, ...relatedItems].slice(0, 8)

  if (allResults.length === 0) {
    return (
      <Card className="bg-white shadow-lg border-purple-200">
        <CardContent className="p-4">
          <p className="font-sans text-gray-500 text-center">No products found for "{query}"</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white shadow-lg border-purple-200 max-h-96 overflow-y-auto">
      <CardContent className="p-2">
        {directMatches.length > 0 && (
          <>
            {directMatches.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg cursor-pointer transition-colors duration-200"
                onClick={onProductSelect}
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-serif font-semibold text-purple-800 truncate">{product.name}</h4>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">{product.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-purple-800">{product.price}</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-sans text-xs ml-1">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {relatedItems.length > 0 && (
              <>
                <div className="px-3 py-2 border-t border-purple-100">
                  <p className="font-sans text-xs text-purple-600 font-medium">Related Items</p>
                </div>
                {relatedItems.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg cursor-pointer transition-colors duration-200 opacity-90"
                    onClick={onProductSelect}
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-serif font-semibold text-purple-700 truncate">{product.name}</h4>
                        <Badge className="bg-purple-50 text-purple-700 text-xs">{product.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-purple-700">{product.price}</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-sans text-xs ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}

        {allResults.length >= 8 && (
          <div className="p-3 text-center border-t border-purple-100">
            <p className="font-sans text-sm text-purple-600">Press Enter to see all results</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
