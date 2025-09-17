
import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://amruzxfwxtqevnxjqtgm.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtcnV6eGZ3eHRxZXZueGpxdGdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MTE4NTQsImV4cCI6MjA3MzE4Nzg1NH0.S6HUe7UnttfOK9iHZ3H8YLhwfzWw4nQr6E-UWzFZUX4";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

