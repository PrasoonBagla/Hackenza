import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
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
  display: block;
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

// Mock data for the detail view
const fdcmDetails = {
  studentId: "123456",
  studentName: "John Doe",
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

const courses = [
  { id: 1, name: "Course 1", fdcmDetails: "Details for FDCM Course 1" },
  { id: 1, name: "Course 2", fdcmDetails: "Details for FDCM Course 2" },
  // ... more courses
];

const Hoddashboard = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Function to toggle dropdown
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleFDCMClick = (course) => {
        setSelectedCourse(course);
        setShowDetails(false); // Hide the details initially
    };

    const handleViewClick = () => {
        setShowDetails(!showDetails); // Toggle the visibility of the details
    };
    // const handlePersonalDataClick = () => {
    //     setShowPersonalData(!showPersonalData); // Toggle visibility of personal data options
    // };
    return (
        <div>
            <Navbar />
            <ToastContainer />
            <h2>HOD Dashboard</h2>
            <DashboardContainer>
                <Panel>
                    {courses.map((course) => (
                        <Card key={course.id}>
                            <span>{course.name}</span>
                            <ActionButton onClick={() => handleFDCMClick(course)}>FDCM</ActionButton>
                        </Card>
                    ))}
                </Panel>
                <VerticalLine />
                <Panel>
                <DropdownContainer>
                        <DropdownButton onClick={toggleDropdown}>Personal Data</DropdownButton>
                        {dropdownOpen && (
                            <DropdownContent>
                                <DropdownItem onClick={() => { /* Handle upload signature logic */ }}>Upload Signature</DropdownItem>
                                <DropdownItem onClick={() => { /* Handle logout logic */ }}>Logout</DropdownItem>
                            </DropdownContent>
                        )}
                    </DropdownContainer>
                    {selectedCourse && (
                        <FDCMDetailCard>
                            <span>{selectedCourse.fdcmDetails}</span>
                            <ActionButton onClick={handleViewClick}>View</ActionButton>
                            <ActionButton>Sign</ActionButton>
                        </FDCMDetailCard>
                    )}
                    {showDetails && selectedCourse && (
                        <DetailSection>
                            <p>Student ID: {fdcmDetails.studentId}</p>
                            <p>Student Name: {fdcmDetails.studentName}</p>
                            <p>Course Code: {fdcmDetails.courseCode}</p>
                            <p>Course Title: {fdcmDetails.courseTitle}</p>
                            <p>Instructor in Charge (IC): {fdcmDetails.instructionincharge}</p>
                            <p>Component (Tutorial/Lab): {fdcmDetails.Component}</p>
                            <p>Name of Faculty Assisted: {fdcmDetails.Facultyname}</p>
                            <p>Grade: {fdcmDetails.Grade}</p>
                            <p>Recommendation: {fdcmDetails.Recommendation}</p>
                            <p>Remark: {fdcmDetails.Remark}</p>
                            {/* Add more detail elements as needed */}
                        </DetailSection>
                    )}
                </Panel>
            </DashboardContainer>
        </div>
    );
}

export default Hoddashboard;
