import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import ImageColors from 'react-native-image-colors';

const App = () => {
  const [dominantsColor, setDominantsColor] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = [
    {
      id: 1,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I20911A5360068950742_F/dpx6uv/std/360x540/I20911A5360068950742_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I20911A5360068950742_F/dpx6uv/std/360x540/I20911A5360068950742_F.jpg?cropx=1&cropy=1&cropw=5&croph=1'
    },
    {
      id: 2,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H20961A00009M2838999_F/dpx6uv/std/360x540/H20961A00009M2838999_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H20961A00009M2838999_F/dpx6uv/std/360x540/H20961A00009M2838999_F.jpg?cropx=1&cropy=1&cropw=5&croph=1'
    },
    {
      id: 3,
      imageUrl:
        'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F09%2Fmoncler-maya-70-limited-edition-down-jacket-hbx-release-info-001.jpg?cbr=1&q=90',
      imageUrlCropped:
        'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F09%2Fmoncler-maya-70-limited-edition-down-jacket-hbx-release-info-001.jpg?cbr=1&q=90'
    },
    {
      id: 4,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H20961A00005M2695999_F/dpx6uv/std/360x540/H20961A00005M2695999_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H20961A00005M2695999_F/dpx6uv/std/360x540/H20961A00005M2695999_F.jpg?cropx=1&cropy=1&cropw=5&croph=1'
    },
    {
      id: 5,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/J10931A00085539ZD999_F/dpx6uv/std/0x0/J10931A00085539ZD999_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/J10931A00085539ZD999_F/dpx6uv/std/0x0/J10931A00085539ZD999_F.jpg?cropx=1&cropy=1&cropw=5&croph=1'
    },
    {
      id: 6,
      imageUrl: 'https://res.moncler.cn/prod/image/orgimg/moncler/I20911A51X0068950742_X.jpg',
      imageUrlCropped:
        'https://res.moncler.cn/prod/image/orgimg/moncler/I20911A51X0068950742_X.jpg?x-oss-process=image/crop,x_1,y_1,w_1,h_1'
    }
  ];

  useEffect(() => {
    const fetchDominantColor = async () => {
      try {
        let colors = {};
        for (const item of data) {
          const result = await ImageColors.getColors(item.imageUrlCropped, {
            fallback: '#32a852',
            cache: true,
            key: item.imageUrl
          });

          if (result.platform === 'android') {
            colors = {
              primary: result.vibrant,
              secondary: result.darkVibrant,
              dominant: result.dominant,
              average: result.average,
              background: result.dominant
            };
          } else if (result.platform === 'ios') {
            colors = {
              primary: result.primary,
              secondary: result.secondary,
              background: result.background,
              detail: result.detail
            };
          }

          let image = { ...item, colors };

          console.log('::::::::::::::::::::::: ');
          console.log('::::::::::::::::::::::: ');
          console.log('::::::::::::::::::::::: ');
          console.log(':::: RESULT :::: ', image);
          console.log('::::::::::::::::::::::: ');
          console.log('::::::::::::::::::::::: ');
          console.log('::::::::::::::::::::::: ');

          setDominantsColor(prev => [...prev, image]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    setDominantsColor([]);
    fetchDominantColor();
  }, []);

  return (
    <View style={styles.container}>
      {dominantsColor && dominantsColor.length > 0 && (
        <FlatList
          data={dominantsColor}
          keyExtractor={(item, index) => {
            return item.id.toString();
          }}
          numColumns={2}
          renderItem={({ item, index }) => (
            <View key={item.id} style={[styles.viewImage, { backgroundColor: item.colors.background }]}>
              <Image style={styles.image} source={{ uri: item.imageUrl }} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 50,
    backgroundColor: 'red'
  },
  text: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 20
  },
  viewImage: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'blue',
    borderColor: 'red',
    borderWidth: 1
  },
  image: {
    width: 150,
    height: 250,
    borderRadius: 0,
    padding: 15,
    borderColor: 'green',
    borderWidth: 1
  }
});

export default App;
