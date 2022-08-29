import { UserProvider } from "@auth0/nextjs-auth0";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  const { user } = pageProps;

  return (
    <UserProvider user={user}>
      <Component {...pageProps} />;
    </UserProvider>
  );
}

export default MyApp;
// redirectUri={`${window.location.origin}/egzon`}
