"use client"

import { useState } from "react"
import { X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CategorySidebarProps {
  isOpen: boolean
  onClose: () => void
}

const categories = [
  {
    name: "Electronics",
    subcategories: ["Smartphones", "Laptops", "Headphones", "Cameras", "Gaming", "Smart Home"],
  },
  {
    name: "Fashion",
    subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "Jewelry", "Bags"],
  },
  {
    name: "Home & Garden",
    subcategories: ["Furniture", "Kitchen", "Bathroom", "Garden", "Decor", "Storage"],
  },
  {
    name: "Sports & Outdoors",
    subcategories: ["Fitness", "Outdoor Gear", "Sports Equipment", "Athletic Wear", "Camping", "Water Sports"],
  },
  {
    name: "Books & Media",
    subcategories: ["Books", "Movies", "Music", "Games", "Magazines", "E-books"],
  },
  {
    name: "Health & Beauty",
    subcategories: ["Skincare", "Makeup", "Hair Care", "Supplements", "Personal Care", "Wellness"],
  },
]

export default function CategorySidebar({ isOpen, onClose }: CategorySidebarProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const handleCategorySelect = (categoryName: string, subcategory?: string) => {
    const event = new CustomEvent("categorySelected", {
      detail: { category: categoryName, subcategory },
    })
    window.dispatchEvent(event)
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" onClick={onClose} />}

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-serif font-bold text-xl text-purple-800">Categories</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Categories List */}
        <div className="overflow-y-auto h-full pb-20">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative border-b border-gray-100"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-purple-50 transition-colors duration-200"
                onClick={() => handleCategorySelect(category.name)}
              >
                <span className="font-sans font-medium text-gray-800">{category.name}</span>
                <ChevronRight className="h-4 w-4 text-purple-600" />
              </button>

              {hoveredCategory === category.name && (
                <div className="absolute left-full top-0 w-64 bg-white shadow-xl border border-gray-200 rounded-r-lg z-60 animate-in slide-in-from-left duration-200">
                  <div className="p-2">
                    <h3 className="font-serif font-semibold text-purple-800 px-3 py-2 border-b border-gray-100">
                      {category.name}
                    </h3>
                    <div className="mt-2">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          className="w-full text-left px-3 py-2 text-sm font-sans text-gray-600 hover:text-purple-800 hover:bg-purple-50 rounded transition-colors duration-200"
                          onClick={() => handleCategorySelect(category.name, subcategory)}
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
