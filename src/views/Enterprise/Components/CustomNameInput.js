import React, { useState } from 'react';

const CustomNameInput = () => {
  const [days, setDays] = useState(1);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setDays(value);
    } else {
      setDays(0); // If the value is negative, reset to 0
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <input
        type="number"
        value={days}
        onChange={handleChange}
        style={{ textAlign: 'center', height: '40.6px', width:"100px", background: 'transparent', border: '1px solid grey', borderRadius: '4px' }}
        min="0" // This sets the minimum value for the input field
      />
    </div>
  );
};

export default CustomNameInput;
