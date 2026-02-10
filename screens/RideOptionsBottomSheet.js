import React, { useMemo, useRef } from "react";
import { View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import RideOptionsCard from "./RideOptionsCard";


const RideOptionsBottomSheet = () => {
  const sheetRef = useRef(null);

  // 30% and 55% screen height
  const snapPoints = useMemo(() => ["30%", "55%"], []);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={false}
    >
      <View style={{ flex: 1 }}>
        <RideOptionsCard />
      </View>
    </BottomSheet>
  );
};

export default RideOptionsBottomSheet;