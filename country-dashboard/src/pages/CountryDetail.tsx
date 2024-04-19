import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CountryDetailTypes } from "../dataTypes";
import { AspectRatio, Box, Text, Image, Heading, Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const CountryDetail = () => {
  const { CountryName } = useParams();
  const navigate = useNavigate();
  const url = `https://restcountries.com/v3.1/name/${CountryName}`;
  const [cardDetail, setCardDetail] = useState<CountryDetailTypes[]>([]);
  const filteredData = cardDetail.find(
    (item: CountryDetailTypes) => item.name.common === CountryName
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCardDetail(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [CountryName]);

  return (
    <>
      <Flex
        direction={["column", "column", "row", "row"]}
        w={"50%"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        mt={"3%"}
        ml={"2%"}
      >
        <Box w={"47%"} pt={"1rem"}>
          <Flex direction={"row"} mb={"1.4rem"} alignItems={"center"}>
            <ArrowBackIcon
              fontSize={"1.6rem"}
              mr={"1rem"}
              onClick={() => navigate(-1)}
            />
            <Heading
              mb={"8%"}
              fontSize={["1rem", "1rem", "1.7rem", "1.7rem"]}
              fontWeight={"700"}
              position={"relative"}
              top={"0.5rem"}
            >
              {filteredData?.name.common}
            </Heading>
          </Flex>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={filteredData?.flags?.png}
              alt={filteredData?.flags?.alt}
              objectFit={"cover"}
              boxSize={"100%"}
              transition="transform 0.3s ease"
              _hover={{ bg: "gray.200", transform: "scale(1.05)" }}
            />
          </AspectRatio>
        </Box>
        <Box position={"relative"} top={"2.5rem"}>
          <Text lineHeight={"2rem"}>
            <Text as={"span"} mr={".5rem"}>
              Native Name
            </Text>
            {filteredData?.name.common}
          </Text>
          <hr />
          <Text lineHeight={"2rem"}>
            <Text as={"span"} mr={".5rem"}>
              Population
            </Text>
            {filteredData?.population}
          </Text>
          <hr />
          <Text lineHeight={"2rem"}>
            <Text as={"span"} mr={".5rem"}>
              Region{" "}
            </Text>
            {filteredData?.region}
          </Text>
          <hr />
          <Text lineHeight={"2rem"}>
            <Text as={"span"} mr={".5rem"}>
              Subregion
            </Text>{" "}
            {filteredData?.subregion}
          </Text>
          <hr />
          <Text lineHeight={"2rem"}>
            <Text as={"span"} mr={".5rem"}>
              Subregion
            </Text>
            {filteredData?.capital}
          </Text>
          <hr />
          <Text lineHeight={"2rem"}>
            <Text as={"span"} mr={".5rem"}>
              Currencies
            </Text>
            {filteredData?.currencies &&
              Object.entries(filteredData.currencies).map(([item]) => item)}
          </Text>
          <hr />
          <Text lineHeight={"2rem"}>
            <Text as={"span"} mr={".5rem"}>
              Languages{" "}
            </Text>
            {filteredData?.languages.eng}
          </Text>
          <hr />
        </Box>
      </Flex>
    </>
  );
};

export default CountryDetail;
