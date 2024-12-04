import Form from 'next/form';

import SignInWithNeynar from './sign-in-with-neynar';

export function AuthForm({
  action,
}: {
  action: any;
  children: React.ReactNode;
}) {
  return (
    <Form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
      <SignInWithNeynar handleSignInSuccess={(data) => action(data)} />
    </Form>
  );
}
