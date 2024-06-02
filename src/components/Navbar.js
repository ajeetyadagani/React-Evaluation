import React , {useContext} from 'react';
import {Box,Button,Flex,Spacer,Text} from '@chakra-ui/react';
import {link ,useNavigate} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';

const navbar=()=>{
    const {isAuthenticated,email,logout}= useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout=() =>{
        logout();
        navigate('/login');
    };
    return(
        <Box bg="teal.500" p={4}>
            <Flex>
                {isAuthenticated ?(
                    <>
                      <Text color="white">{email}</Text>
                      <space/>
                      <Button as={Link} to="/" colorScheme="teal" variant="link" mr={4}>
                        Home
                      </Button>
                      <Button onClick={handleLogout} colorScheme="teal" variant="outline">
                        Logout
                      </Button>
                    
                    </>
                ) : ( 
                    <Button as ={Link} to="/login" colorScheme="teal" variant="link">
                        Login
                    </Button>  
                )}
            </Flex>
        </Box>
    );
};
export default Navbar;