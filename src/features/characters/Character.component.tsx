import { Card } from './Card';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  addCharacterToFollowingList,
  removeCharacterToFollowingList
} from 'features/following/following.slices';
import Character from 'features/characters/characters.types';
import useDisclosure from '../../hooks/useDisclosure';
import Modal from '../../Modal/Modal';

export type CharacterComponentProps = {
  character: any;
};

const CharacterComponent = ({ character }: CharacterComponentProps) => {
  const dispatch = useAppDispatch();
  const followingIds = useAppSelector((state) => state.following.followingIds);
  const { isOpen: modalIsOpen, close: closeModal, toggle: toggleModal } = useDisclosure();

  const onToggleFavorite = (character: Character, setFav: boolean) => {
    if (setFav) {
      dispatch(addCharacterToFollowingList(character.id));
    } else {
      dispatch(removeCharacterToFollowingList(character.id));
    }
  };

  return (
    <>
      <Card key={character.id}>
        <Modal
          visible={modalIsOpen}
          close={closeModal}
          title={character.name}
          text={`Gender: ${character.gender}
           Status: ${character.status} 
           Species: ${character.species}        
           Location: ${character.location.name}         
        `}
        />     
        <Card.Picture src={character.image} alt={character.name} toggleModal={toggleModal} />
        <Card.Content character={character}>
          <Card.Actions
            character={character}
            followingIds={followingIds}
            onToggleFavorite={onToggleFavorite}
          />
        </Card.Content>
      </Card>
    </>
  );
};

export default CharacterComponent;
