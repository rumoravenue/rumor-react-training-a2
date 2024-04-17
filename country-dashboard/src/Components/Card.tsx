import React from "react";
import { Box, Image, Text, AspectRatio } from "@chakra-ui/react";

function Card(props: any) {
  return (
    <Box
      key={props.currency}
      className="card--ui"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="sm"
      width="16.75rem"
      height="18.35rem"
      p="1rem"
    >
      <Box className="card-flag">
        <Image src={props.imgurl} alt="Country Flag" width='14.75rem' height='7.54rem' />
      </Box>
      <Box className="card-text" p="4">
        <Text as="h5" fontSize="lg" fontWeight="semibold">
          {props.countryname}
        </Text>
        <Text>Population: {props.population}</Text>
        <Text>Region: {props.region}</Text>
        <Text>Capital: {props.capital}</Text>
        <Text>Currency: {props.currency}</Text>
      </Box>
    </Box>
  );
}

export default Card;
