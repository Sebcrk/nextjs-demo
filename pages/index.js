import Head  from "next/head";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta 
          name="description"
          content="Browse a list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// //** this runs always on the server after deployment **/
// export async function getServerSideProps (context) {
// context.req --- context.res
//   // fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

// // **this runs during the build process**
// // **before the components are loaded**
export async function getStaticProps() {
  // here we fetch data from API and pass it
  // to the components before they load

  const meetupsData = [];
  try {
    const querySnapshot = await getDocs(collection(db, "meetups"));

    querySnapshot.forEach((doc) => {
      meetupsData.push({ ...doc.data(), id: doc.id });
    });
  } catch (e) {
    console.error("Error fetching meetups: ", e);
  }

  return {
    props: {
      meetups: meetupsData,
    },
    // regenerates the page on the server to
    // update data
    revalidate: 10,
  };
}

export default HomePage;
