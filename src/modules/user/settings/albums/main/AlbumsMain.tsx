import { useState } from "react";
import { ModalCreateAlbum } from "../ModalCreateAlbum/ModalCreateAlbum";

export const AlbumsMain = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateAlbum = (data: any) => {
    console.log("Новий альбом:", data);

   
    setAlbums(prev => [...prev, data]);
    setIsOpen(false);
  };

  return (
    <div>
      <h2>Мої альбоми</h2>

      {albums.length === 0 ? (
        <div>
          <p>Немає жодного альбому</p>
          <button onClick={() => setIsOpen(true)}>
            Створити альбом
          </button>
        </div>
      ) : (
        <div>
          {albums.map((album, index) => (
            <div key={index}>
              <h3>{album.title}</h3>
              <p>{album.description}</p>
            </div>
          ))}
        </div>
      )}

      {isOpen && (
        <ModalCreateAlbum
          onClose={() => setIsOpen(false)}
          onCreate={handleCreateAlbum}
        />
      )}
    </div>
  );
};