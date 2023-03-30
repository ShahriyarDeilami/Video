import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Account from '@/components/Account';

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  console.log('session :', session);

  return (
    <div className='container' style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme='dark'
          providers={[]}
        />
      ) : (
        <Account session={session} />
      )}
    </div>
  );
};

export default Home;