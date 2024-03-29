import styles from "../styles/WritePoem.module.css";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "@/common/config";
import Spinner from "@/components/Spinner";

interface UserData {
  name: string;
  email: string;
  token: string;
}

export default function WritePoem() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const router = useRouter();

  const submitPoem = async (e: FormEvent) => {
    e.preventDefault();

    let userString = localStorage.getItem("user");
    let user;

    if (userString) {
      user = JSON.parse(userString) as UserData;
    }

    try {
      if (title && description && user) {
        setLoading(true);
        const poem = { title, description };
        const response = await fetch(BASE_URL + "/api/poem", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + user?.token,
          },
          body: JSON.stringify(poem),
        });
        const data = await response.json();
        router.push("/");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.write_poem}>
      <h3>Write A Poem</h3>
      <Spinner loading={loading} />
      <form onSubmit={submitPoem}>
        <div className={styles.form_group}>
          <input
            type="text"
            placeholder="Post title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.form_group}>
          <textarea
            placeholder="Write here..."
            name="description"
            cols={30}
            rows={10}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.form_group}>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
