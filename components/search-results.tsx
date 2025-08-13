"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Star, Search } from "lucide-react"

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
]

interface SearchResultsProps {
  query: string
  onSearchChange?: (query: string) => void
}

export default function SearchResults({ query, onSearchChange }: SearchResultsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [localSearchQuery, setLocalSearchQuery] = useState("")

  const effectiveQuery = query || localSearchQuery

  const directMatches = sampleProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(effectiveQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(effectiveQuery.toLowerCase()) ||
      effectiveQuery === "",
  )

  const matchedCategories = [...new Set(directMatches.map((product) => product.category))]

  const relatedItems =
    effectiveQuery !== ""
      ? sampleProducts.filter(
          (product) =>
            matchedCategories.includes(product.category) && !directMatches.some((match) => match.id === product.id),
        )
      : []

  const keywordRelatedItems =
    effectiveQuery !== ""
      ? sampleProducts.filter((product) => {
          const searchWords = effectiveQuery.toLowerCase().split(" ")
          const productText = `${product.name} ${product.description}`.toLowerCase()

          return (
            searchWords.some((word) => word.length > 2 && productText.includes(word)) &&
            !directMatches.some((match) => match.id === product.id) &&
            !relatedItems.some((related) => related.id === product.id)
          )
        })
      : []

  const allRelatedItems = [...relatedItems, ...keywordRelatedItems].slice(0, 6) // Limit to 6 related items

  const allResults = effectiveQuery === "" ? directMatches : [...directMatches, ...allRelatedItems]

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleLocalSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (localSearchQuery.trim() && onSearchChange) {
      onSearchChange(localSearchQuery)
    }
  }

  const handleLocalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalSearchQuery(value)

    // If there's an onSearchChange callback and we're not on the main query, trigger it
    if (onSearchChange && !query) {
      onSearchChange(value)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {selectedProduct ? (
        <>
          <Button onClick={() => setSelectedProduct(null)} variant="outline" className="mb-6 font-sans">
            ← Back to Search
          </Button>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <img
                src={selectedProduct.image || "/placeholder.svg"}
                alt={selectedProduct.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div>
                <Badge className="mb-2 bg-purple-100 text-purple-800">{selectedProduct.category}</Badge>
                <h1 className="font-serif font-bold text-3xl text-purple-800 mb-2">{selectedProduct.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-sans ml-1">{selectedProduct.rating}</span>
                  </div>
                  <span className="font-sans text-gray-500">(128 reviews)</span>
                </div>
                <p className="font-sans text-gray-600 text-lg">{selectedProduct.description}</p>
              </div>
              <div className="space-y-4">
                <p className="font-serif font-bold text-4xl text-purple-800">{selectedProduct.price}</p>
                <div className="flex gap-4">
                  <Button className="font-sans bg-purple-800 hover:bg-purple-700 flex-1">Add to Cart</Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif font-bold text-2xl text-purple-800 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleProducts
                .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
                .map((product) => (
                  <Card
                    key={product.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => handleProductClick(product)}
                  >
                    <CardContent className="p-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <Badge className="mb-2 bg-purple-100 text-purple-800 text-xs">{product.category}</Badge>
                      <h3 className="font-serif font-bold text-lg text-purple-800 mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xl text-purple-800">{product.price}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-sans text-sm ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {query === "" && (
            <div className="mb-8">
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleLocalSearch}>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search featured products..."
                      value={localSearchQuery}
                      onChange={handleLocalInputChange}
                      className="font-sans pl-12 pr-4 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 shadow-md"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="font-serif font-bold text-2xl text-purple-800 mb-2">
              {effectiveQuery ? `Search Results for "${effectiveQuery}"` : "Featured Products"}
            </h2>
            <p className="font-sans text-gray-600">
              {directMatches.length} direct matches
              {allRelatedItems.length > 0 && effectiveQuery && ` • ${allRelatedItems.length} related items`}
            </p>
          </div>

          {directMatches.length > 0 && (
            <>
              {effectiveQuery && (
                <h3 className="font-serif font-semibold text-lg text-purple-800 mb-4">Direct Matches</h3>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {directMatches.map((product) => (
                  <Card
                    key={product.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                    onClick={() => handleProductClick(product)}
                  >
                    <CardContent className="p-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <Badge className="mb-2 bg-purple-100 text-purple-800 text-xs">{product.category}</Badge>
                      <h3 className="font-serif font-bold text-lg text-purple-800 mb-2">{product.name}</h3>
                      <p className="font-sans text-gray-600 text-sm mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xl text-purple-800">{product.price}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-sans text-sm ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {allRelatedItems.length > 0 && effectiveQuery && (
            <>
              <h3 className="font-serif font-semibold text-lg text-purple-700 mb-4">Related Products You Might Like</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allRelatedItems.map((product) => (
                  <Card
                    key={product.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 opacity-90 hover:opacity-100"
                    onClick={() => handleProductClick(product)}
                  >
                    <CardContent className="p-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <Badge className="mb-2 bg-purple-50 text-purple-700 text-xs">{product.category}</Badge>
                      <h3 className="font-serif font-bold text-lg text-purple-700 mb-2">{product.name}</h3>
                      <p className="font-sans text-gray-600 text-sm mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xl text-purple-700">{product.price}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-sans text-sm ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
