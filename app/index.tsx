import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import "@/global.css";

interface Ayah {
  text: string;
  numberInSurah: number;
  surah: {
    name: string;
  };
}

export default function Index() {
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search) {
      setLoading(true);
      fetch(`https://api.alquran.cloud/v1/search/${search}/all/quran-simple-clean`)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if (json?.data?.matches?.length > 0) {
            console.log("Results found:", json);
            setAyahs(json.data.matches);
          } else {
            console.log("No results found.");
            setAyahs([] as Ayah[]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setAyahs([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [search]);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-red-500 text-lg font-bold mb-4">
        {ayahs.length > 0 ? "Results:" : "Search for an Ayah"}
      </Text>
      <View className="flex flex-row items-center space-x-4 mb-4">
        <TextInput
          className="border border-gray-300 p-2 w-48 rounded"
          value={keyword}
          onChangeText={(text) => {
            setKeyword(text);
          }}
          placeholder="Search Ayah"
        />
        <Button
          title="Search"
          onPress={() => {
            setSearch(keyword);
          }}
        />
      </View>
      {loading ? (
        <View className="flex-1 justify-center items-center bg-gray-100 p-4">
          <Text className="text-black text-lg font-bold mb-4">Loading...</Text>
        </View>
      ) : (
        <ScrollView className="w-full">
          {ayahs.length > 0 ? (
            ayahs.map((ayah: Ayah, index: number) => (
              <View
                key={index}
                className="mb-4 p-2 border border-gray-300 rounded"
              >
                <Text className="text-black">{ayah.text}</Text>
                <Text className="text-sm text-gray-600 mt-2">
                  Surah: {ayah.surah.name}, Ayah: {ayah.numberInSurah}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500">No results found.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}
