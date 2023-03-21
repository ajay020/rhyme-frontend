import Head from "next/head";
import { Inter } from "next/font/google";
import { PoemType } from "@/model/Types";
import { Poem } from "@/components/Poem";
import styles from "@/styles/Home.module.css";
import { BASE_URL } from "@/common/config";

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
        {poems.length == 0 && <h2>No Poem found, Write one.</h2>}

        {poems.map((poem) => (
          <Poem poem={poem} key={poem._id} />
        ))}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let poems = [];
  try {
    const res = await fetch(BASE_URL + "/api/poem");

    poems = await res.json();
  } catch (error: any) {
    console.log(error);
  }

  return { props: { poems } };
}
