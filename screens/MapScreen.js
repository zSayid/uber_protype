import { View, Text, Button } from "react-native";
import Map from "./Map";
import tw from "tailwind-react-native-classnames";
import PlacesAutocomplete from "../services/PlacesAutocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import HomeAddress from "../components/HomeAddress";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View>
      <View style={tw`h-3/4 mt-3`}>
        <Map />

        <PlacesAutocomplete
          placeholder={"Where to?"}
          onSelect={(place, details) => {
            if (!details?.geometry?.location) return;

            dispatch(
              setDestination({
                location: details.geometry.location,
                description: place.display_name,
              }),
            );

            // Navigate to ride options when destination is selected
            navigation.navigate("RideOptionsCard");
          }}
        />
      </View>

      <View>
        <HomeAddress />
      </View>
    </View>
  );
};

export default MapScreen;
