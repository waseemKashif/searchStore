"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LiveSearchResults from "@/components/live-search-results"

interface CategoryPageProps {
  category: string
  subcategory?: string
  onBack: () => void
  onSearch: (query: string) => void
}

// Sample products for categories
const categoryProducts = {
  Electronics: [
    { id: 1, name: "iPhone 15 Pro", price: 999, image: "/modern-laptop.png", rating: 4.8 },
    { id: 2, name: "MacBook Air M2", price: 1199, image: "/modern-laptop.png", rating: 4.9 },
    { id: 3, name: "AirPods Pro", price: 249, image: "/wireless-earbuds.png", rating: 4.7 },
    { id: 4, name: "Samsung 4K TV", price: 799, image: "/smart-tv-living-room.png", rating: 4.6 },
  ],
  Fashion: [
    { id: 5, name: "Designer Jacket", price: 299, image: "/placeholder-1dhp3.png", rating: 4.5 },
    { id: 6, name: "Running Shoes", price: 129, image: "/placeholder-yzyat.png", rating: 4.4 },
    { id: 7, name: "Leather Handbag", price: 199, image: "/placeholder-1dhp3.png", rating: 4.6 },
  ],
  "Home & Garden": [
    { id: 8, name: "Coffee Maker", price: 89, image: "/placeholder-yzyat.png", rating: 4.3 },
    { id: 9, name: "Garden Tools Set", price: 149, image: "/placeholder-1dhp3.png", rating: 4.5 },
  ],
  "Sports & Outdoors": [
    { id: 10, name: "Yoga Mat", price: 39, image: "/placeholder-yzyat.png", rating: 4.4 },
    { id: 11, name: "Camping Tent", price: 199, image: "/placeholder-1dhp3.png", rating: 4.7 },
  ],
  "Books & Media": [
    { id: 12, name: "Best Seller Novel", price: 19, image: "/placeholder-yzyat.png", rating: 4.8 },
    { id: 13, name: "Programming Guide", price: 49, image: "/placeholder-1dhp3.png", rating: 4.6 },
  ],
  "Health & Beauty": [
    { id: 14, name: "Skincare Set", price: 79, image: "/placeholder-yzyat.png", rating: 4.5 },
    { id: 15, name: "Hair Dryer", price: 129, image: "/placeholder-1dhp3.png", rating: 4.4 },
  ],
}

export default function CategoryPage({ category, subcategory, onBack, onSearch }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showLiveResults, setShowLiveResults] = useState(false)

  const products = categoryProducts[category as keyof typeof categoryProducts] || []

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (e.target.value.trim()) {
      setShowLiveResults(true)
    } else {
      setShowLiveResults(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery)
      setShowLiveResults(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setShowLiveResults(false)
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-faf5ff via-white to-faf5ff">
      {/* Header with Search Box */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-purple-100 p-4 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="font-serif font-bold text-2xl text-purple-800">{category}</h1>
              {subcategory && <p className="font-sans text-purple-600">{subcategory}</p>}
            </div>
          </div>

          {/* Search Box */}
          <div className="max-w-2xl relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search in this category..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onClick={(e) => e.stopPropagation()}
                  className="font-sans pl-12 pr-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>
            </form>

            {showLiveResults && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 z-20">
                <LiveSearchResults
                  query={searchQuery}
                  onProductSelect={() => {
                    onSearch(searchQuery)
                    setShowLiveResults(false)
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Products */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-sans font-semibold text-gray-800 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xl text-purple-800">${product.price}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-sans text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <Button className="w-full mt-3 bg-purple-800 hover:bg-purple-700 text-white">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
