// utils/getServerSideUser.ts
import { GetServerSidePropsContext } from 'next';
import { createClient } from "@/utils/supabase/server";

export async function getServerSideUser(context: GetServerSidePropsContext) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = context.resolvedUrl;

  return { user, path };
}