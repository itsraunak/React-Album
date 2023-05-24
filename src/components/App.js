import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { AlbumList, AddAlbum, UpdateAlbum, Navbar } from './index';
import { AlbumList, AddAlbum, UpdateAlbum } from './index';
import toast from 'react-hot-toast';

function App() {
    const [albums, setAlbums] = useState([]);
    const [updateAlbum, setUpdateAlbum] = useState({});

    const handleFetchAlbums = async () => {
        try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/albums'
            )
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    return json;
                });
            setAlbums(response);
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };
    useEffect(() => {
        handleFetchAlbums();
        console.log('x', 2);
    }, []);

    const handleUpdateAlbum = async (albumId, updatedData, updateAlbumData) => {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/albums/${albumId}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(updatedData),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            );
            const { title, userId } = updatedData;

            const newAlbum = {
                title,
                userId,
                id: albumId,
            };

            /**
             * Both the ways are correct
             */

            // albums[albums.findIndex((album) => album.id === albumId)] =
            //     newAlbum;
            albums[albums.indexOf(updateAlbumData)] = newAlbum;

            setAlbums(albums);
            return response;
        } catch (error) {
            console.error('Error updating album:', error);
        }
    };

    const handleAddAlbum = async (albumData) => {
        try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/albums',
                {
                    method: 'POST',
                    body: JSON.stringify(albumData),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            );
            const { title, userId } = albumData;
            console.log('albumData', title, userId);

            const newAlbum = {
                title,
                userId,
                id: albums[albums.length - 1].id + 1,
            };
            setAlbums([...albums, newAlbum]);
            return response;
        } catch (error) {
            console.error('Error adding album:', error);
        }
    };

    const handleDeleteAlbum = async (albumId) => {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/albums/${albumId}`,
                {
                    method: 'DELETE',
                }
            );
            console.log('response', response);
            const newAlbums = albums.filter((album) => album.id !== albumId);

            setAlbums([...newAlbums]);

            toast.success('Album deleted successfully');
        } catch (error) {
            console.error('Error deleting album:', error);
        }
    };

    return (
        <div className="body">
            <Routes>
                <Route
                    path="/"
                    element={
                        <AlbumList
                            albums={albums}
                            setAlbums={setAlbums}
                            setUpdateAlbum={setUpdateAlbum}
                            handleFetchAlbums={handleFetchAlbums}
                            handleDeleteAlbum={handleDeleteAlbum}
                        />
                    }
                ></Route>

                <Route
                    path="/add-album"
                    element={
                        <AddAlbum
                            albums={albums}
                            setAlbums={setAlbums}
                            handleAddAlbum={handleAddAlbum}
                        />
                    }
                ></Route>

                <Route
                    path="/update-album"
                    element={
                        <UpdateAlbum
                            albums={albums}
                            setAlbums={setAlbums}
                            updateAlbum={updateAlbum}
                            handleUpdateAlbum={handleUpdateAlbum}
                        />
                    }
                ></Route>
            </Routes>
        </div>
    );
}

export default App;
