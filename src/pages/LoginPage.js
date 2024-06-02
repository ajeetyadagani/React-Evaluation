import React,{useContext,useState} from 'react';
import {Box,Button,Input ,Text,useToast} from '@chakra-ui/react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from '../contexts/AuthContext';
const LoginPage =()=>{
    const {login} =useContext(AuthContext);
    const {email,setEmail}= useState('');
    const [password,setPassword] =usestate('');
    const toast =useToast();
    const navigate= useNavigate();

    const handleLogin=async () =>{
        try{
            const response=await axios.post('YOUR_LOGIN_API_ENDPOINT',{email ,password});
            login(response.data.token.email);
            navigate('/');
        }catch (error){
            toast({
                title:'Error logging in',
                description:'please check your credentials',
                status:'error',
                duration:5000,
                isClosable:true,
            });
        }
        
    };
    return(
        <Box maxW="md" mx="auto" mt={10}>
            <Text frontSize="2x1" mb={6}>Login</Text>
            <Input
                placeholder="Email"
                mb={3}
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
            
            />
            <Input
                 placeholder="Password"
                 type="password"
                 mb={6}
                 value={password}
                 onChange={(e) =>setPassword(e.target.value)}
             
            
            />
            <Button colorScheme="teal" onClick={handleLogin}>
                Login
            </Button>

        </Box>
    );
};
export default LoginPage;
