import { useState, useEffect } from "react";
import Head from "next/head";
import fire from "../config/fire-config";
import CreatePost from "../component/CreatePost";
import Link from "next/link";
import { Button } from "react-bootstrap";
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  useEffect(() => {
    fire
      .firestore()
      .collection("blog")
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogs);
      });
  }, []);
  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        setNotification("Logged out");
        setTimeout(() => {
          setNotification("");
        }, 2000);
      });
  };
  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1 className="container">Blog</h1>
      {notification}
      {!loggedIn ? (
        <div>
          <Link href="/users/register">
            <a>Register</a>
          </Link>{" "}
          |
          <Link href="/users/login">
            <a> Login</a>
          </Link>
        </div>
      ) : (
        <Button variant="outline-danger" onClick={handleLogout}>
          Logout
        </Button>
      )}
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href="/blog/[id]" as={"/blog/" + blog.id}>
              <a itemProp="hello">{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      {loggedIn && <CreatePost />}
    </div>
  );
};
export default Home;
