import { useState } from 'react';
import { Flex, Box, Button, Image, Input, Text} from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import robPunksNFT from './RobPunksNFT.json'
const ethers = require('ethers');
const robPunksNFTAddress = '0x6cf754515F0788174944C81A3fd4628bFE718320';

const MainMint = ({accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                robPunksNFTAddress,
                robPunksNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount),{
                 value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
                console.log('response', response);

            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleDecrement = () => {
       if(mintAmount <= 1) return;
       setMintAmount(mintAmount - 1) 
    }

    const handleIncrement = () => {
        if(mintAmount >= 3) return;
        setMintAmount(mintAmount + 1) 
     }

     return (
        <Flex justify='center' align='center' height='100vh' paddingBottom='150px' direction='column'>
            <Text fontSize='60px' letterSpacing='-5.5%' fontFamily='VT323' textShadow='0 2px 2px #000000'>RobPunks</Text>
            {
                isConnected ? (
                    <Flex direction='column'>
                        <Box>
                            <Button 
                            onClick={handleDecrement}
                            backgroundColor='#D6517D'
                            borderRadius='5px'
                            boxShadow='0px 2px 2px 1px #0F0F0F'
                            color='white'
                            cursor='pointer'
                            fontFamily='inherit'
                            padding='5px 15px'
                            margin='15px'
                            fontSize='26px'
                            >
                            -
                            </Button>
                            <Input 
                            readOnly
                            fontFamily='inherit'
                            width='100px'
                            height='40px'
                            textAlign='center'
                            pl='19px'
                            mt='10px'
                            type='number' 
                            value={mintAmount}/>
                            <Button
                             backgroundColor='#D6517D'
                             borderRadius='5px'
                             boxShadow='0px 2px 2px 1px #0F0F0F'
                             color='white'
                             cursor='pointer'
                             fontFamily='inherit'
                             padding='5px 15px'
                             margin='15px'
                             fontSize='26px'
                            onClick={handleIncrement}
                            >
                            +
                            </Button>
                        </Box>
                        <Button
                             backgroundColor='#D6517D'
                             borderRadius='5px'
                             boxShadow='0px 2px 2px 1px #0F0F0F'
                             color='white'
                             cursor='pointer'
                             fontFamily='inherit'
                             padding='5px 15px'
                             margin='15px'
                             fontSize='26px'
                            onClick={handleMint}
                            >
                            Mint
                            </Button>
                    </Flex>
                ): (
                   <p>You must connect to Mint</p>
                )
            }
        </Flex>
     )

};

export default MainMint;