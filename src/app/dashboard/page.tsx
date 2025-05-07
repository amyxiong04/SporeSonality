import { supabase } from '@/lib/supabase'

export default async function DashboardPage() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <p className="p-8">You must be logged in to view your dashboard.</p>
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Welcome back 🍄</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User ID:</strong> {user.id}</p>
    </div>
  )
}
