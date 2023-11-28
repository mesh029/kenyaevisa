// FileUpload.js
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

const FileUpload = ({ label, name, handleFileUpload, multiple }) => {
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <Input
        type="file"
        inputProps={{ accept: 'image/*' }}
        onChange={(event) => handleFileUpload(event, name)}
        multiple={multiple}
      />
    </div>
  );
};

export default FileUpload;
