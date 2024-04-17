import {
  Center,
  Flex,
  Icon,
  Text,
  flexbox,
  Box,
  Input,
  Select,
} from "@chakra-ui/react";
import React from "react";

function Header() {
  return (
    <>
      <Flex align="center" justify="space-between">
        <Text fontFamily="Inter" fontWeight="700" fontSize="2rem">
          Countries
        </Text>
        <Icon>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.0003 0.278304C6.1825 0.500435 6.2447 0.83521 6.0807 1.13613C5.52011 2.16474 5.20151 3.34302 5.20151 4.59686C5.20151 8.6173 8.4803 11.8727 12.5202 11.8727C13.0466 11.8727 13.5594 11.8175 14.0534 11.7129C14.3912 11.6413 14.6984 11.794 14.8631 12.0286C15.033 12.2707 15.0686 12.6318 14.8318 12.9224C13.3034 14.7985 10.9648 16 8.34357 16C3.73342 16 0 12.2863 0 7.71002C0 4.2658 2.11415 1.31197 5.12354 0.0600878C5.47124 -0.0845512 5.81229 0.0490932 6.0003 0.278304Z"
              fill="black"
            />
          </svg>
        </Icon>
      </Flex>
      <Box display="flex" gap="1.5rem" mt='2rem'>
        <Input placeholder="Search" />
        <Select placeholder="Any Currency">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Select placeholder="Any Language">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Select placeholder="Any Region">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Box>
    </>
  );
}

export default Header;
