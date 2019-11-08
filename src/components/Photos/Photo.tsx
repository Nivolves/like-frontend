import React from 'react';

import { useRootData } from '../../hooks/useRootData';

import { IPhotoProps } from './PhotosTypes';

import './Photo.scss';

const Photo: React.FC<IPhotoProps> = ({ alt, attitude, id, isLiked, src }): JSX.Element => {
  const { addLike, deleteLike } = useRootData(({ addLike, deleteLike }) => ({
    addLike,
    deleteLike,
  }));

  return (
    <div
      key={id}
      className={`item item-${attitude}`}
      onDoubleClick={isLiked ? () => deleteLike(id) : () => addLike(id)}
    >
      <img className="photo" src={src} alt={alt} />
      <div className="heart-container" onClick={isLiked ? () => deleteLike(id) : () => addLike(id)}>
        <span className={`heart ${isLiked ? 'heart-active' : 'heart-not-active'}`}></span>
      </div>
    </div>
  );
};

export default Photo;
