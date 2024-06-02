import React,{useContext,useState} from 'react';
import {Box, Select,SimpleGrid,Spinner ,Text,useToast} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const HomePage =()=>{
    const [products,setProducts]= useState([]);
    const [loading,setLoading] =useState(true);
    const [error,setError] =useState(null);
    const [sortOrder,setSortOrder] =useState('asc');
    const [categoryFilter,setcategoryFilter] =useState('');
    const toast =useToast();

    useEffect(()=>{
        const fetchProducts=async() =>{
            try{
                const response=await axios.get('YOUR_PRODUCTS_API_ENDPOINT');
                setProducts(response.data);
                setLoading(false);
            }catch (error){
                setError(error.message);
                setLoading(false);
                
            }
        };
        fetchProducts();
        
    },[]);
    const sortedProducts=[...products].sort((a,b)=>{
        return sortOrder ==='asc'?  a.price-b.price : b.price-a.price; 
    });
    const filteredProducts=sortedProducts.filter(product=>
        categoryFilter ? product.category === categoryFilter: true
    );
    if(loading) return <Spinner />;
    if(error) return <Text>{error}</Text>;

    return(
        <Box>
            <Select
                placeholder="Sort by price"
                mb={4}
                value={sortOrder}
                onChange={(e) => setSortedOrder(e.target.value)}
            >
                <option value ="asc">Ascending</option>    
                <option value="desc">Descending</option>
            </Select>
          
            <Select 
                 placeholder="Filter by category"
                 mb={4}
                 value={categoryFilter}
                 onChange={(e) => setCategoryFilterr(e.target.value)}
             >
                 <option value ="Men">Men</option>    
                 <option value="Women">Women</option>
                 <option value="Kids">Kids</option>
                 <option value="Home Decor">Home Decor</option>
            </Select>

            <SimpleGrid columns={{ base:1, md: 2, lg: 3}}spacing={10}>
                {filteredProducts.map(product=>(
                    <Box
                        key={product.id}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        p={4}
                    >
                        <Text fontSize="x1">{product.title}</Text>
                        <text> {product.category}</text>
                        <text> ${product.price}</text>
                        <Button as ={Link} to ={'/product/${product.id}'} mt={4}>
                            More Details
                        </Button>


                    </Box>
                ))};

            </SimpleGrid>  
        


        </Box>
    );
};
export default HomePage;
