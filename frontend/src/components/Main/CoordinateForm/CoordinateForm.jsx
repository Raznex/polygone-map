import React from 'react';

const CoordinateForm = ({ position, setCoordinates, setPosition }) => {
  const handleChange = (e) => {
    setPosition(e.target.value);
  };

  const handleSubmit = () => {
    setCoordinates((prevCoordinates) => {
      return [...prevCoordinates, position];
    });
    setPosition([]);
  };
  return (
    <div className='form'>
      <input
        className='input'
        type='text'
        value={position}
        onChange={handleChange}
        placeholder='Координаты'
      />
      <button
        className='button'
        type='submit'
        onClick={() => {
          handleSubmit();
        }}
      >
        Добавить
      </button>
    </div>
  );
};

export default CoordinateForm;
