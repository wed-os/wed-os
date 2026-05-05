import '@tailwindcss/browser'
import { configResponsive } from 'ahooks'

// Cấu hình lại responsive của ahooks cho phù hợp với tailwindcss.
configResponsive({
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
})
