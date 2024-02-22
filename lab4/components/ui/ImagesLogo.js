import { Image, StyleSheet } from 'react-native';

function ImageLogo({ source }) {
  return <Image style={styles.imageStyle} source={source} />;
}

export default ImageLogo;
const styles = StyleSheet.create({
  imageStyle: {
    width: 200,
    height: 150,
    marginBottom: 20,
    alignContent: 'center',
  },
});
