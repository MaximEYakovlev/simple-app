import { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

export const UserBalance = () => {
    const [userId, setUserId] = useState('');
    const [userBalance, setUserBalance] = useState('');

    const handleChange = (e) => {
        setUserId(e.target.value);
    };

    const fetchUserBalance = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/balance/${userId}`
            );

            setUserBalance(response.data);
            setUserId('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.form}>
            <h3>Check balance</h3>
            <div>
                <label>User ID:</label>
                <input
                    type="text"
                    name="userId"
                    value={userId}
                    onChange={handleChange}
                    placeholder="user ID"
                />
                <button onClick={() => fetchUserBalance(userId)}>
                    Check the balance
                </button>
            </div>
            <h4>Balance:</h4>
            <div className={styles.balance}>
                {new Intl.NumberFormat('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                }).format(userBalance)}
            </div>
        </div>
    );
};
