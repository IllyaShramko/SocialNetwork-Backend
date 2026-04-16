import { useState } from "react";

type Props = {
  onClose: () => void;
  onCreate: (data: { title: string; description: string }) => void;
};

export const ModalCreateAlbum = ({ onClose, onCreate }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onCreate({ title, description });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Створити альбом</h2>

        <input
          type="text"
          placeholder="Назва"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Опис"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div style={{ marginTop: "10px" }}>
          <button onClick={handleSubmit}>Створити</button>
          <button onClick={onClose}>Закрити</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    margin: "100px auto",
    width: "300px",
  },
};