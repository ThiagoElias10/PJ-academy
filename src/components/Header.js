import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

export default function Header({ tab, onChange, initials = 'LC', right }) {
  return (
    <View style={s.wrap}>
      <View style={s.row}>
        <View style={s.logoRow}>
          <Ionicons name="pulse" size={20} color={colors.accent} />
          <Text style={s.logo}>PULSO</Text>
          <Text style={s.academia}>ACADEMIA</Text>
        </View>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{initials}</Text>
        </View>
      </View>

      <View style={s.tabsRow}>
        <View style={s.tabs}>
          {['Início', 'Treinos'].map((t) => {
            const active = tab === t;
            return (
              <TouchableOpacity key={t} onPress={() => onChange(t)} style={[s.tab, active && s.tabActive]}>
                <Text style={[s.tabText, active && { color: colors.text }]}>{t}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {right ? <Text style={s.right}>{right}</Text> : null}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
     paddingHorizontal: 16,
      paddingTop: 8 
    },
  row: {
     flexDirection: 'row',
      justifyContent: 'space-between',
       alignItems: 'center' 
    },
  logoRow: {
     flexDirection: 'row',
      alignItems: 'center',
       gap: 6 
    },
  logo: {
     fontFamily: fonts.title,
      fontSize: 24,
       color: colors.text,
        letterSpacing: 0.5 
    },
  academia: {
     fontFamily: fonts.medium,
      fontSize: 7, color: colors.muted,
       marginTop: 6 
    },
  avatar: {
    width: 30,
    height: 30, 
    borderRadius: 15,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    color: colors.text
 },
  tabsRow: {
     flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
     marginTop: 14 
},
  tabs: {
    flexDirection: 'row',
    gap: 16 
},
  tab: {
    paddingBottom: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: 'transparent' 
    },
  tabActive: { 
    borderBottomColor: colors.accent
 },
  tabText: {
     fontFamily: fonts.medium,
      fontSize: 12,
       color: colors.muted 
    },
  right: { 
    fontFamily: fonts.regular,
     fontSize: 9,
      color: colors.muted, 
      letterSpacing: 0.8
    },
});