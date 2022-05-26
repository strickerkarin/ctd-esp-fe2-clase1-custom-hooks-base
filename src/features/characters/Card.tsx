// Componente composto
import React from 'react';
import Character from '../characters/characters.types';
import { FollowingButtonComponent } from '../../features/following/button';

type ChildrenProps = {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  toggleModal?: (any: any) => any;
  character?: Character;
};

type ActionProps = {
  character: Character;
  followingIds: number[];
  onToggleFavorite: (character: Character, setFav: boolean) => void;
};

export const Card = ({ children }: ChildrenProps) => <div className={'card'}>{children}</div>;

Card.Picture = function CardPicture({ src, alt, toggleModal }: ChildrenProps) {
  return (
    <div className={'card-image'} onClick={toggleModal}>
      <img src={src} alt={alt} />
    </div>
  );
};

Card.Content = function CardContent({ children, character }: ChildrenProps) {
  return (
    <div className={'card-body'}>
      <span>{character?.name}</span>
      {children}
    </div>
  );
};

Card.Actions = function CardActions({ character, followingIds, onToggleFavorite }: ActionProps) {
  return (
    <FollowingButtonComponent
      isFav={followingIds.indexOf(character?.id) >= 0}
      onToggleFavorite={(setFav) => onToggleFavorite(character, setFav)}
    />
  );
};
