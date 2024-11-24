import { View, Text, TextInput } from "react-native";
import { useEffect, useState } from "react";
import "@/global.css"; 

export default function Index() {
  const [ayah, setAyah] = useState("");

  useEffect(() => {
    fetch("http://api.alquran.cloud/v1/ayah/262")
      .then((response) => response.json())
      .then((json) => setAyah(json.data.text));
  }, []); 

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-red-500 text-lg font-bold">{ayah}</Text>
      <TextInput className="border border-gray-400 p-2 mt-2" /> 
    </View>
  );
}
