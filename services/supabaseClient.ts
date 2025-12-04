import { createClient } from "@supabase/supabase-js";

// Lấy thông tin cấu hình từ biến môi trường
const supabaseUrl =
  process.env.SUPABASE_URL ?? "https://djalczwskyssxjckayit.supabase.co";
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqYWxjendza3lzc3hqY2theWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NDk0MzgsImV4cCI6MjA4MDIyNTQzOH0.YlqAI4Dh8J3PgMTxMT93dxSz1vMF-jNFACddsFNde8s";

// Khởi tạo client chỉ khi có cấu hình, nếu không sẽ trả về null
// Điều này giúp app không bị crash nếu người dùng chưa setup env var
export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
