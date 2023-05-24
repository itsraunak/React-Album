import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './index';
import toast from 'react-hot-toast';

const UpdateAlbum = (props) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState(props.updateAlbum.title);
    const [userId, setUserId] = useState(props.updateAlbum.userId);
    const [updatingAlbum, setUpdatingAlbum] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setUpdatingAlbum(true);
        let error = false;

        if (!title || !userId) {
            toast.error('Please fill all the fields');
            error = true;
        }

        if (error) {
            return setUpdatingAlbum(false);
        }
        const updatedornot = await props.handleUpdateAlbum(
            props.updateAlbum.id,
            {
                title,
                userId,
            },
            props.updateAlbum
        );
        console.log('updatedornot', updatedornot.status);
        if (updatedornot.status === 200) {
            toast.success('Album updated successfully');
            return navigate('/');
        } else {
            toast.error('Album not updated');
        }
        setUpdatingAlbum(false);
    };
    return (
        <>
            {/* Navbar */}
            <Navbar />

            <div className="updatealbum-container">
                <div className="updatealbum-form">
                    <h2>updat Album</h2>
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="title">Enter Updated Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="userId">Enter Updated User ID</label>
                        <input
                            type="number"
                            name="userId"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />

                        <button disabled={updatingAlbum} type="submit">
                            {updatingAlbum
                                ? 'Updating Album...'
                                : 'Update Album'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateAlbum;
