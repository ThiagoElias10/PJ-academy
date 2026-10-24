import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../theme';

export default function HeroCard({ image, tag, title, text, meta, height = 300 }) {
  return (
    <View style={[styles.container, { height }]}>
      <ImageBackground
        source={{ uri: image }}
        style={StyleSheet.absoluteFill}
      />

      <LinearGradient
        colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.88)']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        {tag ? <Text style={styles.tag}>● {tag}</Text> : null}

        <Text style={styles.title}>{title}</Text>

        {text ? <Text style={styles.description}>{text}</Text> : null}

        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  tag: {
    fontFamily: fonts.semibold,
    fontSize: 8,
    color: colors.accent,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 44,
    lineHeight: 44,
    color: colors.text,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: '#D0D3D6',
    marginTop: 8,
    maxWidth: 240,
  },
  meta: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: '#C0C4C8',
    marginTop: 8,
  },
});