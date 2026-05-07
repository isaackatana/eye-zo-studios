import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "./AuthContext";

type FavoritesContextType = {
  favoriteSongIds: number[];
  isFavorite: (songId: number) => boolean;
  toggleFavorite: (songId: number) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favoriteSongIds, setFavoriteSongIds] = useState<number[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavoriteSongIds([]);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        setFavoriteSongIds(data.favoriteSongIds ?? []);
      } else {
        await setDoc(userRef, {
          email: user.email,
          favoriteSongIds: [],
        });

        setFavoriteSongIds([]);
      }
    };

    loadFavorites();
  }, [user]);

  const isFavorite = (songId: number) => {
    return favoriteSongIds.includes(songId);
  };

  const toggleFavorite = async (songId: number) => {
    if (!user) {
      alert("Please log in to save favorites.");
      return;
    }

    const nextFavorites = isFavorite(songId)
      ? favoriteSongIds.filter((id) => id !== songId)
      : [...favoriteSongIds, songId];

    setFavoriteSongIds(nextFavorites);

    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email,
        favoriteSongIds: nextFavorites,
      },
      { merge: true }
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteSongIds,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}