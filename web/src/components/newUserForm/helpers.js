export const generateAccountNumber = () => {
    const accountNumber = Math.floor(100000 + Math.random() * 900000);
    return accountNumber;
};
