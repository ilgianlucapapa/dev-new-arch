import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, PixelRatio, Button } from 'react-native';
import ImageColors from 'react-native-image-colors';
import { useVideoPlayer, VideoView } from 'expo-video';

const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const App = () => {
  const ref = useRef(null);
  const [dominantsColor, setDominantsColor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  // CROP GLOBAL: ?cropx=1&cropy=1&cropw=5&croph=1
  // CROP CHINA : ?x-oss-process=image/crop,x_1,y_1,w_1,h_1
  const data = [
    {
      id: 0,
      imageUrl: '',
      imageUrlCropped: '',
      isVideo: true
    },
    {
      id: 1,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I20911A5360068950742_F/dpx6uv/std/360x540/I20911A5360068950742_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I20911A5360068950742_F/dpx6uv/std/360x540/I20911A5360068950742_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 2,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H20961A00009M2838999_F/dpx6uv/std/360x540/H20961A00009M2838999_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H20961A00009M2838999_F/dpx6uv/std/360x540/H20961A00009M2838999_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 3,
      imageUrl:
        'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F09%2Fmoncler-maya-70-limited-edition-down-jacket-hbx-release-info-001.jpg?cbr=1&q=90',
      imageUrlCropped:
        'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F09%2Fmoncler-maya-70-limited-edition-down-jacket-hbx-release-info-001.jpg?cbr=1&q=90',
      isVideo: false
    },
    {
      id: 4,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/J10931A00085539ZD999_F/dpx6uv/std/0x0/J10931A00085539ZD999_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/J10931A00085539ZD999_F/dpx6uv/std/0x0/J10931A00085539ZD999_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 5,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209B4H00070M2707999_F/dpx6uv/std/0x0/I209B4H00070M2707999_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209B4H00070M2707999_F/dpx6uv/std/0x0/I209B4H00070M2707999_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 6,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/J20911A000065963V438_F/dpx6uv/std/0x0/J20911A000065963V438_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/J20911A000065963V438_F/dpx6uv/std/0x0/J20911A000065963V438_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 7,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H209A4M0027001A9A999_F/dpx6uv/std/1024x1024/H209A4M0027001A9A999_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H209A4M0027001A9A999_F/dpx6uv/std/1024x1024/H209A4M0027001A9A999_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 8,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H209A4C0001001A49998_F/dpx6uv/std/0x0/H209A4C0001001A49998_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H209A4C0001001A49998_F/dpx6uv/std/0x0/H209A4C0001001A49998_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 9,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H209A4M0027001A9A002_F/dpx6uv/std/1024x1024/H209A4M0027001A9A002_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H209A4M0027001A9A002_F/dpx6uv/std/1024x1024/H209A4M0027001A9A002_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 10,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F209U8C708108392B719_F/dpx6uv/std/360x540/F209U8C708108392B719_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F209U8C708108392B719_F/dpx6uv/std/360x540/F209U8C708108392B719_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 11,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F209U8C708108392B719_F/dpx6uv/std/360x540/F209U8C708108392B719_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F209U8C708108392B719_F/dpx6uv/std/360x540/F209U8C708108392B719_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 12,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F10918G72400V8119999_F/dpx6uv/std/1024x1024/F10918G72400V8119999_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F10918G72400V8119999_F/dpx6uv/std/1024x1024/F10918G72400V8119999_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 13,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F20938G51500V8144999_F/dpx6uv/std/1024x1024/F20938G51500V8144999_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F20938G51500V8144999_F/dpx6uv/std/1024x1024/F20938G51500V8144999_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 14,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F20938I71500V8144999_F/dpx6uv/std/1024x1024/F20938I71500V8144999_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F20938I71500V8144999_F/dpx6uv/std/1024x1024/F20938I71500V8144999_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 15,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F10938G70510V8036032_F/dpx6uv/std/1024x1024/F10938G70510V8036032_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F10938G70510V8036032_F/dpx6uv/std/1024x1024/F10938G70510V8036032_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 16,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F10938I70600C8031778_F/dpx6uv/std/1024x1024/F10938I70600C8031778_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F10938I70600C8031778_F/dpx6uv/std/1024x1024/F10938I70600C8031778_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 17,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F10918G71900V8119001_F/dpx6uv/std/1024x1024/F10918G71900V8119001_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/F10918G71900V8119001_F/dpx6uv/std/1024x1024/F10918G71900V8119001_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 18,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I10913B00035V0090999_F/dpx6uv/std/360x540/I10913B00035V0090999_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I10913B00035V0090999_F/dpx6uv/std/360x540/I10913B00035V0090999_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 19,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I10933B00040V0006999_F/dpx6uv/std/360x540/I10933B00040V0006999_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I10933B00040V0006999_F/dpx6uv/std/360x540/I10933B00040V0006999_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 20,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I20933B00036A9327030_F/dpx6uv/std/360x540/I20933B00036A9327030_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I20933B00036A9327030_F/dpx6uv/std/360x540/I20933B00036A9327030_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 21,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H10933B00023V0006529_F/dpx6uv/std/360x540/H10933B00023V0006529_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H10933B00023V0006529_F/dpx6uv/std/360x540/H10933B00023V0006529_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 22,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H20939Z70301A9328985_F/dpx6uv/std/360x540/H20939Z70301A9328985_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H20939Z70301A9328985_F/dpx6uv/std/360x540/H20939Z70301A9328985_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 23,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/G20933B70201A9327714_F/dpx6uv/std/360x540/G20933B70201A9327714_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/G20933B70201A9327714_F/dpx6uv/std/360x540/G20933B70201A9327714_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 24,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209S3G000020U21811A_F/dpx6uv/std/360x540/I209S3G000020U21811A_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209S3G000020U21811A_F/dpx6uv/std/360x540/I209S3G000020U21811A_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 25,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H29512A0000268352742_F/dpx6uv/std/360x540/H29512A0000268352742_F.jpg',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/H29512A0000268352742_F/dpx6uv/std/360x540/H29512A0000268352742_F.jpg?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 26,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209S3G000020U218999_F/dpx6uv/std/360x540/I209S3G000020U218999_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209S3G000020U218999_F/dpx6uv/std/360x540/I209S3G000020U218999_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 27,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209S3G000020U218749_F/dpx6uv/std/360x540/I209S3G000020U218749_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209S3G000020U218749_F/dpx6uv/std/360x540/I209S3G000020U218749_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 28,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209S3G000020U218001_F/dpx6uv/std/360x540/I209S3G000020U218001_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209S3G000020U218001_F/dpx6uv/std/360x540/I209S3G000020U218001_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 29,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209S3G000020U21832G_F/dpx6uv/std/360x540/I209S3G000020U21832G_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209S3G000020U21832G_F/dpx6uv/std/360x540/I209S3G000020U21832G_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    },
    {
      id: 30,
      imageUrl:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209S3B00003596J0999_F/dpx6uv/std/360x540/I209S3B00003596J0999_F',
      imageUrlCropped:
        'https://moncler-cdn.thron.com/delivery/public/image/moncler/I209S3B00003596J0999_F/dpx6uv/std/360x540/I209S3B00003596J0999_F?cropx=1&cropy=1&cropw=5&croph=1',
      isVideo: false
    }
  ];

  useEffect(() => {
    const fetchDominantColor = async () => {
      try {
        let colors = {};
        let start = new Date();
        setStart(start);
        console.log('::::::::::::::::::::::: ');
        console.log('::::::::::::::::::::::: ');
        console.log('::::::::::::::::::::::: ');
        console.log(':::: START :::: ', start);
        console.log('::::::::::::::::::::::: ');
        console.log('::::::::::::::::::::::: ');
        console.log('::::::::::::::::::::::: ');

        for (const item of data) {
          if (!item.isVideo) {
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
          } else {
            setDominantsColor(prev => [...prev, item]);
          }
        }
        let end = new Date();
        setEnd(end);
        console.log('::::::::::::::::::::::: ');
        console.log('::::::::::::::::::::::: ');
        console.log('::::::::::::::::::::::: ');
        console.log(':::: END :::: ', end);
        console.log('::::::::::::::::::::::: ');
        console.log('::::::::::::::::::::::: ');
        console.log('::::::::::::::::::::::: ');
        let duration = (end - start) / 1000;
        setDuration(duration);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    setDominantsColor([]);
    fetchDominantColor();
  }, []);

  useEffect(() => {
    const subscription = player.addListener('playingChange', isPlaying => {
      setIsPlaying(isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  return (
    <View style={styles.container}>
      {dominantsColor && dominantsColor.length > 0 && (
        <>
          {start && end && (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: 50,
                top: 30,
                backgroundColor: '#ffffff',
                color: '#000000',
                zIndex: 999,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={styles.text}>{'Duration'}</Text>
              <Text style={styles.textBold}>{duration}</Text>
            </View>
          )}
          <FlatList
            data={dominantsColor}
            keyExtractor={(item, index) => {
              return item.id.toString();
            }}
            numColumns={2}
            renderItem={({ item, index }) =>
              item.isVideo ? (
                <View key={item.id} style={[styles.viewImage]}>
                  <VideoView
                    ref={ref}
                    style={styles.video}
                    player={player}
                    allowsFullscreen
                    allowsPictureInPicture
                    contentFit="contain"
                  />
                </View>
              ) : (
                <View key={item.id} style={[styles.viewImage, { backgroundColor: item.colors.background }]}>
                  <Image style={styles.image} source={{ uri: item.imageUrl }} />
                </View>
              )
            }
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    marginTop: 50,
    backgroundColor: 'red'
  },
  text: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    alignItems: 'center'
    // marginBottom: 20
  },
  textBold: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
    // marginBottom: 20
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
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  video: {
    width: '100%',
    height: 250,
    borderRadius: 0,
    padding: 15,
    borderColor: 'green',
    borderWidth: 1
  }
});

export default App;
