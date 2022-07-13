import Head from "next/head";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const meetupsIds = [];
  const querySnapshot = await getDocs(collection(db, "meetups"));
  // query for the IDs of all the docs
  querySnapshot.forEach((doc) => {
    meetupsIds.push(doc.id);
  });

  return {
    // paths: meetupsIds.map(
    //   (meetupId) => (
    //     console.log("This is one id " + meetupId),
    //     {
    //       params: { meetupId: meetupId },
    //     }
    //   )
    // ),
    paths: meetupsIds.map((meetupId) => ({
      params: { meetupId: meetupId },
    })),
    fallback: "blocking",
  };
}

export const getStaticProps = async (context) => {
  // fetch data from a single meetup
  const meetupId = context.params.meetupId;
  // console.log(meetupId);

  // query for a single document based on its ID
  const docRef = doc(db, "meetups", meetupId);
  const docSnap = await getDoc(docRef);

  let meetup = "";
  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    meetup = docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  // console.log(meetup);
  return {
    props: {
      meetupData: {
        id: meetupId,
        ...meetup,
      },
    },
  };
};

export default MeetupDetails;
