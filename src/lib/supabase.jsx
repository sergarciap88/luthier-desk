import { createClient } from '@supabase/supabase-js';

// Tomamos las variables de entorno que configuraste en el .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicializamos el cliente oficial de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);