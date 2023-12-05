import React, { useEffect, useState } from 'react';
import axios from 'axios';


const TestPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if a file is selected
    if (!selectedFile) {
      setErrorMessage('Please select a file.');
      setFile(null);
      return;
    }

    // Check if the file type is allowed (PDF or image)
    if (!selectedFile.type.startsWith('image/') && selectedFile.type !== 'application/pdf') {
      setErrorMessage('Only PDF and image files are allowed.');
      setFile(null);
      return;
    }

    // Clear error message and set the selected file
    setErrorMessage('');
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:2000/api/upload', formData);
      console.log('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/files');
        setFiles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, []);

  const handleViewFile = (filename) => {
    // Open the file in a new window or tab
    window.open(`https://kenyaevisa.mytests.online/api/files/${encodeURIComponent(filename)}`, '_blank');
  };

  const renderFileIcon = (fileType) => {
    // Define mapping of file types to corresponding icons
    const fileIcons = {
      'image/jpeg': '📷', // Emoji for image
      'image/png': '🖼️',
      'application/pdf': '📄', // Emoji for PDF
      'application/msword': '📃', // Emoji for Word document
      // Add more mappings as needed
    };
  
    // Use the mapped icon or a default icon for unknown file types
    const icon = fileIcons[fileType] || '📁'; // Emoji for folder or unknown file
  
    return <span style={{ fontSize: '24px' }}>{icon}</span>;
  };
  

  return (
    <div sx={{marginTop: '90px'}}>
      <h1>HELLO WORLD</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}




      <h2>File List</h2>
      <ul>
      {files.map((file) => (
  <li key={file._id}>
    <div>
      {file.filetype && file.filetype.startsWith('image') ? (
        <img
          src={`https://kenyaevisa.mytests.online//api/files/${encodeURIComponent(file.filename)}`}
          alt={file.originalname}
          style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
        />
      ) : (
        renderFileIcon(file.filetype)
      )}
    </div>
    <div>
      <p>Filename: {file.filename}</p>
      <p>Original Name: {file.originalname}</p>
      <p>Size: {file.size} bytes</p>
      <p>Type: {file.filetype}</p>

      <button onClick={() => handleViewFile(file.filename)}>View File</button>


    </div>
  </li>
))}
      </ul>
    </div>
  );
};

export default TestPage;
