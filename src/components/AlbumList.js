import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './index';

const AlbumList = (props) => {
    return (
        <>
            {/* Navbar */}
            <Navbar page="Add Album" path="/add-album" />

            <div className="albums-list">
                {props.albums.map((album) => (
                    <div className="list" key={album.id}>
                        <span className="album-title">{album.title}</span>
                        <span className="buttons">
                            <Link to="/update-album">
                                <button
                                    className="update-btn"
                                    onClick={() => props.setUpdateAlbum(album)}
                                >
                                    Update
                                </button>
                            </Link>
                            <button
                                className="delete-btn"
                                onClick={() =>
                                    props.handleDeleteAlbum(album.id)
                                }
                            >
                                Delete
                            </button>
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AlbumList;
