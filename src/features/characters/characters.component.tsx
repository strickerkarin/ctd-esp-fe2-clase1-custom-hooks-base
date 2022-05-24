import { FC } from 'react';
import { useGetCharactersQuery } from 'features/characters/characters.endpoints';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  addCharacterToFollowingList,
  removeCharacterToFollowingList
} from 'features/following/following.slices';
import { FollowingButtonComponent } from 'features/following/button';
import Character from 'features/characters/characters.types';
import Modal from '../../Modal/Modal';
import useDisclosure from '../../hooks/useDisclosure';

export type CharactersComponentProps = {
  rickIDDS: number[];
};

const CharactersComponent: FC<CharactersComponentProps> = ({
  rickIDDS
}: CharactersComponentProps) => {
  const { data: characters, error, isLoading } = useGetCharactersQuery({ ids: rickIDDS });
  const dispatch = useAppDispatch();
  const followingIds = useAppSelector((state) => state.following.followingIds);
  const { isOpen: modalIsOpen, close: closeModal, toggle: toggleModal } = useDisclosure();

  if (isLoading) return <div>Loading characters...</div>;
  if (error || !characters) return <div>Error when loading. Please try again later.</div>;
  const charactersArray = Array.isArray(characters) ? characters : [characters];

  const onToggleFavorite = (character: Character, setFav: boolean) => {
    if (setFav) {
      dispatch(addCharacterToFollowingList(character.id));
    } else {
      dispatch(removeCharacterToFollowingList(character.id));
    }
  };

  return (
    <>
      <div className={'characters'}>
        <Modal visible={modalIsOpen} close={closeModal} />
        {charactersArray.map((character) => (
          <div className={'card'} key={character.id}>
            <div className={'card-image'} onClick={toggleModal}>
              <img src={character.image} />
            </div>
            <div className={'card-body'}>
              <span>{character.name}</span>
              <FollowingButtonComponent
                isFav={followingIds.indexOf(character.id) >= 0}
                onToggleFavorite={(setFav) => onToggleFavorite(character, setFav)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CharactersComponent;
