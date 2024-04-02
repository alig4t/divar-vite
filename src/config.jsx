
import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = 'https://qbaacnllyoyhtndgcvvs.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(
    "https://qbaacnllyoyhtndgcvvs.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiYWFjbmxseW95aHRuZGdjdnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMzkzMDEsImV4cCI6MjAyNjYxNTMwMX0.X-TRkyMuNPlvG6jr6-yxK5RHvlnJgVyyCRO3OK6QpT8"
)

