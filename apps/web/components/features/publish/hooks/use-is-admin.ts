"use client"

import { useUser } from "@clerk/nextjs"
import { useClerkSupabaseClient } from "@/lib/clerk"
import { useQuery } from "@tanstack/react-query"

export const useIsAdmin = () => {
  const { user } = useUser()
  const client = useClerkSupabaseClient()

  const { data: isCurrentUserAdmin = false } = useQuery({
    queryKey: ["user", user?.id, "isAdmin"],
    queryFn: async () => {
      if (!user?.id) return false
      const { data } = await client
        .from("users")
        .select("is_admin")
        .eq("id", user?.id!)
        .single()
      return data?.is_admin ?? false
    },
    enabled: !!user?.id,
  })

  return isCurrentUserAdmin
}
