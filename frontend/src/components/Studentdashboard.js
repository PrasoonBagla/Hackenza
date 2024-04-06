import React, { useState,useRef } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import emailjs from 'emailjs-com';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from "jspdf";
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;
const TopBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;


const Panel = styled.div`
  width: 50%;
  padding: 20px;
  overflow-y: auto;
`;

const VerticalLine = styled.div`
  width: 2px;
  background-color: #ccc;
  height: 100%;
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
const FDCMDetailCard = styled(Card)`
  justify-content: flex-start;
`;

const ActionButton = styled.button`
  margin-left: 10px;
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
const fdcmDetails = {
  studentId: "123456",
  studentName: "John Doe",
  studentEmailID: "baglaprasoon02@gmail.com",
  courseCode: "CSC101",
  courseTitle: "Introduction to Computer Science",
  instructionincharge: "Prasoon Bagla",
  Component: "Lab",
  Facultyname: "Vidhi Kabra",
  Grade: "A",
  Recommendation: "Very nice Student",
  Remark: "Very Nice Student",
  Approved: "True"
  // Add more FDCM details as needed
};

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  // Add more courses as needed
];

const Studentdashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signed, setSigned] = useState(false); // New 
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleDownload = () => {
    if (!selectedCourse) return; // Check if a course is selected

    // Initialize jsPDF
    const doc = new jsPDF();

    // Add text to PDF
    doc.text(`Student ID: ${fdcmDetails.studentId}`, 10, 10);
    doc.text(`Student Name: ${fdcmDetails.studentName}`, 10, 20);
    doc.text(`Student EmailID: ${fdcmDetails.studentEmailID}`, 10, 30);
    doc.text(`Course Code: ${fdcmDetails.courseCode}`, 10, 40);
    doc.text(`Course Title: ${fdcmDetails.courseTitle}`, 10, 50);
    doc.text(`Instructor in Charge: ${fdcmDetails.instructionincharge}`, 10, 60);
    doc.text(`Component: ${fdcmDetails.Component}`, 10, 70);
    doc.text(`Faculty Name: ${fdcmDetails.Facultyname}`, 10, 80);
    doc.text(`Grade: ${fdcmDetails.Grade}`, 10, 90);
    doc.text(`Recommendation: ${fdcmDetails.Recommendation}`, 10, 100);
    doc.text(`Remark: ${fdcmDetails.Remark}`, 10, 110);

    // Save the PDF
    doc.save('StudentDetails.pdf');
  };

  const handleFDCMClick = (course) => {
    setSelectedCourse({ ...course, fdcmDetails: fdcmDetails }); // Include mock fdcmDetails here
    setShowDetails(false); // Hide details initially when a new course is selected
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
        <DropdownContainer>
          <DropdownButton onClick={toggleDropdown}>Personal Data</DropdownButton>
          {dropdownOpen && (
            <DropdownContent>
              <DropdownItem onClick={() => alert("Logging out...")}>Logout</DropdownItem>
            </DropdownContent>
          )}
        </DropdownContainer>
      </TopBarContainer>
      <ToastContainer />
      <h2 style={{ marginLeft: '20px' }}>Student Dashboard</h2>
      <DashboardContainer>
        <Panel>
          {/* List courses in the left panel with an FDCM button for each */}
          {courses.map((course) => (
            <Card key={course.id}>
              <div>
                <p>{course.name}</p>
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
              <h3>{selectedCourse.name}</h3>
              {/* Display additional selected course details as needed */}
              <ActionButton onClick={handleDownload}>Download</ActionButton>
              </ContentRow>
            </DetailSection>
          )}
        </Panel>
      </DashboardContainer>
    </div>
  );
};

export default Studentdashboard;