import { Bookmark } from "lucide-react";
import { BookmarkCheck } from "lucide-react";
import { useState } from "react";

export function FavorisIcon({ id, arr, setArr}) {
  const [isFav, setIsFav] = useState(false);
  const handleFavoris = (id) => {
    setIsFav(!isFav);
    if (!isFav) {
      console.log(id) 
      setArr((value) => [...value, id])
    } else {
      setArr((value) => value.filter((item) => item !== id));
    }
  };
  return (
      <button
        onClick={() => handleFavoris(id)}
        class="iconContainer"
        className="absolute top-2 right-2"
      >
        {isFav ? <BookmarkCheck color="white" /> : <Bookmark color="white" />}
      </button>
  );
}
