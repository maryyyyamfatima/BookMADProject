import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/config/firebase"; // Firebase app configuration

export const useFetchData = () => {
  const [books, setBooks] = useState({});

  useEffect(() => {
    const db = getDatabase(app);
    const booksRef = ref(db, "books");
    const unsubscribe = onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched data from Firebase:", data);
      if (data) {
        setBooks(data.books);
      }
    });

    return () => unsubscribe();
  }, []);

  return books;
};
