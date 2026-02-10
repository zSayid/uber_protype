import { View, Image, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import PlacesAutocomplete from "../services/PlacesAutocomplete";
import { setOrigin, setDestination } from "../slices/navSlice";
import { useDispatch } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaProvider>
      <View style={tw`p-4`}>
        <Text
          style={tw`text-4xl font-semibold tracking-tighter font-serif mt-5 `}
        >
          Uber
        </Text>

        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />

        <PlacesAutocomplete
          placeholder={"Where from?"}
          onSelect={(place, details) => {
            if (!details?.geometry?.location) return;

            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: place.display_name,
              }),
            );

            dispatch(setDestination(null));
          }}
        />

        <View style={tw`h-6`} />

        <NavOptions />
      </View>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
