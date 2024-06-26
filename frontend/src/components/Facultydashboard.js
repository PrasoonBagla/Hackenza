import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import axios from "../service/axios";
import { useNavigate } from "react-router-dom"; // I

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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FDCMButton = styled.button`
padding: 8px 16px;
border-radius: 5px;
margin-right: 10px;
cursor: pointer;
background-color: #4f6d7a;
color: white;
border: none;
display: relative;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const VerticalLine = styled.div`
  width: 2px;
  background-color: #ccc;
`;

const SubmitButton = styled.button.attrs(() => ({ type: 'submit' }))`
padding: 8px 16px;
border-radius: 5px;
margin-right: 10px;
cursor: pointer;
background-color: #4f6d7a;
color: white;
border: none;
display: relative;
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
const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const HalfWidthInput = styled(Input)`
  width: 48%; /* Makes input take up less than half the parent's width to fit side by side */
`;

const FullWidthInput = styled(Input)`
  width: 100%;
`;
const HoddashboardHeading = styled.h2`
  margin: 0px;
  margin-left: 10px;
  margin-bottom: 10px;
`;
const FullWidthTextArea = styled(Input).attrs({ as: 'textarea' })`
  width: 100%;
  height: 100px; /* Adjust height as needed */
`;
const TopBarContainer = styled.div`
display: flex;
justify-content: space-between; // Distribute the content to the left and right
align-items: center; // Vertically center the content
padding: 10px;
padding-bottom: 2px;
border-bottom: 2px solid #ccc;
`;
const CoursesHeading = styled.h2`
  margin: 0px;
  margin-bottom:10px;

  padding: 0px;
`
const FormTitle = styled.h3`
  font-size: 24px; /* Adjust size as needed */
  margin-bottom: 20px; /* Provide space between title and first form row */
`;
// Mock array of course data
const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
  // Add more courses as needed
];

const FacultyDashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate(); // Initialize 
    const [bitsId, setBitsid] = useState("");
    const [studentName, setName] = useState("");
    const [coursecode, setCourseCode] = useState("");
    const [emailid, setEmail] = useState("");
    const [courseTitle, setCourseTitle] = useState("");
    const [icCourse, setIcCourse] = useState("");
    const [component, setComponent] = useState("");
    const [facultyass, setFacultyass] = useState("");
    const [grade, setGrade] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [remark, setRemark] = useState("");

    const [courses, setCourses] = useState([]);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleLogout = () => {
      // Logout logic
      navigate("/"); // Navigate to the "/" page
    };
    const [selectedCourse, setSelectedCourse] = useState(null); // Track the selected course
    const handleFDCMButtonClick = (course) => {
        setShowForm(true); // Show the form
        setSelectedCourse(course); // Update the selected course
    };
  useEffect(() => {
    const emailId = localStorage.getItem("EmailID");
    const fetchCourseData = async () => {
        try {
            const response = await axios.post('/api/faculty/getCourses', {
                email: emailId
            });
            console.log(response.data);
            setCourses(response.data); // Assuming the response has the data directly
        } catch (error) {
            console.error("Error fetching FDCM details:", error);
            // toast.error('Failed to fetch FDCM details.');
        }
      };
      fetchCourseData(emailId); // This was missing
    }, []);

    const HandleSubmit = async(event) => {
      try{
         event.preventDefault();
        const data = await axios.post('/api/faculty/createOrUpdateFDCM', {
          bitsID: bitsId,
          name: studentName,
          email: emailid,
          course : {
            courseName: courseTitle,
            coursecode: coursecode,
            facultyAssisted: facultyass,
            instructorIncharge: icCourse,
            component: component,
            grade: grade,
            recommendation: recommendation,
            remarks: remark
          }
        });
        console.log(data.data);
      }
      catch(error){
        console.log(error);
      }
    }
    return (
        <div>
            <Navbar />
            <TopBarContainer>
            <HoddashboardHeading style={{ marginLeft: '20px' }}>Faculty Dashboard</HoddashboardHeading>
        <DropdownContainer>
          <DropdownButton onClick={toggleDropdown}>Personal Data</DropdownButton>
          {dropdownOpen && (
            <DropdownContent>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownContent>
          )}
        </DropdownContainer>
      </TopBarContainer>
            <DashboardContainer>
                <LeftPanel>
                    <CoursesHeading>Courses</CoursesHeading>
                    {courses.map((course) => (
                        <Card key={course.id}>
                            <span>{course.name}</span>
                            <FDCMButton onClick={() => handleFDCMButtonClick(course)}>FDCM Button</FDCMButton>
                        </Card>
                    ))}
                </LeftPanel>
                <VerticalLine />
                {showForm && (
                  <RightPanel>
                  
                  <FormTitle>Enter data for FDCM course</FormTitle>
                  <Form>
                      <FormRow>
                          <HalfWidthInput onChange={e => setBitsid(e.target.value)} placeholder="Student ID NO." />
                          <HalfWidthInput onChange={e => setName(e.target.value)}placeholder="Student Name" />
                      </FormRow>
                      <FormRow>
                          <HalfWidthInput onChange={e => setCourseCode(e.target.value)}placeholder="Course Code" />
                          <HalfWidthInput onChange={e => setCourseTitle(e.target.value)}placeholder="Course Title" />
                      </FormRow>
                      <FormRow>
                          <HalfWidthInput onChange={e => setIcCourse(e.target.value)} placeholder="Email of Instructor in Charge (IC)" />
                          <HalfWidthInput onChange={e => setComponent(e.target.value)}placeholder="Component (Tutorial/Lab)" />
                      </FormRow>
                      <FormRow>
                          <HalfWidthInput onChange={e => setFacultyass(e.target.value)}placeholder="Email of Faculty Assisted" />
                          <HalfWidthInput onChange={e => setGrade(e.target.value)}placeholder="Grade" />
                      </FormRow>
                      <FormRow>
                          <FullWidthInput onChange={e => setRecommendation(e.target.value)}placeholder="Recommendation" />
                          <FullWidthInput onChange={e => setEmail(e.target.value)}placeholder="Students Email ID" />
                      </FormRow>
                      <FormRow>
                          <FullWidthTextArea onChange={e => setRemark(e.target.value)}placeholder="Remark" />
                      </FormRow>
                      <SubmitButton onClick={(e)=>HandleSubmit(e)}>Submit</SubmitButton>
                  </Form>
              </RightPanel>
                )}
            </DashboardContainer>
        </div>
    );
}

export default FacultyDashboard;
