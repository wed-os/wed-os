import { appSchema } from '@task/constants/appSchema'
import { output } from 'zod'

/**
 * Một ứng dụng.
 */
export type App = output<typeof appSchema>
export type PartialApp = Partial<App>
