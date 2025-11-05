import { Bookmark } from "lucide-react";
import { BookmarkCheck } from "lucide-react";
import { useEffect, useState } from "react";

export function FavorisIcon({ id, arr, setArr }) {
  const [isFav, setIsFav] = useState(() => arr.includes(id));

  // Synchroniser l'état local si arr change depuis le parent
  useEffect(() => {
    setIsFav(arr.includes(id));
  }, [arr, id]);

  const handleFavoris = () => {
    if (isFav) {
      // retirer des favoris
      setArr((prev) => prev.filter((item) => item !== id));
    } else {
      // ajouter sans doublons
      setArr((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }
    setIsFav(!isFav);
  };

  return (
    <button
      onClick={handleFavoris}
      className="absolute top-2 right-2"
    >
      {isFav ? <BookmarkCheck color="white" /> : <Bookmark color="white" />}
    </button>
  );
}

