'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Calculator() {
  const router = useRouter()
  const [bbWeight, setBbWeight] = useState('')
  const [fps, setFps] = useState('')
  const [joules, setJoules] = useState<number | null>(null)
  const [calculatedFps, setCalculatedFps] = useState<number | null>(null)

  const handleLogout = () => {
    localStorage.removeItem('authenticated')
    router.push('/')
  }

  const calculateFromFps = () => {
    const weight = parseFloat(bbWeight)
    const fpsValue = parseFloat(fps)

    if (isNaN(weight) || isNaN(fpsValue) || weight <= 0 || fpsValue <= 0) {
      setJoules(null)
      setCalculatedFps(null)
      return
    }

    // Convert BB weight from grams to kilograms
    const weightKg = weight / 1000

    // Calculate joules: J = 0.5 * m * v^2
    // FPS to m/s: 1 FPS = 0.3048 m/s
    const velocityMs = fpsValue * 0.3048
    const joulesValue = 0.5 * weightKg * (velocityMs * velocityMs)

    setJoules(joulesValue)
    setCalculatedFps(fpsValue)
  }

  const calculateFromJoules = () => {
    const weight = parseFloat(bbWeight)
    const joulesValue = parseFloat(joules?.toString() || '0')

    if (isNaN(weight) || isNaN(joulesValue) || weight <= 0 || joulesValue <= 0) {
      setCalculatedFps(null)
      setFps('')
      return
    }

    // Convert BB weight from grams to kilograms
    const weightKg = weight / 1000

    // Calculate velocity from joules: v = sqrt(2J/m)
    // Then convert m/s to FPS: 1 m/s = 3.28084 FPS
    const velocityMs = Math.sqrt((2 * joulesValue) / weightKg)
    const fpsValue = velocityMs * 3.28084

    setCalculatedFps(fpsValue)
    setFps(fpsValue.toFixed(2))
  }

  const handleFpsChange = (value: string) => {
    setFps(value)
    if (value && bbWeight) {
      calculateFromFps()
    } else {
      setJoules(null)
      setCalculatedFps(null)
    }
  }

  const handleJoulesChange = (value: string) => {
    const numValue = parseFloat(value)
    setJoules(isNaN(numValue) ? null : numValue)
    if (value && bbWeight) {
      calculateFromJoules()
    } else {
      setCalculatedFps(null)
      setFps('')
    }
  }

  const handleWeightChange = (value: string) => {
    setBbWeight(value)
    if (fps && value) {
      calculateFromFps()
    } else if (joules !== null && value) {
      calculateFromJoules()
    } else {
      setJoules(null)
      setCalculatedFps(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Airsoft Calculator</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Logout
          </button>
        </div>

        {/* Calculator Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">BB Weight Calculator</h2>
            <p className="text-blue-200">Calculate joules and FPS based on BB weight in grams</p>
          </div>

          {/* Input Fields */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="bbWeight" className="block text-sm font-medium text-white mb-2">
                BB Weight (grams)
              </label>
              <input
                id="bbWeight"
                type="number"
                step="0.01"
                value={bbWeight}
                onChange={(e) => handleWeightChange(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., 0.20, 0.25, 0.30"
              />
            </div>

            <div>
              <label htmlFor="fps" className="block text-sm font-medium text-white mb-2">
                FPS (Feet Per Second)
              </label>
              <input
                id="fps"
                type="number"
                step="0.01"
                value={fps}
                onChange={(e) => handleFpsChange(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter FPS"
              />
            </div>
          </div>

          {/* Results */}
          {(joules !== null || calculatedFps !== null) && (
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Results</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {joules !== null && (
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-blue-200 text-sm mb-1">Energy</div>
                    <div className="text-3xl font-bold text-white">
                      {joules.toFixed(3)} <span className="text-lg">J</span>
                    </div>
                  </div>
                )}
                {calculatedFps !== null && (
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-blue-200 text-sm mb-1">Velocity</div>
                    <div className="text-3xl font-bold text-white">
                      {calculatedFps.toFixed(2)} <span className="text-lg">FPS</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Alternative Input */}
          <div className="border-t border-white/20 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Or calculate FPS from Joules</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="joules" className="block text-sm font-medium text-white mb-2">
                  Joules
                </label>
                <input
                  id="joules"
                  type="number"
                  step="0.001"
                  value={joules || ''}
                  onChange={(e) => handleJoulesChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter joules"
                />
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              <strong className="text-white">Note:</strong> Enter BB weight and either FPS or Joules to calculate the other value. 
              The calculator uses the formula: J = 0.5 × m × v², where m is mass in kg and v is velocity in m/s.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
