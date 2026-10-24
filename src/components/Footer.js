import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>PULSO</Text>
        <Text style={styles.tagline}>SEU RITMO. SUA EVOLUÇÃO.</Text>
      </View>

      <View style={styles.links}>
        <Text style={styles.smallText}>Fale com a equipe</Text>
        <Text style={styles.smallText}>Privacidade</Text>
      </View>

      <Text style={styles.copyright}>
        © 2026 PULSO Academia. Movimento com intenção.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontFamily: fonts.title,
    fontSize: 20,
    color: colors.text,
  },
  tagline: {
    fontFamily: fonts.regular,
    fontSize: 9,
    color: colors.muted,
  },
  links: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  smallText: {
    fontFamily: fonts.regular,
    fontSize: 9,
    color: colors.muted,
  },
  copyright: {
    fontFamily: fonts.regular,
    fontSize: 8,
    color: colors.muted,
    marginTop: 8,
  },
});