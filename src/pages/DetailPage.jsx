import CharacterDetail from "../features/characters/CharacterDetail";
import NoteForm from "../features/inventory/NoteForm";

export default function DetailPage() {
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <CharacterDetail />
            <NoteForm />
        </div>
    );
}