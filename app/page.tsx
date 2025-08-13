"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, ShoppingBag, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SearchResults from "@/components/search-results"
import FloatingProducts from "@/components/floating-products"
import LiveSearchResults from "@/components/live-search-results"
import CategorySidebar from "@/components/category-sidebar"
import CategoryPage from "@/components/category-page"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [showLiveResults, setShowLiveResults] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<{ category: string; subcategory?: string } | null>(null)

  useEffect(() => {
    const handleCategorySelected = (event: CustomEvent) => {
      setSelectedCategory(event.detail)
      setShowCategories(false)
    }

    window.addEventListener("categorySelected", handleCategorySelected as EventListener)
    return () => window.removeEventListener("categorySelected", handleCategorySelected as EventListener)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowResults(true)
      setShowLiveResults(false)
      setSelectedCategory(null)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (e.target.value.trim() === "") {
      setShowResults(false)
      setShowLiveResults(false)
      setIsSearchFocused(false)
    } else {
      setShowLiveResults(true)
      setShowResults(false)
    }
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
  }

  const handleSearchChange = (newQuery: string) => {
    setSearchQuery(newQuery)
    if (newQuery.trim()) {
      setShowResults(true)
      setShowLiveResults(false)
      setSelectedCategory(null)
    }
  }

  const handleBackFromCategory = () => {
    setSelectedCategory(null)
  }

  const handleSearchFromCategory = (query: string) => {
    setSearchQuery(query)
    setShowResults(true)
    setSelectedCategory(null)
  }

  useEffect(() => {
    const handleClickOutside = () => {
      if (!showResults) {
        setShowLiveResults(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [showResults])

  if (selectedCategory) {
    return (
      <CategoryPage
        category={selectedCategory.category}
        subcategory={selectedCategory.subcategory}
        onBack={handleBackFromCategory}
        onSearch={handleSearchFromCategory}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-faf5ff via-white to-faf5ff relative overflow-hidden">
      {/* Floating Products Background */}
      <FloatingProducts />

      {/* Category Sidebar */}
      <CategorySidebar isOpen={showCategories} onClose={() => setShowCategories(false)} />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* Made logo clickable to return to homepage */}
              <button
                onClick={() => {
                  setSearchQuery("")
                  setShowResults(false)
                  setShowLiveResults(false)
                  setIsSearchFocused(false)
                }}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <ShoppingBag className="h-8 w-8 text-purple-800" />
                <span className="font-serif font-bold text-xl text-purple-800">SearchStore</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="font-sans bg-transparent flex items-center gap-2">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          </div>
        </header>

        {isSearchFocused && searchQuery.trim() && (
          <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-purple-100 p-4 z-30 animate-in slide-in-from-top duration-300">
            <div className="max-w-2xl mx-auto relative">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Type to explore... 🔍"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onClick={(e) => e.stopPropagation()}
                    className="font-sans pl-12 pr-4 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    autoFocus
                  />
                </div>
              </form>

              {showLiveResults && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 z-20">
                  <LiveSearchResults
                    query={searchQuery}
                    onProductSelect={() => {
                      setShowResults(true)
                      setShowLiveResults(false)
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hero Section - shows when search is empty or not focused */}
        {!showResults && (!isSearchFocused || !searchQuery.trim()) && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
            <div className="text-center mb-12 max-w-2xl">
              <h1 className="font-serif font-bold text-5xl md:text-6xl text-purple-800 mb-4">Discover What You Love</h1>
              <p className="font-sans text-xl text-gray-600 mb-8">Find your perfect products with just a search.</p>
            </div>

            {/* Search Box */}
            <div className="w-full max-w-2xl relative">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-6 w-6" />
                  <Input
                    type="text"
                    placeholder="Type to explore... 🔍"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSearchFocus()
                    }}
                    onFocus={handleSearchFocus}
                    className="font-sans text-lg pl-12 pr-4 py-6 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 shadow-lg hover:shadow-xl transition-all duration-300"
                  />
                </div>
              </form>

              {showLiveResults && searchQuery.trim() && !isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 z-20">
                  <LiveSearchResults
                    query={searchQuery}
                    onProductSelect={() => {
                      setShowResults(true)
                      setShowLiveResults(false)
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <Button
                onClick={() => setShowResults(true)}
                className="font-sans bg-purple-800 hover:bg-purple-700 text-white px-8 py-3 rounded-xl"
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCategories(true)}
                className="font-sans border-purple-300 text-purple-800 hover:bg-purple-50 px-8 py-3 rounded-xl"
              >
                Explore Categories
              </Button>
            </div>
          </div>
        )}

        {/* Search Results */}
        {(showResults || (isSearchFocused && searchQuery.trim())) && (
          <div className="px-6 pb-12 mt-8">
            {showResults && <SearchResults query={searchQuery} onSearchChange={handleSearchChange} />}
          </div>
        )}
      </div>
    </div>
  )
}
