"use client"

import { useEffect, useState } from "react"

const products = [
  { id: 1, name: "Wireless Headphones", image: "/placeholder-1dhp3.png", price: "$99" },
  { id: 2, name: "Smart Watch", image: "/placeholder-yzyat.png", price: "$299" },
  { id: 3, name: "Laptop", image: "/modern-laptop.png", price: "$899" },
  { id: 4, name: "Camera", image: "/professional-camera.png", price: "$599" },
  { id: 5, name: "Sneakers", image: "/placeholder-bhcfi.png", price: "$129" },
  { id: 6, name: "Sunglasses", image: "/placeholder-rc9ii.png", price: "$79" },
  { id: 7, name: "Backpack", image: "/modern-backpack.png", price: "$89" },
  { id: 8, name: "Phone", image: "/modern-smartphone.png", price: "$699" },
  { id: 9, name: "Tablet", image: "/placeholder-1dhp3.png", price: "$399" },
  { id: 10, name: "Gaming Mouse", image: "/placeholder-yzyat.png", price: "$59" },
  { id: 11, name: "Keyboard", image: "/modern-laptop.png", price: "$149" },
  { id: 12, name: "Monitor", image: "/professional-camera.png", price: "$299" },
  { id: 13, name: "Speakers", image: "/placeholder-bhcfi.png", price: "$199" },
  { id: 14, name: "Webcam", image: "/placeholder-rc9ii.png", price: "$89" },
  { id: 15, name: "Microphone", image: "/modern-backpack.png", price: "$129" },
  { id: 16, name: "Charger", image: "/modern-smartphone.png", price: "$29" },
  { id: 17, name: "Power Bank", image: "/placeholder-1dhp3.png", price: "$49" },
  { id: 18, name: "Cable", image: "/placeholder-yzyat.png", price: "$19" },
]

export default function FloatingProducts() {
  const [positions, setPositions] = useState<Array<{ top: string; left: string; delay: number }>>([])

  useEffect(() => {
    // Generate random positions for floating products
    const newPositions = products.map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      delay: Math.random() * 8,
    }))
    setPositions(newPositions)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="absolute float-animation opacity-20 hover:opacity-30 transition-opacity duration-300"
          style={{
            top: positions[index]?.top || "50%",
            left: positions[index]?.left || "50%",
            animationDelay: `${positions[index]?.delay || 0}s`,
          }}
        >
          <div className="bg-white rounded-2xl p-4 shadow-lg transform -translate-x-1/2 -translate-y-1/2">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg mb-2"
            />
            <p className="font-sans text-xs text-gray-600 text-center">{product.name}</p>
            <p className="font-serif font-bold text-sm text-purple-800 text-center">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
