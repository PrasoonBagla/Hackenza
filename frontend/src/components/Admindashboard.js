import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import emailjs from 'emailjs-com';
import { useNavigate } from "react-router-dom"; // I
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
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
const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailButton = styled.button`
  /* Style your button as needed */
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
  position: relative; /* Positions the button at the bottom */
  // bottom: 20px; /* Distance from the bottom of LeftPanel */
  left: 50%;
  transform: translateX(-50%); /* Centers the button horizontally */
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  /* Additional styling for the button */
`;
const TopBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;

const facultyData = [
  {name: "Prasoon Bagla",email: "baglaprasoon02@gmail.com", details: ["Course 1 details", "Course 2 details"] },
  {name: "Prasoon Bagla",email: "baglaprasoon02@gmail.com", details: ["Course 1 details", "Course 2 details"] },
  
  // ... more faculties
];

const Admindashboard = () => {
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const navigate = useNavigate(); // Initia
    emailjs.init("opaDeYZHDncQnfSIC");
    const handleDetailClick = (faculty, event) => {
        event.stopPropagation(); // Prevents the click from bubbling to the card's onClick
        setSelectedFaculty(faculty);
    };
    const handleLogout = () => {
      // Logout logic
      navigate("/"); // Navigate to the "/" page
    };
    const sendEmail = (templateParams) => {
      emailjs.send('service_8k4dt4x', 'template_zk9g9k6', templateParams)
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
            <h2>Admin Dashboard</h2>
            <DashboardContainer>
                <LeftPanel>
                    {facultyData.map((faculty, index) => (
                        <Card key={index} onClick={() => setSelectedFaculty(faculty)}>
                            <CardContent>
                                <h3>{faculty.name}</h3>
                                <DetailButton onClick={(event) => handleDetailClick(faculty, event)}>Other Details</DetailButton>
                            </CardContent>
                        </Card>
                    ))}
                    <EmailAllButton onClick={handleEmailAllFaculty}>Email All Faculty</EmailAllButton>
                </LeftPanel>
                <VerticalLine />
                <RightPanel>
                    <PanelHeading>List of Courses</PanelHeading>
                    {selectedFaculty && selectedFaculty.details.map((detail, index) => (
                        <DetailSection key={index}>
                            <p>{detail}</p>
                            <DetailButton onClick={() => handleSendMail(selectedFaculty.details, selectedFaculty.email)}>Send Mail</DetailButton>
                        </DetailSection>
                    ))}
                </RightPanel>
            </DashboardContainer>
        </div>
    );
}

export default Admindashboard;
