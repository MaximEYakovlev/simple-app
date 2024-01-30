import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const UserInterface = () => {
    const generateAccountNumber = () => {
        const accountNumber = Math.floor(100000 + Math.random() * 900000);
        return accountNumber;
    };

    const accountNumber = generateAccountNumber();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        accountNumber: accountNumber,
        balance: 0,
    });
    const [users, setUsers] = useState([]);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        fetchUsers();
        setDeleted(false);
    }, [deleted, formData]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8080/user');
            setUsers(response.data);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://127.0.0.1:8080/user/${userId}`);
            alert('The user has been successfully deleted!');
            setDeleted(true);
        } catch (error) {
            console.error('Error when deleting the user:', error);
            alert('An error occurred while deleting the user');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://127.0.0.1:8080/user', formData);
            alert('The user has been successfully created!');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                birthDate: '',
                accountNumber: accountNumber,
                balance: 0,
            });
        } catch (error) {
            console.error('Error when creating a user:', error);
            alert('An error occurred when creating a user');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h2>Create a new user</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="The email address must be unique."
                        />
                    </div>
                    <div>
                        <label>Birth Date:</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Create a user</button>
                </form>
            </div>
            <div>
                <h2>User list</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={uuidv4()}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.balance}</td>
                                <td>
                                    <button
                                        style={{ backgroundColor: 'tomato' }}
                                        onClick={() =>
                                            handleDeleteUser(user.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserInterface;
