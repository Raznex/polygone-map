import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { transformData } from '../../../utils/transformHook';
import {
  deletePolygon,
  postNewPolygon,
  updatePolygon,
} from '../../../utils/Api';

const PolygonForm = ({
  coordinates,
  setCoordinates,
  isPolygon,
  setIsPolygon,
}) => {
  useEffect(() => {
    if (isPolygon !== null) {
      setValue('name', isPolygon.name);
    }
  }, [isPolygon]);
  const { register, handleSubmit, reset, setValue } = useForm();
  const onSubmit = (data) => {
    postNewPolygon(transformData(data, coordinates)).then((res) =>
      console.log(res)
    );
    reset();
    setCoordinates([]);
  };

  const handleChangeCoord = (e) => {
    const inputCoordinates = e.target.value.split(',');
    let groupedCoordinates = [];
    for (let i = 0; i < inputCoordinates.length; i += 2) {
      const coordinatePair = `${inputCoordinates[i]},${inputCoordinates[i + 1]}`;
      groupedCoordinates.push(coordinatePair);
    }
    setCoordinates(groupedCoordinates);
  };

  const handleDelete = () => {
    deletePolygon(isPolygon.id).then(() => {
      alert('Полигон удален');
    });
    setCoordinates([]);
    reset();
    setIsPolygon(null);
    setValue('name', '');
  };
  const handleUpdate = (data) => {
    console.log(data);
    updatePolygon(isPolygon.id, transformData(data, coordinates)).then((res) =>
      console.log(res)
    );
    reset();
    setCoordinates([]);
    setValue('name', '');
  };

  const onClear = () => {
    setIsPolygon(null);
    setCoordinates([]);
    setValue('name', '');
    reset();
  };

  return (
    <form
      onSubmit={isPolygon ? handleSubmit(handleUpdate) : handleSubmit(onSubmit)}
      className='form'
    >
      <input
        className='input'
        type='text'
        placeholder='Название'
        {...register('name', { required: true })}
      />
      <textarea
        className='input text-area'
        value={coordinates}
        onChange={handleChangeCoord}
      />
      <div className='form-buttons'>
        {isPolygon ? (
          <>
            <button className='button' type='submit'>
              Редактировать
            </button>
            <button
              className='button button-delete'
              type='button'
              onClick={handleDelete}
            >
              Удалить
            </button>
            <button
              className='button button-clear'
              type='button'
              onClick={onClear}
            >
              Очистить
            </button>
          </>
        ) : (
          <>
            <button className='button' type='submit'>
              Отправить
            </button>
            <button
              className='button button-clear'
              type='button'
              onClick={onClear}
            >
              Очистить
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default PolygonForm;
