import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  text-align: center;
`;

const CloseButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background: #d32f2f;
  }
`;

const ConfirmButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background: #388e3c;
  }
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CustomModal = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    onConfirm(password);
    setPassword(''); // Clear the password field after submission
  };

  const handleClose = () => {
    setPassword(''); // Clear the password field when closing
    onClose();
  };

  return (
    isOpen && (
      <ModalOverlay>
        <ModalContent>
          <h2>Yeni Şifrenizi Giriniz</h2>
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre Giriniz"
          />
          <ConfirmButton onClick={handleConfirm}>Onayla</ConfirmButton>
          <CloseButton onClick={handleClose}>İptal</CloseButton>
        </ModalContent>
      </ModalOverlay>
    )
  );
};

export default CustomModal;
