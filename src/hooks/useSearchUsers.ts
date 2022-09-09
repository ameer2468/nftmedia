import { useEffect, useState } from "react";
import { supabase } from "../constants/supabase";
import { IUserInfo } from "../types/user";

export const useSearchUsers = (search: string) => {
  const [users, setUsers] = useState<null | IUserInfo[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchUsers = async (display_name: string) => {
    setSearchLoading(true);
    const { data } = await supabase
      .from("auth")
      .select("display_name, avatar_image_url, id, created_at")
      .ilike("display_name", `%${display_name}%`);
    setUsers(data);
    setSearchLoading(false);
  };

  useEffect(() => {
    if (search) {
      fetchUsers(search);
    } else {
      return;
    }
  }, [search]);
  return { users, search, fetchUsers, setUsers, searchLoading };
};
