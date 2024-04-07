import React, { useState,useRef,useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import emailjs from 'emailjs-com';
import { useNavigate } from "react-router-dom"; // I
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../service/axios";
import { jsPDF } from "jspdf";
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;
const TopBarContainer = styled.div`
display: flex;
justify-content: space-between; // Distribute the content to the left and right
align-items: center; // Vertically center the content
padding: 10px;
padding-bottom: 2px;
border-bottom: 2px solid #ccc;
`;


const Panel = styled.div`
  width: 50%;
  padding: 20px;
  overflow-y: auto;
`;

const VerticalLine = styled.div`
  width: 2px;
  background-color: #ccc;
  height: auto;
`;

const Card = styled.div`
  background-color: #f0f0f0;
  margin-bottom: 8px;
  padding: 16px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #ffcccc;
  }
`;
const PersonalDataButton = styled.button`
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #4f6d7a;
  color: white;
  border: none;
  margin-bottom: 20px; // Space between button and the rest of the content
`;
const DropdownContainer = styled.div`
  position: relative;
  align-self: flex-start;
  margin-bottom: 20px; // Space between dropdown and the rest of the content
`;

const DropdownButton = styled.button`
  padding: 8px 16px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  background-color: #4f6d7a;
  color: white;
  border: none;
  display: relative;
`;

const DropdownContent = styled.div`
  display: none; // Initially we don't show the dropdown content
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  right: 0;
  top: 100%;
  border-radius: 5px;

  // Show the dropdown content when the parent container is hovered
  ${DropdownContainer}:hover & {
    display: block;
  }
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
const HoddashboardHeading = styled.h2`
  margin: 0px;
  margin-left: 10px;
  margin-bottom: 10px;
`;
const FDCMDetailCard = styled(Card)`
  justify-content: flex-start;
`;

const ActionButton = styled.button`
padding: 8px 16px;
border-radius: 5px;
margin-right: 10px;
cursor: pointer;
background-color: #4f6d7a;
color: white;
border: none;
display: relative;
`;

const DetailSection = styled.div`
  background-color: #e6e6e6; /* Different color to distinguish the section */
  padding: 16px;
  border-radius: 20px;
  margin-top: 16px;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between; // Spread content to start and end
  align-items: center; // Center items vertically
  margin-bottom: 8px; // Space between rows, adjust as needed
`;
// const fdcmDetails = {
//   studentId: "123456",
//   studentName: "John Doe",
//   studentEmailID: "baglaprasoon02@gmail.com",
//   courseCode: "CSC101",
//   courseTitle: "Introduction to Computer Science",
//   instructionincharge: "Prasoon Bagla",
//   Component: "Lab",
//   Facultyname: "Vidhi Kabra",
//   Grade: "A",
//   Recommendation: "Very nice Student",
//   Remark: "Very Nice Student",
//   Approved: "True"
//   // Add more FDCM details as needed
// };

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  // Add more courses as needed
];

const Studentdashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [fdcmDetails, setfdcmDetails] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signed, setSigned] = useState(false); // New 
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate(); // Initialize 
  const fileInputRef = useRef(null);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLogout = () => {
    // Logout logic
    navigate("/"); // Navigate to the "/" page
  };

//   console.log(emailId);
  useEffect(() => {
    const emailId = localStorage.getItem("EmailID");
    const fetchFDCMDetails = async () => {
        try {
            const response = await axios.post('/api/student/getDetails', {
                email: emailId
            });
            console.log(response.data);
            setfdcmDetails(response.data); // Assuming the response has the data directly
        } catch (error) {
            console.error("Error fetching FDCM details:", error);
            // toast.error('Failed to fetch FDCM details.');
        }
      };
    
      fetchFDCMDetails(emailId); // This was missing
    }, []);
  const handleDownload = () => {
    if (!selectedCourse) return; // Check if a course is selected

    // Initialize jsPDF
    const doc = new jsPDF();

    const lines = [
        `Student ID: ${fdcmDetails.bitsID}`,
        `Student Name: ${fdcmDetails.name}`,
        `Student EmailID: ${fdcmDetails.email}`,
        `Course Code: ${selectedCourse.coursecode}`, // Assuming this property exists in your course objects
        `Course Title: ${selectedCourse.courseName}`, // Assuming courseName is the correct property
        `Instructor in Charge: ${selectedCourse.instructorIncharge}`, // Update according to actual property names
        `Component: ${selectedCourse.component}`, // Update according to actual property names
        `Faculty Name: ${selectedCourse.facultyAssisted}`, // Update according to actual property names
        `Grade: ${selectedCourse.grade}`, // Assuming this property exists
        `Recommendation: ${selectedCourse.recommendation}`, // Assuming this property exists
        `Remark: ${selectedCourse.remarks}`, // Assuming this property exists
        `Approved: ${selectedCourse.approved ? "True" : "False"}`
      ];
  
      // Add text lines to the PDF
      lines.forEach((line, index) => {
        doc.text(line, 10, 10 + (index * 10));
      });
  
      // Save the PDF
      doc.save('CourseDetails.pdf');
  };

  const handleFDCMClick = (course1) => {
    console.log(course1);
    // const course = fdcmDetails.courses;
    setSelectedCourse(course1); // Set the entire course object including its 'approved' status
    setShowDetails(true); // Assuming you want to show details
};
  const handleViewClick = () => {
    setShowDetails(!showDetails); // Toggle the visibility of the details
  };
  const handleSignClick = () => {
    setSigned(true); // Update the signed status to true
    alert("Signed"); // Optionally alert the user
    sendEmail();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the file (e.g., uploading to a server or displaying it)
      setSelectedFile(file);
      alert("File selected: " + file.name);
      // Implement upload logic or file handling here
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  const sendEmail = () => {
    const templateParams = {
      studentName: selectedCourse.fdcmDetails.studentName,
      studentEmailID: selectedCourse.fdcmDetails.studentEmailID,
      courseTitle: selectedCourse.fdcmDetails.courseTitle,
      // Add other parameters you want to use in your email template
    };
    emailjs.send('service_8k4dt4x', 'template_vjqd4bg', templateParams, 'opaDeYZHDncQnfSIC')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Email sent successfully');
        setSigned(true); // Update the signed status to true after email is sent
      }, (err) => {
        console.log('FAILED...', err);
        alert('Failed to send email');
      });
  };
  const handleCourseClick = (course) => {
    setSelectedCourse(course); // Assume course includes necessary details for download
  };

  return (
    <div>
      <Navbar />
      <TopBarContainer>
      <HoddashboardHeading style={{ marginLeft: '20px' }}>Student Dashboard</HoddashboardHeading>
        <DropdownContainer>
          <DropdownButton onClick={toggleDropdown}>Personal Data</DropdownButton>
          {dropdownOpen && (
            <DropdownContent>
               <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownContent>
          )}
        </DropdownContainer>
      </TopBarContainer>
      <ToastContainer />
      <DashboardContainer>
        <Panel>
          {fdcmDetails.courses?.map((course) => (
            <Card >
              <div>
                <p>{course.courseName}</p>
              </div>
              <ActionButton onClick={() => handleFDCMClick(course)}>FDCM</ActionButton>
            </Card>
          ))}
        </Panel>
        <VerticalLine />
        <Panel>
          {/* Right panel shows details of the selected course and a Download button */}
          {selectedCourse && (
            <DetailSection>
                <ContentRow>
              <div>
                <h3>{selectedCourse.courseName}</h3>
                {/* Additional details if needed */}
                <p>Approved: {selectedCourse.approved ? "True" : "False"}</p>
              </div>
              <ActionButton disabled={!selectedCourse.approved} onClick={handleDownload}>
                Download
              </ActionButton>
            </ContentRow>
            </DetailSection>
          )}
        </Panel>
      </DashboardContainer>
    </div>
  );
};

export default Studentdashboard;