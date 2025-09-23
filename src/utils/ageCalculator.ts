/**
 * Calculate age from birthdate
 * @param birthdate - The birthdate as a Date object
 * @returns The age in years, or null if birthdate is not provided
 */
export function calculateAge(birthdate: Date | null | undefined): number | null {
  if (!birthdate) return null

  const today = new Date()
  const birth = new Date(birthdate)

  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  // If birthday hasn't occurred this year yet, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}
