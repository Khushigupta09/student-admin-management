const baseUrl = {
    devurl: process.env.REACT_APP_API_URL, 
};

console.log('Base URL:', baseUrl.devurl);

const studentApiUrl = `${baseUrl.devurl}/api/student`;
const adminApiUrl = `${baseUrl.devurl}/api/admin`;

console.log('Student API URL:', studentApiUrl);
console.log('Admin API URL:', adminApiUrl);

const url = {
    student: {
        register: `${studentApiUrl}/register`,
        login: `${studentApiUrl}/login`,
        profile: `${studentApiUrl}/profile`,
        deleteProfile: `${studentApiUrl}/delete`,
        verifyEmail: `${studentApiUrl}/verify-email`,
    },

    admin: {
        login: `${adminApiUrl}/login`,
        getAllStudents: `${adminApiUrl}/students`,   
        approveStudent: `${adminApiUrl}/approve`,    
        deleteStudent: `${adminApiUrl}/delete-student`, 
    }
};

export default url;
