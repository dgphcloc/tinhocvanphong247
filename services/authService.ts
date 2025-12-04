import { supabase } from "./supabaseClient";
import { UserProfile } from "../types";

// Hằng số để tạo email ảo từ số điện thoại
const EMAIL_DOMAIN = "jhibfvybh@gmail.com";

/**
 * Đăng ký tài khoản bằng Số điện thoại + Mật khẩu
 * Lưu ý: Supabase yêu cầu email, nên ta sẽ tạo email ảo từ SĐT.
 */
export const signUp = async (
  phone: string,
  password: string,
  fullName: string,
  facebookUrl?: string,
  note?: string
) => {
  if (!supabase) throw new Error("Supabase not configured");

  // Tạo email ảo: 0912345678 -> 0912345678@tinhocvanphong247.local
  const dummyEmail = `${phone}${EMAIL_DOMAIN}`;

  const { data, error } = await supabase.auth.signUp({
    email: dummyEmail,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone, // Lưu số điện thoại gốc vào metadata
        facebook_url: facebookUrl,
        note: note,
      },
    },
  });
  // 3. Call Supabase Auth

  if (error) {
    throw error;
  }

  // 4. Insert into 'user_details' table
  // This executes the requirement: "tạo 1 bảng userDetail trên supabase để lưu lại các thông tin này nữa"
  if (data.user) {
    const { error: dbError } = await supabase.from("user_details").insert([
      {
        id: data.user.id, // Link to the auth user
        full_name: fullName,
        phone: phone,
        facebook_url: facebookUrl,
        note: note,
      },
    ]);

    if (dbError) {
      console.error("Error creating user_details entry:", dbError);
      // NOTE: Even if this fails, the Auth user is already created.
      // Depending on business logic, you might want to delete the user or just log the error.
    }
  }
  return data;
};

/**
 * Đăng nhập bằng Số điện thoại + Mật khẩu
 */
export const signIn = async (phone: string, password: string) => {
  if (!supabase) throw new Error("Supabase not configured");

  // Chuyển SĐT thành email ảo để đăng nhập
  const dummyEmail = `${phone}${EMAIL_DOMAIN}`;
  console.log("Dummy email for sign-in:", dummyEmail, password);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: dummyEmail,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async (): Promise<UserProfile | null> => {
  if (!supabase) return null;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return null;

  return {
    id: session.user.id,
    // Hiển thị số điện thoại (lấy từ metadata hoặc parse từ email ảo)
    email:
      session.user.user_metadata?.phone ||
      session.user.email?.replace(EMAIL_DOMAIN, "") ||
      "",
    fullName: session.user.user_metadata?.full_name,
    avatarUrl: session.user.user_metadata?.avatar_url,
    role: "user",
  };
};
