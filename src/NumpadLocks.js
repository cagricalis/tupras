import React, { useEffect, useState } from 'react';
import './NumpadLocks.css'; // Import the CSS file for styling
import * as utils from './HttpPostComponent.js'; 
import { db } from './firebase.js';
import { getDatabase, ref, child, push, update, set, onValue } from "firebase/database";
import { Navigate, useLocation } from 'react-router-dom';
import Login from "./Login.js";
import CustomPopup from './CustomPopup';
import logo from "./onlock_logo.png"; // Replace with your logo file

const NumpadLocks = () => {
   
    const [response1, setResponse1] = useState(null);
    const [lockType1, setLockType1] = useState("multi");
    const [IP1, setIP1] = useState("");
    const [port1, setPort1] = useState("");
    const [url, setUrl] = useState("https://ismer.onbox.space/api/cu48");
    const [IP2, setIP2] = useState("");
    const [port2, setPort2] = useState("");
    const [url2, setUrl2] = useState("https://ismer.onbox.space/api/cu48");
    const [currentNumber, setCurrentNumber] = useState(0); //dolap aç
    const [currentNumber2, setCurrentNumber2] = useState(0); //dolap al
    const [firstEmpty, setFirstEmpty] = useState(0);
    const [popupLockNo, setPopupLockNo] = useState(0);
    const [lockNo, setLockNo] = useState(0);
    const [activeField, setActiveField] = useState('first');
    const [activeNumpad, setActiveNumpad] = useState('takeLockNumpad'); 
    
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopup3, setShowPopup3] = useState(false);
    const [showPopup4, setShowPopup4] = useState(false);
    

    const [fullness, setDataFull] = useState(null);
  
    const [data, setData] = useState(null);
    const [data2, setData2] = useState(null);
    const [data3, setData3] = useState(null);
    const [data4, setData4] = useState(null);
    const [data5, setData5] = useState(null);
    const [data6, setData6] = useState(null);
    const [data7, setData7] = useState(null);
    const [data8, setData8] = useState(null);
    const [data9, setData9] = useState(null);
    const [data10, setData10] = useState(null);
    const [data11, setData11] = useState(null);
    const [data12, setData12] = useState(null);
    const [data13, setData13] = useState(null);
    const [data14, setData14] = useState(null);
    const [data15, setData15] = useState(null);
    const [data16, setData16] = useState(null);
    const [data17, setData17] = useState(null);
    const [data18, setData18] = useState(null);

    const [dataMulti, setDataMulti] = useState(null);
    const [isEqual, setIsEqual] = useState(false);
   

    useEffect(() => {
      // Function to fetch data from Firebase
      const fetchData = async () => {
        const db = getDatabase();
        const dataRef = ref(db, 'passwordsLocks/');
        const dataRefFullness = ref(db, 'fullness/');
        // Set up a listener for real-time updates
        onValue(dataRef, (snapshot) => {
          const fetchedData = snapshot.val();
         
          setData(fetchedData[1]);
          setData2(fetchedData[2]);
          setData3(fetchedData[3]);
          setData4(fetchedData[4]);
          setData5(fetchedData[5]);
          setData6(fetchedData[6]);
          setData7(fetchedData[7]);
          setData8(fetchedData[8]);
          setData9(fetchedData[9]);
          setData10(fetchedData[10]);
          setData11(fetchedData[11]);
          setData12(fetchedData[12]);
          setData13(fetchedData[13]);
          setData14(fetchedData[14]);
          setData15(fetchedData[15]);
          setData16(fetchedData[16]);
          setData17(fetchedData[17]);
          setData18(fetchedData[18]);
          
        
          
        });

        onValue(dataRefFullness, (snapshot2) => {
            const fetchedData = snapshot2.val();
            setDataFull(fetchedData[1]);
           

            if(fullness != null) {
            const firstBIndex = fullness.indexOf('B');

            if (firstBIndex !== -1) {
                
                setFirstEmpty(firstBIndex + 1);
                console.log("firstEmpty1", firstEmpty);
              } else {
                
                setFirstEmpty(0);
                
              }
            }

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
    }, [fullness]); // Empty dependency array means the effect runs once when the component mounts

    // useEffect(() => {
    //     // Function to fetch data from Firebase
    //     const fetchData = async () => {
    //       const db = getDatabase();
    //       const dataRef = ref(db, 'passwordsMulti/');
    //      // const dataRef2 = ref(db, 'utils/'); // Replace 'your_data_path' with the actual path in your database
    
    //       // Set up a listener for real-time updates
    //       onValue(dataRef, (snapshot) => {
    //         const fetchedData = snapshot.val();
    //         setDataMulti(fetchedData[1]);
         
    //       });
  
    //     };
    
    //     // Call the fetchData function
    //     fetchData();
    
    //     // Clean up the listener when the component unmounts
    //     return () => {
    //       // Detach the listener
    //       // This is important to avoid memory leaks
    //       // It ensures that the listener is removed when the component is unmounted
    //     };
    //   }, []); // Empty dependency array means the effect runs once when the component mounts
  


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
    


    //   useEffect(() => {
    //     // Function to fetch data from Firebase
    //     const fetchData = async () => {
    //       const db = getDatabase();
    //       const dataRef2 = ref(db, 'utilsMulti/'); 
    
    //       onValue(dataRef2, (snapshot2) => {
    //           const fetchedData2 = snapshot2.val();
 
    //           setIP2(fetchedData2["ip"]);
    //           setPort2(fetchedData2["port"]);
    //           setUrl2(fetchedData2["url"]);
    //         });
    //     };
    
    //     // Call the fetchData function
    //     fetchData();
    
    //     // Clean up the listener when the component unmounts
    //     return () => {
    //       // Detach the listener
    //       // This is important to avoid memory leaks
    //       // It ensures that the listener is removed when the component is unmounted
    //     };
    //   }, []); // Empty dependency array means the effect runs once when the component mounts
    



    // useEffect(() => {

    // }, [currentNumber, data]);
    
 

    const callbackPopup = () =>  {
        setCurrentNumber2(0);
        setCurrentNumber(0);
        setLockNo(0);
        setShowPopup(false);
        
    };

    const callbackPopup2 = () =>  {
        setCurrentNumber2(0);
        setCurrentNumber(0);
        setLockNo(0);
        setShowPopup2(false);
    };

    const callbackPopup3 = () =>  {
        setCurrentNumber2(0);
        setCurrentNumber(0);
        setLockNo(0);
        setShowPopup3(false);
        
    };
    const callbackPopup4 = () =>  {
        setCurrentNumber2(0);
        setCurrentNumber(0);
        setLockNo(0);
        setShowPopup4(false);
        
    };


    const handlePostRequest1 = async () => {

      const lockArray = [data,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16,data17,data18];

      
      
        if(currentNumber == lockArray[lockNo-1] && fullness.charAt(lockNo-1) == "D") {
          
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
                lockNo: lockNo,
                IP: IP1,
                port: port1,
                timeStamp: "2022-02-15T12:00:02.202Z",
              }),
            }
          );
    
          if (response.ok) {
            const data = await response.json();
           
          
            setResponse1(data);
            if (data.isSuccess) {
                const newFullness = fullness.substring(0, lockNo-1) + 'B' + fullness.substring(lockNo);
                      setDataFull(newFullness); // Update the state with the new string
                      update(ref(db, 'fullness/'), {
                        1: newFullness
                    })
               
                setShowPopup4(true);
                setCurrentNumber(0);
                setCurrentNumber2(0);
                setLockNo(0);
     
              } 
    
          } else {
            
            console.error("Error:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
        } else {
            setShowPopup2(true);
    }
      };

      const handlePostRequest2 = async () => {

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
                  lockNo: firstEmpty,
                  IP: IP1,
                  port: port1,
                  timeStamp: "2022-02-15T12:00:02.202Z",
                }),
              }
            );
            
           
           
           





            if (response.ok) {
            
              const data = await response.json();
              //setResponse1(data);
              if (data.isSuccess) {
                console.log("firstEmpty2 response", firstEmpty);

                const replaceFirstBWithD = (fullness) => {
                    const index = fullness.indexOf('B');
                   
                  
                    if (index !== -1) {
                      // Replace the first 'B' with 'D'

                      return fullness.substring(0, index) + 'D' + fullness.substring(index + 1);

                    } else {
                      // If there's no 'B', return the string as is
                      

                      return fullness;
  
                    }
                  };
                 

                  
                    // Find the first occurrence of 'B' and replace it with 'D'
                    const index = fullness.indexOf('B');
                    if (index !== -1) {
                      const newFullness = fullness.substring(0, index) + 'D' + fullness.substring(index + 1);
                      setDataFull(newFullness); // Update the state with the new string
                      update(ref(db, 'fullness/'), {
                        1: newFullness
                    })
                    }
                
                    // Update the first empty index based on the modified string
                    // const firstBIndex = fullness.indexOf('B');
                    // if (firstBIndex !== -1) {
                    //   setFirstEmpty(firstBIndex + 1);
                    // }

                update(ref(db, 'passwordsLocks/'), {
                    [firstEmpty]: currentNumber2
                    
            
                  })
                  .then(() => {
                    console.log("firstEmptythen", firstEmpty);
                    setPopupLockNo(firstEmpty);
                    // Data saved successfully!
                    setShowPopup(true);
                  })
                  .catch((error) => {
                    // The write failed...
                  });
                 
                 // setShowPopup(true);
                  setCurrentNumber(0);
                  setCurrentNumber2(0);
                  setLockNo(0);
       
                } 
      
            } else {
                
              console.error("Error:", response.statusText);
            }
          } catch (error) {
            console.error("Error:", error);
          }
      
  
