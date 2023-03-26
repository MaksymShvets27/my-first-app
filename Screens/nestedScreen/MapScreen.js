import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapsView, { Marker } from "react-native-maps";
export default MapsScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <MapsView
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
        region={{
          longitude: route.params.longitube,
          latitude: route.params.latitube,
          longitudeDelta: 0.1,
          latitudeDelta: 0.1,
        }}
        mapType="standard"
        minZoomLevel={15}
      >
        <Marker
          title={route.params.title}
          coordinate={{
            longitude: route.params.longitube,
            latitude: route.params.latitube,
          }}
        />
      </MapsView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
