import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import emailjs from 'emailjs-com';
import { useNavigate } from "react-router-dom"; // I
import axios from "../service/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DashboardContainer = styled.div`
  display: flex;
  width: 100%;
`;
const LeftPanel = styled.div`
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Allows scrolling for the list of faculties */
  position: relative; /* Needed for absolute positioning of the EmailAllButton */
`;

const VerticalLine = styled.div`
  width: 2px;
  background-color: #ccc;
`;

const RightPanel = styled.div`
  width: 50%;
  padding: 20px;
  overflow-y: auto; /* Optional: if you expect content to overflow */
`;

const Card = styled.div`
  background-color: #f0f0f0; /* Light grey */
  margin-bottom: 8px;
  padding: 16px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #ffcccc; /* Light red */
  }
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
const HoddashboardHeading = styled.h2`
  margin: 0px;
  margin-left: 10px;
  margin-bottom: 10px;
`;
const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailButton = styled.button`
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
  background-color: #f0f0f0; /* Light grey */
  padding: 16px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px; /* Provides spacing between detail sections */
`;

const PanelHeading = styled.h2`
  margin: 8px 0; /* Adjust margins as needed */
`;

const EmailAllButton = styled.button`
padding: 8px 16px;
border-radius: 5px;
margin-right: 10px;
cursor: pointer;
background-color: #4f6d7a;
color: white;
border: none;
display: relative;
`;
const TopBarContainer = styled.div`
display: flex;
justify-content: space-between; // Distribute the content to the left and right
align-items: center; // Vertically center the content
padding: 10px;
padding-bottom: 2px;
border-bottom: 2px solid #ccc;
`;

// const facultyData = [
//   {name: "Prasoon Bagla",email: "baglaprasoon02@gmail.com", details: ["Course 1 details", "Course 2 details"] },
//   {name: "Prasoon Bagla",email: "baglaprasoon02@gmail.com", details: ["Course 1 details", "Course 2 details"] },
  
//   // ... more faculties
// ];

const Admindashboard = () => {
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [facultyData, setFacultyData] = useState([]);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const navigate = useNavigate(); // Initia
    emailjs.init(process.env.emailjsinit);
    const handleDetailClick = (faculty, event) => {
        event.stopPropagation(); // Prevents the click from bubbling to the card's onClick
        setSelectedFaculty(faculty);
    };

    useEffect(() => {
      const fetchFacultyData = async () => {
          try {
              const response = await axios.post('/api/admin/getFaculty');
              console.log(response.data);
              setFacultyData(response.data); // Assuming the response has the data directly
          } catch (error) {
              console.error("Error fetching faculty data:", error);
              toast.error('Failed to fetch faculty data.');
          }
      };
      fetchFacultyData();
  }, []);
    const handleLogout = () => {
      // Logout logic
      navigate("/"); // Navigate to the "/" page
    };
    const sendEmail = (templateParams) => {
      emailjs.send(process.env.id, process.env.templatedid, templateParams)
        .then((response) => {
           console.log('SUCCESS!', response.status, response.text);
           toast.success('Email sent successfully!');
        }, (err) => {
           console.log('FAILED...', err);
           toast.error('Failed to send email.');
        });
  };
  const handleSendMail = (details, email) => {
    // Assuming your template has variables for faculty_name and course_detail
    const templateParams = {
        faculty_name: email,
        course_detail: details,
        // Include any other parameters your template needs
    };

    sendEmail(templateParams);
};

const handleEmailAllFaculty = () => {
  // Here you'd likely loop through all faculties and send an email to each
  facultyData.forEach(faculty => {
      const templateParams = {
          faculty_name: faculty.email,
          // Any other details your email template needs
      };
      sendEmail(templateParams);
  });
};
    return (
        <div>
            <Navbar />
            <TopBarContainer>
            <HoddashboardHeading style={{ marginLeft: '20px' }}>Admin Dashboard</HoddashboardHeading>
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
            <LeftPanel>
                {facultyData.map((faculty, index) => (
                    <Card key={faculty._id || index}>
                        <CardContent>
                            <h3>{faculty.name}</h3>
                            {/* Assuming you want to show a button to view details for each faculty */}
                            <DetailButton onClick={() => setSelectedFaculty(faculty)}>View Courses</DetailButton>
                        </CardContent>
                    </Card>
                ))}
                <EmailAllButton onClick={handleEmailAllFaculty}>Email All Faculty</EmailAllButton>
            </LeftPanel>
                <VerticalLine />
                <RightPanel>
                <PanelHeading>List of Courses</PanelHeading>
                {/* Check if selectedFaculty is not null and has courses */}
                {selectedFaculty && selectedFaculty.courses && selectedFaculty.courses.map((course, index) => (
                    <DetailSection key={course._id || index}>
                        <div>
                            <p>Course Name: {course.name}</p>
                            <p>Course Code: {course.courseCode}</p>
                        </div>
                        <DetailButton onClick={() => handleSendMail(course.name, selectedFaculty.email)}>Send Mail</DetailButton>
                    </DetailSection>
                ))}
            </RightPanel>
            </DashboardContainer>
        </div>
    );
}

export default Admindashboard;
