import React, { useState,useRef,useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import emailjs from 'emailjs-com';
import axios from '../service/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"; // I

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
  height: 90%;
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
  margin-left: 10px;
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
  Remark: "Very Nice Student"
  // Add more FDCM details as needed
};

// const courses = [
//   { id: 1, name: "Course 1" },
//   { id: 2, name: "Course 2" },
//   // Add more courses as needed
// ];
const Hoddashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [courses,setCourses] = useState([]);
  const [fdcmdetails,setFDCMdetails] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signed, setSigned] = useState(false); // New 
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // Initialize 
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLogout = () => {
    // Logout logic
    navigate("/"); // Navigate to the "/" page
  };
  const handleFDCMClick = async (course) => {
    try {
      // Assuming you need to send the course ID or some identifier to get the FDCM details
      const response = await axios.post('/api/hod/getFDCMDetails', { coursecode: course}); // Adjust the payload as needed based on your backend API

      // Assuming the response contains the FDCM details directly
      const fdcmDetails = response.data;
      console.log(response.data);
      setSelectedCourse(fdcmDetails); // Set the selected course with its FDCM details
      // console.log(selectedCourse);
      setShowDetails(false); // Optionally hide details initially when a new course is selected
      setSigned(false); // Reset the signed state in case it was set for a previous course
  } catch (error) {
      console.error("Error fetching FDCM details:", error);
      // Optionally show an error message to the user, e.g., using react-toastify
      // toast.error('Failed to fetch FDCM details.');
  }
  };
  const handleViewClick = (name) => {
    setShowDetails(!showDetails); // Toggle the visibility of the details
    if (selectedStudentName === name) {
      // If the same student's details are already being shown, hide them.
      setSelectedStudentName(null);
    } else {
      // Show the clicked student's details.
      setSelectedStudentName(name);
    }
  };
  const handleSignClick = (selectedCourse) => {
    setSigned(true); // Update the signed status to true
    alert("Signed"); // Optionally alert the user
    sendEmail(selectedCourse);
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
  useEffect(() => {
    const emailId = localStorage.getItem("EmailID");
    const fetchCoursesDetails = async () => {
        try {
            const response = await axios.post('/api/hod/getCourses');
            console.log(response.data);
            setCourses(response.data); // Assuming the response has the data directly
        } catch (error) {
            console.error("Error fetching FDCM details:", error);
            // toast.error('Failed to fetch FDCM details.');
        }
      };
      fetchCoursesDetails(emailId); // This was missing
    }, []);
  const sendEmail = (selectedCourse) => {
    const templateParams = {
      studentName: selectedCourse.name,
      studentEmailID: selectedCourse.email,
      courseTitle: selectedCourse.courses?.courseName,
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
  return (
    <div>
      <Navbar />
      <TopBarContainer>
      <HoddashboardHeading style={{ marginLeft: '20px' }}>HOD Dashboard</HoddashboardHeading>
      <DropdownContainer>
        <DropdownButton onClick={toggleDropdown}>Personal Data</DropdownButton>
        {dropdownOpen && (
          <DropdownContent>
            <DropdownItem onClick={triggerFileInput}>Upload Signature</DropdownItem>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownContent>
        )}
      </DropdownContainer>
      </TopBarContainer>
      <ToastContainer />
      <DashboardContainer>
        <Panel>
          {courses.map((course) => (
            <Card  onClick={() => handleFDCMClick(course.courseCode)}>
              <span>{course.name}</span>
              <ActionButton onClick={(e) => {
                e.stopPropagation();
                handleFDCMClick(course);
              }}>FDCM</ActionButton>
            </Card>
          ))}
        </Panel>
        <VerticalLine />
        <Panel>
        {selectedCourse && selectedCourse.map((course, index) => (
  <FDCMDetailCard key={index}> {/* Adding a key for React to track each element uniquely */}
    <span>{course.name}</span>
    <div style={{ marginLeft: "auto" }}> {/* Align buttons to the right */}
      <ActionButton onClick={() => handleViewClick(course.name)}>View</ActionButton>
      {signed ? (
        <ActionButton disabled>Signed</ActionButton> // Display as "Signed" and disabled
      ) : (
        <ActionButton onClick={() => handleSignClick(selectedCourse)}>Sign</ActionButton> // Allow clicking to sign
      )}
    </div>
  </FDCMDetailCard>
))}
        {selectedCourse && selectedCourse
  .filter(student => student.name === selectedStudentName)
  .map((student, studentIndex) => (
    <DetailSection key={studentIndex}>
      <p>Student ID: {student.bitsID}</p>
      <p>Student Name: {student.name}</p>
      <p>Student EmailID: {student.email}</p>
      {student.courses.map((course, courseIndex) => (
        <div key={courseIndex}>
          <p>Course Code: {course.coursecode}</p>
          <p>Course Title: {course.courseName}</p>
          <p>Instructor in Charge: {course.instructorIncharge}</p>
          <p>Component: {course.component}</p>
          <p>Faculty Name: {course.facultyAssisted}</p>
          <p>Grade: {course.grade}</p>
          <p>Recommendation: {course.recommendation}</p>
          <p>Remark: {course.remarks}</p>
        </div>
      ))}
    </DetailSection>
  ))
}
        </Panel>
      </DashboardContainer>
    </div>
  );
};

export default Hoddashboard;