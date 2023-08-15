const formatDate = (dateTime) => {
    const options = { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    return new Date(dateTime).toLocaleString(undefined, options);

};

export default formatDate;