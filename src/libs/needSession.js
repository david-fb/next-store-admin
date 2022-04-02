import { getSession } from 'next-auth/react';

export default async function needSession(context) {
  const session = await getSession(context);

  if (session) {
    return {
      props: {
        token: session.token,
      },
    };
  }
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
