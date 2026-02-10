import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image:
      "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=576/height=384/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9lMDI1OTA1Yy00M2JkLTQ3OTctOTFlNi0yOWQwYWU5Y2I0OGQucG5n",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={tw`p-2 pl-5 pb-8 pt-4 bg-gray-200 m-2 w-33 rounded-lg`}
          >
            <View>
              <Image
                source={{ uri: item.image }}
                style={{ width: 120, height: 120, resizeMode: "contain" }}
              />
            </View>
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text> 
            <View style={tw` m-auto mt-3 p-2 bg-black rounded-full w-10`}>
              <FontAwesome6 name="arrow-right" size={20} color="white"/>
            </View>
            
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavOptions;
