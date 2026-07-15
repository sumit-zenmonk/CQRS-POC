
export interface User {
  uid: string
  email: string | null
  username: string | null
}

export interface UserState {
  user: User | null
  token: string
  loading: boolean
  error: string | null
  status: "pending" | "succeed" | "rejected"
}