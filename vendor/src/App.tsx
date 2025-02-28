import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

const token = localStorage.getItem("token");

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,

  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;

// import 'src/global.css';

// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// import { Router } from 'src/routes/sections';

// import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

// import { ThemeProvider } from 'src/theme/theme-provider';

// // ----------------------------------------------------------------------

// // fetch token from local storage
// const token = localStorage.getItem('token');

// const client = new ApolloClient({
//   uri: import.meta.env.VITE_GRAPHQL_URL,

//   cache: new InMemoryCache(),
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// export default function App() {
//   useScrollToTop();

//   return (
//     <ThemeProvider>
//       <ApolloProvider client={client}>
//         <Router />
//       </ApolloProvider>
//     </ThemeProvider>
//   );
// }

// import { gql, useMutation } from '@apollo/client';
// import { useCallback, useEffect, useState } from 'react';

// import LoadingButton from '@mui/lab/LoadingButton';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

// import { useRouter } from 'src/routes/hooks';

// // ----------------------------------------------------------------------

// // Mutation for requesting OTP
// const REQUEST_OTP_MUTATION = gql`
//   mutation RequestOtp($otpRequestData: OtpRequestDto!) {
//     requestOtp(otpRequestData: $otpRequestData) {
//       otp
//     }
//   }
// `;

// // Mutation for login
// const SIGN_IN_MUTATION = gql`
//   mutation Login($loginData: LoginDto!) {
//     login(loginData: $loginData) {
//       user {
//         id
//         name
//         mobileNo
//         email
//         age
//         feet
//         inches
//         weight
//         emiNumber
//         status
//         isLoggedIn
//         lastMenstrualDate
//         createdBy
//         deviceToken
//         createdAt
//         updatedAt
//         userType
//         slug
//         role {
//           id
//         }
//         parentId
//         superParentId
//         state
//         district
//         city
//         tehsil
//         maternityId
//       }
//       accessToken
//     }
//   }
// `;

// export function SignInView() {
//   const router = useRouter();

//   const [mobileNo, setMobileNo] = useState('');
//   const [requestedOtp, setRequestedOtp] = useState(''); // Holds OTP after request
//   const [otp, setOtp] = useState('');
//   const [showOTP, setShowOTP] = useState(false); // Controls visibility of OTP input

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (token) {
//       router.push('/');
//     }
//   }, [router]);

//   const [requestOtp, { loading: otpLoading, error: otpError }] = useMutation(REQUEST_OTP_MUTATION, {
//     onCompleted: (data) => {
//       setRequestedOtp(data.requestOtp.otp); // Store the requested OTP
//       setShowOTP(true); // Show the OTP input form
//     },
//     onError: (error) => {
//       console.error('OTP Request Error:', error.message);
//     },
//   });

//   const [login, { loading: loginLoading, error: loginError }] = useMutation(SIGN_IN_MUTATION, {
//     onCompleted: (data) => {
//       localStorage.setItem('token', data.login.accessToken); // Store the token
//       localStorage.setItem('user', JSON.stringify(data.login.user)); // Store the user data
//       window.location.href = import.meta.env.VITE_BASENAME; // Redirect on successful login
//     },
//     onError: (error) => {
//       console.error('Login Error:', error.message);
//     },
//   });

//   const handleOtpRequest = useCallback(() => {
//     requestOtp({
//       variables: {
//         otpRequestData: {
//           mobileNo,
//         },
//       },
//     });
//   }, [mobileNo, requestOtp]);

//   const handleLogin = useCallback(() => {
//     login({
//       variables: {
//         loginData: {
//           mobileNo,
//           otp,
//         },
//       },
//     });
//   }, [mobileNo, otp, login]);

//   // Once OTP is requested, set the OTP input field to the requested OTP
//   useEffect(() => {
//     setOtp(requestedOtp);
//   }, [requestedOtp]);

//   const renderOtpRequestForm = (
//     <Box display="flex" flexDirection="column" alignItems="flex-end">
//       <TextField
//         fullWidth
//         name="mobileNo"
//         label="Mobile number"
//         value={mobileNo}
//         onChange={(e) => setMobileNo(e.target.value)}
//         InputLabelProps={{ shrink: true }}
//         sx={{ mb: 3 }}
//       />

//       <LoadingButton
//         fullWidth
//         size="large"
//         type="submit"
//         color="inherit"
//         variant="contained"
//         onClick={handleOtpRequest}
//         loading={otpLoading}
//       >
//         Request OTP
//       </LoadingButton>

//       {otpError && <Typography color="error">{otpError.message}</Typography>}
//     </Box>
//   );

//   const renderLoginForm = (
//     <Box display="flex" flexDirection="column" alignItems="flex-end">
//       {requestedOtp && (
//         <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
//           Your OTP is: {requestedOtp}
//         </Typography>
//       )}

//       <TextField
//         fullWidth
//         name="mobileNo"
//         label="Mobile number"
//         value={mobileNo}
//         onChange={(e) => setMobileNo(e.target.value)}
//         InputLabelProps={{ shrink: true }}
//         sx={{ mb: 3 }}
//       />

//       <TextField
//         fullWidth
//         name="otp"
//         label="OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         InputLabelProps={{ shrink: true }}
//         type={showOTP ? 'text' : 'password'}
//         sx={{ mb: 3 }}
//       />

//       <LoadingButton
//         fullWidth
//         size="large"
//         type="submit"
//         color="inherit"
//         variant="contained"
//         onClick={handleLogin}
//         loading={loginLoading}
//       >
//         Log in
//       </LoadingButton>

//       {loginError && <Typography color="error">{loginError.message}</Typography>}
//     </Box>
//   );

//   return (
//     <>
//       <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
//         <Typography variant="h5">Log In</Typography>
//       </Box>

//       {!showOTP ? renderOtpRequestForm : renderLoginForm}
//     </>
//   );
// }
