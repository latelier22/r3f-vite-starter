"use client"

import React from 'react';
import {Pen} from '../icons';

function EditableButton({ text, onChange, onBlur, isEditable, inputRef }) {
    return (
      isEditable ? (
        <>
        <input
          className="text-white bg-transparent text-center w-full absolute -bottom-7"
          type="text"
          value={text}
          ref={inputRef}
          onChange={onChange}
          onBlur={onBlur}
        />
      
        </>
      ) : (
        <div className="text-white bg-transparent text-center w-full absolute -bottom-5">
          {text} <Pen/>
        </div>
      )
    );
  }

  export  default EditableButton;
