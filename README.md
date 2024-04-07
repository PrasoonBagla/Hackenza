
# FDCM Allotment Software
This web application facilitates quick and efficient allocations of FDCM for every semester. Additionally, the software provides a unified platform for Admin, HOD, Faculty, and Students to access information seamlessly.

We initially intended to deploy this software on AWS EC2. However, due to the requirement for the software to be deployed on the Local BITS Intranet Server for security reasons, we did not complete the deployment on AWS EC2.




## Tech Stack

**Client:** React

**Server:** Node, Express, MongoDB Atlas

**Additional Tech:** Google Firebase, EmailJS


## Walk-Through

**1. Login Page**

Admins, Faculty, HODs, and Students can all sign in using a single Google University account. They are directed to their respective dashboards based on their email IDs. This functionality is supported through the use of Google Firebase and MongoDB.

https://drive.google.com/file/d/1aikG5kyfIZoB8cWw8Yq0E7h-3uLxqJ4o/view?usp=sharing

**2. Admin Dashboard**

The Admin has the capability to send an email to a specific faculty member or to all faculty members simultaneously, requesting FDCM allotment.

This automatic email facility is provided by EmailJS.

https://drive.google.com/file/d/13kcZjRj4BiNaQw7bb1JtY6qOrLxCM73T/view?usp=sharing

**3. Faculty Dashboard**

Upon receiving an email from the Admin, faculty members can extend invitations to students for allotment through a form located on the right half of the screen.

https://drive.google.com/file/d/1w3PPq5nAvg2wb7JK5xuWIdoSyiiC8RQG/view?usp=sharing

**4. HOD Dashboard**

After mailing invitations to students, faculty members also forward these forms to the Head of Department (HOD) for their signature. The HOD has the option to pre-upload their signature using the "Personal Data" feature. Additionally, the HOD can review each student's data, and upon verification, press the sign button. This action automatically sends a confirmation email to the students regarding their allotment.

https://drive.google.com/file/d/1ZiQwIxEL_j5-1gQBPYs7eLLSlSO7JCFR/view?usp=sharing

**5. Student Dashboard**

After receiving the email from the Head of Department (HOD), students have the ability to download their certificate from the portal.

https://drive.google.com/file/d/1xE6xex5K8CFJhZiAHc3aFS6ni0RnoFOc/view?usp=sharing




## Run Locally

Clone the project

```bash
  git clone https://github.com/PrasoonBagla/Hackenza.git
```

Go to the project directory

```bash
  cd Hackenza
```
Go to the server

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node index.js
```

Go to the client

```bash
cd ..
cd frontend
```

Install dependencies

```bash
npm install
```

Start the Client side

```bash
npm start
```



