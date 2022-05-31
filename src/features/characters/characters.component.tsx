import { FC } from 'react';
import { useGetCharactersQuery } from 'features/characters/characters.endpoints';
import Modal from '../../Modal/Modal';
import useDisclosure from '../../hooks/useDisclosure';
import CharacterComponent from './Character.component';

export type CharactersComponentProps = {
  charactersIds: number[];
  loadingComponent?: any;
};

const CharactersComponent: FC<CharactersComponentProps> = ({
  charactersIds,
  loadingComponent
}: CharactersComponentProps) => {
  const { data: characters, error, isLoading } = useGetCharactersQuery({ ids: charactersIds });


  if (isLoading) {
    return <>{loadingComponent()}</>;
  }

  if (error || !characters) return <div>Error when loading. Please try again later.</div>;

  const charactersArray = Array.isArray(characters) ? characters : [characters];

  return (
    <>
      <div className="characters">
       
        {charactersArray.map((character) => (
          <CharacterComponent key={character.id} character={character}></CharacterComponent>
        ))}
      </div>
    </>
  );
};

export default CharactersComponent;
