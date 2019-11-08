import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Icon, Spin } from 'antd';
import { toJS } from 'mobx';

import Photo from './Photo';
import Search from '../Search/Search';

import { useRootData } from '../../hooks/useRootData';

import { IPhoto } from '../../Types/common';
import { url } from './PhotosTypes';

import { API, API_KEY, PHOTO_API, LIKES } from '../../constants/api';

import './Photos.scss';

const antIcon = <Icon type="loading" style={{ fontSize: 56 }} spin />;

const GET_LIKES = `${API}${LIKES}`;

const Photos: React.FC<RouteComponentProps<url>> = ({
  match: {
    params: { path },
  },
}): JSX.Element => {
  const { addLikes, addPhotos, likes, photos, setQuery, setQueryPhotos, userId, query } = useRootData(
    ({ addLikes, addPhotos, likes, photos, setQuery, setQueryPhotos, userId, query }) => ({
      addLikes,
      addPhotos,
      likes: likes.get(),
      photos: photos.get(),
      setQuery,
      setQueryPhotos,
      userId: userId.get(),
      query: query.get(),
    }),
  );

  useEffect(() => {
    if (query) {
      setQueryPhotos();
    }
  }, [setQueryPhotos, query]);

  useEffect(() => {
    if (path) {
      setQuery(path);
    }
    if (userId && !path) {
      fetch(`${PHOTO_API}${API_KEY}`)
        .then(res => res.json())
        .then(({ hits }) => addPhotos(hits))
        .catch(err => console.error(err));
    }
    fetch(`${GET_LIKES}/${userId}`)
      .then(res => res.json())
      .then(result => addLikes(result))
      .catch(err => console.error(err));
  }, [addLikes, addPhotos, path, setQuery, userId]);

  return (
    <div className="content">
      <Search />
      {likes.length && photos.length ? (
        <>
          <div className="grid">
            {toJS(photos).map(
              ({ id, imageHeight, imageWidth, largeImageURL, tags }: IPhoto): JSX.Element => (
                <Photo
                  key={id}
                  alt={tags}
                  attitude={Math.ceil(imageHeight / imageWidth)}
                  id={id}
                  isLiked={(toJS(likes) || []).includes(id)}
                  src={largeImageURL}
                />
              ),
            )}
          </div>
        </>
      ) : (
        <div className="spin">
          <Spin indicator={antIcon} />
        </div>
      )}
    </div>
  );
};

export default Photos;
