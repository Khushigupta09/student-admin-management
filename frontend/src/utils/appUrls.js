const baseUrl = {
    devurl: process.env.REACT_APP_API_URL, // Accessing the environment variable directly
};

console.log('Base URL:', baseUrl.devurl);

const studentApiUrl = `${baseUrl.devurl}/api/student`;
const adminApiUrl = `${baseUrl.devurl}/api/admin`;

console.log('Student API URL:', studentApiUrl);
console.log('Admin API URL:', adminApiUrl);

const url = {
    // 🔹 Student Endpoints
    student: {
        register: `${studentApiUrl}/register`,
        login: `${studentApiUrl}/login`,
        profile: `${studentApiUrl}/profile`,
        deleteProfile: `${studentApiUrl}/delete`,
    },

    // 🔹 Admin Endpoints
    admin: {
        login: `${adminApiUrl}/login`,
        getAllStudents: `${adminApiUrl}/students`,   // Endpoint to get all students
        approveStudent: `${adminApiUrl}/approve`,    // Endpoint to approve students
        deleteStudent: `${adminApiUrl}/delete-student`, // Soft delete student endpoint
    }
};

export default url;
