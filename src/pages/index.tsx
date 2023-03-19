import Head from "next/head";
import { Inter } from "next/font/google";
import { PoemType } from "@/model/Types";
import { Poem } from "@/components/Poem";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

type PropTypes = {
  poems: PoemType[];
};

export default function Home({ poems }: PropTypes) {
  return (
    <>
      <Head>
        <title>Rhyme app</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {poems.map((poem) => (
          <Poem poem={poem} key={poem._id} />
        ))}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:8000/api/poem/");

  const poems = await res.json();

  // console.log(poems);

  return { props: { poems } };
}
