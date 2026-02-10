import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";

const PlacesAutocomplete = ({ onSelect, placeholder }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchPlaces = async (text) => {
    setQuery(text);

    if (text.length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          text,
        )}`,
        {
          headers: {
            "User-Agent": "uber-clone-app",
            Accept: "application/json",
          },
        },
      );

      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearInput = () => {
    setQuery("");
    setResults([]);
  };

  return (
<View style={tw`z-50 px-3 pt-3 bg-gray-100`}>
  <View style={tw`flex-row items-center bg-white rounded-full px-4 py-3 shadow-md`}>
    
    {/* Search Icon */}
    <Ionicons name="search" size={20} color="#555" />

    {/* Input */}
    <TextInput
    placeholder={placeholder}
      value={query}
      onChangeText={searchPlaces}
      style={tw`flex-1 ml-3 text-base text-gray-800`}
      placeholderTextColor="#888"
    />

    {/* Clear button */}
    {query.length > 0 && (
      <TouchableOpacity onPress={clearInput} style={tw`mr-2`}>
        <Ionicons name="close-circle" size={18} color="gray" />
      </TouchableOpacity>
    )}

    {/* Now chip */}
    <View style={tw`flex-row items-center bg-gray-100 px-3 py-1 rounded-full`}>
      <Ionicons name="time-outline" size={14} color="#555" />
      <Text style={tw`ml-1 text-sm text-gray-700 font-medium`}>Now</Text>
    </View>

  </View>

  {/* Results dropdown */}
  {results.length > 0 && (
    <View style={tw`mt-2 bg-white rounded-lg shadow-lg`}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`p-4 border-b border-gray-100`}
            onPress={() => {
              const details = {
                geometry: {
                  location: {
                    lat: Number(item.lat),
                    lng: Number(item.lon),
                  },
                },
              };

              onSelect(item, details);
              setQuery(item.display_name);
              setResults([]);
            }}
          >
            <Text style={tw`text-gray-800`}>{item.display_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )}
</View>

  );
};

export default PlacesAutocomplete;
