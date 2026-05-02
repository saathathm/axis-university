import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;
