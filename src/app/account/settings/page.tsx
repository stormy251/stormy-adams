import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import AccountSettingsForm from '@/features/auth/components/AccountSettingsForm';
import { Database } from '@/lib/supabase/types/supabase';

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AccountSettingsForm session={session} />;
}
