import { useParams } from "react-router-dom";
import { useCharacterDetail } from "../hooks/useCharacterDetail";


export default function CharacterDetail() {
    const { id } = useParams();
    const {data: character, isLoading, error} = useCharacterDetail(id);

    console.log("Character detail data:", character);

    return (
        <div className="container mx-auto p-4">
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading character details.</p>
            ) : (
                <div>
                    <h1 className="text-3xl font-bold mb-6">{character.name}</h1>
                    <p>{character.description}</p>
                    <img src={character.image} alt={character.name} />
                    <p>{character.species}</p>
                    <p>{character.status}</p>
                    <p>{character.gender}</p>
                    <p>{character.origin.name}</p>
                </div>
            )}
        </div>
    );
}