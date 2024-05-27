"use client";
import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchUser, createUser, updateUser, deleteUser } from '../redux/action/mock-api-action';
import { updateCurrentPage } from "../redux/reducer/mock-api-reducer";
import searchIcon from "../../assets/search-icon.svg";
import "./index.css";
import { UserCard } from '../components/users_list_cards/index';
import commonLoader from "../../assets/common-loader.gif";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function UsersPage() {
    const dispatch = useDispatch();
    const { loading, users, error, currentPage, usersPerPage } = useSelector((state) => state.mockApi);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [searchedUserId, setSearchedUserId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        vehicle: ''
    });
    const { user, isLoading } = useUser();


    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const totalUsers = users.length;
    const lastPage = (totalUsers / usersPerPage).toFixed(0);
    var currentUsers = users;

    const renderUserRange = () => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const upperBound = Math.min(indexOfLastUser, totalUsers);
        const lowerBound = Math.min(indexOfFirstUser + 1, totalUsers);

        return `Showing ${lowerBound}-${upperBound} out of ${totalUsers}`;
    };

    if (Array.isArray(users)) {
        currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    }

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= Math.ceil(totalUsers / usersPerPage)) {
            dispatch(updateCurrentPage(pageNumber));
        }
    };

    const handleUpdateUser = (user) => {
        setFormData({
            name: user.name,
            description: user.description,
            vehicle: user.vehicle
        })
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteUser(selectedUser.id));
        setIsDeleteModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({ userId: selectedUser.id, userData: formData }))
        setFormData({
            name: '',
            description: '',
            vehicle: ''
        });
        setIsEditModalOpen(false)
    };

    const handleInputChange = (event) => {
        setSearchedUserId(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchUser(searchedUserId));
    };

    const handleCreateUserModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateUserSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(formData))
        setFormData({
            name: '',
            description: '',
            vehicle: ''
        });
        setIsCreateModalOpen(false);
    };


    if(!user  && !isLoading) {
        return (
            <div className="explore-user-list-container">
                You are not authorized to access this page
            </div>
        )
    }

    return (
        <div>
            <form className="mock-search-container" onSubmit={handleSearchSubmit}>
                <input id="search-user-id" className="mock-search-input pointer-cursor" name="id" placeholder="Enter ID" value={searchedUserId || ""} onChange={handleInputChange} />
                <button id="search-submit-btn" className="mock-search-submit-button pointer-cursor" type="submit" disabled={!searchedUserId}>
                    <Image src={searchIcon} alt="Search" width={18} height={18} />
                </button>
            </form>
            <div className="explore-user-list-container" id="test">
                <div>
                    <h2>Mock API CRUD Operations</h2>
                </div>
                {loading ? (
                    <div className='loading-container'>
                        <Image src={commonLoader} alt="Loader" width={42} height={42} />
                    </div>
                ) : error ? (
                    <div className='users-api-error-container'>
                        <p>Error: {error}</p>
                        <p className='pointer-cursor' onClick={() => dispatch(fetchUsers())}>Show all</p>
                    </div>
                ) : users.length > 0 ? (
                <>
                    <div className='alignself-baseline'>
                        <p>{renderUserRange()}</p>
                        {currentUsers.length === 1 ? (
                            <p className='pointer-cursor' onClick={() => dispatch(fetchUsers())}>Show all</p>
                        ) :
                            (<></>)
                        }
                    </div>
                    <div className="explore-user-list-wrapper">
                        {currentUsers.map((user) => (
                            <UserCard
                                key={user.id}
                                user={user}
                                onUpdateUser={handleUpdateUser}
                                onDeleteUser={handleDeleteUser}
                            />
                        ))}
                    </div>
                    <div className="explore-users-pagination-wrapper">
                        <button className={currentPage === 1 & currentUsers.length > 1 ? ("disable-btn") : ("")} onClick={() => paginate(1)}><a href="#test">&lt;&lt;</a></button>
                        <button className={currentPage === 1 & currentUsers.length > 1 ? ("disable-btn") : ("")} onClick={() => paginate(currentPage - 1)}><a href="#test">&lt;&nbsp;&nbsp;Previous</a></button>
                        <div className='pagination-current-page'><p>{currentPage}</p></div>
                        <button className={currentPage.toString() === lastPage & currentUsers.length > 1 ? ("disable-btn") : ("")} onClick={() => paginate(currentPage + 1)}><a href="#test">Next&nbsp;&nbsp;&gt;</a></button>
                        <button className={currentPage.toString() === lastPage & currentUsers.length > 1 ? ("disable-btn") : ("")} onClick={() => paginate(lastPage)}><a href="#test">&gt;&gt;</a></button>
                    </div>
                </>
                ) : (
                    <div className="loading-container">
                        <Image  src={commonLoader} alt="Loader" width={42} height={42} />
                    </div>
                )}
            </div>

            <div className="add-user-prompt" onClick={handleCreateUserModal}><p>Click to add user</p></div>

            <ReactModal className="edit-users-modal" isOpen={isEditModalOpen}>
                <div className="edit-users-container">
                    <form className="edit-users-form" onSubmit={handleSubmit}>
                        <div className="edit-user-input">
                            <label htmlFor="edit-user-name">Name:</label>
                            <input id="edit-user-name" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="edit-user-input">
                            <label htmlFor="edit-user-description">Description:</label>
                            <textarea id="edit-user-description" className="edit-user-textarea" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                        </div>
                        <div className="edit-user-input">
                            <label htmlFor="edit-user-vehicle">Vehicle:</label>
                            <input id="edit-user-vehicle" type="text" name="vehicle" placeholder="Vehicle" value={formData.vehicle} onChange={handleChange} />
                        </div>
                        <div className="edit-user-submit-btn">
                            <button id="edit-submit-btn" type="submit">Submit</button>
                        </div>
                    </form>
                    <button className="edit-users-modal-close" onClick={() => {
                        setIsEditModalOpen(false);
                        setFormData({
                            name: '',
                            description: '',
                            vehicle: ''
                        })
                    }}>Close</button>
                </div>
            </ReactModal>

            <ReactModal className="delete-user-modal" isOpen={isDeleteModalOpen}>
                <div className="delete-user-container">
                    <p>Are you sure you want to delete this user?</p>
                    <div className="delete-user-buttons">
                        <div className="delete-user-submit-btn">
                            <button onClick={() => handleConfirmDelete()}>Yes</button>
                        </div>
                        <div className="delete-user-submit-btn">
                            <button onClick={() => setIsDeleteModalOpen(false)}>No</button>
                        </div>
                    </div>
                </div>
            </ReactModal>

            <ReactModal className="edit-users-modal" isOpen={isCreateModalOpen}>
                <div className="edit-users-container">
                    <form className="edit-users-form" onSubmit={handleCreateUserSubmit}>
                        <div className="edit-user-input">
                            <label htmlFor="new-user-name">Name:</label>
                            <input id="new-user-name" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="edit-user-input">
                            <label htmlFor="new-user-description">Description:</label>
                            <textarea id="new-user-description" className="edit-user-textarea" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                        </div>
                        <div className="edit-user-input">
                            <label htmlFor="new-user-vehicle">Vehicle:</label>
                            <input id="new-user-vehicle" type="text" name="vehicle" placeholder="Vehicle" value={formData.vehicle} onChange={handleChange} />
                        </div>
                        <div className="edit-user-submit-btn">
                            <button id="new-user-submit-btn" type="submit">Submit</button>
                        </div>
                    </form>
                    <button className="edit-users-modal-close" onClick={() => {
                        setIsCreateModalOpen(false);
                        setFormData({
                            name: '',
                            description: '',
                            vehicle: ''
                        })
                    }}>Close</button>
                </div>
            </ReactModal >
        </div >
    );
};