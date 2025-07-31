"use client"

import { useEffect, useState } from "react"

const getCurrentYear = () => new Date().getFullYear()

export const CurrentYear = () => {
  const [year, setYear] = useState(getCurrentYear)

  useEffect(() => {
    setYear(getCurrentYear())
  }, [])

  return year
}
