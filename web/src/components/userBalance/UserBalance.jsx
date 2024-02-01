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
        console.log({ userId });
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
            <h3>User balance</h3>
            <div>
                <h4>Check the balance</h4>
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
            <div>Balance:</div>
            <div style={{ color: 'red', fontWeight: 'bold' }}>
                {new Intl.NumberFormat('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                }).format(userBalance)}
            </div>
        </div>
    );
};
