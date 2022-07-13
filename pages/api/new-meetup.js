import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const querySnapshot = await getDocs(collection(db, "meetups"))
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });

    try {
      const docRef = await addDoc(collection(db, "meetups"), data);

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
