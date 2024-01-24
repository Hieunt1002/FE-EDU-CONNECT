import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import { jwtDecode } from 'jwt-decode';

function ProfileAvatar({ userData, onFileChange, isEditing, role, uploadedFile }) {
  const [profilePic, setProfilePic] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const decodedToken = jwtDecode(localStorage.getItem('token'));
  const userId = decodedToken.id;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setProfilePic(e.target.result);
    };
    reader.readAsDataURL(file);
    onFileChange(file);
  };
  const handleUploadClick = () => {
    document.getElementById('file-upload').click();
  };
  let avatarSrc;

  if (userData.img) {
    avatarSrc = profilePic === null ? `http://localhost:8081/edu/file/fileuser/${userData.img}/${userId}` : profilePic;
  } else {
    avatarSrc = profilePic;
  }
  return (
    <Box
      sx={{
        position: 'relative',
        height: '200px',
        width: '200px',
        margin: '50px auto',
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '1px 1px 15px -5px black',
        transition: 'all .3s ease',
        transform: isHovered && isEditing ? 'scale(1.05)' : 'scale(1)',
        cursor: isEditing ? 'pointer' : 'default',
      }}
      onMouseEnter={() => { isEditing && setIsHovered(true); }}
      onMouseLeave={() => { isEditing && setIsHovered(false); }}
      onClick={() => { isEditing && handleUploadClick(); }}
    >
      <Avatar
        className="profile-pic"
        sx={{
          height: '100%',
          width: '100%',
          transition: 'all .3s ease',
          position: 'relative',
          borderRadius: '50%',
          filter: isHovered && isEditing ? 'brightness(80%)' : 'none',
        }}
        type='file'
        onChange={handleFileChange}
        src={avatarSrc}
      >
        {!profilePic && (
          <PersonIcon
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '150px',
              color: '#34495e',
              opacity: isHovered && isEditing ? 0.5 : 1,
            }}
          />
        )}
      </Avatar>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isHovered && isEditing ? 0.9 : 0,
          transition: 'opacity .3s ease',
        }}
      >
        <CloudUploadIcon
          sx={{
            fontSize: '234px',
            color: '#34495e',
          }}
        />
      </Box>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Box>
  );
}

export default ProfileAvatar;