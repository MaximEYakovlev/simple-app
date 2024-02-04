import axios from 'axios';

export const updateBalance = async (userId, amount, action) => {
    try {
        await axios.put('http://localhost:8080/balance', {
            userId,
            amount,
            action,
        });
    } catch (error) {
        console.error(error);
    }
};
