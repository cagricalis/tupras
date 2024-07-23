import React, { useEffect, useState } from 'react';
import { db } from './firebase.js';
import { getDatabase, ref, update, onValue } from "firebase/database";
import { getAuth, signOut } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from "./onlock_logo.png"; 
import CustomPopup from './CustomPopup';
import styled from 'styled-components';
import CustomModal from './CustomModal';

const Container = styled.div`
  width: 100%;
  max-width: 1200px; /* Adjust based on your needs */
  margin: 0 auto; /* Center the container */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center-align all child elements */
`;

const LogoContainer = styled.div`
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 100%; /* Ensure it fits within the container */
  height: 600px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background-color: white;
  margin: 0 auto; /* Center the table container */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

const TableHeader = styled.th`
  position: sticky;
  top: 0;
  background: #004050;
  color: white;
  padding: 15px;
  text-align: left;
  z-index: 2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  background-color: #51B28B;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: #003040;
  }
  margin-right: 10px;
`;





const TableView = () => {
    const navigate = useNavigate();

    const [passwords, setPasswords] = useState(Array(18).fill(""));
    const [fullnessList, setFullnessList] = useState(Array(18).fill(""));
    const [showPopup, setShowPopup] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [IP1, setIP1] = useState("");
    const [port1, setPort1] = useState("");
    const [url, setUrl] = useState("https://ismer.onbox.space/api/cu48");

    const handleLogout = async () => {
        const auth = getAuth();
    
        try {
           
          await signOut(auth);
      
          navigate('/login')
          // return <Navigate to="/Login" />;
        } catch (error) {
          console.error('Error logging out:', error.message);
        }
    }    


    useEffect(() => {
        // Function to fetch data from Firebase
        const fetchData = async () => {
          const db = getDatabase();
          const dataRef2 = ref(db, 'utilsLocks/'); 
    
          onValue(dataRef2, (snapshot2) => {
              const fetchedData2 = snapshot2.val();
              setIP1(fetchedData2["ip"]);
              setPort1(fetchedData2["port"]);
              setUrl(fetchedData2["url"]);
            });
        };
    
        // Call the fetchData function
        fetchData();
    
        // Clean up the listener when the component unmounts
        return () => {
          // Detach the listener
          // This is important to avoid memory leaks
          // It ensures that the listener is removed when the component is unmounted
        };
      }, []); // Empty dependency array means the effect runs once when the component mounts
    

  
    useEffect(() => {
      const fetchData = async () => {
        const db = getDatabase();
        const dataRef = ref(db, 'passwordsLocks/');
        const dataRefFullness = ref(db, 'fullness/');
  
        onValue(dataRef, (snapshot) => {
          const fetchedData = snapshot.val();
          const updatedPasswords = passwords.map((password, index) => fetchedData[index + 1] || "");
          setPasswords(updatedPasswords);
        });
        onValue(dataRefFullness, (snapshot2) => {
            const fetchedData2 = snapshot2.val();
            const fullnessList2 = fetchedData2[1].split('');
            const mappedList = fullnessList2.map(char => {
                switch (char) {
                  case 'D':
                    return 'Dolu';
                  case 'B':
                    return 'Boş';
                  case 'A':
                    return 'Kontrol';
                  case 'C':
                    return 'Devre Dışı';
                  default:
                    return char; // In case there's any character not accounted for
                }
              });
            console.log("full ", mappedList);

            setFullnessList(mappedList);
          });
      };
  
      fetchData();
    }, []);
  

    const handlePasswordChange = (index) => {
        setSelectedRowIndex(index);
        setIsModalOpen(true);
      };
      const handleConfirm = async (newPassword) => {
        if (newPassword) {
          const db = getDatabase();
          update(ref(db, 'passwordsLocks/'), {
            [selectedRowIndex + 1]: newPassword
          })
          .then(() => {
            const updatedPasswords = [...passwords];
            updatedPasswords[selectedRowIndex] = newPassword;
            setPasswords(updatedPasswords);
            setIsModalOpen(false);
          })
          .catch((error) => {
            console.error("Error updating password:", error);
          });
        }
      };
  
    const handleOpenLock = async (index) => {
        
      
     
        try {
            const response = await fetch(
              url,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization":
                    "81551fa4-zwzn-6931-kdtk-6f209d635f5d",
                },
                body: JSON.stringify({
                  lockNo: index+1,
                  IP: IP1,
                  port: port1,
                  timeStamp: "2022-02-15T12:00:02.202Z",
                }),
              }
            );
      
            if (response.ok) {
              const data = await response.json();
             
             
           
              if (data.isSuccess) {
          
                setShowPopup(true);
       
                } 
      
            } else {
              
              console.error("Error:", response.statusText);
            }
          } catch (error) {
            console.error("Error:", error);
          }

    };

    const callbackPopup = () =>  {

        setShowPopup(false);
        
    };

  
    return (

        
        <Container> 
         <LogoContainer>
        <img src={logo} alt="Logo" className="logo" style={{ width: '150px', height: 'auto' }} />
      </LogoContainer>


      <TableContainer>

        <Table>
          <thead>
            <tr>
              <TableHeader>Kilit No</TableHeader>
              <TableHeader>Şifre</TableHeader>
              <TableHeader>Doluluk</TableHeader>
              <TableHeader></TableHeader>
            </tr>
          </thead>
          <tbody>
            {passwords.map((password, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{password}</TableCell>
                <TableCell>{fullnessList[index]}</TableCell>
                <TableCell>
                  <Button onClick={() => handlePasswordChange(index) } style={{ marginLeft: '10px' }}>Şifre Değiştir</Button>
                  <Button onClick={() => handleOpenLock(index)} style={{ marginLeft: '10px' }}>Kilit Aç</Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />

        {showPopup && <CustomPopup onClose={callbackPopup} message={"Kilit Açıldı"} />}

        <Button onClick={() => handleLogout()} style={{ marginTop: '10px', marginLeft: '10px' }}>Logout</Button>
        

      </Container>
    );
  };
  
  export default TableView;