//    if (currentNumber === dataMulti) {
//         try {
//             const response = await fetch(
//               url2,
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   "Authorization":
//                     "81551fa4-zwzn-6931-kdtk-6f209d635f5d",
//                 },
//                 body: JSON.stringify({
//                   lockNo: 1,
//                   IP: IP2,
//                   port: port2,
//                   timeStamp: "2022-02-15T12:00:02.202Z",
//                 }),
//               }
//             );
      
//             if (response.ok) {
//               const data = await response.json();

//               setResponse1(data);
//               if (data.isSuccess) {
                 
//                   setShowPopup(true);
//                   setCurrentNumber(0);
//                   setLockNo(0);
//                   setCurrentNumber2(0);
       
//                 } 
      
//             } else {
              
//               console.error("Error:", response.statusText);
//             }
//           } catch (error) {
//             console.error("Error:", error);
//           }
      
//       } else {
//           setShowPopup2(true);
//       }
        };

        



        const handleApplyButtonClick = () => {
            
            
            

            if (activeNumpad === 'takeLockNumpad') {
                if (firstEmpty == 0) {
                    setShowPopup3(true);
                } else {
                    handlePostRequest2();
                }
            
            } else if (activeNumpad === 'openLockNumpad') {
              handlePostRequest1();
            }
        
          };
    
  

  const appendNumber = (number) => {
    //setCurrentNumber(currentNumber * 10 + number);
    // if (activeField === 'first') {
    //     setCurrentNumber(currentNumber === 0 ? number : currentNumber * 10 + number);
    //   } else {
    //     setLockNo(lockNo === 0 ? number : lockNo * 10 + number);
    //   }
    if (activeNumpad === 'takeLockNumpad') {
        setCurrentNumber2(currentNumber2 === 0 ? number : currentNumber2 * 10 + number);
      } else if (activeNumpad === 'openLockNumpad') {
         if (activeField === 'first') {
        setCurrentNumber(currentNumber === 0 ? number : currentNumber * 10 + number);
      } else {
        setLockNo(lockNo === 0 ? number : lockNo * 10 + number);
      }
       // setCurrentNumber(currentNumber === 0 ? number : currentNumber * 10 + number);
      } else {
       // setLockNo(lockNo === 0 ? number : lockNo * 10 + number);
      }
  };


  const deleteDigit = () => {
    //setCurrentNumber(Math.floor(currentNumber / 10));
    // if (activeField === 'first') {
    //     setCurrentNumber(Math.floor(currentNumber / 10));
    //   } else {
    //     setLockNo(Math.floor(lockNo / 10));
    //   }
    if (activeNumpad === 'takeLockNumpad') {
        setCurrentNumber2(Math.floor(currentNumber2 / 10));
      } else if (activeNumpad === 'openLockNumpad') {
         if (activeField === 'first') {
        setCurrentNumber(Math.floor(currentNumber / 10));
      } else {
        setLockNo(Math.floor(lockNo / 10));
      }
      } else {
        
      }
  };


  const applyNumbers = () => {
    alert(`You applied the number: ${currentNumber}`);
    // You can perform additional actions with the currentNumber here
    // For now, let's reset the currentNumber to 0
    // setCurrentNumber(0);
    // setLockNo(0);

    if (activeNumpad === 'takeLockNumpad') {
        setCurrentNumber2(0);
      } else if (activeNumpad === 'openLockNumpad') {
        setCurrentNumber(0);
      } else {
        setLockNo(0);
      }
  };

  return (
    <div style={styles.formContainer} >
       <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div>
          <button
            onClick={() => (setActiveNumpad('takeLockNumpad'), setCurrentNumber(0), setCurrentNumber2(0), setLockNo(0))}
            style={activeNumpad === 'takeLockNumpad' ? styles.selectedButton : styles.button}
          >
            Dolap Al
          </button>
          <button
            onClick={() => (setActiveNumpad('openLockNumpad'), setCurrentNumber(0), setCurrentNumber2(0), setLockNo(0))}
            style={activeNumpad === 'openLockNumpad' ? styles.selectedButton : styles.button}
          >
            Dolap Aç
          </button>
        </div>
        <div>
          {activeNumpad === 'takeLockNumpad' && (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div
              className="result"
              style={{ border: '1px solid black', borderRadius: '5px', width: '300px', marginBottom: '10px', background: activeField === 'first' ? '#f0f0f0' : '#fff' }}
            >
              {currentNumber2 !== 0 ? currentNumber2 : 'Şifrenizi Giriniz'}
            </div>
            </div>
          )}
          {activeNumpad === 'openLockNumpad' && (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <div
                className="result"
          
          style={{ border: '1px solid black', borderRadius: '5px', width: '300px', marginBottom: '10px', background: activeField === 'first' ? '#f0f0f0' : '#fff' }}
          onClick={() => setActiveField('first')}
        >
          {currentNumber !== 0 ? currentNumber : 'Şifrenizi Giriniz'}
              </div>
              <div
          className="result"
          style={{ border: '1px solid black', borderRadius: '5px', width: '300px', background: activeField === 'second' ? '#f0f0f0' : '#fff' }}
          onClick={() => setActiveField('second')}
        >
          {lockNo !== 0 ? lockNo : 'Dolap Numaranızı Giriniz'}
        </div>
            </div>
          )}
        </div>

      {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <div
          className="result"
          style={{ border: '1px solid black', borderRadius: '5px', width: '300px', marginBottom: '10px', background: activeField === 'first' ? '#f0f0f0' : '#fff' }}
          onClick={() => setActiveField('first')}
        >
          {currentNumber !== 0 ? currentNumber : 'Şifrenizi Giriniz'}
        </div>
        <div
          className="result"
          style={{ border: '1px solid black', borderRadius: '5px', width: '300px', background: activeField === 'second' ? '#f0f0f0' : '#fff' }}
          onClick={() => setActiveField('second')}
        >
          {secondNumber !== 0 ? secondNumber : 'Dolap Numaranızı Giriniz'}
        </div>
      
      </div> */}

      <div className="numpad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0].map((number) =>{  
            return number !== "C" ?
          <button key={number} onClick={() => appendNumber(number)}>
            {number}
          </button> : <button disabled style={{ background:"white", border: "none" }}></button>
        })}
        <button style={{ background:"#ee5f55", border: "none"   }} onClick={deleteDigit}>Delete</button>
      </div>

        {showPopup && <CustomPopup onClose={callbackPopup} message={`Şifreniz Geçerlidir.Dolap Numaranız: ${popupLockNo}`} />}
        {showPopup4 && <CustomPopup onClose={callbackPopup4} message={`Şifreniz Geçerlidir.`} />}
        {showPopup2 && <CustomPopup onClose={callbackPopup2} message={"Şifreniz Geçersiz"} />}
        {showPopup3 && <CustomPopup onClose={callbackPopup3} message={"Uygun Dolap Kalmamıştır"} />}

      <button style={{ background: 'linear-gradient(90deg, #004050, #004050)', border: "none", width:"100%"  }} onClick={handleApplyButtonClick}>
        Apply
      </button>
    </div>
  );
};

const styles = {
    applyBtn: {
        backgroundColor: '#123123',
        marginTop: '30px',
        width: '100%',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
       
        
        // display: 'fixed',
        // top: '10px',
        // right: '10px'
    },

formContainer: {
    marginBottom: '20px',
    width: '400px',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  button: {
    padding: '20px',
    marginRight: '5px',
    width: '150px',
    marginTop: '20px',
    fontSize: '18px',
    cursor: 'pointer',
    backgroundColor: '#86868B'
  },
  selectedButton: {
    padding: '20px',
    marginRight: '5px',
    marginTop: '20px',
    width: '150px',
    fontSize: '18px',
    cursor: 'pointer',
  
  },
}

export default NumpadLocks;
