import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const HomeAddress = () => {
  return (
    <View style={tw`bg-white rounded-lg overflow-hidden`}>
      
      {/* WORK */}
      <TouchableOpacity style={tw`flex-row items-center px-4 py-3`}>
        <View style={tw`w-10 h-10 rounded-full bg-gray-200 items-center justify-center`}>
          <MaterialIcons name="work" size={20} color="black" />
        </View>

        <View style={tw`ml-4`}>
          <Text style={tw`text-base font-semibold`}>Work</Text>
          <Text style={tw`text-gray-500 text-sm`}>1455 Market St</Text>
        </View>
      </TouchableOpacity>

      {/* Divider */}
      <View style={tw`h-px bg-gray-200 ml-16`} />

      {/* HOME */}
      <TouchableOpacity style={tw`flex-row items-center px-4 py-3`}>
        <View style={tw`w-10 h-10 rounded-full bg-gray-200 items-center justify-center`}>
          <Ionicons name="home" size={20} color="black" />
        </View>

        <View style={tw`ml-4`}>
          <Text style={tw`text-base font-semibold`}>Home</Text>
          <Text style={tw`text-gray-500 text-sm`}>903 Sunrise Terr</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};

export default HomeAddress;
