import { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { generateAccountNumber } from './helpers';

export const NewUserForm = ({ addUserToList }) => {
    const generatedAccountNumber = generateAccountNumber();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        accountNumber: generatedAccountNumber,
        balance: 0,
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:8080/user',
                formData
            );

            addUserToList(response.data);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                birthDate: '',
                accountNumber: generatedAccountNumber,
                balance: 0,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.form}>
            <h3>Create new user</h3>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        placeholder="first name"
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        placeholder="last name"
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="must be unique"
                    />
                </div>
                <div>
                    <label>Birth Date:</label>
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleFormChange}
                    />
                </div>
                <button type="submit">Create user</button>
            </form>
        </div>
    );
};
