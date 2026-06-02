// "use client"

// import { useTheme } from "next-themes"
// import { Toaster as Sonner } from "sonner";
// import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

// const Toaster = ({
//   ...props
// }) => {
//   const { theme = "system" } = useTheme()

//   return (
//     <Sonner
//       theme={theme}
//       className="toaster group"
//       icons={{
//         success: (
//           <CircleCheckIcon className="size-4" />
//         ),
//         info: (
//           <InfoIcon className="size-4" />
//         ),
//         warning: (
//           <TriangleAlertIcon className="size-4" />
//         ),
//         error: (
//           <OctagonXIcon className="size-4" />
//         ),
//         loading: (
//           <Loader2Icon className="size-4 animate-spin" />
//         ),
//       }}
//       style={
//         {
//           "--normal-bg": "var(--popover)",
//           "--normal-text": "var(--popover-foreground)",
//           "--normal-border": "var(--border)",
//           "--border-radius": "var(--radius)"
//         }
//       }
//       toastOptions={{
//         classNames: {
//           toast: "cn-toast",
//         },
//       }}
//       {...props} />
//   );
// }

// export { Toaster }

"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

// Export the Toaster component for your layout
export { Toaster }

// Export the toast function so you can use it in your pages
export { toast } from "sonner"