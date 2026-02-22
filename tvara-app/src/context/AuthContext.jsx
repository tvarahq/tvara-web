import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGithub = () =>
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })

  const signInWithEmail = (email, password) =>
    supabase.auth.signInWithPassword({ email, password })

  const signUpWithEmail = (email, password, firstName, lastName) =>
    supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`.trim(),
        },
      },
    })

  const resetPassword = (email) =>
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

  const updatePassword = (newPassword) =>
    supabase.auth.updateUser({ password: newPassword })

  const signInAsGuest = () => supabase.auth.signInAnonymously()

  const signOut = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{
      user,
      isLoading: user === undefined,
      isGuest: user?.is_anonymous === true,
      signInWithGithub,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      resetPassword,
      updatePassword,
      signInAsGuest,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
