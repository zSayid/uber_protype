import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTravelTimeInformation,
  setRideConfirmed,
} from "../slices/navSlice";
import React, { useState } from "react";
import Map from "./Map";

const rides = [
  {
    id: "Uber-X",
    title: "UberX",
    multiplier: 1,
    image:
      "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=576/height=384/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9iNTBhNTE5MS04MzZlLTQyYmYtYWQ1ZC02Y2IzMTAwZWM0MjUucG5n",
  },
  {
    id: "Uber-XL",
    title: "Uber XL",
    multiplier: 1.5,
    image:
      "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=576/height=384/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy82ZDM1NDkxOS0xOGIwLTQ1ZDAtYTE1MS01MDFhYjRjNGIxMTQucG5n",
  },
  {
    id: "Uber-LUX",
    title: "Uber LUX",
    multiplier: 2,
    image:
      "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=576/height=384/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy80ZjU5OWM0Ny03ZjVjLTQ1NDQtYTVkMi05MjZiYWJjOGUxMTMucG5n",
  },
];

const BASE_FARE = 2;
const PRICE_PER_KM = 1.5;
const PRICE_PER_MIN = 0.3;

const RideOptionsCard = () => {
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const calculateFare = (multiplier) => {
    if (!travelTimeInformation) return "—";

    const km = travelTimeInformation.distance / 1000;
    const min = travelTimeInformation.duration / 60;

    const price = BASE_FARE + km * PRICE_PER_KM + min * PRICE_PER_MIN;

    return (price * multiplier).toFixed(2);
  };

  return (
    <View style={tw`flex-1`}>
      {/* Map on the top half */}
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      {/* Ride options on the bottom half */}
      <View style={tw`bg-white flex-1`}>
        <Text style={tw`text-center py-5 text-xl font-semibold bg-gray-100`}>
          Select a Ride
        </Text>

        <FlatList
          data={rides}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={tw`flex-row items-center justify-between px-4 py-3 ${
                selected?.id === item.id ? "bg-gray-200" : ""
              }`}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 80, height: 80, resizeMode: "contain" }}
              />

              <View style={tw`ml-4 flex-1`}>
                <Text style={tw`text-lg font-semibold`}>{item.title}</Text>
                <Text style={tw`text-gray-500`}>
                  {Math.ceil(travelTimeInformation?.duration / 60)} min
                </Text>
              </View>

              <Text style={tw`text-lg font-semibold`}>
                ${calculateFare(item.multiplier)}
              </Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          disabled={!selected}
          onPress={() => {
            dispatch(setRideConfirmed(true));
          }}
          style={tw`bg-black py-3 m-3 rounded-xl ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-white text-center text-lg`}>
            Confirm {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RideOptionsCard;
